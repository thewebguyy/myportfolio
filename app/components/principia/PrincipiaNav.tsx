'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { principles } from '@/lib/principles'

export function PrincipiaNav() {
  const [scrolled, setScrolled] = useState(false)
  const [activeChapter, setActiveChapter] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    for (const p of principles) {
      const el = document.getElementById(p.id)
      if (!el) continue
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveChapter(p.id) },
        { rootMargin: '-30% 0px -65% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    }

    return () => observers.forEach(o => o.disconnect())
  }, [])

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const drawerRef = useRef<HTMLDivElement>(null)

  // Focus trap for mobile drawer
  const handleDrawerKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { setMenuOpen(false); return }
    if (e.key !== 'Tab') return
    const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
      'a[href],button:not([disabled]),input,textarea,[tabindex]:not([tabindex="-1"])'
    )
    if (!focusable || focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus() } }
    else { if (document.activeElement === last) { e.preventDefault(); first.focus() } }
  }, [])

  const activeP = principles.find(p => p.id === activeChapter)

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 min-h-[56px] flex items-center transition-colors duration-200"
        style={{
          background: scrolled ? 'rgba(245, 242, 237, 0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--wire)' : '1px solid transparent',
        }}
        role="banner"
      >
        <nav
          className="max-w-[1440px] mx-auto w-full flex items-center justify-between h-full"
          style={{ padding: '0 var(--page-gutter)' }}
          aria-label="Site navigation"
        >
          {/* Left: wordmark */}
          <Link
            href="#top"
            className="flex items-center gap-3"
            aria-label="Engineering Principia — back to top"
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                fontSize: '12px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--ink)',
              }}
            >
              Principia
            </span>
            {/* Active chapter indicator */}
            {activeP && (
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  color: 'var(--ink-4)',
                  borderLeft: '1px solid var(--wire)',
                  paddingLeft: '12px',
                }}
              >
                {activeP.index} · {activeP.word}
              </span>
            )}
          </Link>

          {/* Center: chapter strip (desktop) */}
          <div className="hidden lg:flex items-center gap-6" role="list" aria-label="Chapters">
            {principles.map(p => (
              <a
                key={p.id}
                href={`#${p.id}`}
                role="listitem"
                aria-current={activeChapter === p.id ? 'location' : undefined}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: activeChapter === p.id ? 'var(--signal)' : 'var(--ink-4)',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => { if (activeChapter !== p.id) (e.currentTarget as HTMLElement).style.color = 'var(--ink)' }}
                onMouseLeave={e => { if (activeChapter !== p.id) (e.currentTarget as HTMLElement).style.color = 'var(--ink-4)' }}
              >
                {p.word}
              </a>
            ))}
          </div>

          {/* Right: hire CTA + mobile menu */}
          <div className="flex items-center gap-6">
            <Link
              href="#contact"
              className="hidden md:inline-flex items-center px-5 py-2 transition-all duration-150"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                background: 'var(--ink)',
                color: 'var(--paper)',
                border: '1px solid var(--ink)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'var(--signal)'
                el.style.borderColor = 'var(--signal)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'var(--ink)'
                el.style.borderColor = 'var(--ink)'
              }}
            >
              Hire me →
            </Link>
            <button
              className="lg:hidden"
              style={{ color: 'var(--ink-3)' }}
              onClick={() => setMenuOpen(true)}
              aria-label="Open chapter navigation"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile chapter drawer */}
      {menuOpen && (
        <div
          ref={drawerRef}
          className="fixed inset-0 z-[60] flex flex-col"
          style={{ background: 'var(--paper)' }}
          role="dialog"
          aria-modal="true"
          aria-label="Chapter navigation"
          onKeyDown={handleDrawerKeyDown}
        >
          <div
            className="flex items-center justify-between h-[56px] px-6"
            style={{ borderBottom: '1px solid var(--wire)' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                fontSize: '12px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--ink)',
              }}
            >
              Chapters
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              style={{ color: 'var(--ink-3)' }}
              aria-label="Close navigation"
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {principles.map(p => (
              <a
                key={p.id}
                href={`#${p.id}`}
                onClick={() => setMenuOpen(false)}
                className="flex items-baseline gap-5 px-6 py-5 transition-colors"
                style={{ borderBottom: '1px solid var(--wire)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--paper-2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    letterSpacing: '0.1em',
                    color: 'var(--ink-4)',
                    fontVariantNumeric: 'tabular-nums',
                    flexShrink: 0,
                  }}
                >
                  {p.index}
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 600,
                      fontSize: '22px',
                      letterSpacing: '-0.02em',
                      color: activeChapter === p.id ? 'var(--signal)' : 'var(--ink)',
                    }}
                  >
                    {p.word}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--ink-4)',
                      marginTop: '2px',
                    }}
                  >
                    {p.thesis}
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="px-6 py-6" style={{ borderTop: '1px solid var(--wire)', paddingBottom: 'max(24px, env(safe-area-inset-bottom))' }}>
            <Link
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="btn-primary w-full justify-center"
            >
              Hire me →
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
