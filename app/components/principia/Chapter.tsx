'use client'

import React, { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { type Principle } from '@/lib/principles'
import { projects } from '@/lib/projects'

const PROOFS: Partial<Record<string, React.ComponentType>> = {
  observe: lazy(() => import('./proofs/ObserveProof').then(m => ({ default: m.ObserveProof }))),
  model:   lazy(() => import('./proofs/ModelProof').then(m => ({ default: m.ModelProof }))),
  isolate: lazy(() => import('./proofs/IsolateProof').then(m => ({ default: m.IsolateProof }))),
  stress:  lazy(() => import('./proofs/StressProof').then(m => ({ default: m.StressProof }))),
  recover: lazy(() => import('./proofs/RecoverProof').then(m => ({ default: m.RecoverProof }))),
  constrain: lazy(() => import('./proofs/ConstrainProof').then(m => ({ default: m.ConstrainProof }))),
  ship:    lazy(() => import('./proofs/ShipProof').then(m => ({ default: m.ShipProof }))),
  evolve:  lazy(() => import('./proofs/EvolveProof').then(m => ({ default: m.EvolveProof }))),
}

interface ChapterProps {
  principle: Principle
  isLast?: boolean
}

export function Chapter({ principle: p, isLast }: ChapterProps) {
  return (
    <section
      id={p.id}
      aria-label={`Chapter ${p.index}: ${p.word}`}
      style={{
        background: 'var(--paper)',
        borderBottom: isLast ? 'none' : '1px solid var(--wire)',
      }}
    >
      <div
        className="max-w-[1440px] mx-auto"
        style={{ borderLeft: '1px solid var(--wire)', borderRight: '1px solid var(--wire)' }}
      >
        {/* Chapter header — the number and word at editorial scale */}
        <div
          className="px-[var(--page-gutter)] pt-16 lg:pt-24 pb-12 lg:pb-16 grid grid-cols-12 items-end gap-8"
          style={{ borderBottom: '1px solid var(--wire)' }}
        >
          {/* Chapter number — monumental */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            className="col-span-12 lg:col-span-2"
          >
            <div
              className="type-index select-none"
              style={{ color: 'var(--paper-3)', lineHeight: 1 }}
              aria-hidden="true"
            >
              {p.index}
            </div>
          </motion.div>

          {/* Chapter word */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 lg:col-span-7"
          >
            <div
              className="type-label mb-4"
              style={{ color: 'var(--ink-4)' }}
            >
              {p.question}
            </div>
            <h2 className="type-chapter mb-6">{p.word}</h2>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                lineHeight: 1.7,
                color: 'var(--ink-3)',
                fontStyle: 'italic',
                maxWidth: '480px',
              }}
            >
              {p.incident}
            </p>
          </motion.div>

          {/* Thesis — right column */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="col-span-12 lg:col-span-3 lg:pb-2"
          >
            <p
              className="type-thesis"
              style={{ color: 'var(--ink-2)', fontSize: 'clamp(16px, 1.8vw, 22px)' }}
            >
              {p.thesis}
            </p>
          </motion.div>
        </div>

        {/* Body: two-column layout */}
        <div className="px-[var(--page-gutter)] py-10 lg:py-16 grid grid-cols-12 gap-8 lg:gap-12">

          {/* Left column: prose */}
          <div className="col-span-12 lg:col-span-7 space-y-6">
            {p.body.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '15px',
                  lineHeight: 1.78,
                  color: 'var(--ink-2)',
                }}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Right column: axiom + citations */}
          <div className="col-span-12 lg:col-span-5 space-y-12" id={`${p.id}-right`}>
            {/* Axiom */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="pt-6"
              style={{ borderTop: '1px solid var(--wire)' }}
            >
              <div className="type-label mb-6" style={{ color: 'var(--ink-4)' }}>Axiom</div>
              <blockquote className="type-axiom">{p.axiom}</blockquote>
            </motion.div>

            {/* Citations */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
              style={{ borderTop: '1px solid var(--wire)', paddingTop: '24px' }}
            >
              <div className="type-label" style={{ color: 'var(--ink-4)' }}>Evidence</div>
              {p.citations.map((c, i) => {
                const project = projects.find(proj => proj.id === c.project)
                return (
                  <div
                    key={i}
                    style={{ paddingLeft: '16px', borderLeft: '2px solid var(--wire)' }}
                  >
                    {/* Project header */}
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      {project ? (
                        <Link
                          href={`/case-studies/${project.id}`}
                          className="type-label block transition-colors"
                          style={{ color: 'var(--signal)' }}
                        >
                          {c.projectTitle}
                        </Link>
                      ) : (
                        <span className="type-label" style={{ color: 'var(--ink-3)' }}>
                          {c.projectTitle}
                        </span>
                      )}
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '10px',
                          color: 'var(--ink-4)',
                          letterSpacing: '0.06em',
                          flexShrink: 0,
                        }}
                      >
                        {c.year} · {c.role}
                      </span>
                    </div>
                    {/* First-person quote */}
                    <blockquote
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        lineHeight: 1.7,
                        color: 'var(--ink-2)',
                        fontStyle: 'italic',
                        marginBottom: '8px',
                      }}
                    >
                      &ldquo;{c.quote}&rdquo;
                    </blockquote>
                    {/* Outcome metric */}
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        lineHeight: 1.6,
                        color: 'var(--ink-4)',
                      }}
                    >
                      {c.claim}
                    </p>
                  </div>
                )
              })}
            </motion.div>
          </div>
        </div>

        {/* Interactive proof — chapter-specific, lazy-loaded */}
        {(() => {
          const Proof = PROOFS[p.id]
          if (!Proof) return null
          return (
            <div className="px-[var(--page-gutter)] pb-16">
              <Suspense fallback={null}>
                <Proof />
              </Suspense>
            </div>
          )
        })()}
      </div>
    </section>
  )
}
