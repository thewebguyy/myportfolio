'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { type Principle } from '@/lib/principles'
import { projects } from '@/lib/projects'
import { ObserveProof } from './proofs/ObserveProof'
import { ModelProof } from './proofs/ModelProof'
import { IsolateProof } from './proofs/IsolateProof'
import { StressProof } from './proofs/StressProof'
import { RecoverProof } from './proofs/RecoverProof'
import { ConstrainProof } from './proofs/ConstrainProof'
import { ShipProof } from './proofs/ShipProof'
import { EvolveProof } from './proofs/EvolveProof'

const PROOFS: Partial<Record<string, React.ComponentType>> = {
  observe: ObserveProof,
  model: ModelProof,
  isolate: IsolateProof,
  stress: StressProof,
  recover: RecoverProof,
  constrain: ConstrainProof,
  ship: ShipProof,
  evolve: EvolveProof,
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
          className="px-[var(--page-gutter)] pt-24 pb-16 grid grid-cols-12 items-end gap-8"
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
            <h2 className="type-chapter">{p.word}</h2>
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
        <div className="px-[var(--page-gutter)] py-16 grid grid-cols-12 gap-12">

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
              className="space-y-4"
              style={{ borderTop: '1px solid var(--wire)', paddingTop: '24px' }}
            >
              <div className="type-label" style={{ color: 'var(--ink-4)' }}>Evidence</div>
              {p.citations.map((c, i) => {
                const project = projects.find(proj => proj.id === c.project)
                return (
                  <div
                    key={i}
                    className="space-y-1"
                    style={{ paddingLeft: '16px', borderLeft: '2px solid var(--wire)' }}
                  >
                    {project && (
                      <Link
                        href={`/case-studies/${project.id}`}
                        className="type-label block transition-colors"
                        style={{ color: 'var(--signal)' }}
                      >
                        {project.title}
                      </Link>
                    )}
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

        {/* Interactive proof — chapter-specific */}
        {PROOFS[p.id] && (
          <div className="px-[var(--page-gutter)] pb-16">
            {(() => { const Proof = PROOFS[p.id]!; return <Proof /> })()}
          </div>
        )}
      </div>
    </section>
  )
}
