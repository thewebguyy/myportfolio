'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { CONTACT_EMAIL, CONTACT_HREF } from '@/lib/constants'

export function Colophon() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Fallback if clipboard API is unavailable
    }
  }

  return (
    <footer
      id="contact"
      aria-label="Contact"
      style={{ background: 'var(--paper)', borderTop: '1px solid var(--wire)' }}
    >
      <div
        className="max-w-[1440px] mx-auto"
        style={{ borderLeft: '1px solid var(--wire)', borderRight: '1px solid var(--wire)' }}
      >
        {/* Main Contact Grid */}
        <div className="px-[var(--page-gutter)] py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 items-start gap-10 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 min-w-0"
          >
            <div className="flex items-center gap-2.5 mb-6">
              <span
                className="inline-block w-[7px] h-[7px] rounded-full flex-shrink-0"
                style={{ background: 'var(--signal-bright)' }}
                aria-hidden="true"
              />
              <span className="type-label" style={{ color: 'var(--signal)', fontWeight: 700 }}>
                Available for work · Lagos, Nigeria &amp; Remote
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: 'clamp(36px, 5.5vw, 72px)',
                lineHeight: 0.96,
                letterSpacing: '-0.04em',
                color: 'var(--ink)',
                marginBottom: '24px',
              }}
            >
              You have a<br />
              problem.<br />
              Let&apos;s solve it.
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(16px, 1.35vw, 18px)',
                lineHeight: 1.65,
                color: 'var(--ink-2)',
                maxWidth: '48ch',
              }}
            >
              Payment systems that fail under retry. Marketplaces that buckle under concurrent load. Booking engines that double-charge. I architect and ship full-stack software designed to stay up.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.45 }}
            className="lg:col-span-5 min-w-0 space-y-8"
          >
            {/* Direct Contact Panel */}
            <div className="p-6" style={{ background: 'var(--paper-2)', border: '1px solid var(--wire)' }}>
              <div className="type-label mb-2">Direct Contact (Zero Form Friction)</div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(13px, 1.2vw, 15px)',
                  fontWeight: 700,
                  color: 'var(--ink)',
                  wordBreak: 'break-all',
                  marginBottom: '16px',
                }}
              >
                {CONTACT_EMAIL}
              </div>

              <div className="flex flex-wrap gap-3">
                <a href={CONTACT_HREF} className="btn-primary">
                  Email Olabode →
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="btn-secondary"
                  aria-live="polite"
                >
                  {copied ? '✓ Copied address' : 'Copy email'}
                </button>
              </div>
            </div>

            {/* Engagement Types */}
            <div className="space-y-2">
              <div className="type-label">Open Roles &amp; Engagements</div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14.5px', lineHeight: 1.6, color: 'var(--ink-3)' }}>
                Senior Full-Stack Engineer · Founding / Lead Engineer · Systems &amp; Fintech Contract Architecture
              </p>
            </div>

            {/* Elsewhere Links */}
            <div
              className="space-y-3"
              style={{ borderTop: '1px solid var(--wire)', paddingTop: '20px' }}
            >
              <div className="type-label">Elsewhere &amp; Archives</div>
              <ul
                className="flex flex-wrap gap-6 m-0 p-0 list-none"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '12.5px', color: 'var(--ink-2)' }}
              >
                <li>
                  <a
                    href="https://github.com/thewebguyy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--signal)] transition-colors"
                  >
                    GitHub ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/thewebguyy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--signal)] transition-colors"
                  >
                    LinkedIn ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/BodeBillions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--signal)] transition-colors"
                  >
                    X ↗
                  </a>
                </li>
                <li>
                  <Link href="/case-studies" className="hover:text-[var(--signal)] transition-colors">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-[var(--signal)] transition-colors">
                    Writing
                  </Link>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Bottom Colophon Strip */}
        <div
          className="px-[var(--page-gutter)] py-6 flex flex-wrap items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--wire)', background: 'var(--paper-2)' }}
        >
          <span className="type-label">
            Olabode Olusegun · Senior Full-Stack Engineer
          </span>
          <a
            href="#top"
            className="type-label hover:text-[var(--signal)] transition-colors"
            style={{ color: 'var(--ink-2)', fontWeight: 700 }}
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
