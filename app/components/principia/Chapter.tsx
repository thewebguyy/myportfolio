'use client'

import React, { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { type Principle } from '@/lib/principles'
import { projects } from '@/lib/projects'

const PROOFS: Partial<Record<string, React.ComponentType>> = {
  observe:   lazy(() => import('./proofs/ObserveProof').then(m => ({ default: m.ObserveProof }))),
  model:     lazy(() => import('./proofs/ModelProof').then(m => ({ default: m.ModelProof }))),
  isolate:   lazy(() => import('./proofs/IsolateProof').then(m => ({ default: m.IsolateProof }))),
  stress:    lazy(() => import('./proofs/StressProof').then(m => ({ default: m.StressProof }))),
  recover:   lazy(() => import('./proofs/RecoverProof').then(m => ({ default: m.RecoverProof }))),
  constrain: lazy(() => import('./proofs/ConstrainProof').then(m => ({ default: m.ConstrainProof }))),
  ship:      lazy(() => import('./proofs/ShipProof').then(m => ({ default: m.ShipProof }))),
  evolve:    lazy(() => import('./proofs/EvolveProof').then(m => ({ default: m.EvolveProof }))),
}

interface ChapterProps {
  principle: Principle
  isLast?: boolean
}

export function Chapter({ principle: p, isLast }: ChapterProps) {
  const Proof = PROOFS[p.id]

  return (
    <section
      id={p.id}
      aria-label={`Chapter ${p.index}: ${p.word}`}
      className="scroll-mt-14"
      style={{
        background: 'var(--paper)',
        borderBottom: isLast ? 'none' : '1px solid var(--wire)',
      }}
    >
      <div
        className="max-w-[1440px] mx-auto"
        style={{ borderLeft: '1px solid var(--wire)', borderRight: '1px solid var(--wire)' }}
      >
        {/* Chapter header */}
        <div
          className="px-[var(--page-gutter)] pt-16 lg:pt-24 pb-10 lg:pb-16 grid grid-cols-12 items-end gap-6 lg:gap-8"
          style={{ borderBottom: '1px solid var(--wire)' }}
        >
          {/* Index numeral — decorative, desktop only */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="hidden lg:block lg:col-span-2"
            aria-hidden="true"
          >
            <div className="type-index" style={{ color: 'var(--paper-3)', lineHeight: 1 }}>
              {p.index}
            </div>
          </motion.div>

          {/* Chapter word + incident */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 lg:col-span-7"
          >
            <div className="type-label mb-4" style={{ color: 'var(--ink-4)' }}>
              {p.question}
            </div>
            <h2 className="type-chapter mb-5">{p.word}</h2>
            <p
              className="text-pretty"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(15px, 1.4vw, 17px)',
                lineHeight: 1.6,
                color: 'var(--ink-2)',
                fontWeight: 400,
                maxWidth: '46ch',
              }}
            >
              {p.incident}
            </p>
          </motion.div>

          {/* Thesis */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.45 }}
            className="col-span-12 lg:col-span-3 lg:pb-1"
          >
            <p
              className="type-thesis text-pretty"
              style={{ fontSize: 'clamp(15px, 1.5vw, 20px)' }}
            >
              {p.thesis}
            </p>
          </motion.div>
        </div>

        {/* Body */}
        <div className="px-[var(--page-gutter)] py-10 lg:py-16 grid grid-cols-12 gap-8 lg:gap-12">

          {/* Left: prose */}
          <div className="col-span-12 lg:col-span-7 space-y-6">
            {p.body.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-24px' }}
                transition={{ duration: 0.4 }}
                className="text-pretty"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(15px, 1.3vw, 17px)',
                  lineHeight: 1.7,
                  color: 'var(--ink-2)',
                  maxWidth: '56ch',
                }}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Right: axiom + evidence */}
          <div className="col-span-12 lg:col-span-5 space-y-10">
            {/* Axiom */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="pt-5"
              style={{ borderTop: '1px solid var(--wire)' }}
            >
              <div className="type-label mb-4" style={{ color: 'var(--ink-3)' }}>Axiom</div>
              <blockquote className="type-axiom">{p.axiom}</blockquote>
            </motion.div>

            {/* Evidence */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="space-y-7"
              style={{ borderTop: '1px solid var(--wire)', paddingTop: '20px' }}
            >
              <div className="type-label" style={{ color: 'var(--ink-3)' }}>Evidence</div>
              {p.citations.map((c, i) => {
                const project = projects.find(proj => proj.id === c.project)
                return (
                  <div
                    key={i}
                    style={{ paddingLeft: '14px', borderLeft: '2px solid var(--wire)' }}
                  >
                    <div className="flex items-baseline justify-between gap-4 mb-2 flex-wrap">
                      {project ? (
                        <Link
                          href={`/case-studies/${project.id}`}
                          className="type-label transition-colors hover:text-[var(--signal)]"
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
                          letterSpacing: '0.04em',
                          flexShrink: 0,
                        }}
                      >
                        {c.year} · {c.role}
                      </span>
                    </div>
                    <blockquote
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '14px',
                        lineHeight: 1.65,
                        color: 'var(--ink-2)',
                        fontStyle: 'italic',
                        fontWeight: 400,
                        marginBottom: '8px',
                      }}
                    >
                      &ldquo;{c.quote}&rdquo;
                    </blockquote>
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        lineHeight: 1.65,
                        color: 'var(--ink-3)',
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

        {/* Interactive proof */}
        {Proof && (
          <div className="px-[var(--page-gutter)] pb-14 lg:pb-16">
            <Suspense fallback={null}>
              <Proof />
            </Suspense>
          </div>
        )}
      </div>
    </section>
  )
}
