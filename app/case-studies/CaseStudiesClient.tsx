'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Project } from '@/lib/projects'

export function CaseStudiesClient({ sortedProjects }: {
    sortedProjects: Project[]
}) {
    return (
        <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
            <div className="max-w-[1440px] mx-auto" style={{ borderLeft: '1px solid var(--wire)', borderRight: '1px solid var(--wire)', minHeight: '100vh' }}>
                {/* Header */}
                <section
                    className="pt-32 pb-16 px-[var(--page-gutter)]"
                    style={{ borderBottom: '1px solid var(--wire)' }}
                >
                    <Link href="/" className="blog-nav-back inline-flex items-center gap-2 mb-10 block">
                        ← Back to home
                    </Link>

                    <div className="type-label mb-6" style={{ color: 'var(--ink-4)' }}>Work</div>
                    <h1
                        style={{
                            fontFamily: 'var(--font-sans)',
                            fontWeight: 700,
                            fontSize: 'clamp(40px, 6vw, 80px)',
                            lineHeight: 0.96,
                            letterSpacing: '-0.04em',
                            color: 'var(--ink)',
                        }}
                    >
                        Case Studies
                    </h1>
                    <p
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '14px',
                            lineHeight: 1.78,
                            color: 'var(--ink-2)',
                            maxWidth: '52ch',
                            marginTop: '24px',
                        }}
                    >
                        Production systems built and shipped under real constraints. Each case study documents the problem, the decision, and what broke.
                    </p>
                </section>

                {/* Project list */}
                <section className="px-[var(--page-gutter)] py-16">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'var(--wire)' }}>
                        {sortedProjects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

function ProjectCard({ project, index }: { project: Project, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04, duration: 0.4 }}
            style={{ background: 'var(--paper)' }}
        >
            <Link href={`/case-studies/${project.id}`} className="group block p-8 h-full" style={{ background: 'var(--paper)', transition: 'background 0.2s ease' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--paper-3)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--paper)')}
            >
                <div className="flex justify-between items-start mb-6">
                    <span
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '10px',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'var(--signal)',
                        }}
                    >
                        {project.category}
                    </span>
                    <span
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '10px',
                            color: 'var(--ink-4)',
                            letterSpacing: '0.06em',
                        }}
                    >
                        {project.year}
                    </span>
                </div>
                <h3
                    className="mb-3"
                    style={{
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 600,
                        fontSize: 'clamp(18px, 2vw, 22px)',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.15,
                        color: 'var(--ink)',
                    }}
                >
                    {project.title}
                </h3>
                <p
                    className="mb-8"
                    style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '13px',
                        lineHeight: 1.72,
                        color: 'var(--ink-3)',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    } as React.CSSProperties}
                >
                    {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.slice(0, 3).map(t => (
                        <span key={t} className="pill-tag">{t}</span>
                    ))}
                </div>
                <span
                    style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'var(--ink-3)',
                        transition: 'color 0.15s',
                    }}
                    className="group-hover:text-[var(--signal)]"
                >
                    Read case study →
                </span>
            </Link>
        </motion.div>
    )
}
