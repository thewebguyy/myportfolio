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
          className="px-[var(--page-gutter)] pt-16 lg:pt-24 pb-12 lg:pb-16 grid grid-cols-12 items-end gap-6 lg:gap-8"
          style={{ borderBottom: '1px solid var(--wire)' }}
        >
          {/* Chapter number */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
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

          {/* Chapter word + incident */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 lg:col-span-7"
          >
            <div className="type-label mb-4" style={{ color: 'var(--ink-4)' }}>
              {p.question}
            </div>
            <h2 className="type-chapter mb-5">{p.word}</h2>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                lineHeight: 1.72,
                color: 'var(--ink-3)',
                fontStyle: 'italic',
                maxWidth: '460px',
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
            transition={{ delay: 0.1, duration: 0.5 }}
            className="col-span-12 lg:col-span-3 lg:pb-1"
          >
            <p
              className="type-thesis"
              style={{ color: 'var(--ink-2)', fontSize: 'clamp(15px, 1.6vw, 20px)' }}
            >
              {p.thesis}
            </p>
          </motion.div>
        </div>

        {/* Body */}
        <div className="px-[var(--page-gutter)] py-10 lg:py-16 grid grid-cols-12 gap-8 lg:gap-12">

          {/* Left: prose */}
          <div className="col-span-12 lg:col-span-7 space-y-5">
            {p.body.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-32px' }}
                transition={{ duration: 0.45 }}
                className="text-pretty"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(13px, 1.2vw, 15px)',
                  lineHeight: 1.82,
                  color: 'var(--ink-2)',
                  maxWidth: '62ch',
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
              transition={{ duration: 0.45 }}
              className="pt-5"
              style={{ borderTop: '1px solid var(--wire)' }}
            >
              <div className="type-label mb-5" style={{ color: 'var(--ink-4)' }}>Axiom</div>
              <blockquote className="type-axiom">{p.axiom}</blockquote>
            </motion.div>

            {/* Evidence */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="space-y-6"
              style={{ borderTop: '1px solid var(--wire)', paddingTop: '20px' }}
            >
              <div className="type-label" style={{ color: 'var(--ink-4)' }}>Evidence</div>
              {p.citations.map((c, i) => {
                const project = projects.find(proj => proj.id === c.project)
                return (
                  <div
                    key={i}
                    style={{ paddingLeft: '14px', borderLeft: '2px solid var(--wire)' }}
                  >
                    <div className="flex items-baseline justify-between gap-4 mb-2">
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
                          letterSpacing: '0.06em',
                          flexShrink: 0,
                        }}
                      >
                        {c.year} · {c.role}
                      </span>
                    </div>
                    <blockquote
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        lineHeight: 1.72,
                        color: 'var(--ink-2)',
                        fontStyle: 'italic',
                        marginBottom: '6px',
                      }}
                    >
                      &ldquo;{c.quote}&rdquo;
                    </blockquote>
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
