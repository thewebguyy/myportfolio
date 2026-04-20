'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const NAV_LINKS = [
    { label: 'Work', href: '/#work' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Writing', href: '/blog' },
    { label: 'Contact', href: '/#contact' },
]

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
        const sectionIds = ['work', 'projects', 'contact']
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

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
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
                    transition-all duration-300 h-[72px] flex items-center
                    ${scrolled
                        ? 'bg-background/85 backdrop-blur-[20px] border-b border-surface-2'
                        : 'bg-transparent border-b border-transparent'
                    }
                `}
                role="banner"
            >
                <nav
                    className="max-w-[1280px] mx-auto w-full px-6 flex items-center justify-between"
                    aria-label="Main navigation"
                >
                    {/* Left: Logo & Name */}
                    <Link
                        href="/"
                        className="flex items-center gap-3 group"
                        aria-label="Olabode Olusegun – home"
                    >
                        <div className="w-8 h-8 border border-primary/30 flex items-center justify-center font-mono text-[14px] text-primary">
                            OO
                        </div>
                        <span className="font-sans font-medium text-white text-[14px] tracking-tight">
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
                                        text-[14px] font-normal transition-colors duration-150
                                        ${isActive(href)
                                            ? 'text-primary'
                                            : 'text-text-secondary hover:text-white'
                                        }
                                    `}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Right: CTA Button */}
                    <div className="hidden md:flex items-center">
                        <Link
                            href="/#contact"
                            className="px-4 py-[6px] text-[13px] font-medium rounded-full border border-primary/60 text-primary transition-all duration-200 hover:bg-primary/10 hover:border-primary"
                        >
                            Hire me
                        </Link>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden text-text-secondary hover:text-white transition-colors"
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <Bars3Icon className="w-6 h-6" />
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
                        <div className="flex justify-between items-center h-[72px]">
                            <Link
                                href="/"
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center gap-3"
                            >
                                <div className="w-8 h-8 border border-primary/30 flex items-center justify-center font-mono text-[14px] text-primary">
                                    OO
                                </div>
                            </Link>
                            <button
                                className="text-text-secondary hover:text-white transition-colors"
                                onClick={() => setMenuOpen(false)}
                                aria-label="Close menu"
                            >
                                <XMarkIcon className="w-8 h-8" />
                            </button>
                        </div>

                        <div className="flex-1 flex flex-col justify-center gap-8">
                            {NAV_LINKS.map(({ label, href }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    onClick={() => handleNavClick(href)}
                                    className="text-[48px] font-sans font-medium text-white hover:text-primary transition-colors"
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>

                        <div className="py-8 border-t border-surface-2">
                            <Link
                                href="/#contact"
                                onClick={() => setMenuOpen(false)}
                                className="btn-primary w-full block text-center py-4"
                            >
                                Hire me
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

