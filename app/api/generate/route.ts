// app/api/generate/route.ts — javari-pets
// AI pet care tools — health guidance, nutrition, breed info, vet prep
// Powered by Groq/OpenRouter free models
import { NextRequest, NextResponse } from 'next/server'

async function callGemini(text: string): Promise<string> {
  const key = process.env.GOOGLE_GEMINI_API_KEY ?? process.env.GEMINI_API_KEY ?? ''
  if (!key) return ''
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${key}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text }] }],
          generationConfig: { maxOutputTokens: 2048, temperature: 0.7 },
        }),
      },
    )
    if (!res.ok) return ''
    const d = (await res.json()) as { candidates?: { content?: { parts?: { text?: string }[] } }[] }
    return d.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
  } catch {
    return ''
  }
}

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const maxDuration = 60

const GROQ = process.env.GROQ_API_KEY ?? ''
const OR   = process.env.OPENROUTER_API_KEY ?? ''
const CREDIT_COST = 2

const SYSTEM = `You are an expert veterinary assistant and pet care specialist for CR AudioViz AI. 
Help pet owners with health guidance, nutrition plans, vaccination schedules, behavioral advice, and breed-specific care. 
Always recommend consulting a licensed vet for medical decisions. Be warm, specific, and actionable.`

const ACTIONS = ['health_check', 'nutrition_plan', 'vaccination_schedule', 'breed_guide', 'behavioral_advice', 'vet_prep', 'adoption_profile']

async function gen(prompt: string): Promise<string> {
  if (OR) {
    try {
      const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${OR}`, 'HTTP-Referer': 'https://craudiovizai.com' },
        body: JSON.stringify({ model: 'deepseek/deepseek-v4-flash:free', max_tokens: 2048, temperature: 0.7, messages: [{ role: 'system', content: SYSTEM }, { role: 'user', content: prompt }] })
      })
      if (r.ok) { const d = await r.json() as { choices?: Array<{ message?: { content?: string } }> }; const t = d.choices?.[0]?.message?.content ?? ''; if (t.length > 50) return t }
    } catch { /* fall through */ }
  }
  if (!GROQ) throw new Error('AI service unavailable — please try again')
  const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${GROQ}` },
    body: JSON.stringify({ model: 'openai/gpt-oss-120b', max_tokens: 2048, temperature: 0.7, messages: [{ role: 'system', content: SYSTEM }, { role: 'user', content: prompt }] })
  })
  // 2026-08-15: Gemini was missing from the cascade entirely, so a Groq 429
  // became a 500 the customer saw. Free tier two of the COST LAW.
  const gem = await callGemini(prompt)
  if (gem.length > 20) return gem

  if (!r.ok) throw new Error(`AI error: ${r.status}`)
  const d = await r.json() as { choices?: Array<{ message?: { content?: string } }> }
  return d.choices?.[0]?.message?.content ?? ''
}

export async function GET() {
  return NextResponse.json({ actions: ACTIONS, cost: CREDIT_COST + ' credits', cost_usd: '$0.00' })
}

export async function POST(req: NextRequest) {
  try {
    const b = await req.json() as { action: string; input: string }
    if (!ACTIONS.includes(b.action)) return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    if (!b.input?.trim()) return NextResponse.json({ error: 'Input required' }, { status: 400 })
    const result = await gen(b.input)
    return NextResponse.json({ result, action: b.action, credits_used: CREDIT_COST })
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Generation failed' }, { status: 500 })
  }
}
