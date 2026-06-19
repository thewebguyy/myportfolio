'use client'

import { useState, useEffect, useCallback } from 'react'
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

// CV link appears only when the env var is set to a real URL.
// Set NEXT_PUBLIC_RESUME_URL in .env.local to enable it.
const RESUME_URL = process.env.NEXT_PUBLIC_RESUME_URL?.trim() || ''
const hasResumeUrl = RESUME_URL.length > 0

export function Navbar() {
    const pathname = usePathname()
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [activeHash, setActiveHash] = useState('')

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60)
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
                    transition-all duration-300 h-[64px] flex items-center
                    ${scrolled
                        ? 'bg-background/90 backdrop-blur-md border-b-[0.5px] border-border-wire'
                        : 'bg-transparent border-b-[0.5px] border-transparent'
                    }
                `}
                role="banner"
            >
                <nav
                    className="max-w-[1440px] mx-auto w-full px-6 lg:px-8 flex items-center justify-between border-x-[0.5px] border-transparent h-full"
                    aria-label="Main navigation"
                >
                    {/* Left: Logo & Name */}
                    <Link
                        href="/"
                        className="flex items-center gap-4 group"
                        aria-label="Olabode Olusegun – home"
                    >
                        <div className="w-8 h-8 border-[0.5px] border-text-accent flex items-center justify-center font-mono text-[12px] text-text-accent bg-background">
                            OO
                        </div>
                        <span className="font-mono font-medium text-text-primary text-[12px] uppercase tracking-widest hidden md:block">
                            Olabode Olusegun
                        </span>
                    </Link>

                    {/* Center: Navigation Links */}
                    <ul className="hidden md:flex items-center gap-8" role="list">
                        {NAV_LINKS.map(({ label, href }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    onClick={() => handleNavClick(href)}
                                    className={`
                                        text-[11px] font-mono tracking-widest transition-colors duration-150 uppercase
                                        ${isActive(href)
                                            ? 'text-text-accent'
                                            : 'text-text-primary/60 hover:text-text-primary'
                                        }
                                    `}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Right: CTA Button */}
                    <div className="hidden md:flex items-center gap-6">
                        {hasResumeUrl && (
                            <a
                                href={RESUME_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[11px] font-mono tracking-widest uppercase text-text-primary/60 hover:text-text-primary transition-colors"
                            >
                                CV
                            </a>
                        )}
                        <Link
                            href="/#contact"
                            className="px-4 py-2 text-[11px] font-mono tracking-widest uppercase border-[0.5px] border-border-wire bg-surface text-text-primary transition-colors duration-300 hover:bg-text-primary hover:text-background"
                        >
                            Contact
                        </Link>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden text-text-primary/60 hover:text-text-primary transition-colors"
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </nav>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="fixed inset-0 z-[60] bg-background flex flex-col p-6"
                    >
                        <div className="flex justify-between items-center h-[64px]">
                            <Link
                                href="/"
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center gap-4"
                            >
                                <div className="w-8 h-8 border-[0.5px] border-text-accent flex items-center justify-center font-mono text-[12px] text-text-accent">
                                    OO
                                </div>
                            </Link>
                            <button
                                className="text-text-primary/60 hover:text-text-primary transition-colors"
                                onClick={() => setMenuOpen(false)}
                                aria-label="Close menu"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex-1 flex flex-col justify-center gap-8">
                            {NAV_LINKS.map(({ label, href }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    onClick={() => handleNavClick(href)}
                                    className="text-[32px] font-display font-semibold text-text-primary hover:text-text-accent transition-colors"
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>

                        <div className="py-8 border-t-[0.5px] border-border-wire flex flex-col gap-4">
                            {hasResumeUrl && (
                                <a
                                    href={RESUME_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full block text-center py-4 text-text-primary font-mono text-[11px] tracking-widest uppercase hover:text-text-accent transition-colors"
                                >
                                    CV
                                </a>
                            )}
                            <Link
                                href="/#contact"
                                onClick={() => setMenuOpen(false)}
                                className="w-full block text-center py-4 border-[0.5px] border-border-wire bg-surface text-text-primary font-mono text-[11px] tracking-widest uppercase hover:bg-text-primary hover:text-background transition-colors"
                            >
                                Contact
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

