'use client'

import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-background border-b-[0.5px] border-border-wire">
      <div className="max-w-[1440px] mx-auto border-x-[0.5px] border-border-wire px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Col 1: Logo & Info */}
          <div className="md:col-span-5">
            <div className="font-serif text-[32px] text-text-primary tracking-tighter mb-6">
              Olabode Olusegun.
            </div>
            <p className="font-mono text-[12px] text-text-primary/60 leading-relaxed max-w-[240px]">
              © {currentYear} Olabode Olusegun.<br />
              All rights reserved.<br /><br />
              Lagos — Worldwide
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-[11px] uppercase text-text-accent tracking-widest mb-6">Navigation</h4>
            <ul className="space-y-4">
              {['About', 'Work', 'AI', 'Writing', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/#${item.toLowerCase()}`} 
                    className="font-mono text-[13px] text-text-primary/70 hover:text-text-primary transition-colors uppercase"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Social */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-[11px] uppercase text-text-accent tracking-widest mb-6">Links</h4>
            <ul className="space-y-4">
              {[
                { name: 'LinkedIn', url: 'https://linkedin.com/in/thewebguyy' },
                { name: 'GitHub', url: 'https://github.com/thewebguyy' },
                { name: 'X', url: 'https://x.com/BodeBillions' }
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-mono text-[13px] text-text-primary/70 hover:text-text-primary transition-colors uppercase"
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
              className="w-12 h-12 border-[0.5px] border-border-wire bg-surface hover:bg-text-primary text-text-primary/60 hover:text-background transition-colors flex items-center justify-center group"
              aria-label="Back to top"
            >
              <svg width="12" height="12" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-colors">
                <path d="M10 15V5M10 5L5 10M10 5L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}