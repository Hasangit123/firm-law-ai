'use client';
import { useState } from 'react';
import LanguageToggle from '../components/LanguageToggle';

const rightsCategories = [
  { id: 'consumer', icon: '🛒', title: 'Consumer Rights', law: 'Consumer Protection Act, 2019', rights: ['Right to Safety — Protection from hazardous goods and services', 'Right to Information — Know the quality, quantity, price of goods', 'Right to Choose — Access to variety of goods at competitive prices', 'Right to be Heard — Your grievance must be heard by seller/court', 'Right to Redressal — File complaint in Consumer Forum for defective goods', 'Right to Consumer Education — Awareness about consumer rights'] },
  { id: 'tenant', icon: '🏠', title: 'Tenant Rights', law: 'Transfer of Property Act, 1882 & State Rent Control Acts', rights: ['Right to peaceful enjoyment of rented property', 'Landlord cannot evict without proper notice (usually 15-30 days)', 'Right to receipt for every rent payment', 'Landlord cannot cut electricity/water to force eviction', 'Security deposit must be returned within reasonable time after vacating', 'Right to get rent agreement in writing'] },
  { id: 'employee', icon: '👷', title: 'Employee & Worker Rights', law: 'Labour Laws — Factories Act, Payment of Wages Act, etc.', rights: ['Right to minimum wages as fixed by State Government', 'Right to 8 hours work per day, overtime pay for extra hours', 'Right to weekly holiday (at least one day off per week)', 'Right to paid leave — casual, sick, and earned leave', 'Right to provident fund (PF) and ESI benefits', 'Protection from wrongful termination without notice or compensation'] },
  { id: 'women', icon: '👩', title: "Women's Rights", law: 'Protection of Women from Domestic Violence Act, POSH Act, IPC', rights: ['Right to file complaint for domestic violence — PWDVA 2005', 'Right to protection from sexual harassment at workplace — POSH Act 2013', 'Equal pay for equal work as male counterparts', 'Right to free legal aid in cases of rape and sexual assault', 'Maternity benefit of 26 weeks paid leave — Maternity Benefit Act', 'Right to maintenance from husband after separation — Section 125 CrPC'] },
  { id: 'arrested', icon: '👮', title: 'Rights When Arrested', law: 'Code of Criminal Procedure, 1973 & Article 22 Constitution', rights: ['Right to know the reason for arrest — Article 22(1)', 'Right to consult a lawyer of your choice immediately', 'Right to be produced before Magistrate within 24 hours of arrest', 'Right to bail in bailable offences — cannot be denied', 'Right to free legal aid if you cannot afford a lawyer', 'Police cannot torture or use third degree methods — punishable under IPC'] },
  { id: 'patient', icon: '🏥', title: 'Patient Rights', law: 'Consumer Protection Act & Medical Council of India Guidelines', rights: ['Right to emergency treatment — no hospital can refuse', 'Right to know your diagnosis, treatment, and prognosis', 'Right to give informed consent before any surgery or procedure', 'Right to see and get copies of your medical records', 'Right to file complaint against doctor for negligence in Consumer Forum', 'Right to second medical opinion from another doctor'] },
  { id: 'student', icon: '🧑‍🎓', title: 'Student Rights', law: 'Right to Education Act, 2009 & UGC Regulations', rights: ['Right to free and compulsory education up to age 14 — RTE Act 2009', 'University cannot withhold degree/marksheet for pending fees', 'Right to revaluation of answer sheets in most universities', 'Anti-ragging protection — complaint to UGC/university mandatory action', 'Right to get refund of fees if admission cancelled within time', 'Right to grievance redressal committee in every institution'] },
  { id: 'rti', icon: '📋', title: 'Right to Information', law: 'Right to Information Act, 2005', rights: ['Any citizen can ask information from any government department', 'Government must reply within 30 days of application', 'Fee is only ₹10 for filing RTI application', 'If denied, appeal to First Appellate Authority within 30 days', 'Second appeal to Central/State Information Commission', 'Public Information Officer can be penalised for non-compliance'] },
];

