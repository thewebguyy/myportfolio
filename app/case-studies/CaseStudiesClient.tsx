'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Project } from '@/lib/projects'
import { flagshipCaseStudies, CaseStudy } from '@/lib/case-studies'
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
                        Each case study represents a commitment to ROI-driven engineering and analytical depth.
                    </p>
                </div>
            </section>

            {/* Flagship Consulting Audits */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-12">
                        <h2 className="text-sm font-black text-white uppercase tracking-[0.4em]">Flagship Consulting Audits</h2>
                        <div className="flex-1 h-px bg-gray-800" />
                    </div>
                    
                    <div className="grid gap-12">
                        {flagshipCaseStudies.map((study, index) => (
                            <FlagshipRow key={study.id} study={study} index={index} />
                        ))}
                    </div>
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

function FlagshipRow({ study, index }: { study: CaseStudy, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative grid lg:grid-cols-12 gap-8 items-center"
        >
            <div className="lg:col-span-7 glass rounded-3xl p-8 lg:p-12 border-primary/10 group-hover:border-primary/30 transition-all">
                <span className="text-primary text-[10px] font-black uppercase tracking-widest mb-4 block">{study.category} • {study.client}</span>
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">{study.title}</h3>
                <p className="text-gray-400 font-serif italic text-lg mb-8 leading-relaxed line-clamp-3">
                    {study.context}
                </p>
                <div className="flex flex-wrap gap-4">
                    {study.metrics.map((m, i) => (
                        <div key={i} className="px-4 py-2 bg-gray-900 rounded-lg border border-gray-800">
                            <div className="text-[10px] text-gray-500 uppercase font-black mb-1">{m.label}</div>
                            <div className="text-xl font-bold text-primary">{m.value}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="lg:col-span-5 space-y-6">
                <div className="p-6 bg-gray-950 rounded-2xl border border-gray-900">
                    <h4 className="text-[10px] text-gray-500 uppercase font-black mb-3 tracking-widest">Primary Objective</h4>
                    <p className="text-sm text-gray-300 italic">{study.goal}</p>
                </div>
                <Link 
                    href={`/case-studies/${study.id}`}
                    className="flex items-center justify-between w-full p-6 bg-primary text-white rounded-2xl font-black uppercase tracking-widest hover:bg-primary-light transition-all shadow-xl shadow-primary/20"
                >
                    View Strategic Audit
                    <ArrowRightIcon className="w-6 h-6" />
                </Link>
            </div>
        </motion.div>
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
