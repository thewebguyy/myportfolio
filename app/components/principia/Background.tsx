'use client'

import { motion } from 'framer-motion'

const TIMELINE = [
  {
    period: '2023 – present',
    role: 'Independent Senior Full-Stack Engineer',
    detail: 'End-to-end production systems — Servia (operations & concurrency), ServiceBridge (real-time marketplace), Campus Revival OS',
  },
  {
    period: '2023',
    role: 'Contract Software Engineer · Seerbit',
    detail: 'Fintech payment infrastructure, atomic webhook idempotency layer, recurring billing & multi-gateway checkout',
  },
  {
    period: '2020 – 2021',
    role: 'Chief Technology Officer (CTO) · PeerCars',
    detail: 'Vehicle marketplace — system architecture, product roadmap, engineering standards & technical leadership',
  },
  {
    period: '2019 – 2022',
    role: 'Full-Stack & Frontend Engineer (Freelance)',
    detail: 'Client web applications, mobile-first e-commerce platforms, API integrations & performance engineering',
  },
]

const OWNERSHIP_PILLARS = [
  {
    index: '01',
    title: 'Interface & Product Craft',
    summary: 'Accessible, low-latency React & Next.js interfaces designed for clarity, keyboard operability, and resilient client state.',
  },
  {
    index: '02',
    title: 'API & Real-Time Systems',
    summary: 'Stateless Node.js/Express services, shared TypeScript/Zod boundary contracts, and Socket.io + Redis Pub/Sub event pipelines.',
  },
  {
    index: '03',
    title: 'Transactional Data Integrity',
    summary: 'PostgreSQL schema design, SERIALIZABLE & advisory locking, idempotency ledgers, and multi-layer Redis caching.',
  },
  {
    index: '04',
    title: 'Verification & Operations',
    summary: 'k6 load testing baselines, automated 4-gate GitHub Actions CI pipelines, structured Pino telemetry, and post-mortem discipline.',
  },
]

export function Background() {
  return (
    <section
      id="about"
      aria-label="About and Background"
      style={{ background: 'var(--paper)', borderBottom: '1px solid var(--wire)' }}
    >
      <div
        className="max-w-[1440px] mx-auto"
        style={{ borderLeft: '1px solid var(--wire)', borderRight: '1px solid var(--wire)' }}
      >
        {/* Top Header */}
        <div
          className="px-[var(--page-gutter)] pt-16 lg:pt-24 pb-10 lg:pb-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end"
          style={{ borderBottom: '1px solid var(--wire)' }}
        >
          <div className="lg:col-span-7 min-w-0">
            <div className="type-label mb-3" style={{ color: 'var(--signal)' }}>
              About &amp; Trajectory
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: 'clamp(30px, 4.5vw, 56px)',
                lineHeight: 1.0,
                letterSpacing: '-0.035em',
                color: 'var(--ink)',
              }}
            >
              Product Ownership Meets Systems Correctness
            </h2>
          </div>
          <div className="lg:col-span-5 min-w-0">
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.65, color: 'var(--ink-3)' }}>
              7 years building software across West Africa and remote teams — from high-conversion frontend interfaces to fault-tolerant payment and booking infrastructure.
            </p>
          </div>
        </div>

        {/* Narrative + Timeline Grid */}
        <div className="px-[var(--page-gutter)] py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Professional Narrative */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 min-w-0 space-y-5"
          >
            <div className="type-label mb-4">
              Engineering Narrative
            </div>
            {[
              'I started writing production software for clients in 2019. Those first years were frontend-intensive: building responsive interfaces, integrating payment and catalog APIs, and translating business requirements into fast mobile web experiences.',
              'From 2020 to 2021, serving as CTO of PeerCars — a vehicle marketplace — shifted my perspective from shipping individual features to owning architectural decisions that other engineers and real transactions depended on.',
              'A feature that works in a demo is easy; a system that handles concurrent users, survives flaky network partitions, and recovers without manual intervention is a different discipline. After PeerCars, I deliberately took on high-contention full-stack and backend problems: payment orchestration, real-time marketplace matching, and reservation systems where race conditions happen every day.',
              'In 2023, a contract with Seerbit produced the atomic idempotency architecture documented in Chapter 05. ServiceBridge followed that same year, and Servia in 2026. The eight engineering principles below were not written as abstract theory — they were extracted directly from what those production systems forced me to solve.',
            ].map((para, i) => (
              <p
                key={i}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(15.5px, 1.3vw, 17px)',
                  lineHeight: 1.72,
                  color: 'var(--ink-2)',
                  maxWidth: '60ch',
                  fontWeight: 400,
                }}
              >
                {para}
              </p>
            ))}
          </motion.div>

          {/* Right: Career Timeline */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="type-label mb-4">
              Career Timeline
            </div>
            <div style={{ borderTop: '1px solid var(--wire)' }}>
              {TIMELINE.map((entry, i) => (
                <div
                  key={i}
                  className="py-4 grid gap-1"
                  style={{ borderBottom: '1px solid var(--wire)' }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      letterSpacing: '0.07em',
                      color: 'var(--signal)',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                    }}
                  >
                    {entry.period}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 600,
                      fontSize: '16px',
                      letterSpacing: '-0.01em',
                      color: 'var(--ink)',
                      lineHeight: 1.25,
                    }}
                  >
                    {entry.role}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '13.5px',
                      color: 'var(--ink-3)',
                      lineHeight: 1.55,
                    }}
                  >
                    {entry.detail}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 4 Ownership Pillars Strip */}
        <div
          className="px-[var(--page-gutter)] py-10 lg:py-12"
          style={{ borderTop: '1px solid var(--wire)', background: 'var(--paper-2)' }}
        >
          <div className="type-label mb-6">What I Own Across the Stack</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {OWNERSHIP_PILLARS.map(pillar => (
              <div
                key={pillar.index}
                className="p-5"
                style={{ background: 'var(--paper)', border: '1px solid var(--wire)' }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--signal)',
                    fontWeight: 700,
                    marginBottom: '6px',
                  }}
                >
                  {pillar.index}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    fontSize: '16.5px',
                    color: 'var(--ink)',
                    marginBottom: '6px',
                  }}
                >
                  {pillar.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13.5px',
                    lineHeight: 1.6,
                    color: 'var(--ink-3)',
                  }}
                >
                  {pillar.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
