import { Metadata } from 'next'
import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { projects, getProjectById } from '@/lib/projects'
import { caseStudyContent } from '@/lib/case-study-content'
import ServiceBridgeArchitecture from '@/app/components/visuals/ServiceBridgeArchitecture'
import ServiaArchitecture from '@/app/components/visuals/ServiaArchitecture'
import SubscriptionManagerArchitecture from '@/app/components/visuals/SubscriptionManagerArchitecture'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const project = getProjectById(params.slug)
  if (!project) return { title: 'Project Not Found' }
  return { title: `${project.title} — Case Study`, description: project.longDescription || project.description }
}

export async function generateStaticParams() {
  return projects.map(project => ({
    slug: project.id,
  }))
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = getProjectById(params.slug)
  if (!project) notFound()

  const content = caseStudyContent[params.slug]
  const currentIndex = projects.findIndex(p => p.id === params.slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: project.title,
    description: project.longDescription || project.description,
    author: { '@type': 'Person', name: 'Olabode Olusegun' },
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div
        className="max-w-[1440px] mx-auto"
        style={{ borderLeft: '1px solid var(--wire)', borderRight: '1px solid var(--wire)' }}
      >
        {/* Hero */}
        <section
          className="pt-24 lg:pt-28 pb-14 lg:pb-20 px-[var(--page-gutter)]"
          style={{ borderBottom: '1px solid var(--wire)' }}
        >
          {/* Breadcrumb Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4" style={{ borderBottom: '1px solid var(--wire)' }}>
            <div className="flex items-center gap-3">
              <Link href="/case-studies" className="blog-nav-back inline-flex items-center gap-1.5">
                ← All case studies
              </Link>
              <span style={{ color: 'var(--wire-strong)' }} aria-hidden="true">/</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--signal)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                {project.title}
              </span>
            </div>
            <span className="type-label">
              {project.year} · {project.duration} · {project.teamSize}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-7 min-w-0 space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="tag-signal">{project.category}</span>
                <span className="pill-tag">{project.company}</span>
              </div>

              <h1
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  fontSize: 'clamp(36px, 5vw, 64px)',
                  letterSpacing: '-0.035em',
                  lineHeight: 0.98,
                  color: 'var(--ink)',
                }}
              >
                {project.title}
              </h1>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(16.5px, 1.4vw, 18.5px)',
                  color: 'var(--ink-2)',
                  lineHeight: 1.68,
                  maxWidth: '62ch',
                }}
              >
                {content?.introduction || project.longDescription}
              </p>

              {project.metrics && Object.keys(project.metrics).length > 0 && (
                <div
                  className="grid grid-cols-1 sm:grid-cols-3 gap-px pt-4"
                  style={{ border: '1px solid var(--wire)', background: 'var(--wire)' }}
                >
                  {Object.entries(project.metrics)
                    .slice(0, 3)
                    .map(([key, val]) => (
                      <div key={key} style={{ background: 'var(--paper-2)', padding: '18px 20px' }}>
                        <div
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '10.5px',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: 'var(--ink-3)',
                            marginBottom: '6px',
                          }}
                        >
                          {key.replace(/_/g, ' ')}
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontWeight: 700,
                            fontSize: 'clamp(18px, 1.8vw, 22px)',
                            color: 'var(--ink)',
                            lineHeight: 1.15,
                          }}
                        >
                          {val as string}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-5 min-w-0">
              <figure style={{ border: '1px solid var(--wire)', background: 'var(--paper-2)' }}>
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.imageCaption || project.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover grayscale"
                  />
                </div>
                <figcaption
                  className="px-4 py-3"
                  style={{
                    borderTop: '1px solid var(--wire)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--ink-3)',
                  }}
                >
                  {project.imageCaption || `${project.title} system visual`}
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="px-[var(--page-gutter)] py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sidebar */}
            <aside className="lg:col-span-4 min-w-0 h-fit lg:sticky lg:top-24 space-y-6">
              <SidePanel title="Technical Stack">
                <ul className="flex flex-wrap gap-2 m-0 p-0 list-none">
                  {project.tech.map((t: string) => (
                    <li key={t}>
                      <span className="pill-tag">{t}</span>
                    </li>
                  ))}
                </ul>
              </SidePanel>

              <SidePanel title="Project Context & Links">
                <div className="space-y-4" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                  <Field label="Company / Engagement" value={project.company} />
                  <Field label="Role & Timeline" value={`${project.teamSize} · ${project.duration} (${project.year})`} />

                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10.5px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--ink-3)',
                        display: 'block',
                        marginBottom: '4px',
                      }}
                    >
                      Source Code
                    </span>
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--signal)', fontWeight: 700 }}
                        className="hover:underline"
                      >
                        Public GitHub Repository ↗
                      </a>
                    ) : (
                      <span style={{ color: 'var(--ink-3)' }}>Repository not publicly available (architecture documented on this page)</span>
                    )}
                  </div>

                  {project.liveUrl && (
                    <div>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '10.5px',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: 'var(--ink-3)',
                          display: 'block',
                          marginBottom: '4px',
                        }}
                      >
                        Live Environment
                      </span>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--signal)', fontWeight: 700 }}
                        className="hover:underline"
                      >
                        {project.liveUrl.replace('https://', '').replace('http://', '').replace(/\/$/, '')} ↗
                      </a>
                    </div>
                  )}

                  {content?.interactiveDemo && (
                    <div className="pt-3" style={{ borderTop: '1px solid var(--wire)' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '10.5px',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: 'var(--ink-3)',
                          display: 'block',
                          marginBottom: '6px',
                        }}
                      >
                        Interactive Proof
                      </span>
                      <Link
                        href={content.interactiveDemo.href}
                        style={{ color: 'var(--signal)', fontWeight: 700 }}
                        className="hover:underline"
                      >
                        {content.interactiveDemo.ctaLabel}
                      </Link>
                    </div>
                  )}
                </div>
              </SidePanel>
            </aside>

            {/* Main content */}
            <div className="lg:col-span-8 min-w-0 space-y-16">
              {content ? (
                <>
                  {/* 1. The Problem */}
                  <ContentBlock index="01" title="The Problem">
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16.5px', lineHeight: 1.75, color: 'var(--ink-2)' }}>
                      {content.problem}
                    </p>
                  </ContentBlock>

                  {/* 2. Scope of Responsibility */}
                  {content.scope && content.scope.length > 0 && (
                    <ContentBlock index="02" title="Scope of Responsibility">
                      <ul
                        className="space-y-3 pl-5"
                        style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', lineHeight: 1.7, color: 'var(--ink-2)', listStyleType: 'square' }}
                      >
                        {content.scope.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </ContentBlock>
                  )}

                  {/* 3. Engineering Constraints */}
                  {content.constraints && content.constraints.length > 0 && (
                    <ContentBlock index="03" title="Engineering Constraints">
                      <div className="grid sm:grid-cols-2 gap-4">
                        {content.constraints.map((c, i) => (
                          <div key={i} className="p-5" style={{ background: 'var(--paper-2)', border: '1px solid var(--wire)' }}>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--signal)', fontWeight: 700, marginBottom: '6px' }}>
                              CONSTRAINT 0{i + 1}
                            </div>
                            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14.5px', lineHeight: 1.6, color: 'var(--ink-2)' }}>
                              {c}
                            </p>
                          </div>
                        ))}
                      </div>
                    </ContentBlock>
                  )}

                  {/* 4. Architecture & System Diagram */}
                  <ContentBlock index="04" title="Architecture">
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16.5px', lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: '20px' }}>
                      {content.architectureNotes}
                    </p>
                    {params.slug === 'servicebridge' && (
                      <div className="my-6">
                        <ServiceBridgeArchitecture />
                      </div>
                    )}
                    {params.slug === 'servia' && (
                      <div className="my-6">
                        <ServiaArchitecture />
                      </div>
                    )}
                    {params.slug === 'subscription-manager' && (
                      <div className="my-6">
                        <SubscriptionManagerArchitecture />
                      </div>
                    )}
                  </ContentBlock>

                  {/* 5. Key Decisions & Alternatives */}
                  <ContentBlock index="05" title="Key Decisions">
                    <div className="space-y-5">
                      {content.keyDecisions.map((kd, i) => (
                        <div key={i} className="p-6 space-y-3" style={{ background: 'var(--paper-2)', border: '1px solid var(--wire)' }}>
                          <div className="flex items-baseline justify-between gap-2">
                            <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '18px', color: 'var(--ink)' }}>
                              {kd.decision}
                            </h3>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--signal)', fontWeight: 700, flexShrink: 0 }}>
                              DECISION 0{i + 1}
                            </span>
                          </div>
                          {kd.alternatives && (
                            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14.5px', lineHeight: 1.65, color: 'var(--ink-3)' }}>
                              <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', textTransform: 'uppercase', color: 'var(--ink-2)' }}>
                                Alternatives Considered:{' '}
                              </strong>
                              {kd.alternatives}
                            </p>
                          )}
                          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', lineHeight: 1.65, color: 'var(--ink-2)' }}>
                            <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', textTransform: 'uppercase', color: 'var(--ink)' }}>
                              Rationale:{' '}
                            </strong>
                            {kd.rationale}
                          </p>
                          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14.5px', lineHeight: 1.65, color: 'var(--ink-3)' }}>
                            <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', textTransform: 'uppercase', color: 'var(--ink-2)' }}>
                              Trade-off:{' '}
                            </strong>
                            {kd.tradeoff}
                          </p>
                        </div>
                      ))}
                    </div>
                  </ContentBlock>

                  {/* 6. Post-Mortem & Remediation */}
                  {content.whatBroke && (
                    <ContentBlock index="06" title="Post-Mortem: What I Learned">
                      <div
                        className="p-6 space-y-4"
                        style={{ background: 'var(--paper-2)', border: '1px solid var(--wire)', borderLeft: '3px solid var(--signal)' }}
                      >
                        <div>
                          <div className="type-label mb-1.5" style={{ color: 'var(--signal)' }}>
                            What Broke Under Contention
                          </div>
                          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15.5px', lineHeight: 1.72, color: 'var(--ink-2)' }}>
                            {content.whatBroke}
                          </p>
                        </div>
                        {content.whatChanged && (
                          <div className="pt-4" style={{ borderTop: '1px solid var(--wire)' }}>
                            <div className="type-label mb-1.5" style={{ color: 'var(--ink)' }}>
                              Engineering Remediation
                            </div>
                            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15.5px', lineHeight: 1.72, color: 'var(--ink-2)' }}>
                              {content.whatChanged}
                            </p>
                          </div>
                        )}
                      </div>
                    </ContentBlock>
                  )}

                  {/* 7. Testing, Verification & Load Evidence */}
                  {(content.testingAndOps?.length > 0 || content.evidence) && (
                    <ContentBlock index="07" title="Testing, Verification & Operations">
                      {content.testingAndOps && content.testingAndOps.length > 0 && (
                        <ul
                          className="space-y-2.5 pl-5 mb-6"
                          style={{ fontFamily: 'var(--font-sans)', fontSize: '15.5px', lineHeight: 1.7, color: 'var(--ink-2)', listStyleType: 'square' }}
                        >
                          {content.testingAndOps.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      )}

                      {content.evidence && (
                        <div className="p-6 sm:p-8 space-y-5" style={{ background: 'var(--paper-2)', border: '1px solid var(--wire)' }}>
                          <div
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-5"
                            style={{ borderBottom: '1px solid var(--wire)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}
                          >
                            <MetaField label="Verification Suite" value={content.evidence.tool} />
                            <MetaField label="Measured Performance" value={content.evidence.rps} />
                            <MetaField label="Test Environment" value={content.evidence.environment} />
                          </div>
                          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', lineHeight: 1.7, color: 'var(--ink-2)', overflowWrap: 'anywhere' }}>
                            {content.evidence.details}
                          </p>
                        </div>
                      )}
                    </ContentBlock>
                  )}

                  {/* 8. Verified Outcomes & Honest Limitations */}
                  <ContentBlock index="08" title="Verified Outcomes & Honest Limitations">
                    {content.outcomes && content.outcomes.length > 0 && (
                      <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        {content.outcomes.map((outcome, i) => (
                          <div key={i} className="p-4" style={{ background: 'var(--paper-2)', border: '1px solid var(--wire)' }}>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--signal)', fontWeight: 700, marginBottom: '4px' }}>
                              VERIFIED OUTCOME 0{i + 1}
                            </div>
                            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14.5px', lineHeight: 1.55, color: 'var(--ink)' }}>
                              {outcome}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {content.limitations && (
                      <div className="p-5" style={{ background: 'var(--paper-2)', border: '1px solid var(--wire)' }}>
                        <div className="type-label mb-2">Limitations &amp; Architectural Hindsight</div>
                        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', lineHeight: 1.68, color: 'var(--ink-2)' }}>
                          {content.limitations}
                        </p>
                      </div>
                    )}
                  </ContentBlock>

                  {/* Interactive Demo Banner */}
                  {content.interactiveDemo && (
                    <div
                      className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                      style={{ background: 'var(--paper-2)', border: '1px solid var(--wire-strong)', borderLeft: '4px solid var(--signal)' }}
                    >
                      <div className="space-y-1.5 max-w-xl">
                        <div className="type-label" style={{ color: 'var(--signal)', fontWeight: 700 }}>
                          Interactive Engineering Proof
                        </div>
                        <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '19px', color: 'var(--ink)' }}>
                          {content.interactiveDemo.title}
                        </h3>
                        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14.5px', lineHeight: 1.6, color: 'var(--ink-2)' }}>
                          {content.interactiveDemo.description}
                        </p>
                      </div>
                      <Link href={content.interactiveDemo.href} className="btn-primary flex-shrink-0">
                        {content.interactiveDemo.ctaLabel}
                      </Link>
                    </div>
                  )}
                </>
              ) : null}

              {/* Next Case Study & Contact Footer CTA */}
              <div
                className="p-8 sm:p-10 space-y-6"
                style={{ background: 'var(--paper-2)', border: '1px solid var(--wire)' }}
              >
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6" style={{ borderBottom: '1px solid var(--wire)' }}>
                  <div>
                    <div className="type-label mb-1">Next Case Study</div>
                    <Link
                      href={`/case-studies/${nextProject.id}`}
                      style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '22px', color: 'var(--ink)' }}
                      className="hover:text-[var(--signal)] transition-colors"
                    >
                      {nextProject.title} ({nextProject.category}) →
                    </Link>
                  </div>
                  <Link href="/case-studies" className="btn-secondary">
                    All 5 case studies
                  </Link>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '24px', letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: '6px' }}>
                      Hiring for systems like {project.title}?
                    </h2>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.6, maxWidth: '48ch' }}>
                      Let&apos;s discuss how I can contribute to your engineering team or product architecture.
                    </p>
                  </div>
                  <Link href="/#contact" className="btn-primary flex-shrink-0">
                    Work together →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function SidePanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ border: '1px solid var(--wire)', background: 'var(--paper-2)' }}>
      <div className="px-6 py-3.5" style={{ borderBottom: '1px solid var(--wire)' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
          {title}
        </span>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

function ContentBlock({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-5">
      <div className="flex items-baseline gap-3 pb-3" style={{ borderBottom: '1px solid var(--wire)' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--signal)', letterSpacing: '0.08em' }}>
          {index}
        </span>
        <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(22px, 2.5vw, 30px)', letterSpacing: '-0.02em', color: 'var(--ink)' }}>
          {title}
        </h2>
      </div>
      {children}
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10.5px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--ink-3)',
          display: 'block',
          marginBottom: '4px',
        }}
      >
        {label}
      </span>
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--ink)' }}>{value}</span>
    </div>
  )
}

function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10.5px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--ink-3)',
          display: 'block',
          marginBottom: '4px',
        }}
      >
        {label}
      </span>
      <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px', color: 'var(--ink)' }}>{value}</span>
    </div>
  )
}
