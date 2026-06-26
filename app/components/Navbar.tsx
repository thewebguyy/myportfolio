'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
    { label: 'About', href: '/#about' },
    { label: 'Work', href: '/#work' },
    { label: 'AI', href: '/#ai' },
    { label: 'Writing', href: '/#writing' },
    { label: 'Contact', href: '/#contact' },
]

export function Navbar() {
    const RESUME_URL = process.env.NEXT_PUBLIC_RESUME_URL?.trim() || ''
    const hasResumeUrl = RESUME_URL.length > 0

    const pathname = usePathname()
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [activeHash, setActiveHash] = useState('')
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!menuOpen) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setMenuOpen(false)
                return
            }

            if (e.key !== 'Tab') return

            const container = menuRef.current
            if (!container) return

            const focusables = container.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
            )
            if (focusables.length === 0) return

            const first = focusables[0]
            const last = focusables[focusables.length - 1]

            if (e.shiftKey) {
                if (document.activeElement === first) {
                    last.focus()
                    e.preventDefault()
                }
            } else {
                if (document.activeElement === last) {
                    first.focus()
                    e.preventDefault()
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        const container = menuRef.current
        if (container) {
            const focusables = container.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
            if (focusables.length > 0) {
                setTimeout(() => focusables[0].focus(), 50)
            }
        }

        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [menuOpen])

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        const sectionIds = ['about', 'manifesto', 'work', 'ai', 'writing', 'currently-building', 'contact']
        const observers: IntersectionObserver[] = []

        sectionIds.forEach((id) => {
            const el = document.getElementById(id)
            if (!el) return
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        if (id === 'manifesto') {
                            setActiveHash('#about')
                        } else if (id === 'currently-building') {
                            setActiveHash('#contact')
                        } else {
                            setActiveHash(`#${id}`)
                        }
                    }
                },
                { rootMargin: '-40% 0px -55% 0px' }
            )
            obs.observe(el)
            observers.push(obs)
        })

        return () => observers.forEach((o) => o.disconnect())
    }, [pathname])

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden'
            document.body.classList.add('mobile-menu-open')
        } else {
            document.body.style.overflow = 'unset'
            document.body.classList.remove('mobile-menu-open')
        }
    }, [menuOpen])

    const isActive = useCallback(
        (href: string) => {
            if (href.startsWith('/#')) return activeHash === href.slice(1)
            return pathname === href
        },
        [activeHash, pathname]
    )

    const handleNavClick = (href: string) => {
        setMenuOpen(false)
        if (href.startsWith('/#') && pathname === '/') {
            const id = href.slice(2)
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <>
            <header
                className={`
                    fixed top-0 left-0 right-0 z-50
                    transition-all duration-200 h-[56px] flex items-center
                    ${scrolled
                        ? 'bg-paper/95 backdrop-blur-sm border-b border-[var(--wire)]'
                        : 'bg-transparent border-b border-transparent'
                    }
                `}
                role="banner"
            >
                <nav
                    className="max-w-[1440px] mx-auto w-full px-6 lg:px-8 flex items-center justify-between h-full"
                    aria-label="Main navigation"
                >
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-3 group"
                        aria-label="Olabode Olusegun – home"
                    >
                        <span
                            className="font-mono font-bold text-[13px] tracking-[0.18em] uppercase text-ink"
                            style={{ fontFamily: 'var(--font-mono)' }}
                        >
                            OA.DEV
                        </span>
                        {/* Signal dot — live status indicator */}
                        <span
                            className="w-[6px] h-[6px] rounded-full animate-pulse"
                            style={{ background: 'var(--signal)' }}
                            aria-label="Available for work"
                        />
                    </Link>

                    {/* Desktop nav links */}
                    <ul className="hidden md:flex items-center gap-8" role="list">
                        {NAV_LINKS.map(({ label, href }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    onClick={() => handleNavClick(href)}
                                    className="text-[11px] tracking-[0.12em] uppercase transition-colors duration-150"
                                    style={{
                                        fontFamily: 'var(--font-mono)',
                                        color: isActive(href) ? 'var(--signal)' : 'var(--ink-3)',
                                    }}
                                    onMouseEnter={e => { if (!isActive(href)) (e.currentTarget as HTMLElement).style.color = 'var(--ink)' }}
                                    onMouseLeave={e => { if (!isActive(href)) (e.currentTarget as HTMLElement).style.color = 'var(--ink-3)' }}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Right CTA */}
                    <div className="hidden md:flex items-center gap-6">
                        {hasResumeUrl && (
                            <a
                                href={RESUME_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[11px] tracking-[0.12em] uppercase transition-colors"
                                style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-3)' }}
                                onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
                                onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-3)')}
                            >
                                CV
                            </a>
                        )}
                        <Link
                            href="/#contact"
                            className="px-5 py-2 text-[11px] tracking-[0.12em] uppercase border transition-all duration-150"
                            style={{
                                fontFamily: 'var(--font-mono)',
                                background: 'var(--ink)',
                                color: 'var(--paper)',
                                borderColor: 'var(--ink)',
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
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden transition-colors"
                        style={{ color: 'var(--ink-3)' }}
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open menu"
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-3)')}
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </nav>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        ref={menuRef}
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="fixed inset-0 z-[60] flex flex-col p-6"
                        style={{ background: 'var(--paper)' }}
                    >
                        <div className="flex justify-between items-center h-[56px]">
                            <span className="font-mono font-bold text-[13px] tracking-[0.18em] uppercase" style={{ color: 'var(--ink)' }}>
                                OA.DEV
                            </span>
                            <button
                                style={{ color: 'var(--ink-3)' }}
                                onClick={() => setMenuOpen(false)}
                                aria-label="Close menu"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex-1 flex flex-col justify-center gap-10" style={{ borderTop: '1px solid var(--wire)', paddingTop: '3rem' }}>
                            {NAV_LINKS.map(({ label, href }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    onClick={() => handleNavClick(href)}
                                    className="text-[40px] font-semibold leading-none transition-colors"
                                    style={{
                                        fontFamily: 'var(--font-sans)',
                                        color: isActive(href) ? 'var(--signal)' : 'var(--ink)',
                                        letterSpacing: '-0.02em',
                                    }}
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>

                        <div className="pt-8 flex flex-col gap-3" style={{ borderTop: '1px solid var(--wire)' }}>
                            {hasResumeUrl && (
                                <a
                                    href={RESUME_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full text-center py-4 text-[11px] tracking-[0.12em] uppercase"
                                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-3)' }}
                                >
                                    CV
                                </a>
                            )}
                            <Link
                                href="/#contact"
                                onClick={() => setMenuOpen(false)}
                                className="w-full text-center py-4 text-[11px] tracking-[0.12em] uppercase"
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    background: 'var(--ink)',
                                    color: 'var(--paper)',
                                    border: '1px solid var(--ink)',
                                }}
                            >
                                Hire me →
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
