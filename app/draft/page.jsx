'use client';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import LanguageToggle from '../components/LanguageToggle';
import { stripMarkdown, printMarkdown } from '../utils/markdownUtils';

const documentTypes = [
  // Original 6
  { id: 'consumer_complaint', icon: '🛒', title: 'Consumer Complaint',    category: 'Dispute',   law: 'Consumer Protection Act, 2019',           fields: [{ id: 'complainant_name', label: 'Your Full Name', placeholder: 'e.g. Mohammed Hasan Khan' },{ id: 'complainant_address', label: 'Your Full Address', placeholder: 'House No, Street, City, State, PIN' },{ id: 'complainant_phone', label: 'Your Phone Number', placeholder: 'e.g. 9876543210' },{ id: 'opposite_party', label: 'Opposite Party (Company/Person)', placeholder: 'e.g. Amazon India Pvt Ltd' },{ id: 'opposite_address', label: 'Opposite Party Address', placeholder: 'Registered office address' },{ id: 'complaint_details', label: 'Details of Complaint', placeholder: 'Describe what happened, when it happened, and how you were harmed', textarea: true },{ id: 'relief_sought', label: 'Relief Sought', placeholder: 'e.g. Refund of Rs.5000, compensation of Rs.10000' },{ id: 'transaction_date', label: 'Date of Transaction/Incident', placeholder: 'e.g. 15 January 2025' }] },
  { id: 'legal_notice',       icon: '📬', title: 'Legal Notice',           category: 'Dispute',   law: 'Code of Civil Procedure, 1908',           fields: [{ id: 'sender_name', label: 'Your Full Name', placeholder: 'e.g. Mohammed Hasan Khan' },{ id: 'sender_address', label: 'Your Full Address', placeholder: 'House No, Street, City, State, PIN' },{ id: 'recipient_name', label: 'Recipient Name', placeholder: 'Person or company receiving notice' },{ id: 'recipient_address', label: 'Recipient Address', placeholder: 'Full address of recipient' },{ id: 'subject_matter', label: 'Subject Matter', placeholder: 'e.g. Recovery of money, breach of contract' },{ id: 'facts', label: 'Facts of the Matter', placeholder: 'Describe the full facts and background of the dispute', textarea: true },{ id: 'demand', label: 'Your Demand', placeholder: 'e.g. Pay Rs.50,000 within 15 days' },{ id: 'time_period', label: 'Time Period Given', placeholder: 'e.g. 15 days, 30 days' }] },
  { id: 'rti_application',    icon: '📋', title: 'RTI Application',        category: 'Government',law: 'Right to Information Act, 2005',          fields: [{ id: 'applicant_name', label: 'Your Full Name', placeholder: 'e.g. Mohammed Hasan Khan' },{ id: 'applicant_address', label: 'Your Full Address', placeholder: 'House No, Street, City, State, PIN' },{ id: 'public_authority', label: 'Public Authority', placeholder: 'e.g. Municipal Corporation of Hyderabad' },{ id: 'information_sought', label: 'Information Sought', placeholder: 'Describe clearly what information you want', textarea: true },{ id: 'time_period_info', label: 'Time Period of Information', placeholder: 'e.g. From January 2020 to December 2024' }] },
  { id: 'fir_complaint',      icon: '👮', title: 'Police Complaint',       category: 'Criminal',  law: 'Code of Criminal Procedure, 1973 — S.154',fields: [{ id: 'complainant_name', label: 'Your Full Name', placeholder: 'e.g. Mohammed Hasan Khan' },{ id: 'complainant_address', label: 'Your Full Address', placeholder: 'House No, Street, City, State, PIN' },{ id: 'complainant_phone', label: 'Your Phone Number', placeholder: 'e.g. 9876543210' },{ id: 'accused_name', label: 'Accused Name (if known)', placeholder: 'Name of accused or Unknown' },{ id: 'incident_date', label: 'Date & Time of Incident', placeholder: 'e.g. 10 March 2025, 8:00 PM' },{ id: 'incident_place', label: 'Place of Incident', placeholder: 'Full address where incident occurred' },{ id: 'incident_details', label: 'Details of Incident', placeholder: 'Describe exactly what happened in detail', textarea: true },{ id: 'witnesses', label: 'Witnesses (if any)', placeholder: 'Names and addresses of witnesses, or None' }] },
  { id: 'bail_application',   icon: '⚖️', title: 'Bail Application',       category: 'Criminal',  law: 'CrPC Section 437 / 438',                  fields: [{ id: 'applicant_name', label: 'Applicant Name (Accused)', placeholder: 'Full name of accused' },{ id: 'applicant_address', label: 'Applicant Address', placeholder: 'Full residential address' },{ id: 'case_number', label: 'FIR/Case Number', placeholder: 'e.g. FIR No. 123/2025' },{ id: 'police_station', label: 'Police Station', placeholder: 'Name of police station' },{ id: 'offence', label: 'Offence Charged With', placeholder: 'e.g. Section 420 IPC — Cheating' },{ id: 'arrest_date', label: 'Date of Arrest', placeholder: 'e.g. 1 March 2025' },{ id: 'grounds', label: 'Grounds for Bail', placeholder: 'e.g. No prior criminal record, cooperative with investigation', textarea: true }] },
  { id: 'affidavit',          icon: '📜', title: 'General Affidavit',      category: 'Personal',  law: 'Indian Evidence Act, 1872',               fields: [{ id: 'deponent_name', label: 'Your Full Name (Deponent)', placeholder: 'e.g. Mohammed Hasan Khan' },{ id: 'deponent_age', label: 'Your Age', placeholder: 'e.g. 22' },{ id: 'deponent_address', label: 'Your Full Address', placeholder: 'House No, Street, City, State, PIN' },{ id: 'purpose', label: 'Purpose of Affidavit', placeholder: 'e.g. Address proof, name change, property declaration' },{ id: 'statements', label: 'Statements to Declare', placeholder: 'Write all facts you want to declare under oath', textarea: true }] },
  // New 10
  { id: 'rent_agreement',     icon: '🏠', title: 'Rent Agreement',         category: 'Property',  law: 'Transfer of Property Act, 1882',          fields: [{ id: 'landlord_name', label: 'Landlord Full Name', placeholder: 'e.g. Ramesh Kumar' },{ id: 'landlord_address', label: 'Landlord Permanent Address', placeholder: 'Full permanent address' },{ id: 'tenant_name', label: 'Tenant Full Name', placeholder: 'e.g. Mohammed Hasan Khan' },{ id: 'tenant_address', label: 'Tenant Permanent Address', placeholder: 'Full permanent address of tenant' },{ id: 'property_address', label: 'Property Address (to be rented)', placeholder: 'Full address of the rental property' },{ id: 'monthly_rent', label: 'Monthly Rent (Rs.)', placeholder: 'e.g. Rs.12,000' },{ id: 'security_deposit', label: 'Security Deposit (Rs.)', placeholder: 'e.g. Rs.24,000 (2 months)' },{ id: 'start_date', label: 'Lease Start Date', placeholder: 'e.g. 1 April 2025' },{ id: 'duration', label: 'Lease Duration', placeholder: 'e.g. 11 months' },{ id: 'state', label: 'State', placeholder: 'e.g. Telangana' }] },
  { id: 'employment',         icon: '💼', title: 'Employment Contract',    category: 'Business',  law: 'Indian Contract Act, 1872',               fields: [{ id: 'employer_name', label: 'Employer / Company Name', placeholder: 'e.g. Firm Tech Pvt Ltd' },{ id: 'employer_address', label: 'Company Registered Address', placeholder: 'Full registered address' },{ id: 'employee_name', label: 'Employee Full Name', placeholder: 'e.g. Mohammed Hasan Khan' },{ id: 'designation', label: 'Designation / Role', placeholder: 'e.g. Legal Associate' },{ id: 'start_date', label: 'Start Date', placeholder: 'e.g. 1 April 2025' },{ id: 'salary', label: 'Monthly Salary (Rs.)', placeholder: 'e.g. Rs.35,000 per month' },{ id: 'probation', label: 'Probation Period', placeholder: 'e.g. 3 months' },{ id: 'notice_period', label: 'Notice Period', placeholder: 'e.g. 30 days' },{ id: 'duties', label: 'Key Duties & Responsibilities', placeholder: 'List major job responsibilities', textarea: true },{ id: 'state', label: 'State', placeholder: 'e.g. Telangana' }] },
  { id: 'power_of_attorney',  icon: '✍️', title: 'Power of Attorney',      category: 'Personal',  law: 'Powers of Attorney Act, 1882',            fields: [{ id: 'grantor_name', label: 'Grantor Full Name (You)', placeholder: 'e.g. Mohammed Hasan Khan' },{ id: 'grantor_address', label: 'Grantor Full Address', placeholder: 'Full address' },{ id: 'agent_name', label: 'Agent / Attorney Name', placeholder: 'Person receiving the power' },{ id: 'agent_address', label: 'Agent Full Address', placeholder: 'Full address of agent' },{ id: 'powers_granted', label: 'Powers Granted', placeholder: 'e.g. Sell property, manage bank accounts, sign documents', textarea: true },{ id: 'limitations', label: 'Specific Limitations (if any)', placeholder: 'e.g. Cannot sell below Rs.50 lakhs, or write None' },{ id: 'duration', label: 'Duration', placeholder: 'e.g. 1 year from date, or Until revoked' },{ id: 'state', label: 'State', placeholder: 'e.g. Telangana' }] },
  { id: 'will',               icon: '🏦', title: 'Will / Testament',       category: 'Personal',  law: 'Indian Succession Act, 1925',             fields: [{ id: 'testator_name', label: 'Your Full Name (Testator)', placeholder: 'e.g. Mohammed Hasan Khan' },{ id: 'testator_address', label: 'Your Full Address', placeholder: 'Full address' },{ id: 'testator_age', label: 'Your Age', placeholder: 'e.g. 45' },{ id: 'beneficiary1', label: 'Beneficiary 1 — Name & Share', placeholder: 'e.g. Fatima Khan — 50% of all assets' },{ id: 'beneficiary2', label: 'Beneficiary 2 — Name & Share', placeholder: 'e.g. Ali Khan — 50% of all assets' },{ id: 'assets', label: 'Assets / Property Details', placeholder: 'Describe all assets: property, bank accounts, investments, etc.', textarea: true },{ id: 'executor_name', label: 'Executor Name', placeholder: 'Person who will carry out the Will' },{ id: 'witness1', label: 'Witness 1 Name', placeholder: 'e.g. Suresh Kumar' },{ id: 'witness2', label: 'Witness 2 Name', placeholder: 'e.g. Priya Sharma' }] },
  { id: 'partnership_deed',   icon: '🤝', title: 'Partnership Deed',       category: 'Business',  law: 'Indian Partnership Act, 1932',            fields: [{ id: 'firm_name', label: 'Firm Name', placeholder: 'e.g. Khan & Associates' },{ id: 'partner1', label: 'Partner 1 — Name & Capital', placeholder: 'e.g. Mohammed Hasan — Rs.5,00,000' },{ id: 'partner2', label: 'Partner 2 — Name & Capital', placeholder: 'e.g. Ramesh Kumar — Rs.5,00,000' },{ id: 'partner3', label: 'Partner 3 — Name & Capital (if any)', placeholder: 'e.g. None, or name and capital amount' },{ id: 'business_nature', label: 'Nature of Business', placeholder: 'e.g. Legal consultancy services' },{ id: 'profit_ratio', label: 'Profit Sharing Ratio', placeholder: 'e.g. 50:50 or 60:40' },{ id: 'duration', label: 'Duration', placeholder: 'e.g. From 1 April 2025, until dissolved' },{ id: 'office', label: 'Registered Office Address', placeholder: 'Principal place of business' },{ id: 'state', label: 'State', placeholder: 'e.g. Telangana' }] },
  { id: 'sale_deed',          icon: '🔑', title: 'Sale Deed',              category: 'Property',  law: 'Transfer of Property Act, 1882',          fields: [{ id: 'seller_name', label: 'Seller Full Name', placeholder: 'e.g. Ramesh Kumar' },{ id: 'seller_address', label: 'Seller Full Address', placeholder: 'Full address' },{ id: 'buyer_name', label: 'Buyer Full Name', placeholder: 'e.g. Mohammed Hasan Khan' },{ id: 'buyer_address', label: 'Buyer Full Address', placeholder: 'Full address' },{ id: 'property_desc', label: 'Property Description', placeholder: 'Survey No., area in sq ft, boundaries, and full address of property', textarea: true },{ id: 'sale_amount', label: 'Sale Consideration (Rs.)', placeholder: 'e.g. Rs.45,00,000' },{ id: 'sale_date', label: 'Date of Sale', placeholder: 'e.g. 1 April 2025' },{ id: 'sub_registrar', label: 'Sub-Registrar Office', placeholder: 'e.g. Sub-Registrar, Hyderabad' },{ id: 'state', label: 'State', placeholder: 'e.g. Telangana' }] },
  { id: 'loan_agreement',     icon: '💰', title: 'Loan Agreement',         category: 'Finance',   law: 'Indian Contract Act, 1872',               fields: [{ id: 'lender_name', label: 'Lender Full Name', placeholder: 'e.g. Ramesh Kumar' },{ id: 'lender_address', label: 'Lender Full Address', placeholder: 'Full address' },{ id: 'borrower_name', label: 'Borrower Full Name', placeholder: 'e.g. Mohammed Hasan Khan' },{ id: 'borrower_address', label: 'Borrower Full Address', placeholder: 'Full address' },{ id: 'loan_amount', label: 'Loan Amount (Rs.)', placeholder: 'e.g. Rs.2,00,000' },{ id: 'interest_rate', label: 'Interest Rate (% per annum)', placeholder: 'e.g. 12% per annum, or 0% if interest-free' },{ id: 'repayment_period', label: 'Repayment Period', placeholder: 'e.g. 12 months' },{ id: 'repayment_schedule', label: 'Repayment Schedule', placeholder: 'e.g. Rs.18,000 per month on 1st of each month' },{ id: 'penalty', label: 'Penalty for Default', placeholder: 'e.g. 2% extra interest per month on overdue amount' },{ id: 'state', label: 'State', placeholder: 'e.g. Telangana' }] },
  { id: 'nda',                icon: '🔒', title: 'NDA',                    category: 'Business',  law: 'Indian Contract Act, 1872',               fields: [{ id: 'disclosing_name', label: 'Disclosing Party Name', placeholder: 'Company or person sharing information' },{ id: 'disclosing_address', label: 'Disclosing Party Address', placeholder: 'Full address' },{ id: 'receiving_name', label: 'Receiving Party Name', placeholder: 'Company or person receiving information' },{ id: 'receiving_address', label: 'Receiving Party Address', placeholder: 'Full address' },{ id: 'purpose', label: 'Purpose of Disclosure', placeholder: 'e.g. Evaluating a potential business partnership' },{ id: 'confidential_info', label: 'Confidential Information Description', placeholder: 'What type of information is being shared?', textarea: true },{ id: 'duration', label: 'Duration of Confidentiality', placeholder: 'e.g. 2 years from date of signing' },{ id: 'state', label: 'Governing Law (State)', placeholder: 'e.g. Telangana' }] },
  { id: 'demand_notice',      icon: '📩', title: 'Demand Notice',          category: 'Dispute',   law: 'Indian Contract Act, 1872',               fields: [{ id: 'sender_name', label: 'Sender Full Name', placeholder: 'e.g. Mohammed Hasan Khan' },{ id: 'sender_address', label: 'Sender Full Address', placeholder: 'Full address' },{ id: 'recipient_name', label: 'Recipient Full Name', placeholder: 'Person or company receiving notice' },{ id: 'recipient_address', label: 'Recipient Full Address', placeholder: 'Full address' },{ id: 'amount_demanded', label: 'Amount / Relief Demanded', placeholder: 'e.g. Rs.75,000 being the outstanding dues' },{ id: 'basis_of_demand', label: 'Basis of Demand', placeholder: 'Why is this amount owed? Describe the background', textarea: true },{ id: 'time_to_comply', label: 'Time Given to Comply (days)', placeholder: 'e.g. 15 days' },{ id: 'consequence', label: 'Consequence of Non-compliance', placeholder: 'e.g. Legal proceedings will be initiated without further notice' }] },
];

