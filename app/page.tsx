// app/page.tsx — Javari Pets
// Complete AI-powered pet care tools — real API calls to /api/generate
// CR AudioViz AI, LLC · EIN 39-3646201 · May 2026
'use client'
import { useState } from 'react'

const ACTIONS = [
  { id: 'health_check',         label: '🩺 Health Check',          desc: 'AI symptom assessment and vet guidance',    prompt: (v: V) => `My pet: ${v.petName || 'my pet'}, a ${v.age || ''} year old ${v.breed || v.species || 'dog'}. Symptoms or concerns: ${v.concern || ''}. Provide a detailed health assessment, possible causes, immediate steps I can take at home, and clear guidance on whether/when to see a vet. Weight: ${v.weight || 'unknown'}.` },
  { id: 'nutrition_plan',       label: '🥗 Nutrition Plan',         desc: 'Custom diet and feeding schedule',          prompt: (v: V) => `Create a complete nutrition and feeding plan for ${v.petName || 'my pet'}, a ${v.age || ''} year old ${v.breed || v.species || 'dog'}, weighing ${v.weight || 'unknown'} lbs. Activity level: ${v.activity || 'moderate'}. Any health conditions: ${v.conditions || 'none'}. Include: daily feeding schedule, portion sizes, recommended foods, foods to avoid, treats, and supplements.` },
  { id: 'vaccination_schedule', label: '💉 Vaccination Schedule',   desc: 'Complete vaccine timeline for your pet',    prompt: (v: V) => `Create a complete vaccination schedule for ${v.petName || 'my pet'}, a ${v.age || ''} year old ${v.breed || v.species || 'dog'}. Location: ${v.state || 'Florida'}. Include: core vaccines, non-core vaccines, boosters, rabies requirements, flea/tick/heartworm prevention schedule, and annual vet visit checklist.` },
  { id: 'breed_guide',          label: '📖 Breed Guide',            desc: 'Complete care guide for your breed',        prompt: (v: V) => `Write a comprehensive breed guide for ${v.breed || v.species || 'mixed breed'}. Include: temperament and personality, exercise needs, grooming requirements, common health issues, training tips, ideal living situation, lifespan, and what makes this breed unique. Format as a complete owner's guide.` },
  { id: 'behavioral_advice',    label: '🐾 Behavior Help',          desc: 'Fix behavioral issues with expert guidance', prompt: (v: V) => `My ${v.species || 'dog'} ${v.petName || ''} (${v.age || ''} years old, ${v.breed || ''}) is having this behavioral issue: ${v.behavior || ''}. Provide: root cause analysis, step-by-step training techniques, what NOT to do, timeline for improvement, and when to consult a professional trainer.` },
  { id: 'vet_prep',             label: '🏥 Vet Visit Prep',         desc: 'Prepare for your vet appointment',          prompt: (v: V) => `Help me prepare for a vet appointment for ${v.petName || 'my pet'} (${v.breed || v.species || 'dog'}, ${v.age || ''} years old). Reason for visit: ${v.visitReason || 'routine checkup'}. Create: a list of questions to ask the vet, symptoms to describe clearly, what to bring, what to expect, and post-visit care instructions.` },
  { id: 'adoption_profile',     label: '❤️ Adoption Profile',       desc: 'Help find the perfect match for your pet',  prompt: (v: V) => `Write a compelling adoption profile for ${v.petName || 'this pet'}, a ${v.age || ''} year old ${v.breed || v.species || 'dog'}. Personality: ${v.personality || ''}. Special needs: ${v.specialNeeds || 'none'}. Make it heartfelt, specific, and include ideal home requirements, compatibility with kids/pets, and a CTA that will motivate adoption.` },
]

type V = Record<string, string>

const BASE_FIELDS = [
  { id: 'petName', label: 'Pet Name', placeholder: 'Buddy' },
  { id: 'species', label: 'Species', placeholder: 'Dog, Cat, Bird, Rabbit...' },
  { id: 'breed', label: 'Breed', placeholder: 'Golden Retriever, Siamese...' },
  { id: 'age', label: 'Age', placeholder: '3 years' },
  { id: 'weight', label: 'Weight (lbs)', placeholder: '45' },
]

