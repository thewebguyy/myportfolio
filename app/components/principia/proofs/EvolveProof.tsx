'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const DELTAS = [
  {
    label: 'Architecture',
    plan: 'PostgreSQL + HTTP polling — simple stateless queries every 5 seconds',
    reality: 'PostgreSQL + Socket.io + Redis Pub/Sub. Polling exhausted the DB connection pool at ~60 concurrent users; Redis Pub/Sub delivered matches in <100ms.',
  },
  {
    label: 'Matching',
    plan: 'Nearest available tradesperson wins the dispatch',
    reality: 'Acceptance-rate & proximity weighted. Dispatching to the closest provider who repeatedly declines jobs degraded homeowner trust.',
  },
  {
    label: 'Payments',
    plan: 'Single synchronous gateway webhook confirms the booking',
    reality: 'Gateway webhook + wallet fallback + scheduled reconciliation worker to survive 40s+ timeouts during Nigerian bank maintenance windows.',
  },
  {
    label: 'Concurrency',
    plan: 'Optimistic UI confirmation on booking submission',
    reality: 'PostgreSQL transaction-scoped advisory locks + idempotency keys. Optimistic UI double-booked Saturday afternoon artisan slots.',
  },
  {
    label: 'Observability',
    plan: 'Standard application console logs',
    reality: 'Structured JSON logs (Pino) + P95/P99 latency thresholds. Unstructured logs were unreadable during high-traffic spikes.',
  },
]

export function EvolveProof() {
  // Default to index 0 so visitor immediately sees a meaningful comparison on load
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const active = DELTAS[activeIndex]

  return (
    <div className="proof-shell">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="type-label" style={{ color: 'var(--ink-2)', fontWeight: 700 }}>
          Interactive Proof · 08 — Initial Design Assumptions vs. Production Reality
        </div>
        <span className="pill-tag">Architecture Ledger · ServiceBridge &amp; Servia</span>
      </div>

      <div className="proof-guide">
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--signal)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '4px' }}>
          What to observe
        </div>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', lineHeight: 1.55, color: 'var(--ink-2)', margin: 0 }}>
          Select any of the five architectural domains below (<strong>Architecture</strong>, <strong>Matching</strong>, <strong>Payments</strong>, <strong>Concurrency</strong>, or <strong>Observability</strong>) to inspect what the initial design assumed versus what real production load forced the system to become.
        </p>
      </div>

      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-0"
        style={{ border: '1px solid var(--wire-strong)', maxWidth: '720px' }}
        role="group"
        aria-label="Engineering decisions comparison"
      >
        {/* Left — the plan */}
        <div className="lg:border-r" style={{ borderColor: 'var(--wire)' }}>
          <div
            style={{
              padding: '12px 20px',
              borderBottom: '1px solid var(--wire)',
              background: 'var(--paper-2)',
              fontFamily: 'var(--font-mono)',
              fontSize: '10.5px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--ink-3)',
            }}
          >
            The Initial Plan (Select a domain)
          </div>
          {DELTAS.map((d, i) => {
            const isSelected = activeIndex === i
            return (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-pressed={isSelected}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '14px 20px',
                  borderBottom: i < DELTAS.length - 1 ? '1px solid var(--wire)' : 'none',
                  borderLeft: isSelected ? '3px solid var(--signal)' : '3px solid transparent',
                  background: isSelected ? 'var(--paper-2)' : 'transparent',
                  transition: 'background 0.15s',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    color: isSelected ? 'var(--signal)' : 'var(--ink-3)',
                    marginBottom: '4px',
                  }}
                >
                  0{i + 1} · {d.label}
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '13.5px', lineHeight: 1.5, color: 'var(--ink-2)' }}>
                  {d.plan}
                </div>
              </button>
            )
          })}
        </div>

        {/* Right — what production said */}
        <div className="border-t lg:border-t-0 flex flex-col justify-between" style={{ borderColor: 'var(--wire)', background: 'var(--paper-2)' }}>
          <div>
            <div
              style={{
                padding: '12px 20px',
                borderBottom: '1px solid var(--wire)',
                fontFamily: 'var(--font-mono)',
                fontSize: '10.5px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--signal)',
              }}
            >
              What Production Enforced
            </div>
            <div role="region" aria-live="polite" aria-label="Production reality">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.18 }}
                style={{ padding: '24px 20px' }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--signal)',
                    marginBottom: '8px',
                  }}
                >
                  0{activeIndex + 1} · {active.label} — Production Evolution
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', lineHeight: 1.68, color: 'var(--ink)', marginBottom: '16px' }}>
                  {active.reality}
                </div>
                <div
                  className="p-3.5"
                  style={{ background: 'var(--paper)', border: '1px solid var(--wire)', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-3)' }}
                >
                  Initial assumption: &ldquo;{active.plan}&rdquo;
                </div>
              </motion.div>
            </div>
          </div>

          <div
            style={{
              padding: '14px 20px',
              borderTop: '1px solid var(--wire)',
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              color: 'var(--ink-3)',
            }}
          >
            The gap between the initial plan and production reality is where senior engineering judgment is forged.
          </div>
        </div>
      </div>
    </div>
  )
}