const uiLabels = {
  english: {
    title: '✊ Know Your Rights',
    subtitle: 'Every Indian citizen has rights protected by law.',
    back: '← Back to categories',
    askTitle: 'Ask AI about your',
    askPlaceholder: 'Ask a specific question about your',
    askButton: '🔍 Ask Firm Law AI',
    askLoading: '⏳ Getting answer...',
    lookingUp: 'Looking up your rights...',
    answerTitle: 'Firm Law AI Answer',
    copy: '📋 Copy',
    copied: '✅ Copied!',
    disclaimer: '⚠️ This is general legal information only. For your specific situation, please consult a qualified advocate.',
  },
  hindi: {
    title: '✊ अपने अधिकार जानें',
    subtitle: 'हर भारतीय नागरिक के अधिकार कानून द्वारा संरक्षित हैं।',
    back: '← श्रेणियों पर वापस जाएं',
    askTitle: 'AI से पूछें अपने',
    askPlaceholder: 'अपने अधिकारों के बारे में कोई सवाल पूछें',
    askButton: '🔍 Firm Law AI से पूछें',
    askLoading: '⏳ जवाब मिल रहा है...',
    lookingUp: 'आपके अधिकार खोजे जा रहे हैं...',
    answerTitle: 'Firm Law AI का जवाब',
    copy: '📋 कॉपी करें',
    copied: '✅ कॉपी हो गया!',
    disclaimer: '⚠️ यह केवल सामान्य कानूनी जानकारी है। अपनी विशेष स्थिति के लिए किसी वकील से सलाह लें।',
  },
  telugu: {
    title: '✊ మీ హక్కులు తెలుసుకోండి',
    subtitle: 'ప్రతి భారతీయ పౌరునికి చట్టం ద్వారా రక్షించబడిన హక్కులు ఉన్నాయి.',
    back: '← వర్గాలకు తిరిగి వెళ్ళండి',
    askTitle: 'AI ని అడగండి మీ',
    askPlaceholder: 'మీ హక్కుల గురించి ప్రశ్న అడగండి',
    askButton: '🔍 Firm Law AI అడగండి',
    askLoading: '⏳ సమాధానం వస్తోంది...',
    lookingUp: 'మీ హక్కులు వెతుకుతున్నాం...',
    answerTitle: 'Firm Law AI సమాధానం',
    copy: '📋 కాపీ చేయండి',
    copied: '✅ కాపీ అయింది!',
    disclaimer: '⚠️ ఇది సాధారణ చట్టపరమైన సమాచారం మాత్రమే. మీ నిర్దిష్ట పరిస్థితి కోసం అర్హత కలిగిన న్యాయవాదిని సంప్రదించండి.',
  },
};

