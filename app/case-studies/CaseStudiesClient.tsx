'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Project } from '@/lib/projects'

export function CaseStudiesClient({ sortedProjects }: { sortedProjects: Project[] }) {
  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      <div
        className="max-w-[1440px] mx-auto"
        style={{ borderLeft: '1px solid var(--wire)', borderRight: '1px solid var(--wire)', minHeight: '100vh' }}
      >
        {/* Header */}
        <section
          className="pt-28 pb-14 px-[var(--page-gutter)]"
          style={{ borderBottom: '1px solid var(--wire)' }}
        >
          <Link href="/" className="blog-nav-back inline-flex items-center gap-2 mb-8">
            ← Back to home
          </Link>

          <div className="type-label mb-4" style={{ color: 'var(--signal)' }}>
            Engineering Archive · 01 — 0{sortedProjects.length}
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: 'clamp(40px, 6vw, 76px)',
              lineHeight: 0.96,
              letterSpacing: '-0.04em',
              color: 'var(--ink)',
            }}
          >
            Case Studies
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '16.5px',
              lineHeight: 1.68,
              color: 'var(--ink-2)',
              maxWidth: '58ch',
              marginTop: '20px',
            }}
          >
            Production systems built and shipped under real constraints. Each case study documents the problem, the architectural decisions, what broke under load, and verified outcomes.
          </p>
        </section>

        {/* Project list */}
        <section className="px-[var(--page-gutter)] py-14" aria-label="Case study directory">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'var(--wire)', border: '1px solid var(--wire)' }}>
            {sortedProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const firstOutcome = project.outcomeHighlights?.[0]

  return (
    <motion.article
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      style={{ background: 'var(--paper)' }}
    >
      <Link
        href={`/case-studies/${project.id}`}
        className="group flex flex-col justify-between p-7 sm:p-8 h-full transition-colors duration-200 hover:bg-[var(--paper-2)]"
      >
        <div>
          <div className="flex justify-between items-center mb-5">
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10.5px',
                letterSpacing: '0.09em',
                textTransform: 'uppercase',
                color: project.featured ? 'var(--signal)' : 'var(--ink-3)',
                fontWeight: project.featured ? 700 : 400,
              }}
            >
              {project.category}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--ink-4)',
                letterSpacing: '0.06em',
              }}
            >
              {project.year} · {project.teamSize}
            </span>
          </div>

          <h2
            className="mb-3 group-hover:text-[var(--signal)] transition-colors"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: 'clamp(20px, 2vw, 24px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              color: 'var(--ink)',
            }}
          >
            {project.title}
          </h2>

          <p
            className="mb-6"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '14.5px',
              lineHeight: 1.62,
              color: 'var(--ink-2)',
            }}
          >
            {project.description}.
          </p>

          {firstOutcome && (
            <div
              className="p-3.5 mb-6"
              style={{ background: 'var(--paper-2)', border: '1px solid var(--wire)' }}
            >
              <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '16px', color: 'var(--ink)' }}>
                {firstOutcome.stat}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-3)' }}>
                {firstOutcome.label}
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tech.slice(0, 4).map(t => (
              <span key={t} className="pill-tag">
                {t}
              </span>
            ))}
          </div>

          <div
            className="pt-4 flex items-center justify-between"
            style={{
              borderTop: '1px solid var(--wire)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.09em',
              textTransform: 'uppercase',
              color: 'var(--ink-2)',
              fontWeight: 700,
            }}
          >
            <span className="group-hover:text-[var(--signal)] transition-colors">Read case study</span>
            <span className="group-hover:text-[var(--signal)] transition-colors">→</span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
