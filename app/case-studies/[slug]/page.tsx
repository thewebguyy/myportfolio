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
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
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
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-[56px]"
        style={{ background: 'var(--paper)', borderBottom: '1px solid var(--wire)' }}
      >
        <Link href="/#work" className="blog-nav-back flex items-center gap-2">
          <ArrowLeftIcon className="w-4 h-4" />
          Back to work
        </Link>
        <span
          style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--signal)' }}
        >
          Case Study
        </span>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div
              className="inline-flex items-center gap-2 px-3 py-1"
              style={{ border: '1px solid var(--signal)', color: 'var(--signal)', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              {project.category}
            </div>
            <h1
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.03em', lineHeight: 1.0, color: 'var(--ink)' }}
            >
              {project.title}
            </h1>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.8 }}>
              {project.longDescription}
            </p>

            {project.metrics && Object.keys(project.metrics).length > 0 && (
              <div
                className="grid grid-cols-1 sm:grid-cols-3 gap-px pt-10"
                style={{ borderTop: '1px solid var(--wire)', background: 'var(--wire)' }}
              >
                {Object.entries(project.metrics).slice(0, 3).map(([key, val]) => (
                  <div key={key} style={{ background: 'var(--paper)', padding: '20px 24px' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: '6px' }}>{key}</div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '22px', color: 'var(--ink)' }}>{val as string}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-square overflow-hidden" style={{ border: '1px solid var(--wire)' }}>
              <Image src={project.image} alt={project.title} fill className="object-cover grayscale" />
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="px-6 pb-32">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-12 gap-12">

          {/* Sidebar */}
          <aside className="lg:col-span-4 h-fit lg:sticky lg:top-20 space-y-6">
            <SidePanel title="Technical Stack">
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t: string) => (
                  <span key={t} className="pill-tag">{t}</span>
                ))}
              </div>
            </SidePanel>
            <SidePanel title="Project Context">
              <div className="space-y-5" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                <Field label="Company / Context" value={project.company} />
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-3)', display: 'block', marginBottom: '4px' }}>Code Repository</span>
                  {project.githubUrl ? (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--signal)', fontWeight: 600 }}>
                      Public (Open Source) ↗
                    </a>
                  ) : (
                    <span style={{ color: 'var(--ink-3)', fontStyle: 'italic' }}>Private (Proprietary Code)</span>
                  )}
                </div>
                {project.liveUrl && (
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-3)', display: 'block', marginBottom: '4px' }}>Production Link</span>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--signal)', fontWeight: 600 }}>
                      {project.liveUrl.replace('https://', '').replace('http://', '').replace(/\/$/, '')} ↗
                    </a>
                  </div>
                )}
              </div>
            </SidePanel>
          </aside>

          {/* Main content */}
          <div className="lg:col-span-8 space-y-20">
            {content ? (
              <>
                <ContentBlock title="The Problem">
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', lineHeight: 1.8, color: 'var(--ink-2)' }}>{content.problem}</p>
                </ContentBlock>

                {(() => {
                  const visibleConstraints = filterConstraints(content.constraints)
                  return visibleConstraints.length > 0 ? (
                    <ContentBlock title="Constraints">
                      <ul className="space-y-3 pl-4" style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', lineHeight: 1.8, color: 'var(--ink-2)', listStyleType: 'disc' }}>
                        {visibleConstraints.map((c: string, i: number) => <li key={i}>{c}</li>)}
                      </ul>
                    </ContentBlock>
                  ) : null
                })()}

                <ContentBlock title="Architecture">
                  {params.slug === 'servicebridge' && (
                    <div className="my-6 overflow-hidden" style={{ border: '1px solid var(--wire)' }}>
                      <ServiceBridgeArchitecture />
                    </div>
                  )}
                  {params.slug === 'servia' && (
                    <div className="my-6 overflow-hidden" style={{ border: '1px solid var(--wire)' }}>
                      <ServiaArchitecture />
                    </div>
                  )}
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', lineHeight: 1.8, color: 'var(--ink-2)' }}>{content.architectureNotes}</p>
                </ContentBlock>

                <ContentBlock title="Key Decisions">
                  <div className="space-y-4">
                    {content.keyDecisions.map((kd: { decision: string; rationale: string; tradeoff: string }, i: number) => (
                      <div key={i} className="p-6 space-y-3" style={{ background: 'var(--paper-2)', border: '1px solid var(--wire)' }}>
                        <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '17px', color: 'var(--ink)' }}>{kd.decision}</h3>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 1.75, color: 'var(--ink-2)' }}>
                          <span style={{ color: 'var(--ink)', fontWeight: 600 }}>Rationale: </span>{kd.rationale}
                        </p>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 1.75, color: 'var(--ink-3)' }}>
                          <span style={{ color: 'var(--ink-2)', fontWeight: 600 }}>Tradeoff: </span>{kd.tradeoff}
                        </p>
                      </div>
                    ))}
                  </div>
                </ContentBlock>

                {content.whatBroke && !hasPlaceholder(content.whatBroke) && (
                  <ContentBlock title="Post-Mortem: What Broke">
                    <div className="p-6" style={{ background: 'var(--paper-2)', borderLeft: '3px solid var(--signal)', border: '1px solid var(--wire)' }}>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', lineHeight: 1.8, color: 'var(--ink-2)' }}>{content.whatBroke}</p>
                    </div>
                  </ContentBlock>
                )}

                {content.whatChanged && !hasPlaceholder(content.whatChanged) && (
                  <ContentBlock title="Reflection: What Changed">
                    <div className="p-6" style={{ background: 'var(--paper-2)', border: '1px solid var(--wire)' }}>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', lineHeight: 1.8, color: 'var(--ink-2)', fontStyle: 'italic' }}>{content.whatChanged}</p>
                    </div>
                  </ContentBlock>
                )}

                {content.evidence && (
                  <ContentBlock title="Load Testing Evidence">
                    <div className="p-8 space-y-6" style={{ background: 'var(--paper-2)', border: '1px solid var(--wire)' }}>
                      <div
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6"
                        style={{ borderBottom: '1px solid var(--wire)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}
                      >
                        <MetaField label="Testing Tool" value={content.evidence.tool} />
                        <MetaField label="Peak Throughput" value={content.evidence.rps} />
                        <MetaField label="Test Environment" value={content.evidence.environment} />
                      </div>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 1.8, color: 'var(--ink-2)' }}>
                        {content.evidence.details}
                      </p>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-3)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                        Test script documented in{' '}
                        {project.githubUrl ? (
                          <a href={`${project.githubUrl}/blob/main/docs/load-test-k6.js`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--signal)' }}>
                            docs/load-test-k6.js ↗
                          </a>
                        ) : (
                          <span>docs/load-test-k6.js</span>
                        )}
                      </div>
                    </div>
                  </ContentBlock>
                )}
              </>
            ) : (
              <ContentBlock title="Engineering Challenges">
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', lineHeight: 1.8, color: 'var(--ink-2)' }}>
                  Building {project.title} required solving complex distributed systems problems,
                  specifically around concurrency and real-time data synchronization.
                </p>
              </ContentBlock>
            )}

            {/* Footer CTA */}
            <div className="p-12 text-center space-y-6" style={{ background: 'var(--paper-2)', border: '1px solid var(--wire)' }}>
              <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '28px', letterSpacing: '-0.02em', color: 'var(--ink)' }}>
                Want to discuss the architecture?
              </h2>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto' }}>
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

function SidePanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ border: '1px solid var(--wire)', background: 'var(--paper-2)' }}>
      <div className="px-6 py-4" style={{ borderBottom: '1px solid var(--wire)' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>{title}</span>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

function ContentBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(22px, 2.5vw, 30px)', letterSpacing: '-0.02em', color: 'var(--ink)' }}>{title}</h2>
      {children}
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-3)', display: 'block', marginBottom: '4px' }}>{label}</span>
      <span style={{ color: 'var(--ink)' }}>{value}</span>
    </div>
  )
}

function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-3)', display: 'block', marginBottom: '4px' }}>{label}</span>
      <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px', color: 'var(--ink)' }}>{value}</span>
    </div>
  )
}
