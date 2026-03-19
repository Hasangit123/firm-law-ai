'use client';
import { useState } from 'react';
import LanguageToggle from '../components/LanguageToggle';

const lawsData = [
  {
    category: 'Criminal Laws', icon: '⚖️',
    laws: [
      { name: 'Indian Penal Code, 1860', short: 'IPC', desc: 'Main criminal code of India covering all major offences', url: 'https://legislative.gov.in/sites/default/files/A1860-45.pdf' },
      { name: 'Code of Criminal Procedure, 1973', short: 'CrPC', desc: 'Procedure for administration of criminal law in India', url: 'https://legislative.gov.in/sites/default/files/A1974-2.pdf' },
      { name: 'Indian Evidence Act, 1872', short: 'IEA', desc: 'Rules regarding admissibility of evidence in courts', url: 'https://legislative.gov.in/sites/default/files/A1872-1.pdf' },
      { name: 'Prevention of Corruption Act, 1988', short: 'PCA', desc: 'Law against corruption by public servants', url: 'https://legislative.gov.in/sites/default/files/A1988-49.pdf' },
      { name: 'NDPS Act, 1985', short: 'NDPS', desc: 'Narcotic Drugs and Psychotropic Substances Act', url: 'https://legislative.gov.in/sites/default/files/A1985-61.pdf' },
      { name: 'POCSO Act, 2012', short: 'POCSO', desc: 'Protection of children from sexual abuse', url: 'https://legislative.gov.in/sites/default/files/A2012-32.pdf' },
    ]
  },
  {
    category: 'Constitutional Laws', icon: '🏛️',
    laws: [
      { name: 'Constitution of India, 1950', short: 'COI', desc: 'Supreme law of India — Fundamental Rights, DPSP, Duties', url: 'https://legislative.gov.in/constitution-of-india/' },
      { name: 'Right to Information Act, 2005', short: 'RTI', desc: 'Citizens right to access information from government', url: 'https://legislative.gov.in/sites/default/files/A2005-22.pdf' },
      { name: 'Protection of Human Rights Act, 1993', short: 'PHRA', desc: 'Establishment of National Human Rights Commission', url: 'https://legislative.gov.in/sites/default/files/A1994-10.pdf' },
      { name: 'SC/ST (Prevention of Atrocities) Act, 1989', short: 'SC/ST Act', desc: 'Prevention of atrocities against SC/ST communities', url: 'https://legislative.gov.in/sites/default/files/A1989-33.pdf' },
    ]
  },
  {
    category: 'Family Laws', icon: '👨‍👩‍👧',
    laws: [
      { name: 'Hindu Marriage Act, 1955', short: 'HMA', desc: 'Marriage, divorce, maintenance for Hindus', url: 'https://legislative.gov.in/sites/default/files/A1955-25.pdf' },
      { name: 'Hindu Succession Act, 1956', short: 'HSA', desc: 'Inheritance and succession of property for Hindus', url: 'https://legislative.gov.in/sites/default/files/A1956-30.pdf' },
      { name: 'Hindu Adoption and Maintenance Act, 1956', short: 'HAMA', desc: 'Adoption and maintenance rights for Hindus', url: 'https://legislative.gov.in/sites/default/files/A1956-78.pdf' },
      { name: 'Special Marriage Act, 1954', short: 'SMA', desc: 'Civil marriage for all religions', url: 'https://legislative.gov.in/sites/default/files/A1954-43.pdf' },
      { name: 'Domestic Violence Act, 2005', short: 'PWDVA', desc: 'Protection of women from domestic violence', url: 'https://legislative.gov.in/sites/default/files/A2005-43.pdf' },
      { name: 'Dowry Prohibition Act, 1961', short: 'DPA', desc: 'Prohibition of giving and taking dowry', url: 'https://legislative.gov.in/sites/default/files/A1961-28.pdf' },
      { name: 'Muslim Personal Law (Shariat) Application Act, 1937', short: 'MPLSA', desc: 'Application of Muslim personal law in India', url: 'https://legislative.gov.in/sites/default/files/A1937-26.pdf' },
      { name: 'Guardianship and Wards Act, 1890', short: 'GWA', desc: 'Guardianship of minor children', url: 'https://legislative.gov.in/sites/default/files/A1890-8.pdf' },
    ]
  },
  {
    category: 'Civil Laws', icon: '📜',
    laws: [
      { name: 'Code of Civil Procedure, 1908', short: 'CPC', desc: 'Procedure for civil courts in India', url: 'https://legislative.gov.in/sites/default/files/A1908-5.pdf' },
      { name: 'Indian Contract Act, 1872', short: 'ICA', desc: 'Law governing contracts and agreements', url: 'https://legislative.gov.in/sites/default/files/A1872-9.pdf' },
      { name: 'Transfer of Property Act, 1882', short: 'TPA', desc: 'Law regarding transfer of property', url: 'https://legislative.gov.in/sites/default/files/A1882-4.pdf' },
      { name: 'Limitation Act, 1963', short: 'LA', desc: 'Time limits for filing suits and appeals', url: 'https://legislative.gov.in/sites/default/files/A1963-36.pdf' },
      { name: 'Specific Relief Act, 1963', short: 'SRA', desc: 'Relief for breach of contract and property disputes', url: 'https://legislative.gov.in/sites/default/files/A1963-47.pdf' },
      { name: 'Registration Act, 1908', short: 'RA', desc: 'Registration of documents and properties', url: 'https://legislative.gov.in/sites/default/files/A1908-16.pdf' },
    ]
  },
  {
    category: 'Consumer and Commercial Laws', icon: '🛒',
    laws: [
      { name: 'Consumer Protection Act, 2019', short: 'CPA', desc: 'Protection of consumer rights and interests', url: 'https://legislative.gov.in/sites/default/files/A2019-35.pdf' },
      { name: 'Competition Act, 2002', short: 'CA', desc: 'Prevention of monopolies and unfair trade practices', url: 'https://legislative.gov.in/sites/default/files/A2003-12.pdf' },
      { name: 'Sale of Goods Act, 1930', short: 'SOGA', desc: 'Law governing sale and purchase of goods', url: 'https://legislative.gov.in/sites/default/files/A1930-3.pdf' },
      { name: 'Companies Act, 2013', short: 'CoA', desc: 'Incorporation and regulation of companies', url: 'https://legislative.gov.in/sites/default/files/A2013-18.pdf' },
      { name: 'Information Technology Act, 2000', short: 'ITA', desc: 'Cyber laws and electronic commerce in India', url: 'https://legislative.gov.in/sites/default/files/A2000-21.pdf' },
      { name: 'Insolvency and Bankruptcy Code, 2016', short: 'IBC', desc: 'Resolution of insolvency for companies and individuals', url: 'https://legislative.gov.in/sites/default/files/A2016-31.pdf' },
    ]
  },
  {
    category: 'Labour Laws', icon: '👷',
    laws: [
      { name: 'Factories Act, 1948', short: 'FA', desc: 'Health, safety and welfare of factory workers', url: 'https://legislative.gov.in/sites/default/files/A1948-63.pdf' },
      { name: 'Minimum Wages Act, 1948', short: 'MWA', desc: 'Fixing minimum wages for workers', url: 'https://legislative.gov.in/sites/default/files/A1948-11.pdf' },
      { name: 'Payment of Wages Act, 1936', short: 'PWA', desc: 'Regulation of payment of wages to workers', url: 'https://legislative.gov.in/sites/default/files/A1936-4.pdf' },
      { name: 'Employees Provident Fund Act, 1952', short: 'EPF', desc: 'Provident fund benefits for employees', url: 'https://www.epfindia.gov.in/site_en/EPFAct.php' },
      { name: 'Maternity Benefit Act, 1961', short: 'MBA', desc: 'Maternity leave and benefits for women employees', url: 'https://legislative.gov.in/sites/default/files/A1961-53.pdf' },
      { name: 'POSH Act, 2013', short: 'POSH', desc: 'Prevention of sexual harassment at workplace', url: 'https://legislative.gov.in/sites/default/files/A2013-14.pdf' },
    ]
  },
  {
    category: 'Environmental Laws', icon: '🌿',
    laws: [
      { name: 'Environment Protection Act, 1986', short: 'EPA', desc: 'Protection and improvement of environment', url: 'https://legislative.gov.in/sites/default/files/A1986-29.pdf' },
      { name: 'Water Prevention and Control of Pollution Act, 1974', short: 'Water Act', desc: 'Prevention of water pollution', url: 'https://legislative.gov.in/sites/default/files/A1974-6.pdf' },
      { name: 'Air Prevention and Control of Pollution Act, 1981', short: 'Air Act', desc: 'Prevention of air pollution', url: 'https://legislative.gov.in/sites/default/files/A1981-14.pdf' },
      { name: 'Forest Conservation Act, 1980', short: 'FCA', desc: 'Conservation of forests in India', url: 'https://legislative.gov.in/sites/default/files/A1980-69.pdf' },
      { name: 'Wildlife Protection Act, 1972', short: 'WPA', desc: 'Protection of wildlife and biodiversity', url: 'https://legislative.gov.in/sites/default/files/A1972-53.pdf' },
      { name: 'National Green Tribunal Act, 2010', short: 'NGT', desc: 'Tribunal for environmental disputes', url: 'https://legislative.gov.in/sites/default/files/A2010-19.pdf' },
    ]
  },
  {
    category: 'Property and Land Laws', icon: '🏘️',
    laws: [
      { name: 'Real Estate Regulation Act, 2016', short: 'RERA', desc: 'Regulation of real estate sector and protection of buyers', url: 'https://legislative.gov.in/sites/default/files/A2016-16.pdf' },
      { name: 'Land Acquisition Act, 2013', short: 'LAA', desc: 'Acquisition of land by government with fair compensation', url: 'https://legislative.gov.in/sites/default/files/A2013-30.pdf' },
      { name: 'Benami Transactions Prohibition Act, 1988', short: 'BTPA', desc: 'Prohibition of benami property transactions', url: 'https://legislative.gov.in/sites/default/files/A1988-45.pdf' },
    ]
  },
  {
    category: 'Medical and Social Laws', icon: '🏥',
    laws: [
      { name: 'Surrogacy Regulation Act, 2021', short: 'SRA', desc: 'Regulation of surrogacy in India', url: 'https://legislative.gov.in/sites/default/files/A2021-47.pdf' },
      { name: 'Mental Healthcare Act, 2017', short: 'MHA', desc: 'Rights of persons with mental illness', url: 'https://legislative.gov.in/sites/default/files/A2017-10.pdf' },
      { name: 'Rights of Persons with Disabilities Act, 2016', short: 'RPWD', desc: 'Rights and protection of disabled persons', url: 'https://legislative.gov.in/sites/default/files/A2016-49.pdf' },
      { name: 'PCPNDT Act, 1994', short: 'PCPNDT', desc: 'Prevention of sex-selective abortion', url: 'https://legislative.gov.in/sites/default/files/A1994-57.pdf' },
      { name: 'Medical Termination of Pregnancy Act, 1971', short: 'MTP', desc: 'Regulation of abortion in India', url: 'https://legislative.gov.in/sites/default/files/A1971-34.pdf' },
    ]
  },
  {
    category: 'Education Laws', icon: '🎓',
    laws: [
      { name: 'Right to Education Act, 2009', short: 'RTE', desc: 'Free and compulsory education for children 6-14 years', url: 'https://legislative.gov.in/sites/default/files/A2009-35.pdf' },
      { name: 'University Grants Commission Act, 1956', short: 'UGC', desc: 'Regulation of higher education in India', url: 'https://www.ugc.gov.in/ugc_act.aspx' },
    ]
  },
];

