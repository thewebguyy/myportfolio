'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-background border-t border-surface-2 py-16">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Col 1: Logo & Info */}
          <div className="md:col-span-5">
            <div className="font-mono font-bold text-[18px] text-white tracking-tighter mb-4">
              Olabode<span className="text-primary">.</span>
            </div>
            <p className="text-[12px] text-text-muted leading-relaxed max-w-[240px]">
              © {currentYear} Olabode Olusegun.<br />
              All rights reserved.<br /><br />
              Lagos — Worldwide
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-[10px] uppercase text-text-muted tracking-widest mb-6">Navigation</h4>
            <ul className="space-y-4">
              {['Work', 'AI', 'Writing', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`#${item.toLowerCase()}`} 
                    className="font-mono text-[12px] text-text-secondary hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Social */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-[10px] uppercase text-text-muted tracking-widest mb-6">Social</h4>
            <ul className="space-y-4">
              {[
                { name: 'LinkedIn', url: 'https://linkedin.com/in/thewebguyy' },
                { name: 'GitHub', url: 'https://github.com/thewebguyy' },
                { name: 'Twitter', url: 'https://twitter.com/thewebguyy' }
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-mono text-[12px] text-text-secondary hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Back to top */}
          <div className="md:col-span-1 flex justify-end items-start">
            <button 
              onClick={scrollToTop}
              className="p-2 border border-surface-2 rounded-full hover:border-primary transition-colors group"
              aria-label="Back to top"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-text-muted group-hover:text-primary transition-colors">
                <path d="M10 15V5M10 5L5 10M10 5L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}