const EXTRA_FIELDS: Record<string, Array<{ id: string; label: string; placeholder: string; type?: string }>> = {
  health_check:         [{ id: 'concern', label: 'Symptoms / Concern', placeholder: 'Not eating, lethargic, limping...', type: 'textarea' }],
  nutrition_plan:       [{ id: 'activity', label: 'Activity Level', placeholder: 'Low, Moderate, High, Athletic' }, { id: 'conditions', label: 'Health Conditions', placeholder: 'Diabetes, allergies, joint issues...' }],
  vaccination_schedule: [{ id: 'state', label: 'State', placeholder: 'Florida' }],
  breed_guide:          [],
  behavioral_advice:    [{ id: 'behavior', label: 'Behavioral Issue', placeholder: 'Aggression, excessive barking, separation anxiety...', type: 'textarea' }],
  vet_prep:             [{ id: 'visitReason', label: 'Reason for Visit', placeholder: 'Annual checkup, limping, not eating...' }],
  adoption_profile:     [{ id: 'personality', label: 'Personality', placeholder: 'Playful, gentle, loves kids, shy with strangers...' }, { id: 'specialNeeds', label: 'Special Needs', placeholder: 'None, requires medication, senior dog...' }],
}

export default function JavariPetsPage() {
  const [action, setAction] = useState(ACTIONS[0])
  const [values, setValues] = useState<V>({})
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  function setV(id: string, val: string) {
    setValues(p => ({ ...p, [id]: val }))
  }

  async function generate() {
    setLoading(true)
    setError('')
    setOutput('')
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: action.id, input: action.prompt(values) }),
      })
      const data = await res.json() as { result?: string; error?: string }
      if (!res.ok || data.error) throw new Error(data.error || 'Generation failed')
      setOutput(data.result || '')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    }
    setLoading(false)
  }

  const extraFields = EXTRA_FIELDS[action.id] || []

  return (
    <div style={{ background: '#0d0f0a', minHeight: '100vh', color: '#e8efe0', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}>
      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(13,15,10,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(74,222,128,0.12)', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px' }}>
        <a href="https://craudiovizai.com" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <span style={{ fontSize: 22 }}>🐾</span>
          <span style={{ fontWeight: 800, fontSize: 15, color: '#4ade80', letterSpacing: '-0.02em' }}>Javari Pets</span>
        </a>
        <div style={{ display: 'flex', gap: 8 }}>
          <a href="https://javariai.com" style={{ color: '#4b5563', fontSize: 13, textDecoration: 'none', padding: '6px 12px' }}>Javari AI</a>
          <a href="https://craudiovizai.com/auth/signup" style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)', color: 'white', borderRadius: 8, padding: '8px 18px', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Free Access →</a>
        </div>
      </nav>
      <div style={{ height: 60 }} />

      {/* HERO */}
      <section style={{ textAlign: 'center', padding: '52px 24px 36px', maxWidth: 720, margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 800, margin: '0 0 14px', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          AI-Powered <span style={{ color: '#4ade80' }}>Pet Care</span>
        </h1>
        <p style={{ fontSize: 16, color: '#6b7280', maxWidth: 480, margin: '0 auto 8px', lineHeight: 1.65 }}>
          Health assessments, nutrition plans, vaccination schedules, and breed guides — 
          powered by veterinary AI. <strong style={{ color: '#4ade80' }}>50 free uses/month.</strong>
        </p>
        <p style={{ color: '#374151', fontSize: 12 }}>⚕️ Not a substitute for professional veterinary care. Always consult your vet.</p>
      </section>

      {/* TOOL */}
      <section style={{ maxWidth: 980, margin: '0 auto', padding: '0 24px 80px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.5fr)', gap: 20, alignItems: 'start' }}>
        <div>
          {/* Action selector */}
          <div style={{ background: '#141a10', border: '1px solid rgba(74,222,128,0.1)', borderRadius: 14, overflow: 'hidden', marginBottom: 20 }}>
            {ACTIONS.map(a => (
              <button key={a.id} onClick={() => { setAction(a); setValues({}); setOutput('') }}
                style={{ width: '100%', textAlign: 'left', padding: '12px 16px', background: action.id === a.id ? 'rgba(74,222,128,0.08)' : 'transparent', borderLeft: action.id === a.id ? '3px solid #4ade80' : '3px solid transparent', border: 'none', cursor: 'pointer', borderBottom: '1px solid rgba(74,222,128,0.05)', display: 'block' }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: action.id === a.id ? '#86efac' : '#9ca3af' }}>{a.label}</div>
                <div style={{ fontSize: 11, color: '#374151', marginTop: 2 }}>{a.desc}</div>
              </button>
            ))}
          </div>

          {/* Fields */}
          <div style={{ background: '#141a10', border: '1px solid rgba(74,222,128,0.1)', borderRadius: 14, padding: '18px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#374151', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>Pet Details</div>
            {BASE_FIELDS.map(f => (
              <div key={f.id} style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', fontSize: 12, color: '#6b7280', marginBottom: 5, fontWeight: 500 }}>{f.label}</label>
                <input value={values[f.id] || ''} onChange={e => setV(f.id, e.target.value)} placeholder={f.placeholder}
                  style={{ width: '100%', background: '#0d0f0a', border: '1px solid rgba(74,222,128,0.15)', borderRadius: 8, padding: '9px 13px', color: '#e8efe0', fontSize: 13, boxSizing: 'border-box', outline: 'none' }} />
              </div>
            ))}
            {extraFields.length > 0 && <div style={{ borderTop: '1px solid rgba(74,222,128,0.07)', paddingTop: 12, marginTop: 4 }}>
              {extraFields.map(f => (
                <div key={f.id} style={{ marginBottom: 12 }}>
                  <label style={{ display: 'block', fontSize: 12, color: '#6b7280', marginBottom: 5, fontWeight: 500 }}>{f.label}</label>
                  {f.type === 'textarea' ? (
                    <textarea value={values[f.id] || ''} onChange={e => setV(f.id, e.target.value)} placeholder={f.placeholder} rows={3}
                      style={{ width: '100%', background: '#0d0f0a', border: '1px solid rgba(74,222,128,0.15)', borderRadius: 8, padding: '9px 13px', color: '#e8efe0', fontSize: 13, resize: 'vertical', boxSizing: 'border-box', outline: 'none' }} />
                  ) : (
                    <input value={values[f.id] || ''} onChange={e => setV(f.id, e.target.value)} placeholder={f.placeholder}
                      style={{ width: '100%', background: '#0d0f0a', border: '1px solid rgba(74,222,128,0.15)', borderRadius: 8, padding: '9px 13px', color: '#e8efe0', fontSize: 13, boxSizing: 'border-box', outline: 'none' }} />
                  )}
                </div>
              ))}
            </div>}
            <button onClick={generate} disabled={loading}
              style={{ width: '100%', background: loading ? '#1a2414' : 'linear-gradient(135deg, #16a34a, #15803d)', color: loading ? '#374151' : 'white', border: 'none', borderRadius: 10, padding: '13px', fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', marginTop: 8 }}>
              {loading ? '⏳ Generating...' : `Generate ${action.label}`}
            </button>
            {error && <p style={{ color: '#ef4444', fontSize: 13, marginTop: 10 }}>⚠ {error}</p>}
          </div>
        </div>

        {/* Output */}
        <div style={{ background: '#141a10', border: '1px solid rgba(74,222,128,0.1)', borderRadius: 14, overflow: 'hidden', position: 'sticky', top: 80 }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(74,222,128,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#374151', letterSpacing: '0.08em', textTransform: 'uppercase' }}>AI Response</span>
            {output && (
              <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
                style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', color: copied ? '#4ade80' : '#6b7280', borderRadius: 6, padding: '5px 12px', fontSize: 12, cursor: 'pointer' }}>
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            )}
          </div>
          {output ? (
            <textarea value={output} readOnly
              style={{ width: '100%', background: 'transparent', border: 'none', padding: '20px', color: '#e8efe0', fontSize: 14, lineHeight: 1.75, resize: 'vertical', minHeight: 440, boxSizing: 'border-box', outline: 'none' }} />
          ) : (
            <div style={{ padding: '60px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: 36, marginBottom: 14 }}>{loading ? '⏳' : '🐾'}</div>
              <p style={{ color: '#1f2a18', fontSize: 13, lineHeight: 1.7 }}>
                {loading ? 'AI is analyzing your pet's information...' : 'Fill in your pet's details
and select a tool to get started.
50 free uses per month.'}
              </p>
            </div>
          )}
        </div>
      </section>

      <footer style={{ background: '#090c07', borderTop: '1px solid rgba(74,222,128,0.06)', padding: '24px', textAlign: 'center' }}>
        <p style={{ color: '#1a2414', fontSize: 12, margin: '0 0 4px' }}>© 2026 CR AudioViz AI, LLC — EIN: 39-3646201 · Fort Myers, Florida</p>
        <p style={{ color: '#141a10', fontSize: 12, margin: 0 }}>Your Story. Our Design. Everyone Connects. Everyone Wins.</p>
      </footer>
    </div>
  )
}
