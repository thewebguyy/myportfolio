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
        <main className="min-h-screen bg-secondary">
            {/* Header */}
            <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-gray-900">
                <div className="max-w-7xl mx-auto">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-primary 
                     transition-colors mb-8 text-xs font-black uppercase tracking-widest"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Exit to Terminal
                    </Link>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
                        Strategic <span className="gradient-text">Archive</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl font-serif italic leading-relaxed">
                        A collection of enterprise audits, operational strategies, and high-impact technical implementations.
                        Each case study represents a production system built and shipped under real constraints.
                    </p>
                </div>
            </section>

            {/* Technical Implementation Archive */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-12">
                        <h2 className="text-sm font-black text-white uppercase tracking-[0.4em]">Technical Implementations</h2>
                        <div className="flex-1 h-px bg-gray-800" />
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sortedProjects.map((project, index) => (
                            <TechnicalCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                </div>
            </section>
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
            className="glass rounded-2xl p-6 border-gray-800 hover:border-primary/40 transition-all group"
        >
            <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">{project.category}</span>
                <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{project.year}</span>
            </div>
            <h4 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{project.title}</h4>
            <p className="text-sm text-gray-400 mb-6 line-clamp-2">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.slice(0, 3).map(t => (
                    <span key={t} className="text-[9px] bg-gray-900 px-2 py-1 rounded text-gray-500 uppercase font-bold tracking-tighter">{t}</span>
                ))}
            </div>
            <Link 
                href={`/case-studies/${project.id}`}
                className="inline-flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-widest group/link"
            >
                View Implementation
                <ArrowRightIcon className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </Link>
        </motion.div>
    )
}
