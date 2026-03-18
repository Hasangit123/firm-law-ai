'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  function handleSubmit() {
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  }

  return (
    <div style={{background: 'var(--black)', minHeight: '100vh'}}>
      <main style={{maxWidth: '700px', margin: '0 auto', padding: '40px 24px 80px'}}>

        <div style={{marginBottom: '40px'}}>
          <h1 style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '48px', fontWeight: 600, color: 'var(--off-white)', marginBottom: '12px'}}>Contact <span style={{color: 'var(--gold)'}}>Us</span></h1>
          <p style={{fontSize: '14px', color: 'var(--text-muted)', fontWeight: 300, lineHeight: 1.8}}>Have feedback, suggestions, or found an issue? We'd love to hear from you.</p>
        </div>

        {!submitted ? (
          <div style={{background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '32px'}}>
            <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>

              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
                <div>
                  <label style={{display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.5px'}}>YOUR NAME *</label>
                  <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                    placeholder="Mohammed Hasan Khan"
                    style={{width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px', fontSize: '13px', color: 'var(--off-white)', outline: 'none', fontFamily: 'Outfit, sans-serif'}}
                  />
                </div>
                <div>
                  <label style={{display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.5px'}}>EMAIL ADDRESS *</label>
                  <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                    placeholder="your@email.com"
                    style={{width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px', fontSize: '13px', color: 'var(--off-white)', outline: 'none', fontFamily: 'Outfit, sans-serif'}}
                  />
                </div>
              </div>

              <div>
                <label style={{display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.5px'}}>SUBJECT</label>
                 <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}
  style={{width: '100%', background: '#ffffff', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px', fontSize: '13px', color: '#000000', outline: 'none', fontFamily: 'Outfit, sans-serif'}}>
  <option value="">Select a subject</option>
  <option value="feedback">General Feedback</option>
  <option value="bug">Report a Bug</option>
  <option value="suggestion">Feature Suggestion</option>
  <option value="legal">Legal Content Issue</option>
  <option value="other">Other</option>
</select>
              </div>

              <div>
                <label style={{display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.5px'}}>MESSAGE *</label>
                <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                  placeholder="Write your message here..."
                  style={{width: '100%', minHeight: '140px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px', fontSize: '13px', color: 'var(--off-white)', outline: 'none', resize: 'none', fontFamily: 'Outfit, sans-serif', lineHeight: 1.7}}
                />
              </div>

              <button onClick={handleSubmit} disabled={!form.name || !form.email || !form.message}
                style={{width: '100%', padding: '14px', background: !form.name || !form.email || !form.message ? 'rgba(201,168,76,0.3)' : 'linear-gradient(135deg, var(--gold), var(--gold-dim))', color: 'var(--black)', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: !form.name || !form.email || !form.message ? 'not-allowed' : 'pointer', fontFamily: 'Outfit, sans-serif'}}>
                Send Message →
              </button>

            </div>
          </div>
        ) : (
          <div style={{background: 'var(--black-card)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '16px', padding: '48px', textAlign: 'center'}}>
            <div style={{fontSize: '48px', marginBottom: '20px'}}>✅</div>
            <h2 style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 600, color: 'var(--off-white)', marginBottom: '12px'}}>Message Received!</h2>
            <p style={{fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.8, fontWeight: 300, marginBottom: '28px'}}>Thank you for reaching out. We appreciate your feedback and will get back to you soon.</p>
            <Link href="/" style={{background: 'linear-gradient(135deg, var(--gold), var(--gold-dim))', color: 'var(--black)', padding: '12px 28px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, textDecoration: 'none'}}>Back to Home</Link>
          </div>
        )}

        <div style={{marginTop: '32px', background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px 24px'}}>
          <h3 style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontWeight: 600, color: 'var(--off-white)', marginBottom: '12px'}}>Other ways to reach us</h3>
          <p style={{fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 300}}>
            For urgent legal queries, use our <Link href="/legal-qa" style={{color: 'var(--gold)', textDecoration: 'none'}}>Legal Q&A</Link> feature for instant AI assistance. For document help, visit our <Link href="/draft" style={{color: 'var(--gold)', textDecoration: 'none'}}>Draft Document</Link> page.
          </p>
        </div>

      </main>
    </div>
  );
}