const CATEGORIES = ['All', 'Dispute', 'Criminal', 'Property', 'Business', 'Personal', 'Finance', 'Government'];

const markdownStyles = `
  .markdown-body { font-family: 'Georgia', serif; font-size: 13.5px; line-height: 1.85; color: rgba(245,240,232,0.85); }
  .markdown-body h1, .markdown-body h2, .markdown-body h3 { font-family: 'Cormorant Garamond', serif; color: #f5f0e8; margin: 18px 0 8px; font-weight: 600; }
  .markdown-body h1 { font-size: 19px; text-align: center; }
  .markdown-body h2 { font-size: 15px; color: #c9a84c; }
  .markdown-body h3 { font-size: 13.5px; }
  .markdown-body strong { color: #f5f0e8; font-weight: 600; }
  .markdown-body ul, .markdown-body ol { padding-left: 20px; margin: 8px 0; }
  .markdown-body li { margin: 5px 0; }
  .markdown-body p { margin: 9px 0; }
  .markdown-body hr { border: none; border-top: 1px solid rgba(201,168,76,0.2); margin: 14px 0; }
`;

const inputStyle = {
  width: '100%',
  background: '#1a1a1a',
  border: '2px solid rgba(201,168,76,0.4)',
  borderRadius: '8px',
  padding: '10px 12px',
  fontSize: '13px',
  color: '#f5f0e8',
  outline: 'none',
  fontFamily: 'Outfit, sans-serif',
  boxSizing: 'border-box',
};

