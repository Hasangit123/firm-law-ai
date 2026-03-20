import Link from 'next/link';

export default function Privacy() {
  return (
    <div style={{background: 'var(--black)', minHeight: '100vh'}}>
      <main style={{maxWidth: '800px', margin: '0 auto', padding: '40px 24px 80px'}}>

        <div style={{marginBottom: '40px'}}>
          <h1 style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '48px', fontWeight: 600, color: 'var(--off-white)', marginBottom: '12px'}}>Privacy <span style={{color: 'var(--gold)'}}>Policy</span></h1>
          <p style={{fontSize: '14px', color: 'var(--text-muted)', fontWeight: 300}}>Last updated: March 2026</p>
        </div>

        {[
          {
            title: '1. Information We Collect',
            content: 'Firm Law AI does not require registration or account creation. We do not collect your name, email, or personal identification information unless you voluntarily contact us through our Contact page.'
          },
          {
            title: '2. How Your Queries Are Processed',
            content: 'When you submit a legal question or request, it is sent to our AI provider (Groq) for processing. We do not store your queries on our servers beyond the duration of your session. Once you close or refresh the page, your conversation is not retained.'
          },
          {
            title: '3. No Personal Data Storage',
            content: 'Firm Law AI does not maintain a database of user queries, personal data, or legal documents you generate. All interactions are session-based and are not linked to any individual user identity.'
          },
          {
            title: '4. Third-Party Services',
            content: 'API calls are processed through Groq\'s infrastructure, subject to their own privacy policy. We do not share your data with any other third parties, advertisers, or data brokers.'
          },
          {
            title: '5. Cookies',
            content: 'Firm Law AI does not use tracking cookies. We may use essential browser storage only to maintain your session preferences such as language and display settings.'
          },
          {
            title: '6. Children\'s Privacy',
            content: 'This platform is not intended for use by children under the age of 13. We do not knowingly collect data from minors.'
          },
          {
            title: '7. Security',
            content: 'We take reasonable measures to protect the platform from unauthorised access. However, no internet-based service can guarantee absolute security.'
          },
          {
            title: '8. Changes to This Policy',
            content: 'We may update this Privacy Policy from time to time. Continued use of the platform after any changes constitutes your acceptance of the updated policy.'
          },
          {
            title: '9. Contact Us',
            content: 'If you have any questions about this Privacy Policy, please reach out to us through our Contact page.'
          },
        ].map((section, i) => (
          <div key={i} style={{background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', marginBottom: '12px'}}>
            <h2 style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', fontWeight: 600, color: 'var(--gold)', marginBottom: '12px'}}>{section.title}</h2>
            <p style={{fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.9, fontWeight: 300}}>{section.content}</p>
          </div>
        ))}

        <div style={{marginTop: '32px', display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
          <Link href="/terms" style={{background: 'transparent', color: 'var(--gold)', padding: '12px 28px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(201,168,76,0.3)'}}>View Terms of Use</Link>
          <Link href="/" style={{background: 'linear-gradient(135deg, var(--gold), var(--gold-dim))', color: 'var(--black)', padding: '12px 28px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, textDecoration: 'none'}}>Back to Home</Link>
        </div>

      </main>
    </div>
  );
}