export default function KnowYourRights() {
  const [selected, setSelected] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState('english');

  const L = uiLabels[language];

  async function askRightsQuestion() {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer('');
    setError('');
    setCopied(false);
    const prompt = `A person is asking about their rights under Indian law related to "${selected.title}" (${selected.law}). Their question is: "${question}". Please provide a clear, practical answer explaining their legal rights and what steps they can take.`;
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt, mode: 'qa', language }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setAnswer(data.response);
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  }

  function copyAnswer() {
    navigator.clipboard.writeText(answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={{background: 'var(--black)', minHeight: '100vh'}}>
      <main style={{maxWidth: '800px', margin: '0 auto', padding: '40px 20px 80px'}}>

        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '16px'}}>
          <div>
            <h1 style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '36px', fontWeight: 600, color: 'var(--off-white)', marginBottom: '8px'}}>{L.title}</h1>
            <p style={{fontSize: '14px', color: 'var(--text-muted)', fontWeight: 300}}>{L.subtitle}</p>
          </div>
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>

        {!selected && (
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px'}}>
            {rightsCategories.map(cat => (
              <div key={cat.id} onClick={() => setSelected(cat)}
                style={{background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '24px 16px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s'}}>
                <div style={{fontSize: '32px', marginBottom: '12px'}}>{cat.icon}</div>
                <h3 style={{fontSize: '13px', fontWeight: 600, color: 'var(--off-white)'}}>{cat.title}</h3>
              </div>
            ))}
          </div>
        )}

        {selected && (
          <div>
            <button onClick={() => { setSelected(null); setAnswer(''); setQuestion(''); }}
              style={{fontSize: '13px', color: 'var(--gold)', background: 'transparent', border: 'none', cursor: 'pointer', marginBottom: '24px', fontFamily: 'Outfit, sans-serif'}}>
              {L.back}
            </button>

            <div style={{background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '28px', marginBottom: '20px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border)'}}>
                <span style={{fontSize: '36px'}}>{selected.icon}</span>
                <div>
                  <h2 style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '24px', fontWeight: 600, color: 'var(--off-white)', marginBottom: '4px'}}>{selected.title}</h2>
                  <p style={{fontSize: '12px', color: 'var(--text-dim)'}}>{selected.law}</p>
                </div>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                {selected.rights.map((right, i) => (
                  <div key={i} style={{display: 'flex', gap: '12px', padding: '12px 16px', background: 'rgba(201,168,76,0.04)', borderRadius: '8px', border: '1px solid rgba(201,168,76,0.08)'}}>
                    <div style={{width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), var(--gold-dim))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: 'var(--black)', flexShrink: 0}}>{i + 1}</div>
                    <p style={{fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, fontWeight: 300}}>{right}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', marginBottom: '20px'}}>
              <h3 style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontWeight: 600, color: 'var(--off-white)', marginBottom: '16px'}}>🤖 {L.askTitle} {selected.title}</h3>
              <textarea value={question} onChange={e => setQuestion(e.target.value)}
                placeholder={`${L.askPlaceholder} ${selected.title.toLowerCase()}...`}
                style={{width: '100%', minHeight: '80px', background: 'transparent', border: 'none', outline: 'none', resize: 'none', fontSize: '14px', color: 'var(--off-white)', fontFamily: 'Outfit, sans-serif', lineHeight: 1.7}}
              />
              <button onClick={askRightsQuestion} disabled={loading || !question.trim()}
                style={{marginTop: '16px', width: '100%', padding: '12px', background: loading || !question.trim() ? 'rgba(201,168,76,0.3)' : 'linear-gradient(135deg, var(--gold), var(--gold-dim))', color: 'var(--black)', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: loading || !question.trim() ? 'not-allowed' : 'pointer', fontFamily: 'Outfit, sans-serif'}}>
                {loading ? L.askLoading : L.askButton}
              </button>
            </div>

            {loading && (
              <div style={{background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '48px', textAlign: 'center'}}>
                <div style={{width: '48px', height: '48px', border: '3px solid rgba(201,168,76,0.2)', borderTop: '3px solid var(--gold)', borderRadius: '50%', margin: '0 auto 20px', animation: 'spin 1s linear infinite'}}/>
                <p style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', color: 'var(--off-white)', marginBottom: '6px'}}>{L.lookingUp}</p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            )}

            {error && (
              <div style={{background: 'rgba(255,50,50,0.05)', border: '1px solid rgba(255,50,50,0.2)', borderRadius: '12px', padding: '16px', fontSize: '13px', color: '#ff6b6b'}}>❌ {error}</div>
            )}

            {answer && (
              <div style={{background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '28px'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border)'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <div style={{width: '32px', height: '32px', background: 'linear-gradient(135deg, var(--gold), var(--gold-dim))', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px'}}>⚖️</div>
                    <span style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontWeight: 600, color: 'var(--off-white)'}}>{L.answerTitle}</span>
                  </div>
                  <button onClick={copyAnswer}
                    style={{fontSize: '12px', padding: '8px 16px', borderRadius: '8px', background: copied ? 'rgba(201,168,76,0.2)' : 'transparent', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--gold)', cursor: 'pointer', fontFamily: 'Outfit, sans-serif'}}>
                    {copied ? L.copied : L.copy}
                  </button>
                </div>
                <div style={{fontSize: '14px', lineHeight: 1.8, color: 'var(--text-muted)', whiteSpace: 'pre-wrap', fontWeight: 300}}>{answer}</div>
                <div style={{marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border)', fontSize: '12px', color: 'var(--text-dim)'}}>{L.disclaimer}</div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}