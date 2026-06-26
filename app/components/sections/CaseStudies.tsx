'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { projects, type Project } from '@/lib/projects'

const REAL_PROJECTS_IDS = ['servicebridge', 'servia', 'subscription-manager', 'checkout-system']

const statusMap: Record<string, string> = {
  servicebridge: 'PROD',
  servia: 'PROD',
  'subscription-manager': 'OSS',
  'checkout-system': 'OSS',
  'laverita-hair': 'LIVE'
}

export function CaseStudies() {
  const selectedProjects = REAL_PROJECTS_IDS.map(id => projects.find(p => p.id === id)).filter(Boolean) as Project[]
  const [featured, ...rest] = selectedProjects

  return (
    <section id="work" style={{ background: 'var(--paper)', borderBottom: '1px solid var(--wire)' }}>
      <div className="max-w-[1440px] mx-auto" style={{ borderLeft: '1px solid var(--wire)', borderRight: '1px solid var(--wire)' }}>

        {/* Section header */}
        <div className="px-8 lg:px-16 py-16" style={{ borderBottom: '1px solid var(--wire)' }}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--signal)', marginBottom: '16px' }}
          >
            Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '-0.03em', color: 'var(--ink)' }}
          >
            The Ledger.
          </motion.h2>
        </div>

        {/* Featured card — full width */}
        {featured && <FeaturedCard project={featured} number={1} />}

        {/* Grid of remaining cards */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ borderTop: '1px solid var(--wire)' }}>
            {rest.map((project, i) => (
              <GridCard key={project.id} project={project} number={i + 2} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function FeaturedCard({ project, number }: { project: Project; number: number }) {
  const status = statusMap[project.id]
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="grid grid-cols-1 lg:grid-cols-12"
      style={{ borderBottom: '1px solid var(--wire)' }}
    >
      {/* Left: meta */}
      <div
        className="lg:col-span-4 p-8 lg:p-12 flex flex-col"
        style={{ borderRight: '1px solid var(--wire)' }}
      >
        <div className="flex items-center gap-3 mb-10">
          <span
            style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)' }}
          >
            {number.toString().padStart(2, '0')} /
          </span>
          {/* Featured tag */}
          <span
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--signal)', border: '1px solid var(--signal)', padding: '2px 8px'
            }}
          >
            Featured
          </span>
          {status && (
            <span
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--ink-3)', border: '1px solid var(--wire)', padding: '2px 8px'
              }}
            >
              {status}
            </span>
          )}
        </div>

        <h3
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(28px, 3vw, 40px)', letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: '16px', lineHeight: 1.1 }}
        >
          {project.title}
        </h3>

        <div
          className="space-y-1 mb-10"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}
        >
          <div>CONTEXT: {project.company}</div>
          <div>DATE: {project.year}</div>
          <div>TEAM: {project.teamSize}</div>
          <div>REPO: {project.githubUrl ? 'PUBLIC' : 'PRIVATE'}</div>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {project.tech.slice(0, 5).map(t => (
            <span key={t} className="pill-tag">{t}</span>
          ))}
        </div>

        <div className="mt-auto">
          <Link
            href={`/case-studies/${project.id}`}
            className="btn-primary"
          >
            View case study →
          </Link>
        </div>
      </div>

      {/* Right: description */}
      <div className="lg:col-span-8 p-8 lg:p-12 flex flex-col">
        <p
          className="mb-8"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', lineHeight: 1.8, color: 'var(--ink-2)' }}
        >
          {project.longDescription || project.description}
        </p>

        {project.metrics && Object.keys(project.metrics).length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px mt-auto" style={{ border: '1px solid var(--wire)', background: 'var(--wire)' }}>
            {Object.entries(project.metrics).slice(0, 3).map(([key, val]) => (
              <div key={key} style={{ background: 'var(--paper)', padding: '20px 24px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: '6px' }}>{key}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '22px', color: 'var(--ink)' }}>{val as string}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

function GridCard({ project, number }: { project: Project; number: number }) {
  const status = statusMap[project.id]
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-8 flex flex-col"
      style={{ borderRight: '1px solid var(--wire)', borderBottom: '1px solid var(--wire)' }}
    >
      <div className="flex items-center gap-3 mb-6">
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--ink-3)', letterSpacing: '0.1em' }}>
          {number.toString().padStart(2, '0')} /
        </span>
        {status && (
          <span
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--ink-3)', border: '1px solid var(--wire)', padding: '2px 8px'
            }}
          >
            {status}
          </span>
        )}
      </div>

      <h3
        style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '22px', letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: '12px', lineHeight: 1.2 }}
      >
        {project.title}
      </h3>

      <p
        className="mb-6 flex-1"
        style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 1.7, color: 'var(--ink-3)' }}
      >
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.slice(0, 4).map(t => (
          <span key={t} className="pill-tag">{t}</span>
        ))}
      </div>

      <Link
        href={`/case-studies/${project.id}`}
        style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--signal)' }}
      >
        View case study →
      </Link>
    </motion.div>
  )
}
