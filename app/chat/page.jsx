'use client';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import LanguageToggle from '../components/LanguageToggle';
import { stripMarkdown, printMarkdown } from '../utils/markdownUtils';

const contextInfo = {
  'legal-qa': { title: 'Legal Q&A', icon: '💬', intro: 'You came from Legal Q&A. Ask me any legal question based on Indian law.' },
  'student': { title: 'Law Student Hub', icon: '📚', intro: 'You came from Law Student Hub. Ask me about legal topics, case laws, bare acts, or exam questions.' },
  'solve': { title: 'Legal Problem Solver', icon: '🔎', intro: 'You came from Legal Problem Solver. Describe your legal problem and I will guide you step by step.' },
  'draft': { title: 'Draft Documents', icon: '📄', intro: 'You came from Draft Documents. Ask me about legal documents, formats, or how to draft anything.' },
  'rights': { title: 'Know Your Rights', icon: '✊', intro: 'You came from Know Your Rights. Ask me about your legal rights as an Indian citizen.' },
  'laws': { title: 'Laws Library', icon: '🏛️', intro: 'You came from Laws Library. Ask me anything about Indian Acts, sections, or legal provisions.' },
};

const defaultContext = { title: 'Legal Chat', icon: '⚖️', intro: 'Hello! I am Firm Law AI. Ask me any question about Indian law.' };

const quickStarters = [
  'What are my basic rights as an Indian citizen?',
  'How do I file a consumer complaint?',
  'What is the difference between IPC and BNS?',
  'Explain Article 21 of the Constitution',
  'What are my rights if arrested by police?',
  'How to send a legal notice to someone?',
];

const markdownStyles = `
  .markdown-body { font-family: 'Outfit', sans-serif; font-size: 14px; line-height: 1.8; color: rgba(245,240,232,0.85); }
  .markdown-body h1, .markdown-body h2, .markdown-body h3 { font-family: 'Cormorant Garamond', serif; color: #f5f0e8; margin: 16px 0 8px; font-weight: 600; }
  .markdown-body h1 { font-size: 20px; }
  .markdown-body h2 { font-size: 17px; color: #c9a84c; }
  .markdown-body h3 { font-size: 15px; }
  .markdown-body strong { color: #f5f0e8; font-weight: 600; }
  .markdown-body em { color: #c9a84c; font-style: italic; }
  .markdown-body ul, .markdown-body ol { padding-left: 20px; margin: 8px 0; }
  .markdown-body li { margin: 4px 0; }
  .markdown-body p { margin: 8px 0; }
  .markdown-body blockquote { border-left: 3px solid #c9a84c; padding-left: 14px; margin: 10px 0; color: rgba(245,240,232,0.5); font-style: italic; }
  .markdown-body code { background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.2); border-radius: 4px; padding: 2px 6px; font-size: 13px; color: #c9a84c; }
  .markdown-body hr { border: none; border-top: 1px solid rgba(201,168,76,0.2); margin: 12px 0; }
`;

