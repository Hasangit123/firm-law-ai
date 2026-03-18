'use client';
import { useState } from 'react';
import LanguageToggle from '../components/LanguageToggle';

const documentTypes = [
  {
    id: 'consumer_complaint',
    icon: '🛒',
    title: 'Consumer Complaint',
    law: 'Consumer Protection Act, 2019',
    fields: [
      { id: 'complainant_name', label: 'Your Full Name', placeholder: 'e.g. Mohammed Hasan Khan' },
      { id: 'complainant_address', label: 'Your Full Address', placeholder: 'House No, Street, City, State, PIN' },
      { id: 'complainant_phone', label: 'Your Phone Number', placeholder: 'e.g. 9876543210' },
      { id: 'opposite_party', label: 'Opposite Party (Company/Person)', placeholder: 'e.g. Amazon India Pvt Ltd' },
      { id: 'opposite_address', label: 'Opposite Party Address', placeholder: 'Registered office address' },
      { id: 'complaint_details', label: 'Details of Complaint', placeholder: 'Describe what happened, when it happened, and how you were cheated or harmed' },
      { id: 'relief_sought', label: 'Relief Sought', placeholder: 'e.g. Refund of ₹5000, compensation of ₹10000' },
      { id: 'transaction_date', label: 'Date of Transaction/Incident', placeholder: 'e.g. 15 January 2025' },
    ]
  },
  {
    id: 'legal_notice',
    icon: '📬',
    title: 'Legal Notice',
    law: 'Code of Civil Procedure, 1908',
    fields: [
      { id: 'sender_name', label: 'Your Full Name', placeholder: 'e.g. Mohammed Hasan Khan' },
      { id: 'sender_address', label: 'Your Full Address', placeholder: 'House No, Street, City, State, PIN' },
      { id: 'recipient_name', label: 'Recipient Name', placeholder: 'Person or company to whom notice is sent' },
      { id: 'recipient_address', label: 'Recipient Address', placeholder: 'Full address of recipient' },
      { id: 'subject_matter', label: 'Subject Matter', placeholder: 'e.g. Recovery of money, breach of contract' },
      { id: 'facts', label: 'Facts of the Matter', placeholder: 'Describe the full facts and background of the dispute' },
      { id: 'demand', label: 'Your Demand', placeholder: 'e.g. Pay ₹50,000 within 15 days' },
      { id: 'time_period', label: 'Time Period Given', placeholder: 'e.g. 15 days, 30 days' },
    ]
  },
  {
    id: 'rti_application',
    icon: '📋',
    title: 'RTI Application',
    law: 'Right to Information Act, 2005',
    fields: [
      { id: 'applicant_name', label: 'Your Full Name', placeholder: 'e.g. Mohammed Hasan Khan' },
      { id: 'applicant_address', label: 'Your Full Address', placeholder: 'House No, Street, City, State, PIN' },
      { id: 'public_authority', label: 'Public Authority', placeholder: 'e.g. Municipal Corporation of Hyderabad' },
      { id: 'information_sought', label: 'Information Sought', placeholder: 'Describe clearly what information you want' },
      { id: 'time_period_info', label: 'Time Period of Information', placeholder: 'e.g. From January 2020 to December 2024' },
    ]
  },
  {
    id: 'fir_complaint',
    icon: '👮',
    title: 'Police Complaint',
    law: 'Code of Criminal Procedure, 1973 — Section 154',
    fields: [
      { id: 'complainant_name', label: 'Your Full Name', placeholder: 'e.g. Mohammed Hasan Khan' },
      { id: 'complainant_address', label: 'Your Full Address', placeholder: 'House No, Street, City, State, PIN' },
      { id: 'complainant_phone', label: 'Your Phone Number', placeholder: 'e.g. 9876543210' },
      { id: 'accused_name', label: 'Accused Name (if known)', placeholder: 'Name of accused person or Unknown' },
      { id: 'incident_date', label: 'Date & Time of Incident', placeholder: 'e.g. 10 March 2025, 8:00 PM' },
      { id: 'incident_place', label: 'Place of Incident', placeholder: 'Full address where incident occurred' },
      { id: 'incident_details', label: 'Details of Incident', placeholder: 'Describe exactly what happened in detail' },
      { id: 'witnesses', label: 'Witnesses (if any)', placeholder: 'Names and addresses of witnesses, or write None' },
    ]
  },
  {
    id: 'bail_application',
    icon: '⚖️',
    title: 'Bail Application',
    law: 'CrPC Section 437 / 438',
    fields: [
      { id: 'applicant_name', label: 'Applicant Name (Accused)', placeholder: 'Full name of accused' },
      { id: 'applicant_address', label: 'Applicant Address', placeholder: 'Full residential address' },
      { id: 'case_number', label: 'FIR/Case Number', placeholder: 'e.g. FIR No. 123/2025' },
      { id: 'police_station', label: 'Police Station', placeholder: 'Name of police station' },
      { id: 'offence', label: 'Offence Charged With', placeholder: 'e.g. Section 420 IPC — Cheating' },
      { id: 'arrest_date', label: 'Date of Arrest', placeholder: 'e.g. 1 March 2025' },
      { id: 'grounds', label: 'Grounds for Bail', placeholder: 'e.g. No prior criminal record, cooperative with investigation' },
    ]
  },
  {
    id: 'affidavit',
    icon: '📜',
    title: 'General Affidavit',
    law: 'Indian Evidence Act, 1872',
    fields: [
      { id: 'deponent_name', label: 'Your Full Name (Deponent)', placeholder: 'e.g. Mohammed Hasan Khan' },
      { id: 'deponent_age', label: 'Your Age', placeholder: 'e.g. 22' },
      { id: 'deponent_address', label: 'Your Full Address', placeholder: 'House No, Street, City, State, PIN' },
      { id: 'purpose', label: 'Purpose of Affidavit', placeholder: 'e.g. Address proof, name change, property declaration' },
      { id: 'statements', label: 'Statements to Declare', placeholder: 'Write all facts you want to declare under oath' },
    ]
  },
];

