// app/page.tsx — Javari Pets
// AI-powered pet care, health tracking, and resources for pet owners.
// May 18, 2026 — CR AudioViz AI, LLC
export const dynamic = 'force-dynamic'

export default function Home() {
  const C = '#f59e0b'
  const features = ["\ud83c\udfe5 AI vet guidance and health tracking", "\ud83d\udcc5 Vaccination and medication reminders", "\ud83c\udf4e AI nutrition and care guides by breed", "\ud83d\uddfa\ufe0f Find vets, groomers, and dog parks nearby", "\ud83d\udcf8 Pet profile and memory book"]
  const competitors = ["BarkBox", "Chewy", "PetMD"]
  
  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh', color: 'white', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(7,7,16,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <a href="https://craudiovizai.com" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <span style={{ fontSize: 18 }}>🐾</span>
          <span style={{ fontWeight: 800, fontSize: 15, background: 'linear-gradient(135deg, ' + C + ', #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Javari Pets</span>
        </a>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <a href="https://javariai.com" style={{ color: '#6b7280', fontSize: 13, textDecoration: 'none', padding: '5px 10px' }}>Javari AI</a>
          <a href="https://craudiovizai.com/pricing" style={{ color: '#6b7280', fontSize: 13, textDecoration: 'none', padding: '5px 10px' }}>Pricing</a>
          <a href="https://craudiovizai.com/auth/signup" style={{ background: 'linear-gradient(135deg, ' + C + ', #8b5cf6)', color: 'white', borderRadius: 8, padding: '8px 18px', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Get Started Free →</a>
        </div>
      </nav>
      <div style={{ height: 58 }} />

      {/* HERO */}
      <section style={{ textAlign: 'center', padding: '80px 24px 60px', maxWidth: 800, margin: '0 auto' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🐾</div>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 900, margin: '0 0 20px', lineHeight: 1.1 }}>
          Javari Pets
        </h1>
        <p style={{ fontSize: 18, color: '#9ca3af', lineHeight: 1.6, margin: '0 auto 40px', maxWidth: 560 }}>
          Pet health tracking · AI care guides · Vet locator · Emergency resources · Community
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
          <a href="https://craudiovizai.com/auth/signup" style={{ background: 'linear-gradient(135deg, ' + C + ', #8b5cf6)', color: 'white', borderRadius: 12, padding: '14px 32px', fontSize: 16, fontWeight: 700, textDecoration: 'none' }}>
            Start Free — No Card →
          </a>
          <a href="https://javariai.com/javari" style={{ background: 'rgba(255,255,255,0.08)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '14px 24px', fontSize: 16, fontWeight: 700, textDecoration: 'none' }}>
            🤖 Ask Javari AI
          </a>
        </div>
        <p style={{ color: '#374151', fontSize: 13 }}>✓ 50 free credits/month · ✓ Part of the Javari ecosystem · ✓ CR AudioViz AI</p>
      </section>

      {/* FEATURES */}
      <section style={{ padding: '40px 24px 80px', maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {features.map(f => (
            <div key={f} style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '20px', fontSize: 14, color: '#9ca3af', lineHeight: 1.6 }}>{f}</div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#030308', borderTop: '1px solid rgba(255,255,255,0.04)', padding: '32px 24px', textAlign: 'center' }}>
        <p style={{ color: '#374151', fontSize: 12, margin: '0 0 8px' }}>© 2026 CR AudioViz AI, LLC — EIN: 39-3646201 · Fort Myers, Florida</p>
        <p style={{ color: '#1f2937', fontSize: 12, margin: 0 }}>Your Story. Our Design. Everyone Connects. Everyone Wins.</p>
      </footer>
    </div>
  )
}
