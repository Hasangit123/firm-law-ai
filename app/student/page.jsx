'use client';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import LanguageToggle from '../components/LanguageToggle';
import { stripMarkdown, printMarkdown } from '../utils/markdownUtils';

// ── Syllabus Data ──────────────────────────────────────────────────────────────
const SYLLABUS = {
  '3yr': {
    label: '3-Year LLB',
    semesters: {
      'Sem 1': ['Law of Contracts I', 'Law of Torts & Consumer Protection', 'Constitutional Law I', 'Legal Methods', 'English for Law'],
      'Sem 2': ['Law of Contracts II', 'Family Law I (Hindu Law)', 'Constitutional Law II', 'Law of Crimes I (IPC)', 'Environmental Law'],
      'Sem 3': ['Family Law II (Muslim & Christian Law)', 'Law of Crimes II (CrPC)', 'Property Law', 'Administrative Law', 'Jurisprudence'],
      'Sem 4': ['Company Law', 'Civil Procedure Code', 'Evidence Law', 'Labour Law I', 'Human Rights Law'],
      'Sem 5': ['Intellectual Property Law', 'Labour Law II', 'Taxation Law', 'Alternative Dispute Resolution', 'Legal Writing & Drafting'],
      'Sem 6': ['Professional Ethics & Bar Council Rules', 'Moot Court & Trial Advocacy', 'Criminology & Penology', 'International Law', 'Dissertation / Elective'],
    }
  },
  '5yr': {
    label: '5-Year BA LLB',
    semesters: {
      'Sem 5': ['Intellectual Property Law', 'Labour Law II', 'Taxation Law', 'Alternative Dispute Resolution', 'Legal Writing & Drafting'],
      'Sem 6': ['Professional Ethics & Bar Council Rules', 'Moot Court & Trial Advocacy', 'Criminology & Penology', 'International Law', 'Dissertation / Elective'],
    }
  }
};

const modes = [
  { id: 'explain', icon: '📖', title: 'Explain a Topic',     placeholder: 'e.g. Doctrine of Res Judicata, Rule of Strict Liability', buttonText: 'Explain This Topic' },
  { id: 'caselaw', icon: '⚖️', title: 'Case Law Finder',     placeholder: 'e.g. Donoghue v Stevenson, MC Mehta v Union of India',    buttonText: 'Find Case Law'       },
  { id: 'exam',    icon: '📝', title: 'Exam Q&A Practice',   placeholder: 'e.g. Explain the essentials of a valid contract',          buttonText: 'Get Model Answer'    },
  { id: 'section', icon: '📚', title: 'Bare Act Lookup',     placeholder: 'e.g. Section 375 IPC, Section 2(d) Contract Act',         buttonText: 'Look Up Section'     },
];

const markdownStyles = `
  .markdown-body { font-family: 'Outfit', sans-serif; font-size: 14px; line-height: 1.8; color: rgba(245,240,232,0.7); }
  .markdown-body h1, .markdown-body h2, .markdown-body h3 { font-family: 'Cormorant Garamond', serif; color: #f5f0e8; margin: 20px 0 10px; font-weight: 600; }
  .markdown-body h1 { font-size: 22px; }
  .markdown-body h2 { font-size: 18px; color: #c9a84c; }
  .markdown-body h3 { font-size: 16px; }
  .markdown-body strong { color: #f5f0e8; font-weight: 600; }
  .markdown-body em { color: #c9a84c; font-style: italic; }
  .markdown-body ul, .markdown-body ol { padding-left: 20px; margin: 10px 0; }
  .markdown-body li { margin: 6px 0; }
  .markdown-body p { margin: 10px 0; }
  .markdown-body blockquote { border-left: 3px solid #c9a84c; padding-left: 16px; margin: 12px 0; color: rgba(245,240,232,0.5); font-style: italic; }
  .markdown-body code { background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.2); border-radius: 4px; padding: 2px 6px; font-size: 13px; color: #c9a84c; }
  .markdown-body hr { border: none; border-top: 1px solid rgba(201,168,76,0.2); margin: 16px 0; }
  .markdown-body a { color: #c9a84c; text-decoration: underline; }
`;

const TAB_ICONS = { explain: '📖', caselaw: '⚖️', exam: '📝', section: '📚' };
const TAB_LABELS = { explain: 'Explanation', caselaw: 'Case Law', exam: 'Exam Q&A', section: 'Bare Act' };

