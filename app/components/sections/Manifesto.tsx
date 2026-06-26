'use client'

import { motion } from 'framer-motion'

const CONSTRAINTS = [
  {
    icon: '⚡',
    title: 'Flaky infrastructure',
    body: 'West African mobile connections drop mid-transaction. I design retry logic, idempotency keys, and graceful degradation so a network hiccup never means a lost order or a duplicate charge.',
  },
  {
    icon: '🔒',
    title: 'Payment inconsistency',
    body: "African payment providers have async webhooks, partial settlements, and undocumented failure modes. I've built reconciliation loops that catch the edge cases their SDKs don't document.",
  },
  {
    icon: '⏱',
    title: 'Concurrency at scale',
    body: 'Double-bookings under Read Committed isolation. Serializable transactions caught the race. 14.5% P2034 collision rate during load tests — zero double bookings in production.',
  },
]

export function Manifesto() {
  return (
    <section id="manifesto">
      {/* Manifesto text — paper background */}
      <div style={{ background: 'var(--paper)', borderBottom: '1px solid var(--wire)' }}>
        <div
          className="max-w-[1440px] mx-auto px-8 lg:px-16 py-24 lg:py-32"
          style={{ borderLeft: '1px solid var(--wire)', borderRight: '1px solid var(--wire)' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            <div className="lg:col-span-5">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--signal)', marginBottom: '16px' }}
              >
                How I work
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(30px, 4vw, 48px)', letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--ink)' }}
              >
                Build it right. Ship it fast.{' '}
                <span style={{ opacity: 0.45 }}>Keep it running.</span>
              </motion.h2>
            </div>

            <div className="lg:col-span-7 space-y-6 mt-2 lg:mt-0">
              {[
                'Good software is specific. The engineers I respect most can tell you exactly which edge case kept them up at night, what the fix was, and why the naive solution would have failed in three months.',
                "I believe the job is closer to infrastructure than craft. Your code will be read by strangers, run on machines you don’t control, and stressed by users who don’t behave the way you expected. That’s the real specification.",
                'I also believe in finishing things. Shipped and imperfect beats polished and theoretical. The only way to know if something actually works is to let it meet production.',
              ].map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', lineHeight: 1.8, color: 'var(--ink-2)' }}
                >
                  {para}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Constraint band — dark inversion, ONLY dark section on the page */}
      <div style={{ background: 'var(--ink)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div
          className="max-w-[1440px] mx-auto"
          style={{ borderLeft: '1px solid rgba(255,255,255,0.06)', borderRight: '1px solid rgba(255,255,255,0.06)' }}
        >
          {/* Band header */}
          <div className="px-8 lg:px-16 py-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--signal)' }}
            >
              Real constraints I&apos;ve shipped against
            </motion.p>
          </div>

          {/* 3-cell grid */}
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            {CONSTRAINTS.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-8 lg:p-10 flex flex-col gap-4"
                style={{ borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}
              >
                <span style={{ fontSize: '24px', color: 'var(--signal)' }}>{c.icon}</span>
                <h3
                  style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '18px', color: '#f5f2ed', letterSpacing: '-0.01em', lineHeight: 1.2 }}
                >
                  {c.title}
                </h3>
                <p
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 1.75, color: 'rgba(245, 242, 237, 0.55)' }}
                >
                  {c.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
