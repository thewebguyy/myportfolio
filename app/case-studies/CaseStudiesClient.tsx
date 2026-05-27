'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Project } from '@/lib/projects'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

export function CaseStudiesClient({ sortedProjects }: {
    sortedProjects: Project[]
}) {
    return (
        <main className="min-h-screen bg-background px-6 lg:px-8">
            <div className="w-full max-w-[1440px] mx-auto border-x-[0.5px] border-border-wire min-h-screen">
                {/* Header */}
                <section className="pt-32 pb-16 px-8 lg:px-16 border-b-[0.5px] border-border-wire">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-text-secondary hover:text-primary 
                                 transition-colors mb-8 text-[11px] font-mono uppercase tracking-widest"
                    >
                        <ArrowLeftIcon className="w-3.5 h-3.5" />
                        Exit to Terminal
                    </Link>

                    <h1 className="text-5xl md:text-7xl font-serif mb-6 text-text-primary">
                        Strategic <span className="gradient-text">Archive</span>
                    </h1>
                    <p className="text-xl text-text-secondary max-w-3xl font-serif italic leading-relaxed">
                        A collection of enterprise audits, operational strategies, and high-impact technical implementations.
                        Each case study represents a production system built and shipped under real constraints.
                    </p>
                </section>

                {/* Technical Implementation Archive */}
                <section className="py-20 px-8 lg:px-16">
                    <div className="flex items-center gap-4 mb-12">
                        <h2 className="text-[11px] font-mono text-text-primary uppercase tracking-[0.4em]">Technical Implementations</h2>
                        <div className="flex-1 h-[0.5px] bg-border-wire" />
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sortedProjects.map((project, index) => (
                            <TechnicalCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                </section>
            </div>
        </main>
    )
}

function TechnicalCard({ project, index }: { project: Project, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="glass rounded-xl p-6 border-[0.5px] border-border-wire hover:border-primary/40 transition-all group"
        >
            <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-mono text-primary uppercase tracking-widest">{project.category}</span>
                <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">{project.year}</span>
            </div>
            <h4 className="text-xl font-serif text-text-primary mb-3 group-hover:text-primary transition-colors">{project.title}</h4>
            <p className="text-sm text-text-secondary mb-6 line-clamp-2 leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.slice(0, 3).map(t => (
                    <span key={t} className="text-[9px] bg-surface-2 px-2 py-1 rounded-[4px] border-[0.5px] border-border-wire text-text-secondary uppercase font-mono tracking-widest">{t}</span>
                ))}
            </div>
            <Link 
                href={`/case-studies/${project.id}`}
                className="inline-flex items-center gap-2 text-[10px] font-mono text-text-primary uppercase tracking-widest group/link hover:text-primary transition-colors"
            >
                View Implementation
                <ArrowRightIcon className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </Link>
        </motion.div>
    )
}
