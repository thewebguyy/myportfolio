'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { getFeaturedProjects, projects } from '@/lib/projects'

export function FeaturedWork() {
  const featured = getFeaturedProjects()
  const additional = projects.filter(p => !p.featured)

  return (
    <section
      id="work"
      aria-label="Featured Work"
      style={{ background: 'var(--paper)', borderBottom: '1px solid var(--wire)' }}
    >
      <div
        className="max-w-[1440px] mx-auto"
        style={{ borderLeft: '1px solid var(--wire)', borderRight: '1px solid var(--wire)' }}
      >
        {/* Section Header */}
        <div
          className="px-[var(--page-gutter)] pt-16 lg:pt-24 pb-10 lg:pb-14 grid lg:grid-cols-12 gap-6 items-end"
          style={{ borderBottom: '1px solid var(--wire)' }}
        >
          <div className="lg:col-span-7">
            <div className="type-label mb-3" style={{ color: 'var(--signal)' }}>
              Selected Engineering Work · 01 — 03
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: 'clamp(32px, 5vw, 64px)',
                lineHeight: 0.98,
                letterSpacing: '-0.035em',
                color: 'var(--ink)',
              }}
            >
              Production Systems &amp; Case Studies
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col justify-between items-start sm:items-end lg:items-end gap-4">
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '15.5px',
                lineHeight: 1.6,
                color: 'var(--ink-2)',
                maxWidth: '44ch',
              }}
            >
              Three flagship systems architected from interface to database. Each case study documents the business problem, architectural trade-offs, failure modes, and verified load-test or production outcomes.
            </p>
            <Link href="/case-studies" className="btn-secondary">
              View all 5 case studies →
            </Link>
          </div>
        </div>

        {/* 3 Flagship Project Dossiers */}
        <div>
          {featured.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="px-[var(--page-gutter)] py-12 lg:py-16"
              style={{ borderBottom: '1px solid var(--wire)' }}
            >
              {/* Top Dossier Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8" style={{ borderBottom: '1px solid var(--wire)' }}>
                <div className="flex flex-wrap items-baseline gap-3 sm:gap-4">
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: 'var(--signal)',
                      letterSpacing: '0.08em',
                    }}
                  >
                    0{index + 1}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 700,
                      fontSize: 'clamp(26px, 3.2vw, 40px)',
                      letterSpacing: '-0.03em',
                      lineHeight: 1.05,
                      color: 'var(--ink)',
                    }}
                  >
                    <Link
                      href={`/case-studies/${project.id}`}
                      className="hover:text-[var(--signal)] transition-colors"
                    >
                      {project.title}
                    </Link>
                  </h3>
                  <span className="pill-tag">{project.category}</span>
                </div>

                <div
                  className="flex flex-wrap items-center gap-3"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: 'var(--ink-3)' }}
                >
                  <span>{project.year}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.duration}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.company}</span>
                </div>
              </div>

              {/* Main 12-Col Dossier Body */}
              <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                {/* Left 7 Columns: What was built, Problem, Role, Engineering Challenge, Stack */}
                <div className="lg:col-span-7 space-y-6">
                  {/* What was built */}
                  <div>
                    <div className="type-label mb-2">What Was Built</div>
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 500,
                        fontSize: 'clamp(17px, 1.5vw, 19px)',
                        lineHeight: 1.55,
                        color: 'var(--ink)',
                      }}
                    >
                      {project.description}.
                    </p>
                  </div>

                  {/* Problem & Role Grid */}
                  <div className="grid sm:grid-cols-2 gap-6 pt-2">
                    <div className="p-4" style={{ background: 'var(--paper-2)', border: '1px solid var(--wire)' }}>
                      <div className="type-label mb-2">Problem Solved</div>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14.5px', lineHeight: 1.6, color: 'var(--ink-2)' }}>
                        {project.problemSummary}
                      </p>
                    </div>
                    <div className="p-4" style={{ background: 'var(--paper-2)', border: '1px solid var(--wire)' }}>
                      <div className="type-label mb-2">Role &amp; Ownership</div>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14.5px', lineHeight: 1.6, color: 'var(--ink-2)' }}>
                        {project.roleScope}
                      </p>
                    </div>
                  </div>

                  {/* Meaningful Engineering Challenge */}
                  <div
                    className="p-5"
                    style={{
                      background: 'var(--paper-2)',
                      border: '1px solid var(--wire)',
                      borderLeft: '3px solid var(--signal)',
                    }}
                  >
                    <div className="type-label mb-2" style={{ color: 'var(--signal)' }}>
                      Core Engineering Challenge &amp; Architectural Decision
                    </div>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', lineHeight: 1.65, color: 'var(--ink-2)' }}>
                      {project.challengeSummary}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <div className="type-label mb-2.5">Primary Technology Stack</div>
                    <ul className="flex flex-wrap gap-2 m-0 p-0 list-none" aria-label={`${project.title} technology stack`}>
                      {project.tech.map(t => (
                        <li key={t}>
                          <span className="pill-tag">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Links */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link href={`/case-studies/${project.id}`} className="btn-primary">
                      Read full case study →
                    </Link>
                    {project.interactiveProofHref && (
                      <a href={project.interactiveProofHref} className="btn-secondary">
                        {project.interactiveProofLabel || 'Try live simulation ↓'}
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                      >
                        GitHub Repo ↗
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                      >
                        Live Deployment ↗
                      </a>
                    )}
                  </div>
                </div>

                {/* Right 5 Columns: Visual Preview + Verified Outcomes */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Visual Preview */}
                  <Link
                    href={`/case-studies/${project.id}`}
                    className="block group overflow-hidden"
                    style={{ border: '1px solid var(--wire)', background: 'var(--paper-2)' }}
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.imageCaption || project.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div
                      className="px-4 py-2.5 flex items-center justify-between gap-2"
                      style={{ borderTop: '1px solid var(--wire)', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-3)' }}
                    >
                      <span className="truncate">{project.imageCaption}</span>
                      <span style={{ color: 'var(--signal)', flexShrink: 0 }}>Inspect →</span>
                    </div>
                  </Link>

                  {/* Verified Outcomes */}
                  <div style={{ border: '1px solid var(--wire)', background: 'var(--paper-2)' }}>
                    <div className="px-5 py-3" style={{ borderBottom: '1px solid var(--wire)' }}>
                      <span className="type-label">Verified Outcomes &amp; Evidence</span>
                    </div>
                    <div className="divide-y" style={{ borderColor: 'var(--wire)' }}>
                      {(project.outcomeHighlights || []).map((outcome, i) => (
                        <div key={i} className="px-5 py-3.5 flex items-baseline justify-between gap-4">
                          <span
                            style={{
                              fontFamily: 'var(--font-sans)',
                              fontWeight: 700,
                              fontSize: '20px',
                              letterSpacing: '-0.02em',
                              color: 'var(--ink)',
                              flexShrink: 0,
                            }}
                          >
                            {outcome.stat}
                          </span>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '11.5px',
                              color: 'var(--ink-3)',
                              textAlign: 'right',
                            }}
                          >
                            {outcome.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Additional Production & Contract Projects Strip */}
        {additional.length > 0 && (
          <div className="px-[var(--page-gutter)] py-12" style={{ background: 'var(--paper-2)' }}>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <div className="type-label mb-1">Additional Shipped Work · 04 — 05</div>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '20px', color: 'var(--ink)' }}>
                  Contract Integrations &amp; E-Commerce Systems
                </h3>
              </div>
              <Link
                href="/case-studies"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: 'var(--signal)', textTransform: 'uppercase', letterSpacing: '0.08em' }}
                className="hover:underline"
              >
                Explore full archive →
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {additional.map(proj => (
                <Link
                  key={proj.id}
                  href={`/case-studies/${proj.id}`}
                  className="group p-6 block transition-colors"
                  style={{ background: 'var(--paper)', border: '1px solid var(--wire)' }}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="type-label">{proj.category} · {proj.company}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-4)' }}>{proj.year}</span>
                  </div>
                  <h4
                    style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '20px', color: 'var(--ink)', marginBottom: '6px' }}
                    className="group-hover:text-[var(--signal)] transition-colors"
                  >
                    {proj.title}
                  </h4>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14.5px', lineHeight: 1.6, color: 'var(--ink-2)', marginBottom: '12px' }}>
                    {proj.description}.
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-3" style={{ borderTop: '1px solid var(--wire)' }}>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tech.slice(0, 3).map(t => (
                        <span key={t} className="pill-tag">{t}</span>
                      ))}
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--signal)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Case study →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
