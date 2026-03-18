'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const navItems = [
  { icon: '⚖', label: 'Home', href: '/' },
  { icon: '💬', label: 'Legal Q&A', href: '/legal-qa' },
  { icon: '🔎', label: 'Legal Problem Solver', href: '/solve' },
  { icon: '📄', label: 'Draft Document', href: '/draft' },
  { icon: '📚', label: 'Law Student', href: '/student' },
  { icon: '✊', label: 'Know Your Rights', href: '/rights' },
  { icon: '🏛', label: 'Laws Library', href: '/laws' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'Firm Law AI — Indian Legal Assistant',
      '/legal-qa': 'Legal Q&A — Firm Law AI',
      '/draft': 'Draft Documents — Firm Law AI',
      '/student': 'Law Student Hub — Firm Law AI',
      '/rights': 'Know Your Rights — Firm Law AI',
      '/laws': 'Laws Library — Firm Law AI',
      '/about': 'About — Firm Law AI',
      '/contact': 'Contact — Firm Law AI',
      '/terms': 'Terms of Use — Firm Law AI',
    };
    document.title = titles[pathname] || 'Firm Law AI';
  }, [pathname]);

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Firm Law AI — Your AI-powered Indian Legal Assistant." />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{background: 'var(--black)', margin: 0, padding: 0}}>

        {/* HEADER */}
        <header style={{
          background: '#0a0a0a',
          borderBottom: '1px solid rgba(201,168,76,0.25)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          transition: 'all 0.3s',
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.4)' : 'none'
        }}>
          <div style={{maxWidth: '1100px', margin: '0 auto', padding: '0 24px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>

            <Link href="/" style={{display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none'}}>
              <div style={{
                width: '42px', height: '42px',
                background: 'linear-gradient(135deg, #c9a84c, #8a6f2e)',
                borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px',
                boxShadow: '0 2px 12px rgba(201,168,76,0.3)'
              }}>⚖️</div>
              <div>
                <div style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '26px',
                  fontWeight: 600,
                  color: '#ffffff',
                  lineHeight: 1,
                  letterSpacing: '0.5px'
                }}>
                  Firm Law <span style={{color: '#c9a84c'}}>AI</span>
                </div>
                <div style={{
                  fontSize: '9px',
                  color: '#c9a84c',
                  letterSpacing: '3px',
                  textTransform: 'uppercase' as const,
                  fontWeight: 500,
                  marginTop: '3px',
                  opacity: 0.85
                }}>Indian Legal Assistant</div>
              </div>
            </Link>

            <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
              <div style={{
                fontSize: '10px',
                padding: '4px 14px',
                borderRadius: '20px',
                border: '1px solid rgba(201,168,76,0.4)',
                color: '#c9a84c',
                letterSpacing: '2px',
                fontWeight: 500
              }}>BETA</div>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="hamburger-btn"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(201,168,76,0.3)',
                  borderRadius: '8px',
                  padding: '8px 10px',
                  cursor: 'pointer',
                  display: 'none',
                  flexDirection: 'column' as const,
                  gap: '5px',
                }}>
                <div style={{width: '18px', height: '2px', background: menuOpen ? '#c9a84c' : 'rgba(255,255,255,0.6)', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'}}/>
                <div style={{width: '18px', height: '2px', background: menuOpen ? 'transparent' : 'rgba(255,255,255,0.6)', transition: 'all 0.3s'}}/>
                <div style={{width: '18px', height: '2px', background: menuOpen ? '#c9a84c' : 'rgba(255,255,255,0.6)', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'}}/>
              </button>
            </div>
          </div>
        </header>

        {/* DESKTOP NAV */}
        <nav style={{background: '#111111', borderBottom: '1px solid rgba(201,168,76,0.2)', overflowX: 'auto'}} className="desktop-nav">
          <div style={{maxWidth: '1100px', margin: '0 auto', display: 'flex'}}>
            {navItems.map((tab, i) => (
              <Link key={i} href={tab.href} style={{
                padding: '13px 20px',
                fontSize: '13px',
                fontWeight: pathname === tab.href ? 600 : 400,
                whiteSpace: 'nowrap' as const,
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                textDecoration: 'none',
                color: pathname === tab.href ? '#c9a84c' : 'rgba(255,255,255,0.5)',
                borderBottom: pathname === tab.href ? '2.5px solid #c9a84c' : '2.5px solid transparent',
                background: pathname === tab.href ? 'rgba(201,168,76,0.08)' : 'transparent',
                transition: 'all 0.2s',
                letterSpacing: '0.3px',
              }}>
                <span style={{fontSize: '14px'}}>{tab.icon}</span>{tab.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* MOBILE NAV */}
        {menuOpen && (
          <div style={{
            position: 'fixed', top: '70px', left: 0, right: 0, bottom: 0,
            background: 'rgba(8,8,8,0.99)',
            zIndex: 99,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '8px',
            overflowY: 'auto' as const
          }}>
            {navItems.map((tab, i) => (
              <Link key={i} href={tab.href} style={{
                padding: '16px 20px',
                fontSize: '16px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                textDecoration: 'none',
                color: pathname === tab.href ? '#c9a84c' : '#f5f0e8',
                borderRadius: '10px',
                background: pathname === tab.href ? 'rgba(201,168,76,0.08)' : '#141414',
                border: pathname === tab.href ? '1px solid rgba(201,168,76,0.3)' : '1px solid rgba(201,168,76,0.1)',
              }}>
                <span style={{fontSize: '20px'}}>{tab.icon}</span>{tab.label}
              </Link>
            ))}
            <div style={{marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid rgba(201,168,76,0.15)'}}>
              <p style={{fontSize: '12px', color: 'rgba(255,255,255,0.25)', textAlign: 'center'}}>© 2025 Firm Law AI — Built for India 🇮🇳</p>
            </div>
          </div>
        )}

        {/* PAGE CONTENT */}
        <div style={{animation: 'fadeIn 0.3s ease', minHeight: 'calc(100vh - 130px)'}}>
          {children}
        </div>

        {/* FOOTER */}
        <footer style={{background: '#0a0a0a', borderTop: '1px solid rgba(201,168,76,0.2)', padding: '40px 24px'}}>
          <div style={{maxWidth: '1100px', margin: '0 auto'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' as const, gap: '32px', marginBottom: '32px'}}>
              <div style={{maxWidth: '280px'}}>
                <div style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '26px', fontWeight: 600, color: '#ffffff', marginBottom: '4px'}}>
                  Firm Law <span style={{color: '#c9a84c'}}>AI</span>
                </div>
                <div style={{fontSize: '9px', color: '#c9a84c', letterSpacing: '3px', textTransform: 'uppercase' as const, marginBottom: '12px'}}>Indian Legal Assistant</div>
                <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, fontWeight: 300}}>AI-powered Indian legal assistant. Free, fast, and built for every Indian citizen.</p>
              </div>
              <div style={{display: 'flex', gap: '48px', flexWrap: 'wrap' as const}}>
                <div>
                  <div style={{fontSize: '10px', color: '#c9a84c', letterSpacing: '2px', textTransform: 'uppercase' as const, marginBottom: '16px', fontWeight: 500}}>Features</div>
                  {[['Legal Q&A', '/legal-qa'], ['Draft Documents', '/draft'], ['Law Student Hub', '/student'], ['Know Your Rights', '/rights'], ['Laws Library', '/laws']].map(([label, href]) => (
                    <div key={href} style={{marginBottom: '10px'}}>
                      <Link href={href} style={{fontSize: '13px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontWeight: 300}}>{label}</Link>
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{fontSize: '10px', color: '#c9a84c', letterSpacing: '2px', textTransform: 'uppercase' as const, marginBottom: '16px', fontWeight: 500}}>Company</div>
                  {[['About Us', '/about'], ['Contact', '/contact'], ['Terms of Use', '/terms'], ['Privacy Policy', '/terms']].map(([label, href]) => (
                    <div key={label} style={{marginBottom: '10px'}}>
                      <Link href={href} style={{fontSize: '13px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontWeight: 300}}>{label}</Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{borderTop: '1px solid rgba(201,168,76,0.15)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: '12px'}}>
              <p style={{fontSize: '12px', color: 'rgba(255,255,255,0.2)'}}>© 2025 Firm Law AI — General legal information only. Not legal advice.</p>
              <p style={{fontSize: '12px', color: 'rgba(255,255,255,0.2)'}}>Built for India 🇮🇳</p>
            </div>
          </div>
        </footer>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @media (max-width: 768px) {
            .desktop-nav { display: none !important; }
            .hamburger-btn { display: flex !important; }
          }
          @media (min-width: 769px) {
            .hamburger-btn { display: none !important; }
          }
          nav a:hover {
            color: #c9a84c !important;
            background: rgba(201,168,76,0.06) !important;
          }
        `}</style>

      </body>
    </html>
  );
}