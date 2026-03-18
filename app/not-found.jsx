import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{background: 'var(--black)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px'}}>
      <div style={{textAlign: 'center', maxWidth: '500px'}}>

        <div style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '120px',
          fontWeight: 700,
          color: 'transparent',
          WebkitTextStroke: '2px rgba(201,168,76,0.3)',
          lineHeight: 1,
          marginBottom: '8px'
        }}>404</div>

        <div style={{fontSize: '48px', marginBottom: '20px'}}>⚖️</div>

        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '32px',
          fontWeight: 600,
          color: 'var(--off-white)',
          marginBottom: '12px'
        }}>Page Not Found</h1>

        <p style={{
          fontSize: '14px',
          color: 'var(--text-muted)',
          lineHeight: 1.8,
          fontWeight: 300,
          marginBottom: '36px'
        }}>
          The page you are looking for does not exist or has been moved.
          Let us help you find what you need.
        </p>

        <div style={{display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px'}}>
          <Link href="/" style={{
            background: 'linear-gradient(135deg, var(--gold), var(--gold-dim))',
            color: 'var(--black)',
            padding: '12px 28px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 600,
            textDecoration: 'none'
          }}>Go Home</Link>
          <Link href="/legal-qa" style={{
            background: 'transparent',
            color: 'var(--off-white)',
            padding: '12px 28px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 500,
            textDecoration: 'none',
            border: '1px solid rgba(245,240,232,0.2)'
          }}>Ask a Legal Question</Link>
        </div>

        <div style={{
          background: 'var(--black-card)',
          border: '1px solid var(--border)',
          borderRadius: '14px',
          padding: '20px 24px'
        }}>
          <p style={{fontSize: '12px', color: 'var(--text-dim)', marginBottom: '14px', letterSpacing: '1px', textTransform: 'uppercase'}}>Quick Links</p>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center'}}>
            {[
              ['💬 Legal Q&A', '/legal-qa'],
              ['📄 Draft Document', '/draft'],
              ['📚 Law Student', '/student'],
              ['✊ Know Your Rights', '/rights'],
              ['🏛️ Laws Library', '/laws'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{
                fontSize: '12px', padding: '7px 14px', borderRadius: '20px',
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
                textDecoration: 'none'
              }}>{label}</Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}