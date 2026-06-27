'use client'

import { motion } from 'framer-motion'

const TIMELINE = [
  {
    period: '2019 – present',
    role: 'Freelance',
    detail: 'Client software, web applications, production systems',
  },
  {
    period: '2020 – 2021',
    role: 'CTO · PeerCars',
    detail: 'Vehicle marketplace — architecture, product, technical leadership',
  },
  {
    period: '2023',
    role: 'Contract · Seerbit',
    detail: 'Payment infrastructure, subscription systems',
  },
  {
    period: '2023 – present',
    role: 'Independent',
    detail: 'Production systems — ServiceBridge, Servia',
  },
]

export function Background() {
  return (
    <section
      aria-label="Background"
      style={{ background: 'var(--paper)', borderBottom: '1px solid var(--wire)' }}
    >
      <div
        className="max-w-[1440px] mx-auto"
        style={{ borderLeft: '1px solid var(--wire)', borderRight: '1px solid var(--wire)' }}
      >
        <div className="px-[var(--page-gutter)] py-16 lg:py-24 grid lg:grid-cols-12 gap-12 lg:gap-16">

          {/* About */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-5"
          >
            <div className="type-label mb-6" style={{ color: 'var(--ink-4)' }}>
              Background
            </div>
            {[
              'I started writing software for clients in 2019. The first few years were frontend-heavy: building responsive interfaces, integrating APIs, translating what clients said they wanted into things that worked on their phones.',
              'From 2020 to 2021, I was CTO of PeerCars — a vehicle marketplace — where the work shifted from writing code to making architectural decisions that other people\'s work depended on. That changed what I thought about.',
              'A feature that works in a demo is easy. A system that handles concurrent users, fails gracefully, and recovers without manual intervention is a different problem. After PeerCars, I continued as an independent engineer and deliberately took on harder backend problems: payment systems, marketplace matching, booking flows where a race condition isn\'t an edge case — it\'s a Tuesday.',
              'In 2023, a contract with Seerbit built the idempotency layer documented in Chapter 05 of this portfolio. ServiceBridge followed the same year. Servia in 2026. The eight principles here were not written in advance. They were extracted from what those systems forced me to understand.',
            ].map((para, i) => (
              <p
                key={i}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(15px, 1.3vw, 17px)',
                  lineHeight: 1.72,
                  color: 'var(--ink-2)',
                  maxWidth: '56ch',
                  fontWeight: 400,
                }}
              >
                {para}
              </p>
            ))}
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="type-label mb-6" style={{ color: 'var(--ink-4)' }}>
              Timeline
            </div>
            <div style={{ borderTop: '1px solid var(--wire)' }}>
              {TIMELINE.map((entry, i) => (
                <div
                  key={i}
                  className="py-5 grid gap-1"
                  style={{ borderBottom: '1px solid var(--wire)' }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      letterSpacing: '0.08em',
                      color: 'var(--ink-4)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {entry.period}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 600,
                      fontSize: '15px',
                      letterSpacing: '-0.01em',
                      color: 'var(--ink)',
                      lineHeight: 1.2,
                    }}
                  >
                    {entry.role}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      color: 'var(--ink-3)',
                      lineHeight: 1.5,
                    }}
                  >
                    {entry.detail}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
