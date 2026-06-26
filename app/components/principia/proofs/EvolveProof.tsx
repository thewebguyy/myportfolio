'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface Delta {
  label: string
  plan: string
  reality: string
}

const DELTAS: Delta[] = [
  {
    label: 'Architecture',
    plan: 'PostgreSQL — we know SQL, it scales fine',
    reality: 'PostgreSQL + Redis pub/sub for real-time seat availability. SQL couldn\'t broadcast fast enough.',
  },
  {
    label: 'Matching',
    plan: 'Nearest driver wins',
    reality: 'Acceptance-rate weighted. Nearest driver who declines every long-haul is worse than the one 2km farther.',
  },
  {
    label: 'Payments',
    plan: 'Paystack handles it',
    reality: 'Paystack + wallet fallback + manual settlement for NGN volatility during bank maintenance windows.',
  },
  {
    label: 'Concurrency',
    plan: 'Row-level locks',
    reality: 'Serializable isolation + idempotency keys. Locks under load caused deadlock cascades.',
  },
  {
    label: 'Monitoring',
    plan: 'Log errors to console',
    reality: 'Structured JSON logs → Datadog. P99 alerting. Console was unreadable at 350 RPS.',
  },
]

export function EvolveProof() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const active = activeIndex !== null ? DELTAS[activeIndex] : null

  return (
    <div style={{ borderTop: '1px solid var(--wire)', paddingTop: '48px', marginTop: '48px' }}>
      <div className="type-label mb-8" style={{ color: 'var(--ink-4)' }}>
        Interactive Proof · 08
      </div>

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--ink-3)', marginBottom: '32px' }}>
        The plan vs what production said. Select any decision.
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0" style={{ border: '1px solid var(--wire)', maxWidth: '640px' }}>
        {/* Left panel — the plan */}
        <div style={{ borderRight: '1px solid var(--wire)' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--wire)', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-4)' }}>
            The Plan
          </div>
          {DELTAS.map((d, i) => (
            <div
              key={i}
              onClick={() => setActiveIndex(i === activeIndex ? null : i)}
              style={{
                padding: '16px 20px',
                borderBottom: i < DELTAS.length - 1 ? '1px solid var(--wire)' : 'none',
                cursor: 'pointer',
                background: activeIndex === i ? 'var(--paper-2)' : 'transparent',
                transition: 'background 0.15s',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: activeIndex === i ? 'var(--signal)' : 'var(--ink-4)', marginBottom: '6px' }}>
                {d.label}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.6, color: 'var(--ink-3)' }}>
                {d.plan}
              </div>
            </div>
          ))}
        </div>

        {/* Right panel — what production said */}
        <div>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--wire)', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--signal)' }}>
            What Production Said
          </div>
          {active ? (
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              style={{ padding: '24px 20px' }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--signal)', marginBottom: '12px' }}>
                {active.label}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 1.7, color: 'var(--ink-2)' }}>
                {active.reality}
              </div>
            </motion.div>
          ) : (
            <div style={{ padding: '24px 20px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--ink-4)' }}>
              Select a decision →
            </div>
          )}
        </div>
      </div>

      {active && (
        <motion.div
          key={`note-${activeIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ marginTop: '20px', fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.75, color: 'var(--ink-3)', maxWidth: '480px' }}
        >
          The gap between the plan and the reality is not failure.{' '}
          <span style={{ color: 'var(--ink-2)' }}>It is the engineering.</span>
        </motion.div>
      )}
    </div>
  )
}
