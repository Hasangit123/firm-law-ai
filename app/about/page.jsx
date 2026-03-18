import Link from 'next/link';

export default function About() {
  return (
    <div style={{background: 'var(--black)', minHeight: '100vh'}}>
      <main style={{maxWidth: '800px', margin: '0 auto', padding: '40px 24px 80px'}}>

        <div style={{marginBottom: '40px'}}>
          <h1 style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '48px', fontWeight: 600, color: 'var(--off-white)', marginBottom: '12px'}}>About <span style={{color: 'var(--gold)'}}>Firm Law AI</span></h1>
          <p style={{fontSize: '16px', color: 'var(--text-muted)', fontWeight: 300, lineHeight: 1.8}}>Making Indian law accessible to every citizen — free, simple, and instant.</p>
        </div>

        {/* Mission */}
        <div style={{background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '32px', marginBottom: '20px', position: 'relative', overflow: 'hidden'}}>
          <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)'}}/>
          <h2 style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 600, color: 'var(--off-white)', marginBottom: '16px'}}>Our Mission</h2>
          <p style={{fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.9, fontWeight: 300}}>
            India has over 1.4 billion people but legal help remains expensive and inaccessible for most. A common person facing a consumer dispute, a tenant being harassed by a landlord, or a worker being denied their wages — all deserve to know their rights and have access to legal tools.
          </p>
          <p style={{fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.9, fontWeight: 300, marginTop: '12px'}}>
            Firm Law AI was built to bridge this gap. Using advanced artificial intelligence, we provide free, instant, and accurate legal information to every Indian citizen — in plain language they can understand.
          </p>
        </div>

        {/* What we offer */}
        <div style={{background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '32px', marginBottom: '20px'}}>
          <h2 style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 600, color: 'var(--off-white)', marginBottom: '24px'}}>What We Offer</h2>
          <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
            {[
              { icon: '💬', title: 'Legal Q&A', desc: 'Ask any question about Indian law and get clear, accurate answers with relevant Acts and case citations.' },
              { icon: '📄', title: 'Document Drafting', desc: 'Generate legally formatted documents — consumer complaints, legal notices, RTI applications, and more.' },
              { icon: '📚', title: 'Law Student Hub', desc: 'Dedicated tools for law students — topic explanations, case law finder, exam Q&A, and bare act lookup.' },
              { icon: '✊', title: 'Know Your Rights', desc: 'Clear, simple explanations of your rights as a consumer, tenant, employee, patient, and citizen.' },
              { icon: '🏛️', title: 'Laws Library', desc: 'Browse 50+ major enforceable Indian Acts with official Bare Act links and AI-powered explanations.' },
            ].map((item, i) => (
              <div key={i} style={{display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '16px', background: 'rgba(201,168,76,0.03)', borderRadius: '10px', border: '1px solid rgba(201,168,76,0.08)'}}>
                <span style={{fontSize: '24px', flexShrink: 0}}>{item.icon}</span>
                <div>
                  <h3 style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontWeight: 600, color: 'var(--off-white)', marginBottom: '4px'}}>{item.title}</h3>
                  <p style={{fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 300}}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology */}
        <div style={{background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '32px', marginBottom: '20px'}}>
          <h2 style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 600, color: 'var(--off-white)', marginBottom: '16px'}}>Our Technology</h2>
          <p style={{fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.9, fontWeight: 300}}>
            Firm Law AI is powered by state-of-the-art large language models running on Groq's ultra-fast inference infrastructure. The platform is built using Next.js — the same framework used by Netflix, TikTok, and Notion — ensuring fast, reliable performance.
          </p>
          <div style={{display: 'flex', gap: '12px', marginTop: '20px', flexWrap: 'wrap'}}>
            {['Next.js', 'Groq AI', 'Llama 3.3 70B', 'React', 'Tailwind CSS'].map(tech => (
              <span key={tech} style={{fontSize: '12px', padding: '6px 14px', borderRadius: '20px', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', color: 'var(--gold)'}}>{tech}</span>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.2)', borderLeft: '3px solid var(--gold)', borderRadius: '0 12px 12px 0', padding: '20px 24px', marginBottom: '32px'}}>
          <h3 style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontWeight: 600, color: 'var(--gold)', marginBottom: '8px'}}>Important Disclaimer</h3>
          <p style={{fontSize: '13px', color: 'rgba(201,168,76,0.7)', lineHeight: 1.7, fontWeight: 300}}>
            Firm Law AI provides general legal information only. It is not a substitute for professional legal advice from a qualified advocate. For specific legal matters, always consult a licensed lawyer.
          </p>
        </div>

        <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
          <Link href="/legal-qa" style={{background: 'linear-gradient(135deg, var(--gold), var(--gold-dim))', color: 'var(--black)', padding: '12px 28px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, textDecoration: 'none'}}>Try Legal Q&A</Link>
          <Link href="/contact" style={{background: 'transparent', color: 'var(--off-white)', padding: '12px 28px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, textDecoration: 'none', border: '1px solid rgba(245,240,232,0.2)'}}>Contact Us</Link>
        </div>

      </main>
    </div>
  );
}