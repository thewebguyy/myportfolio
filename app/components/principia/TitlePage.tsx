'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { principles } from '@/lib/principles'
import { CONTACT_EMAIL, CONTACT_HREF } from '@/lib/constants'

const PROJECTS = [
  {
    id: 'servia',
    name: 'Servia',
    category: 'Operations Platform',
    metric: '350 RPS · zero double-bookings',
  },
  {
    id: 'servicebridge',
    name: 'ServiceBridge',
    category: 'Marketplace Engine',
    metric: 'Serializable isolation · WebSocket matching',
  },
  {
    id: 'subscription-manager',
    name: 'Subscription Manager',
    category: 'Fintech Infrastructure',
    metric: 'Idempotent webhooks · wallet fallback',
  },
]

export function TitlePage() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative min-h-[100dvh] flex flex-col"
      style={{ background: 'var(--paper)', borderBottom: '1px solid var(--wire)' }}
    >
      <div
        className="flex-1 flex flex-col max-w-[1440px] mx-auto w-full px-[var(--page-gutter)]"
        style={{ borderLeft: '1px solid var(--wire)', borderRight: '1px solid var(--wire)' }}
      >
        {/* Status bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="pt-20 lg:pt-28 pb-8 lg:pb-10 flex items-center justify-between"
          style={{ borderBottom: '1px solid var(--wire)' }}
        >
          <div className="type-label" style={{ color: 'var(--ink-4)' }}>
            Full-Stack Engineer
          </div>
          <div
            className="flex items-center gap-2"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              color: 'var(--signal)',
              fontWeight: 400,
            }}
          >
            <span
              className="inline-block w-[6px] h-[6px] rounded-full flex-shrink-0"
              style={{ background: 'var(--signal)' }}
              aria-hidden="true"
            />
            Available for work
          </div>
        </motion.div>

        {/* Title block */}
        <div className="flex-1 flex flex-col justify-center py-12 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="grid lg:grid-cols-12 gap-10 lg:gap-0 items-start"
          >
            {/* Left: name + bio + projects */}
            <div className="lg:col-span-7">
              <h1
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  fontSize: 'clamp(56px, 10vw, 120px)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.04em',
                  color: 'var(--ink)',
                  marginBottom: '32px',
                }}
              >
                Olabode<br />Olusegun.
              </h1>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(16px, 1.5vw, 18px)',
                  lineHeight: 1.62,
                  color: 'var(--ink-2)',
                  maxWidth: '40ch',
                  marginBottom: '40px',
                  fontWeight: 400,
                }}
              >
                I build production systems that stay up. 5+ years shipping
                fintech and marketplace infrastructure across West Africa —
                database isolation, payment webhook recovery, real-time
                WebSocket matching engines.
              </p>

              {/* Projects */}
              <div role="list" aria-label="Production projects" style={{ borderTop: '1px solid var(--wire)' }}>
                {PROJECTS.map((proj) => (
                  <Link
                    key={proj.id}
                    href={`/case-studies/${proj.id}`}
                    role="listitem"
                    className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between py-4 lg:py-[18px] group gap-1 sm:gap-4"
                    style={{ borderBottom: '1px solid var(--wire)' }}
                  >
                    <div className="flex items-baseline gap-3 min-w-0">
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 600,
                          fontSize: 'clamp(15px, 1.4vw, 17px)',
                          color: 'var(--ink)',
                          transition: 'color 0.15s',
                          flexShrink: 0,
                        }}
                        className="group-hover:text-[var(--signal)]"
                      >
                        {proj.name}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          color: 'var(--ink-4)',
                          letterSpacing: '0.06em',
                        }}
                      >
                        {proj.category}
                      </span>
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: 'var(--ink-3)',
                        letterSpacing: '0.02em',
                        flexShrink: 0,
                      }}
                    >
                      {proj.metric}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: principles + contact */}
            <div className="lg:col-span-5 lg:pl-16 lg:pt-16">
              <div className="mb-10">
                <div className="type-label mb-5" style={{ color: 'var(--ink-4)' }}>
                  Engineering principles
                </div>
                <div style={{ borderTop: '1px solid var(--wire)' }} role="list" aria-label="Principles">
                  {principles.map((p) => (
                    <a
                      key={p.id}
                      href={`#${p.id}`}
                      role="listitem"
                      className="group flex items-baseline gap-4 py-[9px]"
                      style={{ borderBottom: '1px solid var(--wire)' }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '10px',
                          color: 'var(--ink-4)',
                          fontVariantNumeric: 'tabular-nums',
                          flexShrink: 0,
                          letterSpacing: '0.04em',
                          minWidth: '24px',
                        }}
                      >
                        {p.index}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 600,
                          fontSize: '13px',
                          letterSpacing: '-0.01em',
                          color: 'var(--ink)',
                          transition: 'color 0.15s',
                          flexShrink: 0,
                          minWidth: '68px',
                        }}
                        className="group-hover:text-[var(--signal)]"
                      >
                        {p.word}
                      </span>
                      <span
                        className="truncate"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          color: 'var(--ink-4)',
                          lineHeight: 1.5,
                        }}
                      >
                        {p.thesis}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-2">
                <div className="type-label" style={{ color: 'var(--ink-4)' }}>Contact</div>
                <a
                  href={CONTACT_HREF}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    color: 'var(--ink-2)',
                    display: 'block',
                    transition: 'color 0.15s',
                    wordBreak: 'break-all',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--signal)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-2)')}
                >
                  {CONTACT_EMAIL}
                </a>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--ink-4)' }}>
                  Lagos · Nigeria · Open to remote
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pb-10 lg:pb-12 flex items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--wire)', paddingTop: '20px' }}
        >
          <a
            href="#observe"
            className="type-label flex items-center gap-2 transition-colors"
            style={{ color: 'var(--ink-3)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--signal)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-3)')}
          >
            Read the principles ↓
          </a>
          <div className="type-label" style={{ color: 'var(--ink-4)' }}>
            © 2026 Olabode Olusegun
          </div>
        </motion.div>
      </div>
    </section>
  )
}
