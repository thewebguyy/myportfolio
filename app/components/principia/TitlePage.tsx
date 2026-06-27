'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { principles } from '@/lib/principles'

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
        {/* Imprint line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="pt-20 lg:pt-32 pb-10 lg:pb-14 flex items-center justify-between"
          style={{ borderBottom: '1px solid var(--wire)' }}
        >
          <div className="type-label" style={{ color: 'var(--ink-4)' }}>
            Engineering Principia — Vol. I
          </div>
          <div
            className="type-label flex items-center gap-2"
            style={{ color: 'var(--signal)' }}
          >
            <span
              className="inline-block w-[5px] h-[5px] rounded-full"
              style={{ background: 'var(--signal)' }}
              aria-hidden="true"
            />
            Available for work
          </div>
        </motion.div>

        {/* Title block */}
        <div className="flex-1 flex flex-col justify-center py-10 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="grid lg:grid-cols-12 gap-12 lg:gap-0 items-start"
          >
            {/* Left: name + role + projects */}
            <div className="lg:col-span-7">
              <div
                className="type-label mb-5"
                style={{ color: 'var(--ink-4)' }}
              >
                Full-Stack Engineer · Lagos, Nigeria
              </div>
              <h1 className="display mb-8" style={{ lineHeight: 1.02 }}>
                Olabode<br />Olusegun.
              </h1>
              <p
                className="max-w-[480px] mb-10 lg:mb-14"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(13px, 1.4vw, 15px)',
                  lineHeight: 1.78,
                  color: 'var(--ink-3)',
                }}
              >
                I build production systems that stay up. Three years shipping
                fintech and marketplace infrastructure across West Africa —
                from database isolation to payment webhook recovery to
                real-time WebSocket matching engines.
              </p>

              {/* Projects grid */}
              <div
                role="list"
                aria-label="Production projects"
                style={{ borderTop: '1px solid var(--wire)' }}
              >
                {PROJECTS.map((proj) => (
                  <Link
                    key={proj.id}
                    href={`/case-studies/${proj.id}`}
                    role="listitem"
                    className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between py-4 lg:py-5 group gap-1 sm:gap-0"
                    style={{ borderBottom: '1px solid var(--wire)' }}
                  >
                    <div className="flex items-baseline gap-3">
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 600,
                          fontSize: 'clamp(15px, 1.5vw, 18px)',
                          color: 'var(--ink)',
                          transition: 'color 0.15s',
                          flexShrink: 0,
                        }}
                        className="group-hover:text-[var(--signal)]"
                      >
                        {proj.name}
                      </span>
                      <span
                        className="hidden sm:inline"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          color: 'var(--ink-4)',
                          letterSpacing: '0.08em',
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
                        letterSpacing: '0.04em',
                      }}
                    >
                      {proj.metric}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: chapter list + contact */}
            <div className="lg:col-span-5 lg:pl-16 lg:pt-20">
              {/* Chapter reference */}
              <div className="mb-10">
                <div className="type-label mb-5" style={{ color: 'var(--ink-4)' }}>
                  Eight principles
                </div>
                <div
                  style={{ borderTop: '1px solid var(--wire)' }}
                  role="list"
                  aria-label="Chapter list"
                >
                  {principles.map((p) => (
                    <a
                      key={p.id}
                      href={`#${p.id}`}
                      role="listitem"
                      className="group flex items-baseline gap-4 py-[10px] transition-colors"
                      style={{ borderBottom: '1px solid var(--wire)' }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '10px',
                          color: 'var(--ink-4)',
                          fontVariantNumeric: 'tabular-nums',
                          flexShrink: 0,
                          letterSpacing: '0.06em',
                        }}
                      >
                        {p.index}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 600,
                          fontSize: '14px',
                          letterSpacing: '-0.01em',
                          color: 'var(--ink)',
                          transition: 'color 0.15s',
                          flexShrink: 0,
                          minWidth: '72px',
                        }}
                        className="group-hover:text-[var(--signal)]"
                      >
                        {p.word}
                      </span>
                      <span
                        className="hidden sm:block"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          color: 'var(--ink-4)',
                          lineHeight: 1.5,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {p.thesis}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-3">
                <div className="type-label" style={{ color: 'var(--ink-4)' }}>Contact</div>
                <a
                  href="mailto:olabode@mycardglobal.com"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    color: 'var(--ink-2)',
                    display: 'block',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--signal)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-2)')}
                >
                  olabode@mycardglobal.com
                </a>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: 'var(--ink-4)',
                  }}
                >
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
          transition={{ duration: 0.6, delay: 0.5 }}
          className="pb-10 lg:pb-12 flex items-center justify-between"
          style={{ borderTop: '1px solid var(--wire)', paddingTop: '20px' }}
        >
          <a
            href="#observe"
            className="type-label flex items-center gap-3 transition-colors"
            style={{ color: 'var(--ink-3)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--signal)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-3)')}
          >
            <span>Read the principles</span>
            <span aria-hidden>↓</span>
          </a>
          <div className="type-label" style={{ color: 'var(--ink-4)' }}>
            © 2026 Olabode Olusegun
          </div>
        </motion.div>
      </div>
    </section>
  )
}
