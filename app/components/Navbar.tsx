'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

/**
 * Navbar Component
 * Features:
 * - Transparent → frosted-glass scroll transition
 * - Active section highlighting via Intersection Observer
 * - Responsive mobile menu with smooth open/close animation
 * - Keyboard-accessible (WCAG 2.2 AA)
 */

const NAV_LINKS = [
    { label: 'Work', href: '/#bento' },
    { label: 'Cases', href: '/#case-studies' },
    { label: 'Skills', href: '/#skills' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/#contact' },
]

export function Navbar() {
    const pathname = usePathname()
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [activeHash, setActiveHash] = useState('')

    // Scroll → glass effect
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24)
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Intersection Observer → active section highlight
    useEffect(() => {
        const sectionIds = ['bento', 'case-studies', 'skills', 'contact']
        const observers: IntersectionObserver[] = []

        sectionIds.forEach((id) => {
            const el = document.getElementById(id)
            if (!el) return
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActiveHash(`#${id}`) },
                { rootMargin: '-40% 0px -55% 0px' }
            )
            obs.observe(el)
            observers.push(obs)
        })

        return () => observers.forEach((o) => o.disconnect())
    }, [pathname])

    // Close menu on resize → desktop
    useEffect(() => {
        const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    // Close menu on escape
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [])

    const isActive = useCallback(
        (href: string) => {
            if (href.startsWith('/#')) return activeHash === href.slice(1)
            return pathname === href
        },
        [activeHash, pathname]
    )

    const handleNavClick = (href: string) => {
        setMenuOpen(false)
        // Smooth scroll for same-page hash links
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
          transition-all duration-300
          ${scrolled
                        ? 'bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/60 shadow-lg shadow-black/20'
                        : 'bg-transparent border-b border-transparent'
                    }
        `}
                role="banner"
            >
                <nav
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
                    aria-label="Main navigation"
                >
                    {/* ── Logo ── */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-md"
                        aria-label="Olabode Olusegun – home"
                    >
                        <span
                            className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary
                         flex items-center justify-center text-black font-bold text-sm
                         group-hover:scale-105 transition-transform duration-200"
                            aria-hidden="true"
                        >
                            OO
                        </span>
                        <span className="hidden sm:block font-semibold text-white text-sm tracking-tight">
                            Olabode<span className="text-primary">.</span>
                        </span>
                    </Link>

                    {/* ── Desktop links ── */}
                    <ul className="hidden md:flex items-center gap-1" role="list">
                        {NAV_LINKS.map(({ label, href }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    onClick={() => handleNavClick(href)}
                                    className={`
                    relative px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60
                    ${isActive(href)
                                            ? 'text-primary'
                                            : 'text-gray-400 hover:text-white'
                                        }
                  `}
                                    aria-current={isActive(href) ? 'page' : undefined}
                                >
                                    {label}
                                    {isActive(href) && (
                                        <motion.span
                                            layoutId="nav-indicator"
                                            className="absolute inset-0 rounded-md bg-primary/10"
                                            transition={{ type: 'spring', stiffness: 380, damping: 35 }}
                                        />
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* ── Desktop CTA ── */}
                    <div className="hidden md:flex items-center gap-3">
                        <a
                            href="https://github.com/thewebguyy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors p-2 rounded-md
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                            aria-label="GitHub profile"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                        </a>

                        <a
                            href="/#contact"
                            onClick={() => handleNavClick('/#contact')}
                            className="px-4 py-2 text-sm font-semibold rounded-lg
                         bg-primary text-black hover:bg-primary-light
                         transition-all duration-200 hover:shadow-lg hover:shadow-primary/25
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                        >
                            Hire Me
                        </a>
                    </div>

                    {/* ── Mobile hamburger ── */}
                    <button
                        id="mobile-menu-toggle"
                        className="md:hidden p-2 rounded-md text-gray-400 hover:text-white
                       hover:bg-gray-800 transition-colors
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menu"
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    >
                        {menuOpen
                            ? <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                            : <Bars3Icon className="w-6 h-6" aria-hidden="true" />
                        }
                    </button>
                </nav>
            </header>

            {/* ── Mobile menu panel ── */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        id="mobile-menu"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Mobile navigation"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="fixed top-16 inset-x-0 z-40 md:hidden
                       bg-gray-950/95 backdrop-blur-xl border-b border-gray-800
                       shadow-2xl shadow-black/40"
                    >
                        <ul className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1" role="list">
                            {NAV_LINKS.map(({ label, href }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        onClick={() => handleNavClick(href)}
                                        className={`
                      flex items-center px-4 py-3 rounded-lg text-base font-medium
                      transition-colors duration-150
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60
                      ${isActive(href)
                                                ? 'text-primary bg-primary/10'
                                                : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
                                            }
                    `}
                                        aria-current={isActive(href) ? 'page' : undefined}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}

                            {/* Mobile CTA */}
                            <li className="mt-3 pt-3 border-t border-gray-800">
                                <a
                                    href="/#contact"
                                    onClick={() => handleNavClick('/#contact')}
                                    className="flex items-center justify-center w-full px-4 py-3 rounded-lg
                             bg-primary text-black font-semibold text-base
                             hover:bg-primary-light transition-colors duration-150"
                                >
                                    Hire Me →
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Mobile overlay backdrop ── */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="fixed inset-0 z-30 md:hidden bg-black/40"
                        onClick={() => setMenuOpen(false)}
                        aria-hidden="true"
                    />
                )}
            </AnimatePresence>
        </>
    )
}
