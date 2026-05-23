'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { projects, type Project } from '@/lib/projects'
import { ArtifactFrame } from '../ui/ArtifactFrame'
import { TechnicalAudit } from '../ui/TechnicalAudit'

const REAL_PROJECTS_IDS = ['servicebridge', '55lounge', 'subscription-manager', 'checkout-system']

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
            [SYSTEM_LOG: WORK_HISTORY]
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[40px] md:text-[56px] text-text-primary font-serif tracking-tight"
          >
            The Ledger.
          </motion.h2>
        </div>

        {/* Ledger Entries */}
        <div className="flex flex-col">
          {selectedProjects.map((project, index) => (
            <LedgerEntry 
              key={project!.id} 
              project={project as Project} 
              number={index + 1} 
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function LedgerEntry({ project, number }: { project: Project, number: number }) {
  const perfMetrics = project.metrics 
    ? Object.entries(project.metrics).map(([key, val]) => ({ metric: key, value: val as string }))
    : [{ metric: 'Latency', value: '< 50ms' }, { metric: 'Uptime', value: '99.99%' }];

  return (
    <div className="border-b-[0.5px] border-border-wire group">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left Column: Metadata */}
        <div className="lg:col-span-4 border-b-[0.5px] lg:border-b-0 lg:border-r-[0.5px] border-border-wire p-8 lg:p-12 flex flex-col">
          <div className="font-mono text-[11px] text-text-accent uppercase tracking-widest mb-12">
            [LOG_ENTRY: {number.toString().padStart(2, '0')}]
          </div>
          
          <h3 className="font-serif text-[32px] text-text-primary leading-tight mb-4">
            {project.title}
          </h3>
          
          <div className="font-mono text-[13px] text-text-primary/70 mb-12">
            ROLE: {project.role || 'LEAD ENGINEER'}<br/>
            DATE: {project.year}
          </div>

          <div className="mt-auto">
            <div className="font-mono text-[11px] text-text-accent uppercase tracking-widest mb-4">
              [CATEGORY]
            </div>
            <div className="font-mono text-[13px] text-text-primary uppercase">
              {project.category}
            </div>
          </div>
        </div>

        {/* Right Column: Narrative & Artifact */}
        <div className="lg:col-span-8 p-8 lg:p-12">
          <ArtifactFrame id={project.id.toUpperCase()} title={project.title}>
            <div className="p-8 font-mono text-[14px] text-text-primary/80 leading-[1.8] bg-surface/50 border-b-[0.5px] border-border-wire">
              {project.longDescription || project.description}
            </div>
            
            <TechnicalAudit 
              stack={project.tech}
              performance={perfMetrics}
              architecture={`System architecture optimized for ${project.category.toLowerCase()} workload. Implementations involved distributed systems patterns and strict type-safety across the monorepo.`}
            />

            <div className="p-4 bg-surface border-t-[0.5px] border-border-wire flex justify-end">
              <a href="#work" className="btn-secondary">
                [ACCESS DEMO]
              </a>
            </div>
          </ArtifactFrame>
        </div>

      </div>
    </div>
  )
}