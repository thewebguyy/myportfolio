'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { principles } from '@/lib/principles'
import { CONTACT_EMAIL, CONTACT_HREF } from '@/lib/constants'

type ActiveSection = 'top' | 'work' | 'about' | 'engineering' | 'contact'

const PRIMARY_NAV = [
  { id: 'work', label: 'Work', href: '/#work' },
  { id: 'engineering', label: 'Engineering', href: '/#engineering' },
  { id: 'about', label: 'About', href: '/#about' },
  { id: 'case-studies', label: 'Case Studies', href: '/case-studies' },
  { id: 'writing', label: 'Writing', href: '/blog' },
  { id: 'contact', label: 'Contact', href: '/#contact' },
] as const

export function PrincipiaNav() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<ActiveSection>('top')
  const [activeChapter, setActiveChapter] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32)
      if (window.scrollY < 240 && isHome) {
        setActiveSection('top')
        setActiveChapter(null)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  useEffect(() => {
    if (!isHome) {
      setActiveChapter(null)
      return
    }

    const observers: IntersectionObserver[] = []

    const sectionIds: { id: string; section: ActiveSection; clearChapter: boolean }[] = [
      { id: 'top', section: 'top', clearChapter: true },
      { id: 'work', section: 'work', clearChapter: true },
      { id: 'about', section: 'about', clearChapter: true },
      { id: 'engineering', section: 'engineering', clearChapter: false },
      { id: 'contact', section: 'contact', clearChapter: true },
    ]

    for (const s of sectionIds) {
      const el = document.getElementById(s.id)
      if (!el) continue
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(s.section)
            if (s.clearChapter) setActiveChapter(null)
          }
        },
        { rootMargin: '-20% 0px -65% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    }

    for (const p of principles) {
      const el = document.getElementById(p.id)
      if (!el) continue
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection('engineering')
            setActiveChapter(p.id)
          }
        },
        { rootMargin: '-28% 0px -62% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    }

    return () => observers.forEach(o => o.disconnect())
  }, [isHome])

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Close mobile drawer when route changes
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const drawerRef = useRef<HTMLDivElement>(null)

  const handleDrawerKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { setMenuOpen(false); return }
    if (e.key !== 'Tab') return
    const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
      'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'
    )
    if (!focusable || focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus() }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus() }
    }
  }, [])

  const activeP = isHome ? principles.find(p => p.id === activeChapter) : null

  const contextLabel = activeP
    ? `${activeP.index} · ${activeP.word}`
    : pathname?.startsWith('/case-studies/')
    ? 'Case Study'
    : pathname === '/case-studies'
    ? 'Case Studies'
    : pathname?.startsWith('/blog/')
    ? 'Article'
    : pathname === '/blog'
    ? 'Writing'
    : null

  const isNavItemActive = (id: string) => {
    if (id === 'case-studies') return pathname?.startsWith('/case-studies') ?? false
    if (id === 'writing') return pathname?.startsWith('/blog') ?? false
    if (!isHome) return false
    return activeSection === id
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 flex flex-col transition-colors duration-200"
        style={{
          background: scrolled || !isHome ? 'rgba(245, 242, 237, 0.96)' : 'rgba(245, 242, 237, 0.88)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid var(--wire)',
        }}
        role="banner"
      >
        <nav
          className="max-w-[1440px] mx-auto w-full flex items-center justify-between min-h-[56px]"
          style={{ padding: '0 var(--page-gutter)' }}
          aria-label="Primary navigation"
        >
          {/* Left: Brand link + separate sibling context indicator (fixes WCAG 2.5.3 Label in Name) */}
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href={isHome ? '#top' : '/'}
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: '14.5px',
                letterSpacing: '-0.015em',
                color: 'var(--ink)',
                flexShrink: 0,
              }}
            >
              Olabode Olusegun
            </Link>

            <AnimatePresence mode="wait">
              {contextLabel && (
                <motion.span
                  key={contextLabel}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -4 }}
                  transition={{ duration: 0.18 }}
                  aria-live="polite"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.06em',
                    color: 'var(--signal)',
                    borderLeft: '1px solid var(--wire)',
                    paddingLeft: '12px',
                    flexShrink: 0,
                  }}
                >
                  {contextLabel}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Center: Primary navigation links */}
          <ul className="hidden lg:flex items-center gap-6 m-0 p-0 list-none">
            {PRIMARY_NAV.map(item => {
              const active = isNavItemActive(item.id)
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: active ? 'var(--signal)' : 'var(--ink-3)',
                      fontWeight: active ? 700 : 400,
                      transition: 'color 0.15s',
                      padding: '6px 2px',
                    }}
                    className="hover:text-[var(--ink)]"
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Right: Contextual back link or primary CTA + mobile menu toggle */}
          <div className="flex items-center gap-4">
            {pathname?.startsWith('/case-studies/') && (
              <Link
                href="/case-studies"
                className="hidden sm:inline-flex blog-nav-back items-center gap-1.5"
              >
                ← All case studies
              </Link>
            )}
            {pathname?.startsWith('/blog/') && (
              <Link
                href="/blog"
                className="hidden sm:inline-flex blog-nav-back items-center gap-1.5"
              >
                ← All writing
              </Link>
            )}

            <Link
              href={isHome ? '#contact' : '/#contact'}
              className="hidden md:inline-flex items-center px-4 py-2 transition-colors duration-150"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: 'var(--ink)',
                color: 'var(--paper)',
                border: '1px solid var(--ink)',
                minHeight: '36px',
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
              Work together →
            </Link>

            <button
              type="button"
              className="lg:hidden flex items-center justify-center -mr-[10px]"
              style={{ color: 'var(--ink)', width: '44px', height: '44px' }}
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation"
              aria-expanded={menuOpen}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Secondary desktop chapter bar when exploring the 8 Engineering Principles on Home */}
        <AnimatePresence>
          {isHome && activeSection === 'engineering' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="hidden lg:block overflow-hidden"
              style={{ borderTop: '1px solid var(--wire)', background: 'var(--paper-2)' }}
            >
              <div
                className="max-w-[1440px] mx-auto w-full flex items-center justify-between py-1.5"
                style={{ paddingLeft: 'var(--page-gutter)', paddingRight: 'var(--page-gutter)' }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-4)' }}>
                  Principles Deep Dive:
                </span>
                <ul className="flex items-center gap-5 m-0 p-0 list-none" aria-label="Engineering principles chapters">
                  {principles.map(p => {
                    const isCurrent = activeChapter === p.id
                    return (
                      <li key={p.id}>
                        <a
                          href={`#${p.id}`}
                          aria-current={isCurrent ? 'location' : undefined}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '10.5px',
                            letterSpacing: '0.07em',
                            textTransform: 'uppercase',
                            color: isCurrent ? 'var(--signal)' : 'var(--ink-3)',
                            fontWeight: isCurrent ? 700 : 400,
                            transition: 'color 0.15s',
                          }}
                          className="hover:text-[var(--ink)]"
                        >
                          {p.index} · {p.word}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile & Tablet Full-Screen Navigation Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={drawerRef}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] flex flex-col"
            style={{ background: 'var(--paper)' }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            onKeyDown={handleDrawerKeyDown}
          >
            <div
              className="flex items-center justify-between h-[56px] px-6"
              style={{ borderBottom: '1px solid var(--wire)' }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  fontSize: '14.5px',
                  letterSpacing: '-0.015em',
                  color: 'var(--ink)',
                }}
              >
                Olabode Olusegun
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                style={{ color: 'var(--ink)', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-label="Close navigation"
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {/* Primary Sections */}
              <div className="px-6 py-4" style={{ background: 'var(--paper-2)', borderBottom: '1px solid var(--wire)' }}>
                <div className="type-label mb-3">Sections</div>
                <ul className="grid grid-cols-2 gap-2 m-0 p-0 list-none">
                  {PRIMARY_NAV.map(item => (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-between px-3.5 py-3 transition-colors"
                        style={{
                          background: 'var(--paper)',
                          border: '1px solid var(--wire)',
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 600,
                          fontSize: '14px',
                          color: isNavItemActive(item.id) ? 'var(--signal)' : 'var(--ink)',
                        }}
                      >
                        <span>{item.label}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-4)' }}>→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 8 Principles Quick Jump */}
              <div className="px-6 pt-5 pb-2">
                <div className="type-label">Engineering Principles (01 – 08)</div>
              </div>
              <ul className="m-0 p-0 list-none">
                {principles.map(p => (
                  <li key={p.id}>
                    <Link
                      href={isHome ? `#${p.id}` : `/#${p.id}`}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-baseline gap-4 px-6 py-4"
                      style={{ borderBottom: '1px solid var(--wire)', transition: 'background 0.1s' }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          letterSpacing: '0.06em',
                          color: 'var(--ink-4)',
                          fontVariantNumeric: 'tabular-nums',
                          flexShrink: 0,
                          minWidth: '24px',
                        }}
                      >
                        {p.index}
                      </span>
                      <div>
                        <div
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontWeight: 600,
                            fontSize: '18px',
                            letterSpacing: '-0.02em',
                            color: activeChapter === p.id ? 'var(--signal)' : 'var(--ink)',
                            lineHeight: 1.2,
                          }}
                        >
                          {p.word}
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '13px',
                            color: 'var(--ink-3)',
                            marginTop: '2px',
                            lineHeight: 1.45,
                          }}
                        >
                          {p.thesis}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="px-6 py-5 space-y-3"
              style={{ borderTop: '1px solid var(--wire)', background: 'var(--paper-2)', paddingBottom: 'max(20px, env(safe-area-inset-bottom))' }}
            >
              <Link
                href={isHome ? '#contact' : '/#contact'}
                onClick={() => setMenuOpen(false)}
                className="btn-primary w-full justify-center"
              >
                Work together →
              </Link>
              <a
                href={CONTACT_HREF}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  textAlign: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'var(--ink-2)',
                  paddingTop: '4px',
                }}
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
