export default function LanguageToggle({ language, setLanguage }) {
  const btn = (lang, flag, label) => ({
    padding: '8px 14px',
    borderRadius: '7px',
    border: 'none',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'Outfit, sans-serif',
    transition: 'all 0.2s',
    background: language === lang
      ? 'linear-gradient(135deg, #c9a84c, #8a6f2e)'
      : 'transparent',
    color: language === lang ? '#080808' : 'rgba(245,240,232,0.5)',
    boxShadow: language === lang ? '0 2px 8px rgba(201,168,76,0.3)' : 'none',
  });

  return (
    <div style={{
      display: 'flex',
      background: '#141414',
      border: '1px solid rgba(201,168,76,0.2)',
      borderRadius: '10px',
      padding: '4px',
      gap: '4px'
    }}>
      <button onClick={() => setLanguage('english')} style={btn('english', '🇬🇧', 'English')}>
        🇬🇧 English
      </button>
      <button onClick={() => setLanguage('hindi')} style={btn('hindi', '🇮🇳', 'हिंदी')}>
        🇮🇳 हिंदी
      </button>
      <button onClick={() => setLanguage('telugu')} style={btn('telugu', '🌟', 'తెలుగు')}>
        🌟 తెలుగు
      </button>
    </div>
  );
}