const inputStyle = {
  width: '100%',
  background: '#1a1a1a',
  border: '2px solid rgba(201,168,76,0.4)',
  borderRadius: '8px',
  padding: '12px 14px',
  fontSize: '13px',
  color: '#f5f0e8',
  outline: 'none',
  fontFamily: 'Outfit, sans-serif',
};

export default function DraftDocument() {
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState({});
  const [document, setDocument] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState('english');

  function selectDoc(doc) {
    setSelected(doc);
    setFormData({});
    setDocument('');
    setError('');
  }

  function handleInput(fieldId, value) {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  }

  async function generateDocument() {
    const allFilled = selected.fields.every(f => formData[f.id]?.trim());
    if (!allFilled) {
      setError('Please fill in all fields before generating the document.');
      return;
    }
    setLoading(true);
    setDocument('');
    setError('');

    const details = selected.fields.map(f => `${f.label}: ${formData[f.id]}`).join('\n');
    const prompt = `Draft a formal ${selected.title} as per Indian law (${selected.law}).\n\nDetails provided:\n${details}\n\nRequirements:\n- Use proper Indian legal format with correct headings\n- Address to the correct authority/court\n- Include all relevant sections and Acts\n- Use formal legal language\n- Include date and signature lines\n- Make it ready to print and file\n- Follow all procedural requirements under Indian law`;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt, mode: 'draft', language }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setDocument(data.response);
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  }

  function copyDocument() {
    navigator.clipboard.writeText(document);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function printDocument() {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${selected.title} — Firm Law AI</title>
          <style>
            body { font-family: 'Times New Roman', serif; font-size: 14px; line-height: 1.8; margin: 40px; color: #000; }
            h1 { font-size: 16px; text-align: center; text-transform: uppercase; margin-bottom: 8px; }
            .subtitle { text-align: center; font-size: 12px; color: #555; margin-bottom: 32px; }
            pre { white-space: pre-wrap; font-family: 'Times New Roman', serif; font-size: 14px; line-height: 1.8; }
            .footer { margin-top: 40px; font-size: 11px; color: #888; border-top: 1px solid #ccc; padding-top: 12px; text-align: center; }
            @media print { .no-print { display: none; } }
          </style>
        </head>
        <body>
          <h1>${selected.title}</h1>
          <div class="subtitle">Generated by Firm Law AI — ${new Date().toLocaleDateString('en-IN', {day: 'numeric', month: 'long', year: 'numeric'})}</div>
          <pre>${document}</pre>
          <div class="footer">This document was AI-generated by Firm Law AI. Please review carefully and consult a qualified advocate before filing.</div>
          <div class="no-print" style="margin-top:20px; text-align:center;">
            <button onclick="window.print()" style="padding:10px 24px; background:#c9a84c; border:none; border-radius:6px; font-size:14px; cursor:pointer; font-weight:600;">🖨️ Print / Save as PDF</button>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
  }

  return (
    <div style={{background: 'var(--black)', minHeight: '100vh'}}>
      <main style={{maxWidth: '800px', margin: '0 auto', padding: '40px 20px 80px'}}>

        {/* Header */}
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '16px'}}>
          <div>
            <h1 style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '36px', fontWeight: 600, color: 'var(--off-white)', marginBottom: '8px'}}>📄 Draft a Legal Document</h1>
            <p style={{fontSize: '14px', color: 'var(--text-muted)', fontWeight: 300}}>Select a document type, fill in the details, and get a professionally drafted legal document instantly.</p>
          </div>
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>

        {/* Document Type Selection */}
        {!selected && (
          <div>
            <p style={{fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px'}}>Select Document Type:</p>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px'}}>
              {documentTypes.map(doc => (
                <div key={doc.id} onClick={() => selectDoc(doc)}
                  style={{background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '24px 20px', cursor: 'pointer', transition: 'all 0.2s'}}>
                  <div style={{fontSize: '32px', marginBottom: '12px'}}>{doc.icon}</div>
                  <h3 style={{fontSize: '15px', fontWeight: 600, color: 'var(--off-white)', marginBottom: '6px', fontFamily: 'Cormorant Garamond, serif'}}>{doc.title}</h3>
                  <p style={{fontSize: '11px', color: 'var(--text-dim)'}}>{doc.law}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Form */}
        {selected && !document && (
          <div>
            <button onClick={() => setSelected(null)}
              style={{fontSize: '13px', color: 'var(--gold)', background: 'transparent', border: 'none', cursor: 'pointer', marginBottom: '24px', fontFamily: 'Outfit, sans-serif'}}>
              ← Back to document types
            </button>

            <div style={{background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '28px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px', paddingBottom: '20px', borderBottom: '1px solid var(--border)'}}>
                <span style={{fontSize: '36px'}}>{selected.icon}</span>
                <div>
                  <h2 style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '24px', fontWeight: 600, color: 'var(--off-white)', marginBottom: '4px'}}>{selected.title}</h2>
                  <p style={{fontSize: '12px', color: 'var(--text-dim)'}}>{selected.law}</p>
                </div>
              </div>

              <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                {selected.fields.map(field => (
                  <div key={field.id}>
                    <label style={{display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--off-white)', marginBottom: '8px'}}>{field.label}</label>
                    {field.id.includes('details') || field.id.includes('facts') || field.id.includes('statements') || field.id.includes('grounds') || field.id.includes('information_sought') ? (
                      <textarea
                        value={formData[field.id] || ''}
                        onChange={e => handleInput(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        rows={4}
                        style={{...inputStyle, resize: 'none', lineHeight: 1.7}}
                      />
                    ) : (
                      <input
                        type="text"
                        value={formData[field.id] || ''}
                        onChange={e => handleInput(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        style={inputStyle}
                      />
                    )}
                  </div>
                ))}
              </div>

              {error && (
                <div style={{marginTop: '16px', background: 'rgba(255,50,50,0.05)', border: '1px solid rgba(255,50,50,0.2)', borderRadius: '8px', padding: '12px', fontSize: '13px', color: '#ff6b6b'}}>
                  ❌ {error}
                </div>
              )}

              <button onClick={generateDocument} disabled={loading}
                style={{marginTop: '24px', width: '100%', padding: '14px', background: loading ? 'rgba(201,168,76,0.3)' : 'linear-gradient(135deg, var(--gold), var(--gold-dim))', color: 'var(--black)', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'Outfit, sans-serif'}}>
                {loading ? '⏳ Drafting your document...' : '📄 Generate Legal Document'}
              </button>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '48px', textAlign: 'center', marginTop: '20px'}}>
            <div style={{width: '48px', height: '48px', border: '3px solid rgba(201,168,76,0.2)', borderTop: '3px solid var(--gold)', borderRadius: '50%', margin: '0 auto 20px', animation: 'spin 1s linear infinite'}}/>
            <p style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', color: 'var(--off-white)', marginBottom: '6px'}}>Drafting your legal document...</p>
            <p style={{fontSize: '13px', color: 'var(--text-dim)', fontWeight: 300}}>Applying correct Indian legal format and procedures</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* Generated Document */}
        {document && (
          <div>
            <button onClick={() => { setDocument(''); setSelected(null); }}
              style={{fontSize: '13px', color: 'var(--gold)', background: 'transparent', border: 'none', cursor: 'pointer', marginBottom: '24px', fontFamily: 'Outfit, sans-serif'}}>
              ← Draft another document
            </button>

            <div style={{background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '28px'}}>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border)', flexWrap: 'wrap', gap: '12px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                  <div style={{width: '32px', height: '32px', background: 'linear-gradient(135deg, var(--gold), var(--gold-dim))', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px'}}>📄</div>
                  <span style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontWeight: 600, color: 'var(--off-white)'}}>Your {selected.title}</span>
                </div>
                <div style={{display: 'flex', gap: '8px'}}>
                  <button onClick={copyDocument}
                    style={{fontSize: '12px', padding: '8px 16px', borderRadius: '8px', background: copied ? 'rgba(201,168,76,0.2)' : 'transparent', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--gold)', cursor: 'pointer', fontFamily: 'Outfit, sans-serif'}}>
                    {copied ? '✅ Copied!' : '📋 Copy'}
                  </button>
                  <button onClick={printDocument}
                    style={{fontSize: '12px', padding: '8px 16px', borderRadius: '8px', background: 'linear-gradient(135deg, var(--gold), var(--gold-dim))', border: 'none', color: 'var(--black)', cursor: 'pointer', fontWeight: 600, fontFamily: 'Outfit, sans-serif'}}>
                    🖨️ Print / Download
                  </button>
                </div>
              </div>

              <div style={{fontSize: '13px', lineHeight: 1.8, color: 'var(--text-muted)', whiteSpace: 'pre-wrap', fontFamily: 'Georgia, serif', background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border)'}}>
                {document}
              </div>

              <div style={{marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border)', fontSize: '12px', color: 'var(--text-dim)'}}>
                ⚠️ This document is AI-generated. Please review carefully and consult a qualified advocate before filing.
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}