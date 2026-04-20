'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeftIcon, ServerStackIcon, CpuChipIcon, ShieldCheckIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import { ArchitecturePanel } from '@/app/components/ui/EngineeringUI'

export default function SystemArchitecturePage() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-surface-2 px-6 py-4">
        <div className="max-w-[1280px] mx-auto flex justify-between items-center">
          <Link href="/" className="text-text-muted hover:text-white transition-all text-[10px] font-mono uppercase tracking-widest flex items-center gap-2">
            <ArrowLeftIcon className="w-4 h-4" />
            Return to portfolio
          </Link>
          <div className="text-[10px] font-mono text-primary uppercase tracking-[0.3em]">System Design Spec v2.0</div>
        </div>
      </nav>

      <section className="pt-40 pb-24 px-6">
        <div className="max-w-[1280px] mx-auto space-y-24">
          {/* Header */}
          <div className="max-w-[800px] space-y-6">
            <span className="label">Infrastructure</span>
            <h1 className="display text-white">System Architecture</h1>
            <p className="font-serif italic text-[24px] text-text-secondary leading-relaxed">
              A high-availability, multi-tenant AI decision system designed for 
              global scale, request isolation, and graceful degradation.
            </p>
          </div>

          {/* Architecture Diagram */}
          <ArchitecturePanel title="Global Request Lifecycle">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-8">
              <ArchNode icon={GlobeAltIcon} label="Edge" sub="User Action" />
              <div className="flex items-center justify-center text-surface-2 hidden md:flex">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <ArchNode icon={ShieldCheckIcon} label="WAF & Rate Limit" sub="Upstash Redis" />
              <div className="flex items-center justify-center text-surface-2 hidden md:flex">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <ArchNode icon={CpuChipIcon} label="AI Orchestrator" sub="Reasoning Pipeline" />
              <div className="flex items-center justify-center text-surface-2 hidden md:flex">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <ArchNode icon={ServerStackIcon} label="Persistence" sub="System Audit Log" />
            </div>
          </ArchitecturePanel>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Rate Limiting Logic */}
            <div className="space-y-8">
              <h3 className="font-mono text-[11px] text-text-muted uppercase tracking-widest border-l-2 border-primary pl-4">Request Isolation</h3>
              <div className="p-10 bg-surface rounded-[12px] border border-surface-2 space-y-8">
                <p className="body">
                  To handle 10,000+ concurrent users, the system employs a tiered token-bucket algorithm 
                  implemented via Upstash Redis. This ensures request isolation and prevents noisy-neighbor 
                  scenarios in a serverless environment.
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-surface-2 pb-4">
                    <span className="font-mono text-[10px] text-text-muted uppercase">Anonymous Tier</span>
                    <span className="font-mono text-[13px] text-white">5 req/hr</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-surface-2 pb-4">
                    <span className="font-mono text-[10px] text-text-muted uppercase">Production Tier</span>
                    <span className="font-mono text-[13px] text-secondary">Unlimited</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Orchestration Flow */}
            <div className="space-y-8">
              <h3 className="font-mono text-[11px] text-text-muted uppercase tracking-widest border-l-2 border-primary pl-4">AI Orchestration</h3>
              <div className="p-10 bg-surface rounded-[12px] border border-surface-2 space-y-8">
                <p className="body">
                  Unlike basic API wrappers, this system uses a multi-step reasoning pipeline. 
                  Every input undergoes classification, constraint checking, and semantic 
                  normalization before reaching the generation stage.
                </p>
                <div className="flex flex-col gap-4">
                  {['Input Normalization', 'Semantic Classification', 'Risk Modeling', 'Technical Synthesis'].map((step, i) => (
                    <div key={i} className="flex gap-4 items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      <span className="font-sans font-medium text-[15px] text-white">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Resilience & Error Handling */}
          <div className="space-y-8">
            <h3 className="font-mono text-[11px] text-text-muted uppercase tracking-widest border-l-2 border-primary pl-4">Graceful Degradation</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <ResilienceBlock 
                  title="Circuit Breakers" 
                  desc="Automated failover to static response templates if LLM latency exceeds 10s."
               />
               <ResilienceBlock 
                  title="Request Queuing" 
                  desc="Simulation of async processing for heavy analytical tasks to prevent timeout."
               />
               <ResilienceBlock 
                  title="Data Persistence" 
                  desc="Local caching and report hashing to minimize redundant API computations."
               />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 border-t border-surface-2 bg-surface">
        <div className="max-w-[1280px] mx-auto text-center space-y-8">
           <h2 className="text-[32px] font-semibold text-white">Production-Ready Reasoning</h2>
           <p className="body max-w-[600px] mx-auto">This architecture represents the design patterns used in enterprise-scale AI systems, optimized for reliability and cost-efficiency.</p>
           <div className="pt-4">
             <Link href="/#contact" className="btn-primary">Discuss System Scaling</Link>
           </div>
        </div>
      </section>
    </main>
  )
}

function ArchNode({ icon: Icon, label, sub }: { icon: React.ElementType, label: string, sub: string }) {
  return (
    <div className="text-center space-y-4 p-8 bg-background border border-surface-2 rounded-[12px] group hover:border-primary/30 transition-colors">
      <Icon className="w-8 h-8 text-primary mx-auto" />
      <div>
        <div className="font-sans font-semibold text-[14px] text-white uppercase tracking-wider mb-1">{label}</div>
        <div className="font-mono text-[10px] text-text-muted uppercase">{sub}</div>
      </div>
    </div>
  )
}

function ResilienceBlock({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="p-8 bg-surface border border-surface-2 rounded-[12px] hover:border-secondary/30 transition-colors">
      <h4 className="font-mono text-[10px] text-secondary uppercase tracking-widest mb-3">{title}</h4>
      <p className="text-[14px] text-text-secondary leading-relaxed">{desc}</p>
    </div>
  )
}

