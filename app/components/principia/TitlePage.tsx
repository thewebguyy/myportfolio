'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function TitlePage() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative min-h-screen flex flex-col"
      style={{ background: 'var(--paper)', borderBottom: '1px solid var(--wire)' }}
    >
      <div
        className="flex-1 flex flex-col max-w-[1440px] mx-auto w-full px-[var(--page-gutter)]"
        style={{ borderLeft: '1px solid var(--wire)', borderRight: '1px solid var(--wire)' }}
      >
        {/* Imprint line — sits at top, like a publisher colophon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="pt-32 pb-16 flex items-center justify-between"
          style={{ borderBottom: '1px solid var(--wire)' }}
        >
          <div className="type-label">
            Engineering Principia — Vol. I
          </div>
          <div className="type-label" style={{ color: 'var(--ink-4)' }}>
            Olabode Olusegun · Lagos, NG
          </div>
        </motion.div>

        {/* Title block */}
        <div className="flex-1 flex flex-col justify-center py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="grid lg:grid-cols-12 gap-12 lg:gap-0 items-end"
          >
            {/* Main title */}
            <div className="lg:col-span-8">
              <h1 className="display mb-8">
                Eight ways<br />
                an engineer<br />
                thinks.
              </h1>
              <p
                className="type-thesis max-w-[520px]"
                style={{ color: 'var(--ink-3)' }}
              >
                A document of engineering philosophy.
                Projects as citations. Reasoning as the subject.
              </p>
            </div>

            {/* Right column: coordinates + begin */}
            <div className="lg:col-span-4 lg:pl-12 flex flex-col gap-10">
              <div className="space-y-2">
                <div className="type-label">Location</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--ink-2)', fontVariantNumeric: 'tabular-nums' }}>
                  6.5244° N<br />3.3792° E
                </div>
              </div>
              <div className="space-y-2">
                <div className="type-label">Discipline</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--ink-2)' }}>
                  Full-Stack Systems<br />Fintech · Marketplace
                </div>
              </div>
              <div className="space-y-2">
                <div className="type-label">Edition</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--ink-2)' }}>
                  2026 · First
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom: scroll prompt + table of contents link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="pb-12 flex items-center justify-between"
          style={{ borderTop: '1px solid var(--wire)', paddingTop: '24px' }}
        >
          <Link
            href="#index"
            className="type-label flex items-center gap-3 transition-colors"
            style={{ color: 'var(--ink-3)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--signal)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-3)')}
          >
            <span>Begin reading</span>
            <span aria-hidden>↓</span>
          </Link>
          <div
            className="type-label flex items-center gap-2"
            style={{ color: 'var(--signal)' }}
          >
            <span
              className="inline-block w-[6px] h-[6px] rounded-full animate-pulse"
              style={{ background: 'var(--signal)' }}
              aria-label="Open to work"
            />
            Open to work
          </div>
        </motion.div>
      </div>
    </section>
  )
}
