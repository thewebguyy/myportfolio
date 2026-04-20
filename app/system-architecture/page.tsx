'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeftIcon, ServerStackIcon, CpuChipIcon, ShieldCheckIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import { DataPanel } from '@/app/components/ui/ConsultingUI'

export default function SystemArchitecturePage() {
  return (
    <main className="min-h-screen bg-secondary selection:bg-primary/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/80 backdrop-blur-md border-b border-gray-900 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-gray-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <ArrowLeftIcon className="w-4 h-4" />
            Exit to Dashboard
          </Link>
          <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">System Design Spec v2.0</div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Header */}
          <div className="max-w-3xl space-y-6">
            <span className="text-primary text-sm font-black uppercase tracking-[0.4em]">Infrastructure</span>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">System <span className="gradient-text">Architecture</span></h1>
            <p className="text-xl text-gray-400 font-serif italic leading-relaxed">
              A high-availability, multi-tenant AI decision system designed for 
              global scale, request isolation, and graceful degradation.
            </p>
          </div>

          {/* Architecture Diagram (Simplified Code-like representation) */}
          <DataPanel title="Global Request Lifecycle">
            <div className="grid md:grid-cols-4 gap-4 py-12">
              <ArchNode icon={GlobeAltIcon} label="Edge" sub="User Action" />
              <div className="flex items-center justify-center text-gray-700 hidden md:flex">→</div>
              <ArchNode icon={ShieldCheckIcon} label="WAF & Rate Limit" sub="Upstash Redis" />
              <div className="flex items-center justify-center text-gray-700 hidden md:flex">→</div>
              <ArchNode icon={CpuChipIcon} label="AI Orchestrator" sub="Reasoning Pipeline" />
              <div className="flex items-center justify-center text-gray-700 hidden md:flex">→</div>
              <ArchNode icon={ServerStackIcon} label="Persistence" sub="System Audit Log" />
            </div>
          </DataPanel>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Rate Limiting Logic */}
            <div className="space-y-6">
              <h3 className="text-sm font-black text-white uppercase tracking-widest">Request Isolation & Rate Limiting</h3>
              <div className="p-8 bg-gray-950 rounded-3xl border border-gray-900 space-y-6">
                <p className="text-sm text-gray-400 leading-relaxed font-serif italic">
                  To handle 10,000+ concurrent users, the system employs a tiered token-bucket algorithm 
                  implemented via Upstash Redis. This ensures request isolation and prevents noisy-neighbor 
                  scenarios in a serverless environment.
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                    <span className="text-[10px] text-gray-500 uppercase font-black">Anonymous Tier</span>
                    <span className="text-xs text-white font-mono">5 req/hr</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                    <span className="text-[10px] text-gray-500 uppercase font-black">Enterprise Tier</span>
                    <span className="text-xs text-primary font-mono">Unlimited</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Orchestration Flow */}
            <div className="space-y-6">
              <h3 className="text-sm font-black text-white uppercase tracking-widest">AI Orchestration Flow</h3>
              <div className="p-8 bg-gray-950 rounded-3xl border border-gray-900 space-y-6">
                <p className="text-sm text-gray-400 leading-relaxed font-serif italic">
                  Unlike basic API wrappers, this system uses a multi-step reasoning pipeline. 
                  Every input undergoes classification, constraint checking, and semantic 
                  normalization before reaching the generation stage.
                </p>
                <div className="flex flex-col gap-3">
                  {['Input Normalization', 'Semantic Classification', 'Risk Modeling', 'Strategic Synthesis'].map((step, i) => (
                    <div key={i} className="flex gap-4 items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-xs text-white font-bold">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Resilience & Error Handling */}
          <div className="space-y-6">
            <h3 className="text-sm font-black text-white uppercase tracking-widest">Resilience & Graceful Degradation</h3>
            <div className="grid md:grid-cols-3 gap-6">
               <ResilienceBlock 
                  title="Circuit Breakers" 
                  desc="Automated failover to static response templates if OpenAI latency exceeds 10s."
               />
               <ResilienceBlock 
                  title="Request Queuing" 
                  desc="Simulation of async processing for heavy analytical tasks to prevent timeout."
               />
               <ResilienceBlock 
                  title="Data Persistence" 
                  desc="Local caching and report hashing to minimize redundant LLM computations."
               />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 border-t border-gray-900">
        <div className="max-w-7xl mx-auto text-center space-y-6">
           <h2 className="text-2xl font-bold text-white uppercase tracking-widest">Production-Ready Reasoning</h2>
           <p className="text-gray-500 max-w-xl mx-auto italic">This architecture is not just a demo; it represents the design patterns used in enterprise-scale AI systems.</p>
           <div className="pt-4">
             <Link href="/#contact" className="btn btn-primary px-12">Discuss System Scaling</Link>
           </div>
        </div>
      </section>
    </main>
  )
}

function ArchNode({ icon: Icon, label, sub }: { icon: any, label: string, sub: string }) {
  return (
    <div className="text-center space-y-3 p-6 bg-gray-900 rounded-2xl border border-gray-800">
      <Icon className="w-8 h-8 text-primary mx-auto" />
      <div>
        <div className="text-xs font-black text-white uppercase tracking-widest">{label}</div>
        <div className="text-[10px] text-gray-500 uppercase font-black">{sub}</div>
      </div>
    </div>
  )
}

function ResilienceBlock({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="p-6 bg-secondary border border-gray-800 rounded-2xl">
      <h4 className="text-xs font-black text-primary uppercase tracking-widest mb-2">{title}</h4>
      <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
    </div>
  )
}
