'use client'

import React from 'react'

const PLACEHOLDER_RE = /\[PLACEHOLDER[^\]]*\]/

function hasPlaceholder(value: string): boolean {
  return PLACEHOLDER_RE.test(value)
}

function filterConstraints(items: string[]): string[] {
  return items.filter(item => !hasPlaceholder(item))
}
// Metadata removed
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getProjectById } from '@/lib/projects'
import { ArrowLeftIcon, ServerStackIcon, CpuChipIcon, CommandLineIcon } from '@heroicons/react/24/outline'
import { TechnicalInsightCard, ArchitecturePanel } from '@/app/components/ui/EngineeringUI'
// cn removed
import { caseStudyContent } from '@/lib/case-study-content'
import ServiceBridgeArchitecture from '@/app/components/visuals/ServiceBridgeArchitecture'
import ServiaArchitecture from '@/app/components/visuals/ServiaArchitecture'

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = getProjectById(params.slug)

  if (!project) notFound()

  const content = caseStudyContent[params.slug]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: project.title,
    description: project.longDescription || project.description,
    author: {
      '@type': 'Person',
      name: 'Olabode Olusegun'
    }
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-surface-2 px-6 py-4">
        <div className="max-w-[1280px] mx-auto flex justify-between items-center">
          <Link href="/#work" className="text-text-muted hover:text-text-primary transition-all text-[10px] font-mono uppercase tracking-widest flex items-center gap-2">
            <ArrowLeftIcon className="w-4 h-4" />
            Back to work
          </Link>
          <div className="text-[10px] font-mono text-primary uppercase tracking-[0.3em]">Engineering Case Study</div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/30 text-primary text-[10px] font-mono uppercase tracking-widest">
              <CommandLineIcon className="w-4 h-4" />
              {project.category}
            </div>
            <h1 className="display text-text-primary">{project.title}</h1>
            <p className="font-mono text-[16px] text-text-secondary leading-relaxed">
              {project.longDescription}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-10 border-t border-surface-2">
               {Object.entries(project.metrics || {}).slice(0, 3).map(([key, val]) => (
                 <TechnicalMetric key={key} label={key} value={val as string} />
               ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative">
             <div className="absolute inset-0 bg-primary/5 blur-[80px]" />
             <div className="relative z-10 aspect-square overflow-hidden border border-surface-2">
                <Image src={project.image} alt={project.title} fill className="object-cover grayscale" />
             </div>
          </div>
        </div>
      </section>

      {/* Technical Breakdown */}
      <section className="px-6 pb-32">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-12 gap-12">
          {/* Sidebar: Stack */}
          <aside className="lg:col-span-4 h-fit lg:sticky lg:top-32 space-y-8">
            <ArchitecturePanel title="Technical Stack">
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t: string) => (
                  <span key={t} className="pill-tag">{t}</span>
                ))}
              </div>
            </ArchitecturePanel>
            <ArchitecturePanel title="Project Context">
              <div className="space-y-6 font-mono text-[12px]">
                <div>
                  <span className="text-text-muted uppercase block text-[10px] tracking-wider mb-1">Company / Context</span>
                  <span className="text-text-primary">{project.company}</span>
                </div>
                <div>
                  <span className="text-text-muted uppercase block text-[10px] tracking-wider mb-1">Code Repository</span>
                  {project.githubUrl ? (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1 font-semibold">
                      Public (Open Source) ↗
                    </a>
                  ) : (
                    <span className="text-text-secondary italic">Private (Proprietary Code)</span>
                  )}
                </div>
                {project.liveUrl && (
                  <div>
                    <span className="text-text-muted uppercase block text-[10px] tracking-wider mb-1">Production Link</span>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
                      {project.liveUrl.replace('https://', '').replace('http://', '').replace(/\/$/, '')} ↗
                    </a>
                  </div>
                )}
              </div>
            </ArchitecturePanel>
          </aside>

          {/* Main Content: Implementation Details */}
          <div className="lg:col-span-8 space-y-24">
            {content ? (
              <>
                <div className="space-y-8">
                  <h2 className="text-[32px] font-semibold text-text-primary">The Problem</h2>
                  <div className="p-10 bg-surface border border-surface-2 body">
                    <p>{content.problem}</p>
                  </div>
                </div>

                {(() => {
                  const visibleConstraints = filterConstraints(content.constraints)
                  return visibleConstraints.length > 0 ? (
                    <div className="space-y-8">
                      <h2 className="text-[32px] font-semibold text-text-primary">Constraints</h2>
                      <ul className="list-disc list-inside space-y-3 body pl-4">
                        {visibleConstraints.map((c: string, i: number) => <li key={i}>{c}</li>)}
                      </ul>
                    </div>
                  ) : null
                })()}

                <div className="space-y-8">
                  <h2 className="text-[32px] font-semibold text-text-primary">Architecture</h2>
                  {params.slug === 'servicebridge' && (
                    <div className="my-8 overflow-hidden border border-surface-2 bg-surface">
                      <ServiceBridgeArchitecture />
                    </div>
                  )}
                  {params.slug === 'servia' && (
                    <div className="my-8 overflow-hidden border border-surface-2 bg-surface">
                      <ServiaArchitecture />
                    </div>
                  )}
                  <p className="body">{content.architectureNotes}</p>
                </div>

                <div className="space-y-8">
                  <h2 className="text-[32px] font-semibold text-text-primary">Key Decisions</h2>
                  <div className="grid gap-6">
                    {content.keyDecisions.map((kd: { decision: string; rationale: string; tradeoff: string }, i: number) => (
                      <div key={i} className="p-8 bg-surface border border-surface-2 space-y-4">
                        <h3 className="text-[18px] font-semibold text-text-primary">{kd.decision}</h3>
                        <p className="body text-text-secondary"><span className="text-text-primary font-medium">Rationale:</span> {kd.rationale}</p>
                        <p className="body text-text-muted"><span className="text-secondary font-medium">Tradeoff:</span> {kd.tradeoff}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {content.whatBroke && !hasPlaceholder(content.whatBroke) && (
                  <div className="space-y-8">
                    <h2 className="text-[32px] font-semibold text-text-primary">Post-Mortem: What Broke</h2>
                    <div className="p-8 bg-surface/50 border-l-4 border-secondary border-y border-r border-surface-2 body">
                      <p>{content.whatBroke}</p>
                    </div>
                  </div>
                )}

                {content.whatChanged && !hasPlaceholder(content.whatChanged) && (
                  <div className="space-y-8">
                    <h2 className="text-[32px] font-semibold text-text-primary">Reflection: What Changed</h2>
                    <div className="p-8 bg-surface/50 border border-surface-2 body italic">
                      <p>{content.whatChanged}</p>
                    </div>
                  </div>
                )}

                {content.evidence && (
                  <div className="space-y-8">
                    <h2 className="text-[32px] font-semibold text-text-primary">Load Testing Evidence</h2>
                    <div className="p-10 bg-surface border border-surface-2 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-[12px] border-b border-surface-2 pb-6">
                        <div>
                          <span className="text-text-muted uppercase block text-[10px] tracking-wider mb-1">Testing Tool</span>
                          <span className="text-text-primary font-semibold">{content.evidence.tool}</span>
                        </div>
                        <div>
                          <span className="text-text-muted uppercase block text-[10px] tracking-wider mb-1">Peak Throughput</span>
                          <span className="text-text-primary font-semibold">{content.evidence.rps}</span>
                        </div>
                        <div>
                          <span className="text-text-muted uppercase block text-[10px] tracking-wider mb-1">Test Environment</span>
                          <span className="text-text-primary font-semibold text-balance">{content.evidence.environment}</span>
                        </div>
                      </div>
                      <p className="body text-text-secondary leading-relaxed pt-2">
                        {content.evidence.details}
                      </p>
                      <div className="pt-2 font-mono text-[11px] text-text-accent uppercase tracking-widest">
                        Test script documented in{' '}
                        {project.githubUrl ? (
                          <a href={`${project.githubUrl}/blob/main/docs/load-test-k6.js`} target="_blank" rel="noopener noreferrer" className="underline hover:text-text-primary transition-colors">docs/load-test-k6.js</a>
                        ) : (
                          <span>docs/load-test-k6.js</span>
                        )}
                        .
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="space-y-12">
                  <h2 className="text-[32px] font-semibold text-text-primary">Engineering Challenges</h2>
                  <div className="p-10 bg-surface border border-surface-2">
                    <p className="body">
                      Building {project.title} required solving complex distributed systems problems, 
                      specifically around concurrency and real-time data synchronization.
                    </p>
                  </div>
                </div>

                <div className="space-y-12">
                   <h2 className="text-[32px] font-semibold text-text-primary">Technical Insights</h2>
                   <div className="grid md:grid-cols-2 gap-6">
                      <TechnicalInsightCard 
                        title="Scale Isolation"
                        value="10k+ Users"
                        description="Implemented multi-tenant request isolation to prevent cascading failures."
                        trend={{ value: 'Stable', positive: true }}
                        icon={ServerStackIcon}
                      />
                      <TechnicalInsightCard 
                        title="Latency Optimization"
                        value="<200ms"
                        description="Reduced P99 latency through aggressive edge caching and Redis optimization."
                        trend={{ value: 'Optimized', positive: true }}
                        icon={CpuChipIcon}
                      />
                   </div>
                </div>
              </>
            )}

            {/* Footer CTA */}
            <div className="p-16 bg-surface border border-surface-2 text-center space-y-8">
              <h2 className="text-[32px] font-semibold text-text-primary">Want to discuss the architecture?</h2>
              <p className="body max-w-[520px] mx-auto">
                Let&apos;s talk about implementing these systems, optimization strategies, or how I can help your engineering team.
              </p>
              <div className="flex justify-center gap-4 pt-4">
                <Link href="/#contact" className="btn-primary">Get in touch</Link>
                <Link href="/#work" className="btn-secondary">View all work</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function TechnicalMetric({ label, value }: { label: string, value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] text-text-muted uppercase tracking-wider mb-2">{label}</div>
      <div className="text-[20px] font-semibold text-text-primary">{value}</div>
    </div>
  )
}