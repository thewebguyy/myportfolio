'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { projects, type Project } from '@/lib/projects'
import { ArtifactFrame } from '../ui/ArtifactFrame'
import { TechnicalAudit } from '../ui/TechnicalAudit'

const REAL_PROJECTS_IDS = ['servicebridge', 'servia', 'subscription-manager', 'checkout-system']

const statusMap: Record<string, string> = {
  servicebridge: 'PROD',
  servia: 'PROD',
  'subscription-manager': 'OSS',
  'checkout-system': 'OSS',
  'laverita-hair': 'LIVE'
}

const locationMap: Record<string, string> = {
  servicebridge: 'NETLIFY',
  servia: 'RAILWAY',
  'subscription-manager': 'GITHUB',
  'checkout-system': 'GITHUB',
  'laverita-hair': 'WEB'
}

export function CaseStudies() {
  const selectedProjects = REAL_PROJECTS_IDS.map(id => projects.find(p => p.id === id)).filter(Boolean)

  return (
    <section id="work" className="border-b-[0.5px] border-border-wire bg-background">
      <div className="max-w-[1440px] mx-auto border-x-[0.5px] border-border-wire">
        {/* Ledger Header */}
        <div className="border-b-[0.5px] border-border-wire px-8 lg:px-16 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-[11px] text-text-accent uppercase tracking-widest mb-6"
          >
            Work
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hero-heading text-[40px] md:text-[56px] text-text-primary tracking-tight"
          >
            The Ledger.
          </motion.h2>
        </div>

        {/* Global Metrics Strip */}
        <div className="border-b-[0.5px] border-border-wire bg-background">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x-[0.5px] divide-border-wire">
            {[
              { value: '10k+', label: 'Peak Users' },
              { value: '99.9%', label: 'Availability' },
              { value: '<200ms', label: 'API Latency' },
              { value: '99.98%', label: 'Success Rate' }
            ].map((metric, i) => (
              <div key={i} className="flex flex-col items-center justify-center py-16 px-4 text-center hover:bg-surface/50 transition-colors duration-500">
                <div 
                  className="font-display font-bold text-text-primary tracking-tighter" 
                  style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', lineHeight: 1 }}
                >
                  {metric.value}
                </div>
                <div className="font-mono text-[11px] text-text-accent uppercase tracking-widest mt-6">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ledger Entries */}
        <div className="flex flex-col">
          {selectedProjects.map((project, index) => (
            <LedgerEntry 
              key={project!.id} 
              project={project as Project} 
              number={index + 1} 
              index={index}
              totalCards={selectedProjects.length}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function LedgerEntry({ project, number, index, totalCards }: { project: Project, number: number, index: number, totalCards: number }) {
  const perfMetrics = project.metrics 
    ? Object.entries(project.metrics).map(([key, val]) => ({ metric: key, value: val as string }))
    : [{ metric: 'Latency', value: '< 50ms' }, { metric: 'Uptime', value: '99.99%' }];

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const targetScale = 1 - (totalCards - 1 - index) * 0.03
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])

  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)')
    setIsMobile(media.matches)
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [])

  return (
    <div ref={containerRef} className="h-auto md:h-[85vh] w-full relative mb-8 md:mb-0">
      <motion.div 
        className="relative md:sticky w-full border-[0.5px] border-border-wire bg-background group overflow-hidden"
        style={isMobile ? {
          transformOrigin: 'top center'
        } : {
          top: `${96 + index * 28}px`,
          scale,
          transformOrigin: 'top center'
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Left Column: Metadata */}
        <div className="lg:col-span-4 border-b-[0.5px] lg:border-b-0 lg:border-r-[0.5px] border-border-wire p-8 lg:p-12 flex flex-col">
          <div className="font-mono text-[11px] text-text-accent uppercase tracking-widest mb-12">
            {number.toString().padStart(2, '0')} /
          </div>
          
          <h3 className="font-display font-semibold text-[32px] text-text-primary leading-tight mb-4">
            {project.title}
          </h3>
          
          <div className="font-mono text-[13px] text-text-primary/70 mb-12 space-y-1">
            <div>ROLE: {(project as Project & { role?: string }).role || 'LEAD ENGINEER'}</div>
            <div>CONTEXT: {project.company}</div>
            <div>DATE: {project.year}</div>
            <div>TEAM: {project.teamSize}</div>
            <div>DURATION: {project.duration}</div>
            <div>REPO: {project.githubUrl ? 'PUBLIC' : 'PRIVATE'}</div>
          </div>

          <div className="mt-auto">
            <div className="font-mono text-[11px] text-text-accent uppercase tracking-widest mb-4">
              Category
            </div>
            <div className="font-mono text-[13px] text-text-primary uppercase">
              {project.category}
            </div>
          </div>
        </div>

        {/* Right Column: Narrative & Artifact */}
        <div className="lg:col-span-8 p-8 lg:p-12">
          <ArtifactFrame 
            id={project.id.toUpperCase()} 
            title={project.title}
            status={statusMap[project.id]}
            location={locationMap[project.id]}
          >
            <div className="p-8 font-mono text-[14px] text-text-primary/80 leading-[1.8] bg-surface/50 border-b-[0.5px] border-border-wire">
              {project.longDescription || project.description}
            </div>
            
            <TechnicalAudit 
              stack={project.tech}
              performance={perfMetrics}
              architecture={`System architecture optimized for ${project.category.toLowerCase()} workload. Implementations involved distributed systems patterns and strict type-safety across the monorepo.`}
            />

            <div className="p-4 bg-surface border-t-[0.5px] border-border-wire flex justify-end">
              <Link href={`/case-studies/${project.id}`} className="btn-secondary">
                View project
              </Link>
            </div>
          </ArtifactFrame>
        </div>

        </div>

      </motion.div>
    </div>
  )
}