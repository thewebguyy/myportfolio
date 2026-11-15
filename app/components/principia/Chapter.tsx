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
        {/* Chapter header — number, word, incident hook, and thesis */}
        <div
          className="px-[var(--page-gutter)] pt-14 lg:pt-20 pb-10 lg:pb-14 grid grid-cols-12 items-end gap-6 lg:gap-8"
          style={{ borderBottom: '1px solid var(--wire)' }}
        >
          {/* Chapter number — monumental */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            className="col-span-12 lg:col-span-2 flex items-center justify-between lg:block"
          >
            <div
              className="type-index select-none"
              style={{ color: 'var(--ink-4)', opacity: 0.32, lineHeight: 1 }}
              aria-hidden="true"
            >
              {p.index}
            </div>
            <a
              href="#engineering"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10.5px',
                color: 'var(--ink-4)',
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
              }}
              className="lg:hidden hover:text-[var(--signal)]"
            >
              ↑ Principles Index
            </a>
          </motion.div>

          {/* Chapter word & incident hook */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 lg:col-span-6"
          >
            <div className="type-label mb-3" style={{ color: 'var(--signal)' }}>
              Chapter {p.index} · {p.question}
            </div>
            <h2 className="type-chapter mb-5">{p.word}</h2>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(15.5px, 1.4vw, 17.5px)',
                fontWeight: 500,
                lineHeight: 1.55,
                color: 'var(--ink-2)',
                maxWidth: '52ch',
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
            transition={{ delay: 0.1 }}
            className="col-span-12 lg:col-span-4 lg:pb-1 space-y-4"
          >
            <p
              className="type-thesis"
              style={{ color: 'var(--ink)', fontSize: 'clamp(17px, 1.7vw, 22px)' }}
            >
              {p.thesis}
            </p>
            <div className="hidden lg:block">
              <a
                href="#engineering"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10.5px',
                  color: 'var(--ink-4)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
                className="hover:text-[var(--signal)] transition-colors"
              >
                ↑ All 8 Principles
              </a>
            </div>
          </motion.div>
        </div>

        {/* Body: two-column layout */}
        <div className="px-[var(--page-gutter)] py-10 lg:py-14 grid grid-cols-12 gap-8 lg:gap-12">
          {/* Left column: readable Space Grotesk prose */}
          <div className="col-span-12 lg:col-span-7 space-y-5">
            {p.body.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '16.5px',
                  lineHeight: 1.75,
                  color: 'var(--ink-2)',
                  maxWidth: '62ch',
                }}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Right column: axiom + project evidence citations */}
          <div className="col-span-12 lg:col-span-5 space-y-10" id={`${p.id}-right`}>
            {/* Axiom */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6"
              style={{ background: 'var(--paper-2)', border: '1px solid var(--wire)' }}
            >
              <div className="type-label mb-3">Axiom</div>
              <blockquote className="type-axiom">{p.axiom}</blockquote>
            </motion.div>

            {/* Citations */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="space-y-5"
              style={{ borderTop: '1px solid var(--wire)', paddingTop: '20px' }}
            >
              <div className="type-label">Production Evidence</div>
              {p.citations.map((c, i) => {
                const project = projects.find(proj => proj.id === c.project)
                return (
                  <div
                    key={i}
                    style={{ paddingLeft: '16px', borderLeft: '2px solid var(--signal)' }}
                  >
                    <div className="flex items-baseline justify-between gap-4 mb-1.5">
                      {project ? (
                        <Link
                          href={`/case-studies/${project.id}`}
                          className="type-label block transition-colors hover:underline"
                          style={{ color: 'var(--signal)', fontWeight: 700 }}
                        >
                          {c.projectTitle} →
                        </Link>
                      ) : (
                        <span className="type-label" style={{ color: 'var(--ink-2)', fontWeight: 700 }}>
                          {c.projectTitle}
                        </span>
                      )}
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          color: 'var(--ink-3)',
                          letterSpacing: '0.05em',
                          flexShrink: 0,
                        }}
                      >
                        {c.year} · {c.role}
                      </span>
                    </div>
                    <blockquote
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '14.5px',
                        lineHeight: 1.6,
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
                        fontSize: '11.5px',
                        lineHeight: 1.55,
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

        {/* Interactive proof — chapter-specific, lazy-loaded */}
        {(() => {
          const Proof = PROOFS[p.id]
          if (!Proof) return null
          return (
            <div className="px-[var(--page-gutter)] pb-14 lg:pb-16">
              <Suspense
                fallback={
                  <div
                    className="p-6"
                    style={{ borderTop: '1px solid var(--wire)', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--ink-4)' }}
                  >
                    Loading interactive simulation…
                  </div>
                }
              >
                <Proof />
              </Suspense>
            </div>
          )
        })()}
      </div>
    </section>
  )
}