export default function ChatPage() {
  const searchParams = useSearchParams();
  const contextKey = searchParams.get('from') || '';
  const contextLaw = searchParams.get('law') || '';
  const ctx = contextInfo[contextKey] || defaultContext;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('english');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const intro = contextLaw
      ? `You came from Laws Library. You are asking about **${contextLaw}**. Ask me anything about this Act or any other Indian law.`
      : ctx.intro;
    setMessages([{ role: 'assistant', content: intro }]);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function sendMessage(customText) {
    const text = customText || input.trim();
    if (!text || loading) return;
    setInput('');

    const userMessage = { role: 'user', content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setLoading(true);

    const systemContext = contextLaw
      ? `You are Firm Law AI, an expert Indian legal assistant. The user is asking about ${contextLaw}. Answer all questions about Indian law clearly and helpfully. Always respond in the same language the user is writing in.`
      : `You are Firm Law AI, an expert Indian legal assistant specializing in Indian law. Context: ${ctx.intro}. Answer all legal questions clearly and helpfully regardless of topic. Always respond in the same language the user is writing in.`;

    const conversationHistory = updatedMessages.map(m => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          mode: 'qa',
          language,
          history: conversationHistory,
          systemContext,
        }),
      });
      const data = await res.json();
      if (data.error) {
        setMessages(prev => [...prev, { role: 'assistant', content: '❌ Something went wrong. Please try again.' }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: '❌ Something went wrong. Please try again.' }]);
    }
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  function copyMessage(content, index) {
    const clean = stripMarkdown(content);
    navigator.clipboard.writeText(clean);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }

  function printChat() {
    const fullChat = messages
      .map(m => `${m.role === 'user' ? 'You' : 'Firm Law AI'}:\n${m.content}`)
      .join('\n\n---\n\n');
    printMarkdown(
      'Legal Chat Transcript',
      `Context: ${ctx.title}`,
      fullChat,
      'This conversation was AI-generated by Firm Law AI. This is general legal information only. Please consult a qualified advocate for your specific situation.'
    );
  }

  function clearChat() {
    const intro = contextLaw
      ? `You came from Laws Library. You are asking about **${contextLaw}**. Ask me anything about this Act or any other Indian law.`
      : ctx.intro;
    setMessages([{ role: 'assistant', content: intro }]);
    setInput('');
  }

  return (
    <div style={{ background: 'var(--black)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{markdownStyles}</style>

      {/* Header */}
      <div style={{ background: 'var(--black-card)', borderBottom: '1px solid var(--border)', padding: '16px 20px', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a href={contextKey ? `/${contextKey}` : '/'} style={{ fontSize: '13px', color: 'var(--gold)', textDecoration: 'none', fontFamily: 'Outfit, sans-serif' }}>← Back</a>
            <div style={{ width: '1px', height: '20px', background: 'var(--border)' }} />
            <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, var(--gold), var(--gold-dim))', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>{ctx.icon}</div>
            <div>
              <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', fontWeight: 600, color: 'var(--off-white)', margin: 0 }}>Firm Law AI Chat</h1>
              <p style={{ fontSize: '11px', color: 'var(--text-dim)', margin: 0 }}>{ctx.title} — {messages.length - 1} messages</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LanguageToggle language={language} setLanguage={setLanguage} />
            <button onClick={printChat} style={{ fontSize: '12px', padding: '7px 14px', borderRadius: '8px', background: 'linear-gradient(135deg, var(--gold), var(--gold-dim))', border: 'none', color: 'var(--black)', cursor: 'pointer', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>🖨️ Save PDF</button>
            <button onClick={clearChat} style={{ fontSize: '12px', padding: '7px 14px', borderRadius: '8px', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-muted)', cursor: 'pointer', fontFamily: 'Outfit, sans-serif' }}>🗑️ Clear</button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, maxWidth: '800px', width: '100%', margin: '0 auto', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {messages.length === 1 && (
          <div style={{ marginBottom: '8px' }}>
            <p style={{ fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>Quick Starters:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {quickStarters.map((q, i) => (
                <button key={i} onClick={() => sendMessage(q)}
                  style={{ fontSize: '12px', padding: '8px 14px', borderRadius: '20px', background: '#1a1a1a', border: '1px solid rgba(201,168,76,0.2)', color: '#ffffff', cursor: 'pointer', fontFamily: 'Outfit, sans-serif' }}>
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '85%',
              background: msg.role === 'user' ? 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.1))' : '#1a1a1a',
              border: msg.role === 'user' ? '1px solid rgba(201,168,76,0.4)' : '1px solid rgba(255,255,255,0.06)',
              borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              padding: '14px 18px',
            }}>
              {msg.role === 'user' ? (
                <p style={{ fontSize: '14px', color: '#f5f0e8', margin: 0, lineHeight: 1.6, fontFamily: 'Outfit, sans-serif' }}>{msg.content}</p>
              ) : (
                <div className="markdown-body">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              )}
            </div>
            {msg.role === 'assistant' && i > 0 && (
              <button onClick={() => copyMessage(msg.content, i)}
                style={{ marginTop: '6px', fontSize: '11px', padding: '4px 10px', borderRadius: '6px', background: 'transparent', border: '1px solid rgba(201,168,76,0.2)', color: copiedIndex === i ? 'var(--gold)' : 'var(--text-dim)', cursor: 'pointer', fontFamily: 'Outfit, sans-serif' }}>
                {copiedIndex === i ? '✅ Copied!' : '📋 Copy'}
              </button>
            )}
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '18px 18px 18px 4px', padding: '14px 18px', display: 'flex', gap: '6px', alignItems: 'center' }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--gold)', animation: `bounce 1s ease-in-out ${i * 0.2}s infinite` }} />
              ))}
              <style>{`@keyframes bounce { 0%, 100% { opacity: 0.3; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.2); } }`}</style>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input Box */}
      <div style={{ background: 'var(--black-card)', borderTop: '1px solid var(--border)', padding: '16px 20px', position: 'sticky', bottom: 0 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            placeholder="Type your legal question... (Press Enter to send, Shift+Enter for new line)"
            rows={1}
            style={{ flex: 1, background: '#1a1a1a', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '12px', padding: '12px 16px', fontSize: '14px', color: '#f5f0e8', outline: 'none', resize: 'none', fontFamily: 'Outfit, sans-serif', lineHeight: 1.6, maxHeight: '120px', overflowY: 'auto' }}
          />
          <button onClick={() => sendMessage()} disabled={loading || !input.trim()}
            style={{ padding: '12px 20px', background: loading || !input.trim() ? 'rgba(201,168,76,0.3)' : 'linear-gradient(135deg, var(--gold), var(--gold-dim))', color: 'var(--black)', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 700, cursor: loading || !input.trim() ? 'not-allowed' : 'pointer', fontFamily: 'Outfit, sans-serif', flexShrink: 0 }}>
            Send ➤
          </button>
        </div>
        <p style={{ maxWidth: '800px', margin: '8px auto 0', fontSize: '11px', color: 'var(--text-dim)', textAlign: 'center' }}>⚠️ AI-generated responses. Always consult a qualified advocate for specific legal matters.</p>
      </div>

    </div>
  );
}