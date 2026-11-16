'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CONTACT_EMAIL, CONTACT_HREF } from '@/lib/constants'

const PROJECTS = [
  {
    id: 'servia',
    name: 'Servia',
    category: 'Operations Platform',
    metric: 'SERIALIZABLE · P2034 → 409',
  },
  {
    id: 'servicebridge',
    name: 'ServiceBridge',
    category: 'Marketplace Engine',
    metric: 'WebSocket dispatch · <100ms fan-out',
  },
  {
    id: 'subscription-manager',
    name: 'Subscription Manager',
    category: 'Fintech Infrastructure',
    metric: 'Python/Flask Seerbit SDK demo',
  },
]

const OUTCOMES = [
  { stat: 'SERIALIZABLE', label: 'PostgreSQL reservation transactions' },
  { stat: 'P2034 → 409', label: 'conflict handling in public code' },
  { stat: 'JWT', label: 'rotating, hashed refresh tokens' },
]

const STACK_DOMAINS = [
  {
    domain: 'Interface & Product',
    tools: 'TypeScript · React · Next.js · Tailwind CSS',
  },
  {
    domain: 'Services & Real-Time',
    tools: 'Node.js · Express · Socket.io · REST · Zod',
  },
  {
    domain: 'Data & Infrastructure',
    tools: 'PostgreSQL (Serializable) · Prisma · Redis · Docker · CI/CD',
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
        {/* Top Metadata Status Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="pt-20 lg:pt-24 pb-6 lg:pb-8 flex flex-wrap items-center justify-between gap-4"
          style={{ borderBottom: '1px solid var(--wire)' }}
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="type-label" style={{ color: 'var(--ink-2)', fontWeight: 700 }}>
              Senior Full-Stack Engineer
            </span>
            <span style={{ color: 'var(--wire-strong)' }} aria-hidden="true">·</span>
            <span className="type-label">
              Lagos, Nigeria / Remote
            </span>
          </div>
          <div
            className="flex items-center gap-2"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              color: 'var(--signal)',
              fontWeight: 700,
            }}
          >
            <span
              className="inline-block w-[7px] h-[7px] rounded-full flex-shrink-0"
              style={{ background: 'var(--signal-bright)' }}
              aria-hidden="true"
            />
            <span>Available for work</span>
          </div>
        </motion.div>

        {/* Main Hero Grid */}
        <div className="flex-1 flex flex-col justify-center py-10 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start"
          >
            {/* Left Column: Name, Positioning Statement, Bio, Actions, Core Stack */}
            <div className="lg:col-span-7 min-w-0">
              <h1
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  fontSize: 'clamp(40px, 8.5vw, 104px)',
                  lineHeight: 0.94,
                  letterSpacing: '-0.04em',
                  color: 'var(--ink)',
                  marginBottom: '20px',
                }}
              >
                Olabode<br />Olusegun.
              </h1>

              {/* Primary Positioning Statement */}
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: 'clamp(20px, 2.3vw, 28px)',
                  lineHeight: 1.25,
                  letterSpacing: '-0.025em',
                  color: 'var(--ink)',
                  maxWidth: '38ch',
                  marginBottom: '16px',
                }}
              >
                I build reliable software from interface to infrastructure.
              </p>

              {/* Supporting Bio */}
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(15.5px, 1.35vw, 17.5px)',
                  lineHeight: 1.65,
                  color: 'var(--ink-2)',
                  maxWidth: '54ch',
                  marginBottom: '28px',
                  fontWeight: 400,
                }}
              >
                I build production systems that stay up. Seven years of full-stack
                client delivery, a startup CTO role at PeerCars, and contracted
                fintech engineering at Seerbit — focused on concurrency control,
                transactional integrity, and resilient product interfaces.
              </p>

              {/* Direct Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
                <a href="#work" className="btn-primary">
                  Explore featured work ↓
                </a>
                <Link href="#contact" className="btn-secondary">
                  Work together →
                </Link>
                <a
                  href={CONTACT_HREF}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: 'var(--ink-3)',
                    padding: '8px 4px',
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px',
                    transition: 'color 0.15s',
                    wordBreak: 'break-all',
                  }}
                  className="hover:text-[var(--signal)]"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>

              {/* Core Stack Strip (30-Second Recruiter & EM Scan) */}
              <div
                className="p-5"
                style={{ background: 'var(--paper-2)', border: '1px solid var(--wire)' }}
              >
                <div className="type-label mb-3">
                  Core Technical Stack &amp; Scope
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {STACK_DOMAINS.map(item => (
                    <div key={item.domain} className="min-w-0">
                      <div
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 600,
                          fontSize: '13px',
                          color: 'var(--ink)',
                          marginBottom: '2px',
                        }}
                      >
                        {item.domain}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          lineHeight: 1.5,
                          color: 'var(--ink-3)',
                        }}
                      >
                        {item.tools}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Verified Engineering Outcomes + Selected Systems Index */}
            <div className="lg:col-span-5 min-w-0 lg:pl-10 lg:border-l" style={{ borderColor: 'var(--wire)' }}>
              {/* Production Outcomes */}
              <div className="mb-8">
                <div className="type-label mb-3">
                  Verified Engineering Outcomes
                </div>
                <div style={{ borderTop: '1px solid var(--wire)' }}>
                  {OUTCOMES.map((o, i) => (
                    <div
                      key={i}
                      className="py-3.5 flex items-baseline justify-between gap-4"
                      style={{ borderBottom: '1px solid var(--wire)' }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 700,
                          fontSize: 'clamp(22px, 2.2vw, 28px)',
                          letterSpacing: '-0.03em',
                          color: 'var(--ink)',
                          lineHeight: 1.1,
                          flexShrink: 0,
                        }}
                      >
                        {o.stat}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11.5px',
                          color: 'var(--ink-3)',
                          textAlign: 'right',
                        }}
                      >
                        {o.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flagship Systems Quick Index */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="type-label">Flagship Case Studies</span>
                  <Link
                    href="/case-studies"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--signal)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.07em',
                    }}
                    className="hover:underline"
                  >
                    All 5 projects →
                  </Link>
                </div>
                <ul
                  aria-label="Production projects"
                  className="m-0 p-0 list-none"
                  style={{ borderTop: '1px solid var(--wire)' }}
                >
                  {PROJECTS.map(proj => (
                    <li key={proj.id} style={{ borderBottom: '1px solid var(--wire)' }}>
                      <Link
                        href={`/case-studies/${proj.id}`}
                        className="flex flex-col py-3.5 px-2 -mx-2 group gap-1 transition-colors hover:bg-[var(--paper-2)]"
                      >
                        <div className="flex items-baseline justify-between gap-2 min-w-0">
                          <span
                            style={{
                              fontFamily: 'var(--font-sans)',
                              fontWeight: 600,
                              fontSize: '15.5px',
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
                              fontSize: '10.5px',
                              color: 'var(--ink-4)',
                              letterSpacing: '0.05em',
                              textTransform: 'uppercase',
                              flexShrink: 0,
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
                          }}
                        >
                          {proj.metric} →
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Navigation Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="pb-8 lg:pb-10 flex flex-wrap items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--wire)', paddingTop: '18px' }}
        >
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="#work"
              className="type-label flex items-center gap-2 transition-colors hover:text-[var(--ink)]"
              style={{ color: 'var(--ink-2)', fontWeight: 700 }}
            >
              01 · Featured Work ↓
            </a>
            <a
              href="#about"
              className="type-label flex items-center gap-2 transition-colors hover:text-[var(--ink)]"
              style={{ color: 'var(--ink-3)' }}
            >
              02 · Background &amp; Scope ↓
            </a>
            <a
              href="#engineering"
              className="type-label flex items-center gap-2 transition-colors hover:text-[var(--ink)]"
              style={{ color: 'var(--ink-3)' }}
            >
              03 · Read the 8 Principles ↓
            </a>
          </div>
          <div className="type-label">
            © 2026 Olabode Olusegun
          </div>
        </motion.div>
      </div>
    </section>
  )
}
