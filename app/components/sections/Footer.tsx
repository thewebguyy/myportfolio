'use client'

import Link from 'next/link'

const SOCIAL_LINKS = [
  { name: 'LinkedIn', url: 'https://linkedin.com/in/thewebguyy' },
  { name: 'GitHub', url: 'https://github.com/thewebguyy' },
  { name: 'X / Twitter', url: 'https://x.com/BodeBillions' },
]

const NAV = ['About', 'Work', 'AI', 'Writing', 'Contact']

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: 'var(--paper-2)', borderTop: '1px solid var(--wire)' }}>
      <div
        className="max-w-[1440px] mx-auto"
        style={{ borderLeft: '1px solid var(--wire)', borderRight: '1px solid var(--wire)' }}
      >
        {/* Main strip */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ borderBottom: '1px solid var(--wire)', background: 'var(--wire)' }}
        >
          {/* Identity */}
          <div style={{ background: 'var(--paper-2)', padding: '48px 40px' }}>
            <p
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '20px', letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: '12px' }}
            >
              OA.DEV
            </p>
            <p
              style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--ink-3)', lineHeight: 1.7 }}
            >
              Olabode Olusegun<br />
              Lagos, Nigeria<br />
              <span style={{ color: 'var(--signal)' }}>Open to work →</span>
            </p>
          </div>

          {/* Nav */}
          <div style={{ background: 'var(--paper-2)', padding: '48px 40px' }}>
            <p
              style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: '20px' }}
            >
              Navigation
            </p>
            <ul className="space-y-3">
              {NAV.map(item => (
                <li key={item}>
                  <Link
                    href={`/#${item.toLowerCase()}`}
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--ink-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--signal)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-2)')}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div style={{ background: 'var(--paper-2)', padding: '48px 40px' }}>
            <p
              style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: '20px' }}
            >
              Links
            </p>
            <ul className="space-y-3">
              {SOCIAL_LINKS.map(link => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--ink-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--signal)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-2)')}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright strip */}
        <div
          className="flex items-center justify-between px-8 lg:px-10 py-4"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--ink-3)', letterSpacing: '0.06em' }}
        >
          <span>© {year} Olabode Olusegun. All rights reserved.</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ color: 'var(--ink-3)', cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.06em' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--signal)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-3)')}
            aria-label="Back to top"
          >
            ↑ Top
          </button>
        </div>
      </div>
    </footer>
  )
}
