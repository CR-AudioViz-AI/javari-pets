'use client'
import { useState } from 'react'
import { getActions, getFields } from '@/lib/tool-data'

export default function PetsPage() {
  const actions = getActions()
  const [actionId, setActionId] = useState(actions[0].id)
  const [values, setValues] = useState({})
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  function setV(id, val) { setValues(p => ({ ...p, [id]: val })) }
  async function generate() {
    const action = actions.find(a => a.id === actionId)
    if (!action) return
    setLoading(true); setError(''); setOutput('')
    try {
      const res = await fetch('/api/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: actionId, input: action.buildPrompt(values) }) })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || 'Failed')
      setOutput(data.result || '')
    } catch (e) { setError(e.message || 'Error') }
    setLoading(false)
  }
  const action = actions.find(a => a.id === actionId)
  const fields = getFields(actionId)
  const C = '#4ade80'
  return (
    <div style={{ background: '#0a0d09', minHeight: '100vh', color: '#e0ead8', fontFamily: 'system-ui, sans-serif' }}>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(10,13,9,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(74,222,128,0.12)', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px' }}>
        <a href="https://craudiovizai.com" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}><span style={{ fontSize: 22 }}>🐾</span><span style={{ fontWeight: 800, fontSize: 15, color: C }}>Javari Pets</span></a>
        <a href="https://craudiovizai.com/auth/signup" style={{ background: 'linear-gradient(135deg,#16a34a,#15803d)', color: 'white', borderRadius: 8, padding: '8px 18px', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Free Access</a>
      </nav>
      <div style={{ height: 60 }} />
      <section style={{ textAlign: 'center', padding: '48px 24px 32px', maxWidth: 680, margin: '0 auto' }}>
        <div style={{ fontSize: 48, marginBottom: 10 }}>🐾</div>
        <h1 style={{ fontSize: 'clamp(24px,4vw,42px)', fontWeight: 800, margin: '0 0 12px', letterSpacing: '-0.03em' }}>AI-Powered <span style={{ color: C }}>Pet Care</span></h1>
        <p style={{ fontSize: 16, color: '#6b7280', maxWidth: 480, margin: '0 auto', lineHeight: 1.65 }}>Health checks, nutrition plans, vaccination schedules, breed guides. <strong style={{ color: C }}>50 free uses/month.</strong></p>
        <p style={{ color: '#374151', fontSize: 12, marginTop: 6 }}>⚕️ Not a substitute for professional veterinary care. Always consult your vet.</p>
      </section>
      <section style={{ maxWidth: 980, margin: '0 auto', padding: '0 20px 80px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.5fr)', gap: 20 }}>
        <div>
          <div style={{ background: '#111a0f', border: '1px solid rgba(74,222,128,0.1)', borderRadius: 14, overflow: 'hidden', marginBottom: 16 }}>
            {actions.map(a => (
              <button key={a.id} onClick={() => { setActionId(a.id); setValues({}); setOutput('') }}
                style={{ width: '100%', textAlign: 'left', padding: '11px 16px', background: actionId === a.id ? 'rgba(74,222,128,0.08)' : 'transparent', borderLeft: actionId === a.id ? '3px solid ' + C : '3px solid transparent', border: 'none', cursor: 'pointer', borderBottom: '1px solid rgba(74,222,128,0.05)', display: 'block' }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: actionId === a.id ? '#86efac' : '#9ca3af' }}>{a.label}</div>
                <div style={{ fontSize: 11, color: '#374151', marginTop: 2 }}>{a.desc}</div>
              </button>
            ))}
          </div>
          <div style={{ background: '#111a0f', border: '1px solid rgba(74,222,128,0.1)', borderRadius: 14, padding: '16px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#374151', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>{fields.label}</div>
            {(fields.fields || []).map(f => (
              <div key={f.id} style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', fontSize: 12, color: '#6b7280', marginBottom: 5, fontWeight: 500 }}>{f.label}</label>
                {f.type === 'textarea' ? (
                  <textarea value={values[f.id] || ''} onChange={e => setV(f.id, e.target.value)} placeholder={f.placeholder} rows={3}
                    style={{ width: '100%', background: '#0a0d09', border: '1px solid rgba(74,222,128,0.15)', borderRadius: 8, padding: '9px 12px', color: '#e0ead8', fontSize: 13, resize: 'vertical', boxSizing: 'border-box', outline: 'none' }} />
                ) : (
                  <input value={values[f.id] || ''} onChange={e => setV(f.id, e.target.value)} placeholder={f.placeholder}
                    style={{ width: '100%', background: '#0a0d09', border: '1px solid rgba(74,222,128,0.15)', borderRadius: 8, padding: '9px 12px', color: '#e0ead8', fontSize: 13, boxSizing: 'border-box', outline: 'none' }} />
                )}
              </div>
            ))}
            <button onClick={generate} disabled={loading}
              style={{ width: '100%', background: loading ? '#1a2a14' : 'linear-gradient(135deg,#16a34a,#15803d)', color: loading ? '#374151' : 'white', border: 'none', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', marginTop: 4 }}>
              {loading ? 'Generating...' : 'Generate ' + (action ? action.label : '')}
            </button>
            {error && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 8 }}>⚠ {error}</p>}
          </div>
        </div>
        <div style={{ background: '#111a0f', border: '1px solid rgba(74,222,128,0.1)', borderRadius: 14, overflow: 'hidden', position: 'sticky', top: 80, alignSelf: 'start' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(74,222,128,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#374151', letterSpacing: '0.08em', textTransform: 'uppercase' }}>AI Response</span>
            {output && <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000) }} style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)', color: copied ? C : '#6b7280', borderRadius: 6, padding: '4px 10px', fontSize: 11, cursor: 'pointer' }}>{copied ? 'Copied!' : 'Copy'}</button>}
          </div>
          {output ? (
            <textarea value={output} readOnly style={{ width: '100%', background: 'transparent', border: 'none', padding: '18px', color: '#e0ead8', fontSize: 14, lineHeight: 1.75, resize: 'vertical', minHeight: 440, boxSizing: 'border-box', outline: 'none' }} />
          ) : (
            <div style={{ padding: '60px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{loading ? '⏳' : '🐾'}</div>
              <p style={{ color: '#1a2a14', fontSize: 13, lineHeight: 1.7 }}>{loading ? 'Analyzing your pet...' : 'Fill in your pet details and click Generate.'}</p>
            </div>
          )}
        </div>
      </section>
      <footer style={{ background: '#080c07', borderTop: '1px solid rgba(74,222,128,0.05)', padding: '20px 24px', textAlign: 'center' }}>
        <p style={{ color: '#111a0f', fontSize: 11, margin: 0 }}>© 2026 CR AudioViz AI, LLC — EIN: 39-3646201 · Fort Myers, Florida · Your Story. Our Design.</p>
      </footer>
    </div>
  )
}
