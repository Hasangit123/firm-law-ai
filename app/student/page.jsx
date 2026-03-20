'use client';
import { useState } from 'react';
import LanguageToggle from '../components/LanguageToggle';

const modes = [
  { id: 'explain', icon: '📖', title: 'Explain a Topic', placeholder: 'e.g. Doctrine of Res Judicata, Rule of Strict Liability', buttonText: 'Explain This Topic' },
  { id: 'caselaw', icon: '⚖️', title: 'Case Law Finder', placeholder: 'e.g. Donoghue v Stevenson, MC Mehta v Union of India', buttonText: 'Find Case Law' },
  { id: 'exam', icon: '📝', title: 'Exam Q&A Practice', placeholder: 'e.g. Explain the essentials of a valid contract', buttonText: 'Get Model Answer' },
  { id: 'section', icon: '📚', title: 'Bare Act Lookup', placeholder: 'e.g. Section 375 IPC, Section 2(d) Contract Act', buttonText: 'Look Up Section' },
];

const quickTopics = [
  'Tort of Negligence', 'Consumer Protection Act 2019',
  'Doctrine of Res Judicata', 'Fundamental Rights Article 21',
  'Rule in Rylands v Fletcher', 'Hindu Succession Act',
  'Doctrine of Promissory Estoppel', 'Environmental Impact Assessment',
];

export default function LawStudent() {
  const [selectedMode, setSelectedMode] = useState(modes[0]);
  const [input, setInput] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState('english');

  async function getAnswer(customInput) {
    const query = customInput || input;
    if (!query.trim()) return;
    setLoading(true);
    setAnswer('');
    setError('');
    setCopied(false);

    const prompts = {
      explain: `Explain the following legal topic for a law student in India: "${query}". Provide: 1. Definition 2. Essential elements 3. Relevant Indian Acts and sections 4. Landmark cases 5. Exceptions if any 6. Exam tips`,
      caselaw: `Provide detailed information about the following case for an Indian law student: "${query}". Provide: 1. Full case name and citation 2. Court and year 3. Facts 4. Issues raised 5. Judgment/Held 6. Legal principles established 7. Significance`,
      exam: `Provide a model exam answer for the following law question: "${query}". Format as: 1. Introduction 2. Main body with clear headings 3. Relevant Acts and sections 4. Supporting case laws 5. Conclusion`,
      section: `Explain the following section of Indian law: "${query}". Provide: 1. Exact provision text 2. Simple explanation 3. Purpose and scope 4. Important court interpretations 5. Related sections 6. Landmark cases`,
    };

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompts[selectedMode.id], mode: 'student', language }),
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
            <h1 style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '36px', fontWeight: 600, color: 'var(--off-white)', marginBottom: '8px'}}>📚 Law Student Hub</h1>
            <p style={{fontSize: '14px', color: 'var(--text-muted)', fontWeight: 300}}>Your AI-powered study companion for Indian law.</p>
          </div>
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '24px'}}>
          {modes.map(mode => (
            <button key={mode.id} onClick={() => { setSelectedMode(mode); setAnswer(''); setInput(''); setError(''); }}
              style={{padding: '16px 12px', borderRadius: '12px', textAlign: 'left', background: selectedMode.id === mode.id ? 'rgba(201,168,76,0.1)' : 'var(--black-card)', border: selectedMode.id === mode.id ? '1px solid rgba(201,168,76,0.4)' : '1px solid var(--border)', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Outfit, sans-serif'}}>
              <div style={{fontSize: '22px', marginBottom: '8px'}}>{mode.icon}</div>
              <div style={{fontSize: '12px', fontWeight: 600, color: selectedMode.id === mode.id ? 'var(--gold)' : '#ffffff'}}>{mode.title}</div>
            </button>
          ))}
        </div>

        <div style={{background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', marginBottom: '24px'}}>
          <p style={{fontSize: '12px', color: 'var(--text-dim)', marginBottom: '4px'}}>e.g. {selectedMode.placeholder}</p>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={selectedMode.placeholder}
            style={{width: '100%', minHeight: '80px', background: 'transparent', border: 'none', outline: 'none', resize: 'none', fontSize: '14px', color: 'var(--off-white)', fontFamily: 'Outfit, sans-serif', lineHeight: 1.7, marginTop: '8px'}}
          />
          <button onClick={() => getAnswer()} disabled={loading || !input.trim()}
            style={{marginTop: '16px', width: '100%', padding: '12px', background: loading || !input.trim() ? 'rgba(201,168,76,0.3)' : 'linear-gradient(135deg, var(--gold), var(--gold-dim))', color: 'var(--black)', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: loading || !input.trim() ? 'not-allowed' : 'pointer', fontFamily: 'Outfit, sans-serif'}}>
            {loading ? '⏳ Researching...' : `${selectedMode.icon} ${selectedMode.buttonText}`}
          </button>
        </div>

        {!answer && !loading && (
          <div style={{marginBottom: '32px'}}>
            <p style={{fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px'}}>Quick Topics:</p>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
              {quickTopics.map((topic, i) => (
                <button key={i} onClick={() => { setInput(topic); setSelectedMode(modes[0]); getAnswer(topic); }}
                  style={{fontSize: '12px', padding: '8px 14px', borderRadius: '20px', background: 'var(--black-card)', border: '1px solid var(--border)', color: '#ffffff', cursor: 'pointer', fontFamily: 'Outfit, sans-serif'}}>
                  {topic}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div style={{background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '48px', textAlign: 'center'}}>
            <div style={{width: '48px', height: '48px', border: '3px solid rgba(201,168,76,0.2)', borderTop: '3px solid var(--gold)', borderRadius: '50%', margin: '0 auto 20px', animation: 'spin 1s linear infinite'}}/>
            <p style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', color: 'var(--off-white)', marginBottom: '6px'}}>Preparing your study material...</p>
            <p style={{fontSize: '13px', color: 'var(--text-dim)', fontWeight: 300}}>Researching Indian law and case references</p>
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
                <div style={{width: '32px', height: '32px', background: 'linear-gradient(135deg, var(--gold), var(--gold-dim))', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px'}}>📚</div>
                <span style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontWeight: 600, color: 'var(--off-white)'}}>{selectedMode.title} — Firm Law AI</span>
              </div>
              <button onClick={copyAnswer}
                style={{fontSize: '12px', padding: '8px 16px', borderRadius: '8px', background: copied ? 'rgba(201,168,76,0.2)' : 'transparent', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--gold)', cursor: 'pointer', fontFamily: 'Outfit, sans-serif'}}>
                {copied ? '✅ Copied!' : '📋 Copy'}
              </button>
            </div>
            <div style={{fontSize: '14px', lineHeight: 1.8, color: 'var(--text-muted)', whiteSpace: 'pre-wrap', fontWeight: 300}}>{answer}</div>
            <div style={{marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border)', fontSize: '12px', color: 'var(--text-dim)'}}>
              ⚠️ Always verify case citations and sections with official sources before use in exams or court.
            </div>
            <button onClick={() => { setAnswer(''); setInput(''); }}
              style={{marginTop: '16px', fontSize: '12px', padding: '8px 16px', borderRadius: '8px', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-muted)', cursor: 'pointer', fontFamily: 'Outfit, sans-serif'}}>
              New Query
            </button>
          </div>
        )}

      </main>
    </div>
  );
}