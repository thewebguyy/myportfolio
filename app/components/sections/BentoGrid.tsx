'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { projects, type Project } from '@/lib/projects'

export function BentoGrid() {
  // Map projects to their specific slots
  const serviceBridge = projects.find(p => p.id === 'servicebridge')
  const lounge55 = projects.find(p => p.id === '55lounge')
  const subManager = projects.find(p => p.id === 'subscription-manager')
  const checkoutSystem = projects.find(p => p.id === 'checkout-system')
  const laverita = projects.find(p => p.id === 'laverita-hair')

  return (
    <section id="work" className="section-padding bg-background">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="label mb-4 block"
          >
            Selected work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="h2 text-white mb-4"
          >
            What I&apos;ve built
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="body max-w-[600px]"
          >
            Production systems, real users, real outcomes.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 lg:gap-3">
          {/* Hero Project: ServiceBridge */}
          {serviceBridge && (
            <div className="md:col-span-8 md:row-span-2">
              <BentoCard 
                project={serviceBridge} 
                isHero 
                className="h-full"
              />
            </div>
          )}

          {/* Secondary 1: 55Lounge */}
          {lounge55 && (
            <div className="md:col-span-4">
              <BentoCard project={lounge55} />
            </div>
          )}

          {/* Secondary 2: Subscription Manager */}
          {subManager && (
            <div className="md:col-span-4">
              <BentoCard project={subManager} />
            </div>
          )}

          {/* Wide Project: E-commerce (Placeholder or wide version of another) */}
          <div className="md:col-span-8">
            <BentoCard 
              project={{
                ...checkoutSystem!,
                title: "Scalable Checkout Infrastructure",
                description: "High-throughput payment processing engine with idempotent transaction handling and multi-gateway fallbacks."
              } as unknown} 
              isWide 
            />
          </div>

          {/* Bottom Project 1: Checkout System */}
          {checkoutSystem && (
            <div className="md:col-span-4">
              <BentoCard project={checkoutSystem} />
            </div>
          )}
          
          {/* Bottom Project 2: LaVerita or other */}
          {laverita && (
            <div className="md:col-span-4 md:col-start-9">
              <BentoCard project={laverita} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function BentoCard({ project, isHero, isWide, className = "" }: { project: Project, isHero?: boolean, isWide?: boolean, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative bg-surface border border-surface-2 rounded-[12px] p-8 overflow-hidden transition-all duration-300 hover:border-primary/30 hover:scale-[1.01] ${className}`}
    >
      {/* Architecture Diagram Background for Hero */}
      {isHero && (
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none p-12 overflow-hidden">
          <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
            <rect x="150" y="50" width="100" height="40" rx="4" stroke="currentColor" strokeWidth="2" />
            <rect x="50" y="150" width="80" height="40" rx="4" stroke="currentColor" strokeWidth="2" />
            <rect x="270" y="150" width="80" height="40" rx="4" stroke="currentColor" strokeWidth="2" />
            <rect x="150" y="250" width="100" height="40" rx="4" stroke="currentColor" strokeWidth="2" />
            <path d="M200 90V150M200 190V250M130 170H270" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          </svg>
        </div>
      )}

      <div className="relative z-10 h-full flex flex-col">
        {/* Category */}
        <span className="font-mono text-[10px] uppercase text-secondary tracking-[0.1em]">
          {project.category}
        </span>

        {/* Title */}
        <h3 className="font-sans font-semibold text-[24px] text-white mt-2 mb-2">
          {project.title}
        </h3>

        {/* Description */}
        <p className={`text-[15px] text-text-secondary leading-[1.6] mb-6 ${isHero ? 'line-clamp-4 max-w-[500px]' : 'line-clamp-2'}`}>
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-auto">
          {project.tech.slice(0, isHero ? 5 : 3).map((t: string) => (
            <span key={t} className="pill-tag">{t}</span>
          ))}
        </div>

        {/* Metrics & Links */}
        <div className="mt-8 flex items-end justify-between">
          <div className="flex gap-4">
            {project.metrics && Object.entries(project.metrics).slice(0, isHero ? 2 : 1).map(([key, val]) => (
              <div key={key} className="flex flex-col">
                <span className="font-mono text-[10px] text-text-muted uppercase">{key}</span>
                <span className="text-[13px] text-primary">{val as string}</span>
              </div>
            ))}
          </div>

          {isHero ? (
            <Link href={`/#case-studies`} className="text-[13px] text-primary font-medium hover:underline">
              Read case study →
            </Link>
          ) : (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 15L15 5M15 5H7.5M15 5V12.5" stroke="#eabe7c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}