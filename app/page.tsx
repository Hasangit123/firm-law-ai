'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [language, setLanguage] = useState<'english' | 'hindi' | 'telugu'>('english');

  const content = {
    english: {
      tag: '🇮🇳 Built for India',
      title: 'Your Personal',
      highlight: 'Legal Guide',
      subtitle: 'Powered by AI',
      desc: 'Ask legal questions, draft documents, know your rights, and study Indian law — all in one place. Free. Simple. Instant.',
      btn1: 'Ask a Legal Question',
      btn2: 'Draft a Document',
      featuresTitle: 'What can Firm Law AI do?',
      featuresSub: 'Click any feature to get started',
      disclaimer: 'Firm Law AI provides general legal information only. Not a substitute for professional legal advice. Always consult a qualified advocate.',
      aiStrip: 'Powered by Advanced AI — Fast, Accurate, Always Available',
      aiDesc: 'Firm Law AI uses state-of-the-art language models to understand complex Indian legal language and explain it in simple terms',
      tryNow: 'Try it Now →',
    },
    hindi: {
      tag: '🇮🇳 भारत के लिए बनाया गया',
      title: 'आपका व्यक्तिगत',
      highlight: 'कानूनी मार्गदर्शक',
      subtitle: 'AI द्वारा संचालित',
      desc: 'कानूनी सवाल पूछें, दस्तावेज़ बनाएं, अपने अधिकार जानें, और भारतीय कानून पढ़ें — सब एक जगह। मुफ्त। सरल। तुरंत।',
      btn1: 'कानूनी सवाल पूछें',
      btn2: 'दस्तावेज़ बनाएं',
      featuresTitle: 'Firm Law AI क्या कर सकता है?',
      featuresSub: 'किसी भी सुविधा पर क्लिक करें',
      disclaimer: 'Firm Law AI केवल सामान्य कानूनी जानकारी प्रदान करता है। यह पेशेवर कानूनी सलाह का विकल्प नहीं है।',
      aiStrip: 'उन्नत AI द्वारा संचालित — तेज़, सटीक, हमेशा उपलब्ध',
      aiDesc: 'Firm Law AI जटिल भारतीय कानूनी भाषा को समझने और इसे सरल शब्दों में समझाने के लिए अत्याधुनिक भाषा मॉडल का उपयोग करता है',
      tryNow: 'अभी आज़माएं →',
    },
    telugu: {
      tag: '🇮🇳 భారతదేశం కోసం నిర్మించబడింది',
      title: 'మీ వ్యక్తిగత',
      highlight: 'న్యాయ మార్గదర్శి',
      subtitle: 'AI ద్వారా నడపబడుతోంది',
      desc: 'చట్టపరమైన ప్రశ్నలు అడగండి, పత్రాలు రూపొందించండి, మీ హక్కులు తెలుసుకోండి — అన్నీ ఒకే చోట. ఉచితంగా. సులభంగా. వెంటనే.',
      btn1: 'చట్టపరమైన ప్రశ్న అడగండి',
      btn2: 'పత్రం రూపొందించండి',
      featuresTitle: 'Firm Law AI ఏమి చేయగలదు?',
      featuresSub: 'ప్రారంభించడానికి ఏదైనా ఫీచర్‌పై క్లిక్ చేయండి',
      disclaimer: 'Firm Law AI సాధారణ చట్టపరమైన సమాచారాన్ని మాత్రమే అందిస్తుంది. అర్హత కలిగిన న్యాయవాదిని సంప్రదించండి.',
      aiStrip: 'అధునాతన AI ద్వారా నడపబడుతోంది — వేగంగా, ఖచ్చితంగా, ఎల్లప్పుడూ అందుబాటులో',
      aiDesc: 'Firm Law AI సంక్లిష్ట భారతీయ చట్టపరమైన భాషను అర్థం చేసుకోవడానికి అత్యాధునిక భాషా నమూనాలను ఉపయోగిస్తుంది',
      tryNow: 'ఇప్పుడే ప్రయత్నించండి →',
    },
  };

  const C = content[language];

  const features = [
    { icon: '💬', title: 'Legal Q&A', desc: 'Ask any legal question in plain English. Get clear answers based on Indian law with relevant Acts and case citations.', href: '/legal-qa', tag: 'Most Popular' },
    { icon: '🔎', title: 'Legal Problem Solver', desc: 'Describe your situation and get a complete step-by-step legal action plan, documents needed, and authority to approach.', href: '/solve', tag: 'New Feature' },
    { icon: '📄', title: 'Draft Documents', desc: 'Generate consumer complaints, legal notices, RTI applications, bail applications and more — legally formatted.', href: '/draft', tag: '6 Document Types' },
    { icon: '📚', title: 'Law Student Hub', desc: 'Explain topics, find landmark cases with Facts/Held/Principle, and get model exam answers.', href: '/student', tag: 'For Students' },
    { icon: '✊', title: 'Know Your Rights', desc: 'Understand your rights as consumer, tenant, employee, patient, and citizen under Indian law.', href: '/rights', tag: '8 Categories' },
    { icon: '🏛️', title: 'Laws Library', desc: 'Browse 50+ major enforceable Indian Acts with official Bare Act links and AI explanations.', href: '/laws', tag: '50+ Acts' },
    { icon: '🤖', title: 'AI Powered', desc: 'Powered by advanced AI trained on Indian legal system — accurate, fast, and always available.', href: '/legal-qa', tag: 'Groq LLM' },
  ];

  return (
    <div style={{background: 'var(--black)', minHeight: '100vh'}}>
      <main style={{maxWidth: '1100px', margin: '0 auto', padding: '40px 24px 80px'}}>

        {/* DISCLAIMER */}
        <div style={{background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.2)', borderLeft: '3px solid var(--gold)', borderRadius: '0 6px 6px 0', padding: '12px 16px', fontSize: '12px', color: 'rgba(201,168,76,0.7)', marginBottom: '32px', display: 'flex', gap: '10px', alignItems: 'flex-start'}}>
          <span>⚠</span>
          <span><strong style={{color: 'var(--gold)'}}>Legal Disclaimer:</strong> {C.disclaimer}</span>
        </div>

        {/* HERO */}
        <div style={{background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '60px 48px', textAlign: 'center', marginBottom: '48px', position: 'relative', overflow: 'hidden'}}>
          <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 60%)', pointerEvents: 'none'}}/>
          <div style={{position: 'absolute', top: '-20px', right: '-20px', fontSize: '220px', opacity: '0.03', lineHeight: 1, fontFamily: 'serif', pointerEvents: 'none', userSelect: 'none'}}>§</div>

          {/* Language Toggle */}
          <div style={{display: 'flex', justifyContent: 'center', marginBottom: '28px', position: 'relative'}}>
            <div style={{display: 'flex', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '10px', padding: '4px', gap: '4px'}}>
              {[
                { key: 'english', flag: '🇬🇧', label: 'English' },
                { key: 'hindi', flag: '🇮🇳', label: 'हिंदी' },
                { key: 'telugu', flag: '🌟', label: 'తెలుగు' },
              ].map(lang => (
                <button key={lang.key} onClick={() => setLanguage(lang.key)}
                  style={{padding: '8px 16px', borderRadius: '7px', border: 'none', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', transition: 'all 0.2s', background: language === lang.key ? 'linear-gradient(135deg, #c9a84c, #8a6f2e)' : 'transparent', color: language === lang.key ? '#080808' : '#5a5a5a'}}>
                  {lang.flag} {lang.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{display: 'inline-block', fontSize: '11px', color: 'var(--gold)', border: '1px solid rgba(201,168,76,0.3)', padding: '5px 16px', borderRadius: '20px', marginBottom: '24px', letterSpacing: '2px', textTransform: 'uppercase', position: 'relative'}}>{C.tag}</div>

          <h1 style={{fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(38px, 5vw, 62px)', fontWeight: 600, color: 'var(--off-white)', lineHeight: 1.15, marginBottom: '20px', position: 'relative'}}>
            {C.title}<br/>
            <span style={{color: 'var(--gold)', fontStyle: 'italic'}}>{C.highlight}</span><br/>
            {C.subtitle}
          </h1>

          <p style={{fontSize: '16px', color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto 36px', lineHeight: 1.8, fontWeight: 300, position: 'relative'}}>{C.desc}</p>

          <div style={{display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', position: 'relative'}}>
            <Link href="/legal-qa" style={{background: 'linear-gradient(135deg, var(--gold), var(--gold-dim))', color: 'var(--black)', padding: '14px 32px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.5px'}}>{C.btn1}</Link>
            <Link href="/draft" style={{background: 'transparent', color: 'var(--off-white)', padding: '14px 32px', borderRadius: '8px', fontSize: '14px', fontWeight: 500, textDecoration: 'none', border: '1px solid rgba(245,240,232,0.2)'}}>{C.btn2}</Link>
          </div>

          <div style={{display: 'flex', justifyContent: 'center', gap: '48px', marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--border)', flexWrap: 'wrap', position: 'relative'}}>
            {[['50+', 'Indian Acts'], ['7', 'Features'], ['8', 'Rights Categories'], ['100%', 'Free to Use']].map(([num, label]) => (
              <div key={label} style={{textAlign: 'center'}}>
                <div style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', fontWeight: 600, color: 'var(--gold)'}}>{num}</div>
                <div style={{fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase' as const, marginTop: '4px'}}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURES */}
        <div style={{marginBottom: '16px', display: 'flex', alignItems: 'baseline', gap: '12px'}}>
          <h2 style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', fontWeight: 600, color: 'var(--off-white)'}}>{C.featuresTitle}</h2>
          <div style={{height: '1px', flex: 1, background: 'var(--border)'}}/>
        </div>
        <p style={{fontSize: '14px', color: 'var(--text-muted)', marginBottom: '28px', fontWeight: 300}}>{C.featuresSub}</p>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '40px'}}>
          {features.map((card, i) => (
            <Link key={i} href={card.href} style={{textDecoration: 'none'}}>
              <div style={{background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '28px 24px', cursor: 'pointer', height: '100%', position: 'relative', overflow: 'hidden', transition: 'all 0.2s'}}>
                <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', opacity: 0.5}}/>
                <div style={{fontSize: '32px', marginBottom: '16px'}}>{card.icon}</div>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px'}}>
                  <h3 style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', fontWeight: 600, color: 'var(--off-white)'}}>{card.title}</h3>
                  <span style={{fontSize: '10px', padding: '2px 8px', borderRadius: '10px', background: 'rgba(201,168,76,0.1)', color: 'var(--gold)', border: '1px solid rgba(201,168,76,0.2)', letterSpacing: '0.5px', whiteSpace: 'nowrap' as const}}>{card.tag}</span>
                </div>
                <p style={{fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 300}}>{card.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* BOTTOM STRIP */}
        <div style={{background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '24px 28px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap'}}>
          <div style={{width: '48px', height: '48px', background: 'linear-gradient(135deg, var(--gold), var(--gold-dim))', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0}}>🤖</div>
          <div style={{flex: 1}}>
            <div style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontWeight: 600, color: 'var(--off-white)', marginBottom: '4px'}}>{C.aiStrip}</div>
            <div style={{fontSize: '13px', color: 'var(--text-muted)', fontWeight: 300}}>{C.aiDesc}</div>
          </div>
          <Link href="/legal-qa" style={{background: 'linear-gradient(135deg, var(--gold), var(--gold-dim))', color: 'var(--black)', padding: '12px 24px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0}}>{C.tryNow}</Link>
        </div>

      </main>
    </div>
  );
}