export default function LawsLibrary() {
  const [search, setSearch] = useState('');
  const [selectedLaw, setSelectedLaw] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState('english');

  const filteredLaws = lawsData.map(cat => ({
    ...cat,
    laws: cat.laws.filter(law =>
      law.name.toLowerCase().includes(search.toLowerCase()) ||
      law.short.toLowerCase().includes(search.toLowerCase()) ||
      law.desc.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(cat => cat.laws.length > 0);

  async function askAboutLaw() {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer('');
    setError('');
    setCopied(false);
    const prompt = `Answer this question about the ${selectedLaw.name}: "${question}". Provide a clear, detailed answer with relevant sections, case laws, and practical implications under Indian law.`;
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
      <main style={{maxWidth: '1000px', margin: '0 auto', padding: '40px 20px 80px'}}>

        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '16px'}}>
          <div>
            <h1 style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '36px', fontWeight: 600, color: 'var(--off-white)', marginBottom: '8px'}}>🏛️ Laws Library</h1>
            <p style={{fontSize: '14px', color: 'var(--text-muted)', fontWeight: 300}}>Browse all major enforceable Indian Acts. Read the official Bare Act or ask AI any question.</p>
          </div>
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>

        {!selectedLaw && (
          <div style={{marginBottom: '32px'}}>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search any Act by name or keyword..." style={{width: '100%', background: '#ffffff', border: '2px solid rgba(201,168,76,0.4)', borderRadius: '10px', padding: '14px 18px', fontSize: '14px', color: '#000000', outline: 'none', fontFamily: 'Outfit, sans-serif'}} />
          </div>
        )}

        {!selectedLaw && (
          <div style={{display: 'flex', flexDirection: 'column', gap: '32px'}}>
            {filteredLaws.map(cat => (
              <div key={cat.category}>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px'}}>
                  <span style={{fontSize: '20px'}}>{cat.icon}</span>
                  <h2 style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', fontWeight: 600, color: 'var(--off-white)'}}>{cat.category}</h2>
                  <span style={{fontSize: '11px', padding: '2px 10px', borderRadius: '20px', background: 'rgba(201,168,76,0.1)', color: 'var(--gold)', border: '1px solid rgba(201,168,76,0.2)'}}>{cat.laws.length} Acts</span>
                </div>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px'}}>
                  {cat.laws.map(law => (
                    <div key={law.short} style={{background: '#141414', border: '1px solid rgba(201,168,76,0.25)', borderRadius: '12px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
                      <span style={{fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '6px', background: 'rgba(201,168,76,0.15)', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.3)', display: 'inline-block', alignSelf: 'flex-start'}}>{law.short}</span>
                      <h3 style={{fontSize: '13px', fontWeight: 600, color: '#f5f0e8', lineHeight: 1.4, margin: 0}}>{law.name}</h3>
                      <p style={{fontSize: '12px', color: 'rgba(245,240,232,0.45)', lineHeight: 1.5, margin: 0}}>{law.desc}</p>
                      <div style={{display: 'flex', gap: '8px', marginTop: '4px'}}>
                        <button onClick={() => { setSelectedLaw(law); setAnswer(''); setQuestion(''); }} style={{flex: 1, padding: '9px 8px', borderRadius: '7px', border: '1px solid rgba(201,168,76,0.4)', background: 'transparent', color: '#c9a84c', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Outfit, sans-serif'}}>🤖 Ask AI</button>
                        <a href={law.url} target="_blank" rel="noopener noreferrer" style={{flex: 1, padding: '9px 8px', borderRadius: '7px', background: 'linear-gradient(135deg, #c9a84c, #8a6f2e)', color: '#080808', fontSize: '12px', fontWeight: 600, textAlign: 'center', textDecoration: 'none', display: 'block'}}>📖 Bare Act</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedLaw && (
          <div>
            <button onClick={() => { setSelectedLaw(null); setAnswer(''); setQuestion(''); }} style={{fontSize: '13px', color: 'var(--gold)', background: 'transparent', border: 'none', cursor: 'pointer', marginBottom: '24px', fontFamily: 'Outfit, sans-serif'}}>← Back to Laws Library</button>

            <div style={{background: '#141414', border: '1px solid rgba(201,168,76,0.25)', borderRadius: '16px', padding: '28px', marginBottom: '20px'}}>
              <div style={{display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid rgba(201,168,76,0.15)'}}>
                <span style={{fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '6px', background: 'rgba(201,168,76,0.15)', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.3)', flexShrink: 0}}>{selectedLaw.short}</span>
                <div style={{flex: 1}}>
                  <h2 style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', fontWeight: 600, color: '#f5f0e8', marginBottom: '6px'}}>{selectedLaw.name}</h2>
                  <p style={{fontSize: '13px', color: 'rgba(245,240,232,0.45)', marginBottom: '14px'}}>{selectedLaw.desc}</p>
                  <a href={selectedLaw.url} target="_blank" rel="noopener noreferrer" style={{display: 'inline-block', fontSize: '12px', padding: '8px 16px', borderRadius: '8px', background: 'linear-gradient(135deg, #c9a84c, #8a6f2e)', color: '#080808', textDecoration: 'none', fontWeight: 600}}>📖 Read Official Bare Act</a>
                </div>
              </div>

              <h3 style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontWeight: 600, color: '#f5f0e8', marginBottom: '14px'}}>Ask AI about {selectedLaw.short}</h3>
              <input type="text" value={question} onChange={e => setQuestion(e.target.value)} placeholder={`e.g. What are the key sections of ${selectedLaw.name}?`} style={{width: '100%', background: '#ffffff', border: '2px solid rgba(201,168,76,0.4)', borderRadius: '8px', padding: '12px 14px', fontSize: '14px', color: '#000000', outline: 'none', fontFamily: 'Outfit, sans-serif', marginBottom: '12px'}} />
              <button onClick={askAboutLaw} disabled={loading || !question.trim()} style={{width: '100%', padding: '12px', background: loading || !question.trim() ? 'rgba(201,168,76,0.3)' : 'linear-gradient(135deg, #c9a84c, #8a6f2e)', color: '#080808', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: loading || !question.trim() ? 'not-allowed' : 'pointer', fontFamily: 'Outfit, sans-serif'}}>
                {loading ? 'Researching...' : 'Ask Firm Law AI'}
              </button>
            </div>

            {loading && (
              <div style={{background: '#141414', border: '1px solid rgba(201,168,76,0.25)', borderRadius: '16px', padding: '48px', textAlign: 'center'}}>
                <div style={{width: '48px', height: '48px', border: '3px solid rgba(201,168,76,0.2)', borderTop: '3px solid #c9a84c', borderRadius: '50%', margin: '0 auto 20px', animation: 'spin 1s linear infinite'}} />
                <p style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', color: '#f5f0e8'}}>Researching {selectedLaw.short}...</p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            )}

            {error && (
              <div style={{background: 'rgba(255,50,50,0.05)', border: '1px solid rgba(255,50,50,0.2)', borderRadius: '12px', padding: '16px', fontSize: '13px', color: '#ff6b6b'}}>{error}</div>
            )}

            {answer && (
              <div style={{background: '#141414', border: '1px solid rgba(201,168,76,0.25)', borderRadius: '16px', padding: '28px'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid rgba(201,168,76,0.15)'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <div style={{width: '32px', height: '32px', background: 'linear-gradient(135deg, #c9a84c, #8a6f2e)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px'}}>⚖️</div>
                    <span style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontWeight: 600, color: '#f5f0e8'}}>Firm Law AI — {selectedLaw.short}</span>
                  </div>
                  <button onClick={copyAnswer} style={{fontSize: '12px', padding: '8px 16px', borderRadius: '8px', background: copied ? 'rgba(201,168,76,0.2)' : 'transparent', border: '1px solid rgba(201,168,76,0.3)', color: '#c9a84c', cursor: 'pointer', fontFamily: 'Outfit, sans-serif'}}>
                    {copied ? '✅ Copied!' : '📋 Copy'}
                  </button>
                </div>
                <div style={{fontSize: '14px', lineHeight: 1.8, color: 'rgba(245,240,232,0.7)', whiteSpace: 'pre-wrap', fontWeight: 300}}>{answer}</div>
                <div style={{marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(201,168,76,0.15)', fontSize: '12px', color: 'rgba(245,240,232,0.3)'}}>⚠️ Always verify with the official Bare Act link above. This is general information only.</div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}