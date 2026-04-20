'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { projects } from '@/lib/projects'

const REAL_PROJECTS_IDS = ['servicebridge', '55lounge', 'subscription-manager', 'checkout-system']

export function CaseStudies() {
  const selectedProjects = REAL_PROJECTS_IDS.map(id => projects.find(p => p.id === id)).filter(Boolean)

  return (
    <section id="projects" className="section-padding bg-background">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="mb-24">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="label mb-4 block"
          >
            Deep dives
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="h2 text-white mb-4"
          >
            Engineering, in detail
          </motion.h2>
        </div>

        {/* Case Studies List */}
        <div className="flex flex-col">
          {selectedProjects.map((project, index) => (
            <CaseStudyRow 
              key={project!.id} 
              project={project!} 
              number={index + 1} 
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function CaseStudyRow({ project, number }: { project: any, number: number }) {
  return (
    <div className="group border-t border-surface-2 pt-12 pb-12 transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left: Metadata (2 cols on 12-col grid -> ~16% or 5-col split -> 2/5 = 40%) */}
        {/* Let's follow the "5-column grid" logic by using 5 cols and splitting 2/3 */}
        <div className="md:col-span-5 flex flex-col relative">
          <div className="display absolute -top-4 -left-2 text-surface-2 opacity-100 transition-colors duration-300 group-hover:text-primary/15 pointer-events-none select-none text-[80px]">
            {number.toString().padStart(2, '0')}
          </div>
          <div className="relative pt-10">
            <h3 className="font-sans font-semibold text-[24px] text-white mb-2">
              {project.title}
            </h3>
            <div className="font-mono text-[11px] text-text-muted mb-4">
              {project.year}
            </div>
            <div className="pill-tag w-fit">
              {project.category}
            </div>
          </div>
        </div>

        {/* Right: Narrative & Breakdown (3 cols on 5-col grid) */}
        <div className="md:col-span-7">
          <div className="flex flex-col gap-8">
            {/* Narrative */}
            <p className="text-[16px] text-text-secondary leading-[1.7]">
              {project.longDescription.split('.').slice(0, 3).join('.')}.
            </p>

            {/* Metrics */}
            <div className="flex flex-wrap gap-6">
              {project.metrics && Object.entries(project.metrics).slice(0, 4).map(([key, val]) => (
                <div key={key} className="flex flex-col">
                  <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider">{key}</span>
                  <span className="text-[14px] text-white font-medium">{val as string}</span>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t: string) => (
                <span key={t} className="pill-tag">{t}</span>
              ))}
            </div>

            {/* Link */}
            <Link 
              href={`/#projects`} 
              className="text-[14px] text-primary font-medium flex items-center gap-2 group/link"
            >
              View project 
              <span className="transition-transform group-hover/link:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}