export default function DraftDocument() {
  const [selected, setSelected]       = useState(null);
  const [formData, setFormData]       = useState({});
  const [generatedDoc, setGeneratedDoc] = useState('');
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState('');
  const [copied, setCopied]           = useState(false);
  const [language, setLanguage]       = useState('english');
  const [category, setCategory]       = useState('All');
  const [drafts, setDrafts]           = useState([]);
  const [showDrafts, setShowDrafts]   = useState(false);
  const [draftSaved, setDraftSaved]   = useState(false);

  // Load saved drafts from localStorage on mount
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('firmlaw_drafts') || '[]');
      setDrafts(saved);
    } catch {}
  }, []);

  // Auto-restore fields when switching document type
  useEffect(() => {
    if (selected) {
      try {
        const saved = JSON.parse(localStorage.getItem(`firmlaw_fields_${selected.id}`) || 'null');
        if (saved) setFormData(saved);
        else setFormData({});
      } catch { setFormData({}); }
      setGeneratedDoc('');
      setError('');
    }
  }, [selected]);

  // Auto-save fields to localStorage whenever they change
  useEffect(() => {
    if (selected && Object.keys(formData).length > 0) {
      try {
        localStorage.setItem(`firmlaw_fields_${selected.id}`, JSON.stringify(formData));
      } catch {}
    }
  }, [formData, selected]);

  function selectDoc(doc) {
    setSelected(doc);
    setGeneratedDoc('');
    setError('');
  }

  function handleInput(fieldId, value) {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  }

  function clearForm() {
    setFormData({});
    setGeneratedDoc('');
    setError('');
    if (selected) {
      try { localStorage.removeItem(`firmlaw_fields_${selected.id}`); } catch {}
    }
  }

  async function generateDocument() {
    const missing = selected.fields.filter(f => !formData[f.id]?.trim());
    if (missing.length > 0) {
      setError(`Please fill in: ${missing.map(f => f.label).join(', ')}`);
      return;
    }
    setLoading(true);
    setGeneratedDoc('');
    setError('');

    const details = selected.fields.map(f => `${f.label}: ${formData[f.id]}`).join('\n');
    const prompt = `Draft a formal ${selected.title} as per Indian law (${selected.law}) in ${language} language.\n\nDetails provided:\n${details}\n\nRequirements:\n- Use proper Indian legal format with correct headings\n- Include all relevant sections, Acts, and legal clauses\n- Use formal legal language throughout\n- Include date, signature lines, and witness blocks where needed\n- Make it complete, ready to print and file\n- Follow all procedural requirements under Indian law`;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt, history: [], systemContext: 'document-drafting', language }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setGeneratedDoc(data.reply || data.response || '');
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  }

  function saveDraft() {
    if (!generatedDoc || !selected) return;
    const newDraft = {
      id: Date.now(),
      docId: selected.id,
      docTitle: selected.title,
      docIcon: selected.icon,
      formData,
      generatedDoc,
      language,
      savedAt: new Date().toLocaleString('en-IN'),
    };
    const updated = [newDraft, ...drafts].slice(0, 15);
    setDrafts(updated);
    try { localStorage.setItem('firmlaw_drafts', JSON.stringify(updated)); } catch {}
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2500);
  }

  function loadDraft(draft) {
    const doc = documentTypes.find(d => d.id === draft.docId);
    if (doc) {
      setSelected(doc);
      setFormData(draft.formData);
      setGeneratedDoc(draft.generatedDoc);
      setLanguage(draft.language);
      setShowDrafts(false);
    }
  }

  function deleteDraft(id, e) {
    e.stopPropagation();
    const updated = drafts.filter(d => d.id !== id);
    setDrafts(updated);
    try { localStorage.setItem('firmlaw_drafts', JSON.stringify(updated)); } catch {}
  }

  function copyDocument() {
    navigator.clipboard.writeText(stripMarkdown(generatedDoc));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function printDocument() {
    printMarkdown(
      selected.title,
      'Legal Document — Firm Law AI',
      generatedDoc,
      'This document was AI-generated by Firm Law AI. Please review carefully and consult a qualified advocate before filing.'
    );
  }

  const filteredDocs = category === 'All'
    ? documentTypes
    : documentTypes.filter(d => d.category === category);

  const filledCount = selected ? selected.fields.filter(f => formData[f.id]?.trim()).length : 0;
  const totalFields = selected ? selected.fields.length : 0;
  const progress    = totalFields > 0 ? Math.round((filledCount / totalFields) * 100) : 0;

  return (
    <div style={{background: 'var(--black)', minHeight: '100vh'}}>
      <style>{markdownStyles}</style>

      {/* ── Header ── */}
      <div style={{background: 'var(--black-card)', borderBottom: '1px solid var(--border)', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px'}}>
        <div>
          <h1 style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '26px', fontWeight: 600, color: 'var(--off-white)', margin: 0}}>📄 Draft Legal Documents</h1>
          <p style={{fontSize: '12px', color: 'var(--text-dim)', margin: '4px 0 0', fontWeight: 300}}>16 document types · Side-by-side preview · Auto-saved drafts</p>
        </div>
        <div style={{display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap'}}>
          <LanguageToggle language={language} setLanguage={setLanguage} />
          <button onClick={() => setShowDrafts(!showDrafts)}
            style={{padding: '8px 16px', background: drafts.length > 0 ? 'rgba(201,168,76,0.15)' : 'transparent', border: '1px solid rgba(201,168,76,0.35)', borderRadius: '8px', color: '#c9a84c', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Outfit, sans-serif'}}>
            🗂️ Saved Drafts {drafts.length > 0 && `(${drafts.length})`}
          </button>
        </div>
      </div>

      {/* ── Saved Drafts Panel ── */}
      {showDrafts && (
        <div style={{background: '#111', borderBottom: '1px solid var(--border)', padding: '20px 24px'}}>
          <h3 style={{color: '#c9a84c', fontFamily: 'Cormorant Garamond, serif', margin: '0 0 14px', fontSize: '17px'}}>🗂️ Your Saved Drafts</h3>
          {drafts.length === 0 ? (
            <p style={{color: 'var(--text-dim)', fontSize: '13px'}}>No saved drafts yet. Generate a document and click "Save Draft".</p>
          ) : (
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px'}}>
              {drafts.map(draft => (
                <div key={draft.id} onClick={() => loadDraft(draft)}
                  style={{background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden'}}>
                    <span style={{fontSize: '22px', flexShrink: 0}}>{draft.docIcon}</span>
                    <div style={{overflow: 'hidden'}}>
                      <div style={{fontSize: '13px', fontWeight: 600, color: 'var(--off-white)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{draft.docTitle}</div>
                      <div style={{fontSize: '11px', color: 'var(--text-dim)', marginTop: '2px'}}>{draft.savedAt}</div>
                    </div>
                  </div>
                  <div style={{display: 'flex', gap: '6px', flexShrink: 0}}>
                    <span style={{fontSize: '11px', padding: '4px 10px', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '6px', color: '#c9a84c', fontWeight: 600}}>Load</span>
                    <span onClick={e => deleteDraft(draft.id, e)}
                      style={{fontSize: '11px', padding: '4px 10px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '6px', color: '#ef4444', fontWeight: 600, cursor: 'pointer'}}>✕</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div style={{maxWidth: '1400px', margin: '0 auto', padding: '24px 20px 80px'}}>

        {/* ── Document Type Selector ── */}
        <div style={{background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px', marginBottom: '24px'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '10px'}}>
            <p style={{fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '1.5px', textTransform: 'uppercase', margin: 0}}>Select Document Type</p>
            <div style={{display: 'flex', gap: '6px', flexWrap: 'wrap'}}>
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setCategory(cat)}
                  style={{padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', border: '1px solid var(--border)', fontFamily: 'Outfit, sans-serif', transition: 'all 0.2s',
                    background: category === cat ? '#c9a84c' : 'transparent',
                    color: category === cat ? '#000' : 'var(--text-dim)'}}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))', gap: '10px'}}>
            {filteredDocs.map(doc => (
              <button key={doc.id} onClick={() => selectDoc(doc)}
                style={{padding: '14px 10px', borderRadius: '12px', border: `2px solid ${selected?.id === doc.id ? '#c9a84c' : 'var(--border)'}`,
                  background: selected?.id === doc.id ? 'rgba(201,168,76,0.1)' : 'transparent',
                  cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s', fontFamily: 'Outfit, sans-serif'}}>
                <div style={{fontSize: '22px', marginBottom: '6px'}}>{doc.icon}</div>
                <div style={{fontSize: '12px', fontWeight: 600, color: selected?.id === doc.id ? '#c9a84c' : '#fff', lineHeight: 1.3}}>{doc.title}</div>
                <div style={{fontSize: '10px', color: 'var(--text-dim)', marginTop: '4px'}}>{doc.category}</div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Side-by-Side Layout ── */}
        {selected && (
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'start'}}>

            {/* LEFT — Form */}
            <div style={{background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', position: 'sticky', top: '16px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', paddingBottom: '14px', borderBottom: '1px solid var(--border)'}}>
                <span style={{fontSize: '28px'}}>{selected.icon}</span>
                <div>
                  <h2 style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '19px', fontWeight: 600, color: 'var(--off-white)', margin: 0}}>{selected.title}</h2>
                  <p style={{fontSize: '11px', color: 'var(--text-dim)', margin: '3px 0 0'}}>{selected.law}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{marginBottom: '16px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '6px'}}>
                  <span style={{fontSize: '11px', color: 'var(--text-dim)'}}>Fields filled</span>
                  <span style={{fontSize: '11px', fontWeight: 700, color: progress === 100 ? '#22c55e' : '#c9a84c'}}>{filledCount}/{totalFields} ({progress}%)</span>
                </div>
                <div style={{height: '5px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden'}}>
                  <div style={{height: '100%', width: `${progress}%`, background: progress === 100 ? '#22c55e' : 'linear-gradient(90deg, #c9a84c, #8a6f2e)', borderRadius: '3px', transition: 'width 0.35s ease'}} />
                </div>
              </div>

              {/* Fields */}
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '400px', overflowY: 'auto', paddingRight: '4px'}}>
                {selected.fields.map(field => (
                  <div key={field.id}>
                    <label style={{display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(245,240,232,0.7)', marginBottom: '5px'}}>{field.label}</label>
                    {field.textarea ? (
                      <textarea value={formData[field.id] || ''} onChange={e => handleInput(field.id, e.target.value)}
                        placeholder={field.placeholder} rows={3}
                        style={{...inputStyle, resize: 'vertical', lineHeight: 1.65,
                          borderColor: formData[field.id]?.trim() ? 'rgba(201,168,76,0.7)' : 'rgba(201,168,76,0.3)'}} />
                    ) : (
                      <input type="text" value={formData[field.id] || ''} onChange={e => handleInput(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        style={{...inputStyle,
                          borderColor: formData[field.id]?.trim() ? 'rgba(201,168,76,0.7)' : 'rgba(201,168,76,0.3)'}} />
                    )}
                  </div>
                ))}
              </div>

              {error && (
                <div style={{marginTop: '14px', background: 'rgba(255,50,50,0.05)', border: '1px solid rgba(255,50,50,0.2)', borderRadius: '8px', padding: '10px 12px', fontSize: '12px', color: '#ff6b6b'}}>❌ {error}</div>
              )}

              <div style={{marginTop: '16px', display: 'flex', gap: '8px'}}>
                <button onClick={generateDocument} disabled={loading}
                  style={{flex: 1, padding: '13px', background: loading ? 'rgba(201,168,76,0.3)' : 'linear-gradient(135deg, #c9a84c, #8a6f2e)', color: '#000', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'Outfit, sans-serif'}}>
                  {loading ? '⏳ Generating...' : '✨ Generate Document'}
                </button>
                <button onClick={clearForm} title="Clear all fields"
                  style={{padding: '13px 14px', background: 'transparent', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text-dim)', fontSize: '14px', cursor: 'pointer'}}>
                  🗑️
                </button>
              </div>
              <p style={{fontSize: '10px', color: 'var(--text-dim)', textAlign: 'center', marginTop: '8px', lineHeight: 1.5}}>
                ⚠️ Fields auto-saved to your browser. For reference only — consult a lawyer before filing.
              </p>
            </div>

            {/* RIGHT — Preview */}
            <div style={{background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px'}}>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '14px', borderBottom: '1px solid var(--border)', flexWrap: 'wrap', gap: '10px'}}>
                <h2 style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '17px', fontWeight: 600, color: 'var(--off-white)', margin: 0}}>
                  {generatedDoc ? '📄 Document Preview' : '👁️ Preview'}
                </h2>
                {generatedDoc && (
                  <div style={{display: 'flex', gap: '7px', flexWrap: 'wrap'}}>
                    <button onClick={copyDocument}
                      style={{padding: '6px 13px', background: copied ? 'rgba(34,197,94,0.2)' : 'transparent', border: `1px solid ${copied ? 'rgba(34,197,94,0.4)' : 'rgba(201,168,76,0.35)'}`, borderRadius: '7px', color: copied ? '#22c55e' : '#c9a84c', fontSize: '11px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Outfit, sans-serif'}}>
                      {copied ? '✓ Copied' : '📋 Copy'}
                    </button>
                    <button onClick={printDocument}
                      style={{padding: '6px 13px', background: 'transparent', border: '1px solid rgba(201,168,76,0.35)', borderRadius: '7px', color: '#c9a84c', fontSize: '11px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Outfit, sans-serif'}}>
                      🖨️ Print / PDF
                    </button>
                    <button onClick={saveDraft}
                      style={{padding: '6px 13px', background: draftSaved ? 'rgba(34,197,94,0.2)' : 'rgba(201,168,76,0.12)', border: `1px solid ${draftSaved ? 'rgba(34,197,94,0.4)' : 'rgba(201,168,76,0.35)'}`, borderRadius: '7px', color: draftSaved ? '#22c55e' : '#c9a84c', fontSize: '11px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Outfit, sans-serif'}}>
                      {draftSaved ? '✓ Saved!' : '💾 Save Draft'}
                    </button>
                  </div>
                )}
              </div>

              {loading && (
                <div style={{textAlign: 'center', padding: '60px 20px'}}>
                  <div style={{width: '44px', height: '44px', border: '3px solid rgba(201,168,76,0.2)', borderTop: '3px solid #c9a84c', borderRadius: '50%', margin: '0 auto 18px', animation: 'spin 1s linear infinite'}} />
                  <p style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', color: 'var(--off-white)', margin: '0 0 6px'}}>Drafting your document...</p>
                  <p style={{fontSize: '12px', color: 'var(--text-dim)', fontWeight: 300}}>Applying Indian legal format and procedures</p>
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
              )}

              {!loading && !generatedDoc && (
                <div style={{textAlign: 'center', padding: '60px 20px'}}>
                  <div style={{fontSize: '48px', marginBottom: '16px', opacity: 0.3}}>📄</div>
                  <p style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '17px', color: 'rgba(245,240,232,0.35)', margin: '0 0 8px'}}>Your document will appear here</p>
                  <p style={{fontSize: '12px', color: 'var(--text-dim)', fontWeight: 300}}>Fill in the fields on the left and click Generate</p>
                </div>
              )}

              {!loading && generatedDoc && (
                <>
                  <div className="markdown-body" style={{background: 'rgba(255,255,255,0.025)', padding: '18px', borderRadius: '10px', border: '1px solid var(--border)', maxHeight: '560px', overflowY: 'auto'}}>
                    <ReactMarkdown>{generatedDoc}</ReactMarkdown>
                  </div>
                  <div style={{marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--border)', fontSize: '11px', color: 'var(--text-dim)'}}>
                    ⚠️ AI-generated document. Review carefully and consult a qualified advocate before filing.
                  </div>
                  <a href="/chat?from=draft" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,168,76,0.04))', border: '1px solid rgba(201,168,76,0.25)', borderRadius: '10px', padding: '12px 16px', marginTop: '14px', textDecoration: 'none', color: 'inherit', flexWrap: 'wrap', gap: '8px'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <span style={{fontSize: '18px'}}>🤖</span>
                      <div>
                        <p style={{fontSize: '12px', fontWeight: 600, color: '#c9a84c', margin: 0}}>Have questions about this document?</p>
                        <p style={{fontSize: '11px', color: 'rgba(245,240,232,0.4)', margin: 0}}>Switch to Chat Mode for follow-up questions</p>
                      </div>
                    </div>
                    <span style={{fontSize: '11px', fontWeight: 600, color: '#000', background: 'linear-gradient(135deg, #c9a84c, #8a6f2e)', padding: '5px 12px', borderRadius: '7px', whiteSpace: 'nowrap'}}>💬 Open Chat →</span>
                  </a>
                </>
              )}
            </div>
          </div>
        )}

        {/* ── No doc selected — chat banner ── */}
        {!selected && (
          <a href="/chat?from=draft" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(135deg, rgba(201,168,76,0.1), rgba(201,168,76,0.05))', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '12px', padding: '14px 20px', textDecoration: 'none', color: 'inherit', flexWrap: 'wrap', gap: '10px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <span style={{fontSize: '20px'}}>🤖</span>
              <div>
                <p style={{fontSize: '13px', fontWeight: 600, color: '#c9a84c', margin: 0}}>Not sure which document you need?</p>
                <p style={{fontSize: '12px', color: 'rgba(245,240,232,0.5)', margin: 0}}>Switch to Chat Mode — describe your situation and get guidance</p>
              </div>
            </div>
            <span style={{fontSize: '12px', fontWeight: 600, color: '#000', background: 'linear-gradient(135deg, #c9a84c, #8a6f2e)', padding: '6px 14px', borderRadius: '8px', whiteSpace: 'nowrap'}}>💬 Open Chat →</span>
          </a>
        )}

      </div>
    </div>
  );
}