'use client';
import { useState } from 'react';
import LanguageToggle from '../components/LanguageToggle';

export default function LegalQA() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState('english');

  const suggestedQuestions = {
    english: [
      "What are my rights as a consumer if a product is defective?",
      "How do I file a complaint in consumer court?",
      "What is the punishment for cheating under IPC?",
      "Can my landlord evict me without notice?",
      "What are my rights if I am arrested by police?",
      "How do I file for divorce under Hindu Marriage Act?",
    ],
    hindi: [
      "अगर कोई उत्पाद खराब हो तो मेरे उपभोक्ता अधिकार क्या हैं?",
      "उपभोक्ता न्यायालय में शिकायत कैसे दर्ज करें?",
      "IPC के तहत धोखाधड़ी की सजा क्या है?",
      "क्या मकान मालिक बिना नोटिस के मुझे निकाल सकता है?",
      "गिरफ्तारी के समय मेरे क्या अधिकार हैं?",
      "हिंदू विवाह अधिनियम के तहत तलाक कैसे लें?",
    ],
    telugu: [
      "లోపభూయిష్ట ఉత్పత్తి విషయంలో నా వినియోగదారు హక్కులు ఏమిటి?",
      "వినియోగదారు న్యాయస్థానంలో ఫిర్యాదు ఎలా చేయాలి?",
      "IPC కింద మోసానికి శిక్ష ఏమిటి?",
      "నోటీసు లేకుండా ఇంటి యజమాని నన్ను ఖాళీ చేయించవచ్చా?",
      "పోలీసులు అరెస్టు చేసినపుడు నా హక్కులు ఏమిటి?",
      "హిందూ వివాహ చట్టం కింద విడాకులు ఎలా తీసుకోవాలి?",
    ],
  };

  const labels = {
    english: { placeholder: 'e.g. What are my rights if a company refuses to refund my money?', tryAsking: 'Try asking:', thinking: '⏳ Thinking...', ask: '🔍 Ask Firm Law AI', researching: 'Researching Indian law...', analysing: 'Analysing relevant Acts and case laws', answerTitle: 'Firm Law AI Answer', disclaimer: '⚠️ This is general legal information only. For your specific situation, please consult a qualified advocate.', askAnother: 'Ask another question' },
    hindi: { placeholder: 'अपना कानूनी सवाल यहाँ लिखें...', tryAsking: 'इन सवालों को आज़माएं:', thinking: '⏳ सोच रहे हैं...', ask: '🔍 Firm Law AI से पूछें', researching: 'भारतीय कानून खोजा जा रहा है...', analysing: 'कृपया प्रतीक्षा करें', answerTitle: 'Firm Law AI का जवाब', disclaimer: '⚠️ यह केवल सामान्य कानूनी जानकारी है। अपनी विशेष स्थिति के लिए किसी वकील से सलाह लें।', askAnother: 'दूसरा सवाल पूछें' },
    telugu: { placeholder: 'మీ చట్టపరమైన ప్రశ్న ఇక్కడ రాయండి...', tryAsking: 'ఈ ప్రశ్నలు అడగండి:', thinking: '⏳ ఆలోచిస్తున్నాం...', ask: '🔍 Firm Law AI అడగండి', researching: 'భారతీయ చట్టం పరిశోధిస్తున్నాం...', analysing: 'దయచేసి వేచి ఉండండి', answerTitle: 'Firm Law AI సమాధానం', disclaimer: '⚠️ ఇది సాధారణ చట్టపరమైన సమాచారం మాత్రమే. మీ నిర్దిష్ట పరిస్థితి కోసం అర్హత కలిగిన న్యాయవాదిని సంప్రదించండి.', askAnother: 'మరో ప్రశ్న అడగండి' },
  };

  const L = labels[language];

  async function askQuestion(q) {
    const query = q || question;
    if (!query.trim()) return;
    setLoading(true);
    setAnswer('');
    setError('');
    setCopied(false);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, mode: 'qa', language }),
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
            <h1 style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '36px', fontWeight: 600, color: 'var(--off-white)', marginBottom: '8px'}}>💬 Legal Q&A</h1>
            <p style={{fontSize: '14px', color: 'var(--text-muted)', fontWeight: 300}}>Ask any legal question. Get a clear answer based on Indian law.</p>
          </div>
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>

        <div style={{background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', marginBottom: '24px'}}>
          <textarea
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder={L.placeholder}
            style={{width: '100%', minHeight: '100px', background: 'transparent', border: 'none', outline: 'none', resize: 'none', fontSize: '14px', color: 'var(--off-white)', fontFamily: 'Outfit, sans-serif', lineHeight: 1.7}}
          />
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)'}}>
            <span style={{fontSize: '12px', color: 'var(--text-dim)'}}>{question.length} characters</span>
            <button onClick={() => askQuestion()} disabled={loading || !question.trim()}
              style={{background: loading || !question.trim() ? 'rgba(201,168,76,0.3)' : 'linear-gradient(135deg, var(--gold), var(--gold-dim))', color: 'var(--black)', border: 'none', padding: '10px 24px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: loading || !question.trim() ? 'not-allowed' : 'pointer', fontFamily: 'Outfit, sans-serif'}}>
              {loading ? L.thinking : L.ask}
            </button>
          </div>
        </div>

        {!answer && !loading && (
          <div style={{marginBottom: '32px'}}>
            <p style={{fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px'}}>{L.tryAsking}</p>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
              {suggestedQuestions[language].map((q, i) => (
                <button key={i} onClick={() => { setQuestion(q); askQuestion(q); }}
                  style={{fontSize: '12px', padding: '8px 14px', borderRadius: '20px', background: 'var(--black-card)', border: '1px solid var(--border)', color: 'var(--text-muted)', cursor: 'pointer', fontFamily: 'Outfit, sans-serif'}}>
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div style={{background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '48px', textAlign: 'center'}}>
            <div style={{width: '48px', height: '48px', border: '3px solid rgba(201,168,76,0.2)', borderTop: '3px solid var(--gold)', borderRadius: '50%', margin: '0 auto 20px', animation: 'spin 1s linear infinite'}}/>
            <p style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', color: 'var(--off-white)', marginBottom: '6px'}}>{L.researching}</p>
            <p style={{fontSize: '13px', color: 'var(--text-dim)', fontWeight: 300}}>{L.analysing}</p>
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
                {copied ? '✅ Copied!' : '📋 Copy'}
              </button>
            </div>
            <div style={{fontSize: '14px', lineHeight: 1.8, color: 'var(--text-muted)', whiteSpace: 'pre-wrap', fontWeight: 300}}>{answer}</div>
            <div style={{marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border)', fontSize: '12px', color: 'var(--text-dim)'}}>{L.disclaimer}</div>
            <button onClick={() => { setAnswer(''); setQuestion(''); }}
              style={{marginTop: '16px', fontSize: '12px', padding: '8px 16px', borderRadius: '8px', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-muted)', cursor: 'pointer', fontFamily: 'Outfit, sans-serif'}}>
              {L.askAnother}
            </button>
          </div>
        )}

      </main>
    </div>
  );
}