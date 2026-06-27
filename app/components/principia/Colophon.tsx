'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CONTACT_HREF } from '@/lib/constants'

export function Colophon() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      style={{ background: 'var(--paper)', borderTop: '1px solid var(--wire)' }}
    >
      <div
        className="max-w-[1440px] mx-auto"
        style={{ borderLeft: '1px solid var(--wire)', borderRight: '1px solid var(--wire)' }}
      >
        {/* Contact */}
        <div className="px-[var(--page-gutter)] py-16 lg:py-24 grid grid-cols-12 items-end gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 lg:col-span-7"
          >
            <div className="type-label mb-6 lg:mb-8" style={{ color: 'var(--ink-4)' }}>
              Available for work · Lagos / Remote
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: 'clamp(32px, 5.5vw, 76px)',
                lineHeight: 0.96,
                letterSpacing: '-0.04em',
                color: 'var(--ink)',
              }}
            >
              You have a<br />
              problem.<br />
              Let&apos;s solve it.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="col-span-12 lg:col-span-5 space-y-6 lg:space-y-8"
          >
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(15px, 1.3vw, 17px)',
                lineHeight: 1.62,
                color: 'var(--ink-2)',
                maxWidth: '38ch',
                fontWeight: 400,
              }}
            >
              Payment systems that fail under retry. Marketplaces that can&apos;t
              scale. Booking systems that double-charge. These are solvable
              problems. I&apos;ve solved all of them in production.
            </p>
            <div>
              <a href={CONTACT_HREF} className="btn-primary">
                Email Olabode
              </a>
            </div>
            <div
              className="space-y-3"
              style={{ borderTop: '1px solid var(--wire)', paddingTop: '24px' }}
            >
              <div className="type-label" style={{ color: 'var(--ink-4)' }}>Elsewhere</div>
              <div
                className="flex gap-6"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--ink-3)' }}
              >
                <a
                  href="https://github.com/thewebguyy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{ color: 'inherit' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-3)')}
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/thewebguyy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{ color: 'inherit' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-3)')}
                >
                  LinkedIn
                </a>
                <a
                  href="https://x.com/BodeBillions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{ color: 'inherit' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-3)')}
                >
                  X
                </a>
                <Link
                  href="/blog"
                  className="transition-colors"
                  style={{ color: 'inherit' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-3)')}
                >
                  Writing
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
