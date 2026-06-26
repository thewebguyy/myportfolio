'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

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
      className="relative min-h-screen flex flex-col"
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
          className="pt-32 pb-16 flex items-center justify-between"
          style={{ borderBottom: '1px solid var(--wire)' }}
        >
          <div className="type-label">
            Engineering Principia — Vol. I
          </div>
          <div
            className="type-label flex items-center gap-2"
            style={{ color: 'var(--signal)' }}
          >
            <span
              className="inline-block w-[6px] h-[6px] rounded-full animate-pulse"
              style={{ background: 'var(--signal)' }}
              aria-hidden="true"
            />
            Available for work
          </div>
        </motion.div>

        {/* Title block */}
        <div className="flex-1 flex flex-col justify-center py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="grid lg:grid-cols-12 gap-16 lg:gap-0 items-start"
          >
            {/* Left: name + role + what was built */}
            <div className="lg:col-span-7">
              <div
                className="type-label mb-6"
                style={{ color: 'var(--ink-4)' }}
              >
                Full-Stack Engineer · Lagos, Nigeria
              </div>
              <h1 className="display mb-10" style={{ lineHeight: 1.02 }}>
                Olabode<br />Olusegun.
              </h1>
              <p
                className="type-thesis max-w-[480px] mb-16"
                style={{ color: 'var(--ink-3)' }}
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
                className="space-y-0"
                style={{ borderTop: '1px solid var(--wire)' }}
              >
                {PROJECTS.map((proj) => (
                  <Link
                    key={proj.id}
                    href={`/case-studies/${proj.id}`}
                    role="listitem"
                    className="flex items-baseline justify-between py-5 group"
                    style={{ borderBottom: '1px solid var(--wire)' }}
                  >
                    <div>
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 600,
                          fontSize: '18px',
                          color: 'var(--ink)',
                          transition: 'color 0.15s',
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
                          letterSpacing: '0.08em',
                          marginLeft: '12px',
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

            {/* Right: what the Principia is */}
            <div className="lg:col-span-5 lg:pl-16 lg:pt-24">
              <div
                className="p-8"
                style={{ border: '1px solid var(--wire)', background: 'var(--paper-2)' }}
              >
                <div className="type-label mb-6" style={{ color: 'var(--ink-4)' }}>
                  About this document
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    lineHeight: 1.78,
                    color: 'var(--ink-2)',
                    marginBottom: '20px',
                  }}
                >
                  This is a record of eight engineering principles I derived
                  from production failures, load tests, and architectural rewrites
                  across three systems — Servia, ServiceBridge, and the
                  Subscription Manager.
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    lineHeight: 1.78,
                    color: 'var(--ink-3)',
                    marginBottom: '28px',
                  }}
                >
                  Each chapter opens with a production incident. The principle
                  follows from the failure — not from first principles, but from
                  what production actually taught me.
                </p>
                <Link
                  href="#index"
                  className="type-label flex items-center gap-2 transition-colors"
                  style={{ color: 'var(--signal)' }}
                >
                  Read the eight principles ↓
                </Link>
              </div>

              <div className="mt-8 space-y-3">
                <div className="type-label" style={{ color: 'var(--ink-4)' }}>Contact</div>
                <a
                  href="mailto:support@mycardglobal.com"
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
                  support@mycardglobal.com
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
            <span>Eight chapters below</span>
            <span aria-hidden>↓</span>
          </Link>
          <div className="type-label" style={{ color: 'var(--ink-4)' }}>
            2026 · First Edition
          </div>
        </motion.div>
      </div>
    </section>
  )
}