export default function LawStudent() {
  const [selectedMode, setSelectedMode] = useState(modes[0]);
  const [input, setInput]               = useState('');
  const [answer, setAnswer]             = useState('');
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState('');
  const [copied, setCopied]             = useState(false);
  const [language, setLanguage]         = useState('english');

  // Syllabus filter state
  const [course, setCourse]             = useState('3yr');
  const [semester, setSemester]         = useState('');
  const [subject, setSubject]           = useState('');

  // Sidebar tab
  const [sideTab, setSideTab]           = useState('syllabus'); // 'syllabus' | 'bookmarks' | 'history'

  // Bookmarks & History
  const [bookmarks, setBookmarks]       = useState([]);
  const [history, setHistory]           = useState([]);
  const [showSidebar, setShowSidebar]   = useState(false);

  // Bookmark note editing
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteText, setNoteText]           = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    try {
      setBookmarks(JSON.parse(localStorage.getItem('firmlaw_student_bookmarks') || '[]'));
      setHistory(JSON.parse(localStorage.getItem('firmlaw_student_history') || '[]'));
    } catch {}
  }, []);

  const saveBM  = (bm) => { try { localStorage.setItem('firmlaw_student_bookmarks', JSON.stringify(bm)); } catch {} };
  const saveHist= (h)  => { try { localStorage.setItem('firmlaw_student_history',   JSON.stringify(h));  } catch {} };

  const semesterList = Object.keys(SYLLABUS[course].semesters);
  const subjectList  = semester ? SYLLABUS[course].semesters[semester] : [];

  function handleCourseChange(c) {
    setCourse(c);
    setSemester('');
    setSubject('');
  }

  function handleSemesterChange(s) {
    setSemester(s);
    setSubject('');
  }

  async function getAnswer(customInput) {
    const query = customInput || input;
    if (!query.trim()) return;
    setLoading(true);
    setAnswer('');
    setError('');
    setCopied(false);

    const subjectContext = subject ? ` (Subject: ${subject}, ${semester}, ${SYLLABUS[course].label})` : '';

    const prompts = {
      explain: `Explain the following legal topic for a law student in India${subjectContext}: "${query}". Provide: 1. Definition 2. Essential elements 3. Relevant Indian Acts and sections 4. Landmark cases 5. Exceptions if any 6. Exam tips`,
      caselaw: `Provide detailed information about the following case for an Indian law student${subjectContext}: "${query}". Provide: 1. Full case name and citation 2. Court and year 3. Facts 4. Issues raised 5. Judgment/Held 6. Legal principles established 7. Significance`,
      exam:    `Provide a model exam answer for the following law question${subjectContext}: "${query}". Format as: 1. Introduction 2. Main body with clear headings 3. Relevant Acts and sections 4. Supporting case laws 5. Conclusion`,
      section: `Explain the following section of Indian law${subjectContext}: "${query}". Provide: 1. Exact provision text 2. Simple explanation 3. Purpose and scope 4. Important court interpretations 5. Related sections 6. Landmark cases`,
    };

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompts[selectedMode.id], history: [], systemContext: 'student', language }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); setLoading(false); return; }

      const resultAnswer = data.reply || data.response || '';
      setAnswer(resultAnswer);

      // Auto-add to history
      const entry = {
        id: Date.now(),
        mode: selectedMode.id,
        query,
        answer: resultAnswer,
        subject: subject || null,
        semester: semester || null,
        course: SYLLABUS[course].label,
        savedAt: new Date().toLocaleString('en-IN'),
      };
      const updatedHist = [entry, ...history].slice(0, 30);
      setHistory(updatedHist);
      saveHist(updatedHist);

    } catch {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  }

  function addBookmark() {
    if (!answer || !input) return;
    const already = bookmarks.find(b => b.query === input && b.mode === selectedMode.id);
    if (already) return;
    const bm = {
      id: Date.now(),
      mode: selectedMode.id,
      query: input,
      answer,
      subject: subject || null,
      semester: semester || null,
      course: SYLLABUS[course].label,
      note: '',
      savedAt: new Date().toLocaleString('en-IN'),
    };
    const updated = [bm, ...bookmarks].slice(0, 50);
    setBookmarks(updated);
    saveBM(updated);
  }

  function deleteBookmark(id) {
    const updated = bookmarks.filter(b => b.id !== id);
    setBookmarks(updated);
    saveBM(updated);
  }

  function saveNote(id) {
    const updated = bookmarks.map(b => b.id === id ? { ...b, note: noteText } : b);
    setBookmarks(updated);
    saveBM(updated);
    setEditingNoteId(null);
    setNoteText('');
  }

  function deleteHistory(id) {
    const updated = history.filter(h => h.id !== id);
    setHistory(updated);
    saveHist(updated);
  }

  function loadEntry(entry) {
    const mode = modes.find(m => m.id === entry.mode);
    if (mode) setSelectedMode(mode);
    setInput(entry.query);
    setAnswer(entry.answer);
    if (entry.semester) setSemester(entry.semester);
    if (entry.subject)  setSubject(entry.subject);
    setShowSidebar(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function copyAnswer() {
    navigator.clipboard.writeText(stripMarkdown(answer));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function printAnswer() {
    printMarkdown(
      selectedMode.title,
      `Topic: ${input}`,
      answer,
      'This answer was AI-generated by Firm Law AI. Always verify case citations and sections with official sources before use in exams or court.'
    );
  }

  const isBookmarked = answer && bookmarks.find(b => b.query === input && b.mode === selectedMode.id);

  return (
    <div style={{background: 'var(--black)', minHeight: '100vh'}}>
      <style>{markdownStyles}</style>

      {/* ── Sidebar Overlay ── */}
      {showSidebar && (
        <div onClick={() => setShowSidebar(false)}
          style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 900}} />
      )}

      {/* ── Sidebar Panel ── */}
      <div style={{position: 'fixed', top: 0, right: showSidebar ? 0 : '-420px', width: '420px', maxWidth: '95vw', height: '100vh', background: '#111', borderLeft: '1px solid var(--border)', zIndex: 1000, transition: 'right 0.3s ease', display: 'flex', flexDirection: 'column'}}>

        {/* Sidebar Header */}
        <div style={{padding: '20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0}}>
          <h2 style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', color: 'var(--off-white)', margin: 0}}>Study Library</h2>
          <button onClick={() => setShowSidebar(false)}
            style={{background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--off-white)', fontSize: '18px', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            ✕
          </button>
        </div>

        {/* Sidebar Tabs */}
        <div style={{display: 'flex', borderBottom: '1px solid var(--border)', flexShrink: 0}}>
          {[['bookmarks', '🔖 Bookmarks', bookmarks.length], ['history', '🕘 History', history.length]].map(([id, label, count]) => (
            <button key={id} onClick={() => setSideTab(id)}
              style={{flex: 1, padding: '12px 8px', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'Outfit, sans-serif', transition: 'all 0.2s',
                background: sideTab === id ? 'rgba(201,168,76,0.12)' : 'transparent',
                color: sideTab === id ? '#c9a84c' : 'var(--text-dim)',
                borderBottom: sideTab === id ? '2px solid #c9a84c' : '2px solid transparent'}}>
              {label} {count > 0 && <span style={{fontSize: '10px', background: 'rgba(201,168,76,0.2)', borderRadius: '10px', padding: '1px 6px', marginLeft: '4px'}}>{count}</span>}
            </button>
          ))}
        </div>

        {/* Sidebar Content */}
        <div style={{flex: 1, overflowY: 'auto', padding: '16px'}}>

          {/* ── Bookmarks Tab ── */}
          {sideTab === 'bookmarks' && (
            <div>
              {bookmarks.length === 0 ? (
                <div style={{textAlign: 'center', padding: '40px 20px', color: 'var(--text-dim)'}}>
                  <div style={{fontSize: '36px', marginBottom: '12px', opacity: 0.4}}>🔖</div>
                  <p style={{fontSize: '13px'}}>No bookmarks yet.</p>
                  <p style={{fontSize: '12px', marginTop: '6px', opacity: 0.7}}>After getting an answer, click the 🔖 Bookmark button to save it here.</p>
                </div>
              ) : (
                <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                  {bookmarks.map(bm => (
                    <div key={bm.id} style={{background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px', cursor: 'pointer'}}
                      onClick={() => loadEntry(bm)}>
                      <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '8px'}}>
                        <div style={{flex: 1}}>
                          <span style={{fontSize: '10px', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '6px', padding: '2px 8px', color: '#c9a84c', fontWeight: 600, marginRight: '6px'}}>
                            {TAB_ICONS[bm.mode]} {TAB_LABELS[bm.mode]}
                          </span>
                          {bm.subject && <span style={{fontSize: '10px', color: 'var(--text-dim)'}}>{bm.subject}</span>}
                        </div>
                        <button onClick={e => { e.stopPropagation(); deleteBookmark(bm.id); }}
                          style={{background: 'transparent', border: 'none', color: '#ef4444', fontSize: '14px', cursor: 'pointer', flexShrink: 0, padding: '0 4px'}}>✕</button>
                      </div>
                      <p style={{fontSize: '13px', fontWeight: 600, color: 'var(--off-white)', margin: '0 0 6px', lineHeight: 1.4}}>{bm.query}</p>
                      <p style={{fontSize: '11px', color: 'var(--text-dim)', margin: 0}}>{bm.savedAt}</p>

                      {/* Note */}
                      {editingNoteId === bm.id ? (
                        <div onClick={e => e.stopPropagation()} style={{marginTop: '10px'}}>
                          <textarea value={noteText} onChange={e => setNoteText(e.target.value)}
                            placeholder="Add your note here..." rows={3}
                            style={{width: '100%', background: '#1a1a1a', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '8px', padding: '8px', fontSize: '12px', color: '#f5f0e8', resize: 'none', fontFamily: 'Outfit, sans-serif', boxSizing: 'border-box', outline: 'none'}} />
                          <div style={{display: 'flex', gap: '6px', marginTop: '6px'}}>
                            <button onClick={() => saveNote(bm.id)}
                              style={{flex: 1, padding: '6px', background: '#c9a84c', border: 'none', borderRadius: '6px', color: '#000', fontSize: '12px', fontWeight: 700, cursor: 'pointer'}}>Save Note</button>
                            <button onClick={() => setEditingNoteId(null)}
                              style={{padding: '6px 12px', background: 'transparent', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text-dim)', fontSize: '12px', cursor: 'pointer'}}>Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <button onClick={e => { e.stopPropagation(); setEditingNoteId(bm.id); setNoteText(bm.note || ''); }}
                          style={{marginTop: '8px', padding: '4px 10px', background: 'transparent', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '6px', color: 'var(--text-dim)', fontSize: '11px', cursor: 'pointer', fontFamily: 'Outfit, sans-serif'}}>
                          {bm.note ? `📝 ${bm.note.slice(0, 40)}${bm.note.length > 40 ? '...' : ''}` : '+ Add Note'}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── History Tab ── */}
          {sideTab === 'history' && (
            <div>
              {history.length === 0 ? (
                <div style={{textAlign: 'center', padding: '40px 20px', color: 'var(--text-dim)'}}>
                  <div style={{fontSize: '36px', marginBottom: '12px', opacity: 0.4}}>🕘</div>
                  <p style={{fontSize: '13px'}}>No history yet.</p>
                  <p style={{fontSize: '12px', marginTop: '6px', opacity: 0.7}}>Your study session history will appear here automatically.</p>
                </div>
              ) : (
                <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                  <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '4px'}}>
                    <button onClick={() => { setHistory([]); saveHist([]); }}
                      style={{fontSize: '11px', padding: '4px 10px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '6px', color: '#ef4444', cursor: 'pointer', fontFamily: 'Outfit, sans-serif'}}>
                      🗑️ Clear All
                    </button>
                  </div>
                  {history.map(entry => (
                    <div key={entry.id} style={{background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px', cursor: 'pointer'}}
                      onClick={() => loadEntry(entry)}>
                      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px'}}>
                        <span style={{fontSize: '10px', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '6px', padding: '2px 8px', color: '#c9a84c', fontWeight: 600}}>
                          {TAB_ICONS[entry.mode]} {TAB_LABELS[entry.mode]}
                        </span>
                        <button onClick={e => { e.stopPropagation(); deleteHistory(entry.id); }}
                          style={{background: 'transparent', border: 'none', color: '#ef4444', fontSize: '14px', cursor: 'pointer', padding: '0 4px'}}>✕</button>
                      </div>
                      <p style={{fontSize: '13px', fontWeight: 600, color: 'var(--off-white)', margin: '0 0 4px', lineHeight: 1.4}}>{entry.query}</p>
                      {entry.subject && <p style={{fontSize: '11px', color: '#c9a84c', margin: '0 0 4px'}}>{entry.subject} · {entry.semester}</p>}
                      <p style={{fontSize: '11px', color: 'var(--text-dim)', margin: 0}}>{entry.savedAt}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* ── Main Content ── */}
      <main style={{maxWidth: '800px', margin: '0 auto', padding: '40px 20px 80px'}}>

        {/* Page Header */}
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '16px'}}>
          <div>
            <h1 style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '36px', fontWeight: 600, color: 'var(--off-white)', marginBottom: '8px'}}>📚 Law Student Hub</h1>
            <p style={{fontSize: '14px', color: 'var(--text-muted)', fontWeight: 300}}>Your AI-powered study companion for Indian law.</p>
          </div>
          <div style={{display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap'}}>
            <LanguageToggle language={language} setLanguage={setLanguage} />
            <button onClick={() => { setShowSidebar(true); setSideTab('bookmarks'); }}
              style={{padding: '8px 14px', background: bookmarks.length > 0 ? 'rgba(201,168,76,0.15)' : 'transparent', border: '1px solid rgba(201,168,76,0.35)', borderRadius: '8px', color: '#c9a84c', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Outfit, sans-serif'}}>
              🔖 {bookmarks.length > 0 ? `Bookmarks (${bookmarks.length})` : 'Bookmarks'}
            </button>
            <button onClick={() => { setShowSidebar(true); setSideTab('history'); }}
              style={{padding: '8px 14px', background: history.length > 0 ? 'rgba(255,255,255,0.06)' : 'transparent', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-dim)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Outfit, sans-serif'}}>
              🕘 {history.length > 0 ? `History (${history.length})` : 'History'}
            </button>
          </div>
        </div>

        {/* ── Syllabus Filter ── */}
        <div style={{background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '18px 20px', marginBottom: '20px'}}>
          <p style={{fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '1.5px', textTransform: 'uppercase', margin: '0 0 14px'}}>📋 Filter by Syllabus <span style={{fontWeight: 400, textTransform: 'none', letterSpacing: 0}}>(optional)</span></p>

          {/* Course Toggle */}
          <div style={{display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap'}}>
            {Object.entries(SYLLABUS).map(([key, val]) => (
              <button key={key} onClick={() => handleCourseChange(key)}
                style={{padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', border: '1px solid var(--border)', fontFamily: 'Outfit, sans-serif', transition: 'all 0.2s',
                  background: course === key ? '#c9a84c' : 'transparent',
                  color: course === key ? '#000' : 'var(--text-dim)'}}>
                {val.label}
              </button>
            ))}
          </div>

          {/* Semester Row */}
          <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: subject ? '12px' : 0}}>
            {semesterList.map(sem => (
              <button key={sem} onClick={() => handleSemesterChange(semester === sem ? '' : sem)}
                style={{padding: '5px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', border: '1px solid var(--border)', fontFamily: 'Outfit, sans-serif', transition: 'all 0.2s',
                  background: semester === sem ? 'rgba(201,168,76,0.2)' : 'transparent',
                  color: semester === sem ? '#c9a84c' : 'var(--text-dim)'}}>
                {sem}
              </button>
            ))}
          </div>

          {/* Subject Row */}
          {semester && (
            <div style={{marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
              {subjectList.map(sub => (
                <button key={sub} onClick={() => setSubject(subject === sub ? '' : sub)}
                  style={{padding: '5px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', border: '1px solid var(--border)', fontFamily: 'Outfit, sans-serif', transition: 'all 0.2s',
                    background: subject === sub ? 'rgba(201,168,76,0.15)' : 'transparent',
                    color: subject === sub ? '#c9a84c' : 'var(--text-dim)',
                    borderColor: subject === sub ? 'rgba(201,168,76,0.4)' : 'var(--border)'}}>
                  {sub}
                </button>
              ))}
            </div>
          )}

          {/* Active Filter Badge */}
          {(semester || subject) && (
            <div style={{marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px'}}>
              <div style={{display: 'flex', gap: '6px', flexWrap: 'wrap'}}>
                {semester && <span style={{fontSize: '11px', padding: '3px 10px', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '10px', color: '#c9a84c'}}>📅 {semester}</span>}
                {subject  && <span style={{fontSize: '11px', padding: '3px 10px', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '10px', color: '#c9a84c'}}>📖 {subject}</span>}
              </div>
              <button onClick={() => { setSemester(''); setSubject(''); }}
                style={{fontSize: '11px', padding: '3px 10px', background: 'transparent', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', color: '#ef4444', cursor: 'pointer', fontFamily: 'Outfit, sans-serif'}}>
                ✕ Clear Filter
              </button>
            </div>
          )}
        </div>

        {/* ── Mode Selector ── */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '24px'}}>
          {modes.map(mode => (
            <button key={mode.id} onClick={() => { setSelectedMode(mode); setAnswer(''); setInput(''); setError(''); }}
              style={{padding: '16px 12px', borderRadius: '12px', textAlign: 'left', background: selectedMode.id === mode.id ? 'rgba(201,168,76,0.25)' : '#1a1a1a', border: selectedMode.id === mode.id ? '1px solid rgba(201,168,76,0.6)' : '1px solid rgba(201,168,76,0.2)', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Outfit, sans-serif'}}>
              <div style={{fontSize: '22px', marginBottom: '8px'}}>{mode.icon}</div>
              <div style={{fontSize: '12px', fontWeight: 600, color: selectedMode.id === mode.id ? 'var(--gold)' : '#ffffff', opacity: selectedMode.id === mode.id ? 1 : 0.85}}>{mode.title}</div>
            </button>
          ))}
        </div>

        {/* ── Input Box ── */}
        <div style={{background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', marginBottom: '24px'}}>
          {subject && (
            <div style={{marginBottom: '10px', fontSize: '12px', color: '#c9a84c', fontWeight: 600}}>
              📖 Context: {subject} — {semester} · {SYLLABUS[course].label}
            </div>
          )}
          <p style={{fontSize: '12px', color: 'var(--text-dim)', marginBottom: '4px'}}>e.g. {selectedMode.placeholder}</p>
          <textarea value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); getAnswer(); } }}
            placeholder={selectedMode.placeholder}
            style={{width: '100%', minHeight: '80px', background: 'transparent', border: 'none', outline: 'none', resize: 'none', fontSize: '14px', color: 'var(--off-white)', fontFamily: 'Outfit, sans-serif', lineHeight: 1.7, marginTop: '8px'}} />
          <button onClick={() => getAnswer()} disabled={loading || !input.trim()}
            style={{marginTop: '16px', width: '100%', padding: '12px', background: loading || !input.trim() ? 'rgba(201,168,76,0.3)' : 'linear-gradient(135deg, var(--gold), var(--gold-dim))', color: 'var(--black)', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: loading || !input.trim() ? 'not-allowed' : 'pointer', fontFamily: 'Outfit, sans-serif'}}>
            {loading ? '⏳ Researching...' : `${selectedMode.icon} ${selectedMode.buttonText}`}
          </button>
        </div>

        {/* ── Quick Topics ── */}
        {!answer && !loading && (
          <div style={{marginBottom: '24px'}}>
            <p style={{fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px'}}>
              {subject ? `📌 Topics in ${subject}:` : 'Quick Topics:'}
            </p>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
              {(subject
                ? getSubjectTopics(subject)
                : ['Tort of Negligence', 'Consumer Protection Act 2019', 'Doctrine of Res Judicata', 'Fundamental Rights Article 21', 'Rule in Rylands v Fletcher', 'Hindu Succession Act', 'Doctrine of Promissory Estoppel', 'Environmental Impact Assessment']
              ).map((topic, i) => (
                <button key={i} onClick={() => { setInput(topic); setSelectedMode(modes[0]); getAnswer(topic); }}
                  style={{fontSize: '12px', padding: '8px 14px', borderRadius: '20px', background: '#1a1a1a', border: '1px solid rgba(201,168,76,0.2)', color: '#ffffff', cursor: 'pointer', fontFamily: 'Outfit, sans-serif'}}>
                  {topic}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Loading ── */}
        {loading && (
          <div style={{background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '48px', textAlign: 'center'}}>
            <div style={{width: '48px', height: '48px', border: '3px solid rgba(201,168,76,0.2)', borderTop: '3px solid var(--gold)', borderRadius: '50%', margin: '0 auto 20px', animation: 'spin 1s linear infinite'}}/>
            <p style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', color: 'var(--off-white)', marginBottom: '6px'}}>Preparing your study material...</p>
            <p style={{fontSize: '13px', color: 'var(--text-dim)', fontWeight: 300}}>Researching Indian law and case references</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* ── Error ── */}
        {error && (
          <div style={{background: 'rgba(255,50,50,0.05)', border: '1px solid rgba(255,50,50,0.2)', borderRadius: '12px', padding: '16px', fontSize: '13px', color: '#ff6b6b'}}>❌ {error}</div>
        )}

        {/* ── Answer ── */}
        {answer && (
          <div style={{background: 'var(--black-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '28px'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border)', flexWrap: 'wrap', gap: '10px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <div style={{width: '32px', height: '32px', background: 'linear-gradient(135deg, var(--gold), var(--gold-dim))', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px'}}>📚</div>
                <div>
                  <span style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '17px', fontWeight: 600, color: 'var(--off-white)', display: 'block'}}>{selectedMode.title}</span>
                  {subject && <span style={{fontSize: '11px', color: '#c9a84c'}}>{subject} · {semester}</span>}
                </div>
              </div>
              <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                <button onClick={addBookmark} disabled={!!isBookmarked}
                  style={{fontSize: '12px', padding: '8px 14px', borderRadius: '8px', background: isBookmarked ? 'rgba(201,168,76,0.2)' : 'transparent', border: '1px solid rgba(201,168,76,0.3)', color: '#c9a84c', cursor: isBookmarked ? 'default' : 'pointer', fontFamily: 'Outfit, sans-serif'}}>
                  {isBookmarked ? '🔖 Bookmarked' : '🔖 Bookmark'}
                </button>
                <button onClick={copyAnswer}
                  style={{fontSize: '12px', padding: '8px 14px', borderRadius: '8px', background: copied ? 'rgba(201,168,76,0.2)' : 'transparent', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--gold)', cursor: 'pointer', fontFamily: 'Outfit, sans-serif'}}>
                  {copied ? '✅ Copied!' : '📋 Copy'}
                </button>
                <button onClick={printAnswer}
                  style={{fontSize: '12px', padding: '8px 14px', borderRadius: '8px', background: 'linear-gradient(135deg, var(--gold), var(--gold-dim))', border: 'none', color: 'var(--black)', cursor: 'pointer', fontWeight: 600, fontFamily: 'Outfit, sans-serif'}}>
                  🖨️ Save PDF
                </button>
              </div>
            </div>

            <div className="markdown-body">
              <ReactMarkdown>{answer}</ReactMarkdown>
            </div>

            <div style={{marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border)', fontSize: '12px', color: 'var(--text-dim)'}}>
              ⚠️ Always verify case citations and sections with official sources before use in exams or court.
            </div>
            <div style={{display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap'}}>
              <button onClick={() => { setAnswer(''); setInput(''); }}
                style={{fontSize: '12px', padding: '8px 16px', borderRadius: '8px', background: 'transparent', border: '1px solid var(--border)', color: '#ffffff', cursor: 'pointer', fontFamily: 'Outfit, sans-serif'}}>
                New Query
              </button>
              <a href="/chat?from=student"
                style={{fontSize: '12px', padding: '8px 16px', borderRadius: '8px', background: 'transparent', border: '1px solid rgba(201,168,76,0.3)', color: '#c9a84c', cursor: 'pointer', fontFamily: 'Outfit, sans-serif', textDecoration: 'none'}}>
                💬 Continue in Chat
              </a>
            </div>
          </div>
        )}

        {/* ── Chat Banner ── */}
        {!answer && !loading && (
          <a href="/chat?from=student" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(135deg, rgba(201,168,76,0.1), rgba(201,168,76,0.05))', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '12px', padding: '14px 20px', marginTop: '8px', textDecoration: 'none', color: 'inherit', flexWrap: 'wrap', gap: '10px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <span style={{fontSize: '20px'}}>🤖</span>
              <div>
                <p style={{fontSize: '13px', fontWeight: 600, color: '#c9a84c', margin: 0}}>Want to have a full study session?</p>
                <p style={{fontSize: '12px', color: 'rgba(245,240,232,0.5)', margin: 0}}>Switch to Chat Mode — ask multiple questions and the AI remembers the conversation</p>
              </div>
            </div>
            <span style={{fontSize: '12px', fontWeight: 600, color: '#080808', background: 'linear-gradient(135deg, #c9a84c, #8a6f2e)', padding: '6px 14px', borderRadius: '8px', whiteSpace: 'nowrap'}}>💬 Open Chat →</span>
          </a>
        )}

      </main>
    </div>
  );
}

// ── Subject-specific quick topics ─────────────────────────────────────────────
function getSubjectTopics(subject) {
  const map = {
    'Law of Contracts I':           ['Offer and Acceptance', 'Free Consent', 'Consideration', 'Capacity to Contract', 'Void and Voidable Agreements'],
    'Law of Contracts II':          ['Breach of Contract', 'Remedies for Breach', 'Quasi Contract', 'Specific Relief', 'Indemnity and Guarantee'],
    'Law of Torts & Consumer Protection': ['Negligence', 'Strict Liability — Rylands v Fletcher', 'Defamation', 'Nuisance', 'Consumer Protection Act 2019'],
    'Constitutional Law I':         ['Fundamental Rights', 'Article 21 Right to Life', 'Article 14 Equality', 'Directive Principles', 'Preamble'],
    'Constitutional Law II':        ['Parliamentary System', 'President and Governor', 'Judicial Review', 'Emergency Provisions', 'Amendment Procedure'],
    'Legal Methods':                ['Sources of Law', 'Precedent and Stare Decisis', 'Statutory Interpretation', 'Legal Reasoning', 'Case Briefing'],
    'Law of Crimes I (IPC)':        ['Mens Rea and Actus Reus', 'General Exceptions S.76-106', 'Murder vs Culpable Homicide', 'Theft and Robbery', 'Cheating S.415'],
    'Law of Crimes II (CrPC)':      ['Arrest and Bail', 'FIR and Cognizance', 'Trial Procedure', 'Magisterial Powers', 'Anticipatory Bail'],
    'Family Law I (Hindu Law)':     ['Hindu Marriage Act', 'Grounds for Divorce', 'Hindu Succession', 'Adoption under HMA', 'Maintenance'],
    'Family Law II (Muslim & Christian Law)': ['Nikah and Talaq', 'Muslim Personal Law', 'Dissolution of Muslim Marriage', 'Christian Divorce', 'Uniform Civil Code debate'],
    'Environmental Law':            ['Environmental Impact Assessment', 'Polluter Pays Principle', 'MC Mehta Cases', 'Wildlife Protection Act', 'Water and Air Pollution Acts'],
    'Property Law':                 ['Transfer of Property Act', 'Sale and Mortgage', 'Lease and Licence', 'Easements', 'Doctrine of Part Performance'],
    'Administrative Law':           ['Delegated Legislation', 'Natural Justice', 'Judicial Review of Administrative Action', 'Writs — Certiorari, Mandamus', 'Ombudsman'],
    'Jurisprudence':                ['Natural Law Theory', 'Positivism — Austin and Hart', 'Realist School', 'Concept of Rights and Duties', 'Theories of Punishment'],
    'Company Law':                  ['Incorporation of Company', 'Memorandum and Articles', 'Directors Duties', 'Winding Up', 'Corporate Veil'],
    'Civil Procedure Code':         ['Jurisdiction of Courts', 'Res Judicata', 'Pleadings', 'Interim Injunctions', 'Execution of Decree'],
    'Evidence Law':                 ['Relevancy and Admissibility', 'Burden of Proof', 'Hearsay Rule', 'Dying Declaration', 'Confessions'],
    'Labour Law I':                 ['Industrial Disputes Act', 'Factories Act', 'Workmen Compensation', 'Trade Union Rights', 'Strikes and Lockouts'],
    'Labour Law II':                ['ESI and EPF', 'Minimum Wages Act', 'Contract Labour', 'Maternity Benefit Act', 'Payment of Gratuity'],
    'Human Rights Law':             ['UDHR', 'NHRC and State Commissions', 'Protection of Civil Rights Act', 'Rights of Prisoners', 'Rights of Women and Children'],
    'Intellectual Property Law':    ['Copyright Act', 'Patent Law in India', 'Trademark Registration', 'Geographical Indications', 'Trade Secrets'],
    'Taxation Law':                 ['Income Tax Basics', 'GST Framework', 'Direct vs Indirect Taxes', 'Tax Avoidance vs Evasion', 'Assessment and Appeal'],
    'Alternative Dispute Resolution': ['Arbitration Act 1996', 'Mediation Process', 'Lok Adalat', 'Conciliation', 'Online Dispute Resolution'],
    'Legal Writing & Drafting':     ['Drafting Legal Notices', 'Contract Drafting Principles', 'Pleadings and Petitions', 'Opinion Writing', 'Legal Research Methods'],
    'Professional Ethics & Bar Council Rules': ['Bar Council of India Rules', 'Advocates Act 1961', 'Duties to Court and Client', 'Contempt of Court', 'Legal Aid'],
    'Moot Court & Trial Advocacy':  ['Moot Court Procedure', 'Memorial Writing', 'Oral Arguments', 'Examination of Witnesses', 'Court Etiquette'],
    'Criminology & Penology':       ['Theories of Crime', 'Juvenile Justice', 'Probation and Parole', 'Capital Punishment debate', 'Prison Reforms'],
    'International Law':            ['Sources of International Law', 'State Recognition', 'UN Charter', 'Treaty Law — Vienna Convention', 'International Humanitarian Law'],
  };
  return map[subject] || ['Definition and Scope', 'Key Principles', 'Landmark Cases', 'Important Sections', 'Exam Questions'];
}
