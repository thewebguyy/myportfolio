'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { projects, Project } from '@/lib/projects'
import { flagshipCaseStudies } from '@/lib/case-studies'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

/**
 * Case Studies Section
 * Showcases in-depth project narratives and strategic audits
 */
export function CaseStudies() {
  return (
    <section id="case-studies" className="section bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-black uppercase tracking-[0.3em]">
            Strategic Narratives
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Enterprise <span className="gradient-text">Audits & Strategy</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-serif italic">
            Detailed breakdowns of operational audits, risk mitigation strategies, and 
            measurable ROI delivered for global organizations.
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* Show flagship case studies first */}
          {flagshipCaseStudies.map((study, index) => (
            <FlagshipStudyCard key={study.id} study={study} index={index} />
          ))}
          
          <div className="pt-16 border-t border-gray-800">
            <h3 className="text-2xl font-bold mb-12 text-center text-gray-500 uppercase tracking-widest">Technical Implementation Archive</h3>
            {projects.slice(0, 2).map((project, index) => (
              <CaseStudyCard key={project.id} project={project} index={index + 3} />
            ))}
          </div>
        </div>

        {/* CTA to full case studies page */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link href="/case-studies" className="btn btn-primary inline-flex items-center gap-2">
            View All Audits & Projects
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function FlagshipStudyCard({ study, index }: { study: any; index: number }) {
  const isEven = index % 2 === 0

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass rounded-3xl overflow-hidden border-primary/20 group hover:border-primary/40 transition-all"
    >
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
        <div className="lg:w-2/5 bg-gray-950 p-8 lg:p-12 flex flex-col justify-center border-r border-gray-800">
          <span className="text-primary text-[10px] font-black uppercase tracking-widest mb-4">{study.category} Audit</span>
          <h3 className="text-3xl font-bold text-white mb-6">{study.title}</h3>
          <div className="space-y-4">
             {study.metrics.map((m: any, i: number) => (
               <div key={i} className="flex justify-between items-end border-b border-gray-800 pb-2">
                 <span className="text-[10px] text-gray-500 uppercase font-black">{m.label}</span>
                 <span className="text-xl font-bold text-primary">{m.value}</span>
               </div>
             ))}
          </div>
        </div>
        <div className="lg:w-3/5 p-8 lg:p-12 bg-secondary/50">
           <div className="mb-6">
             <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Context & Problem</h4>
             <p className="text-gray-300 font-serif italic text-lg leading-relaxed">{study.context}</p>
           </div>
           <div className="grid md:grid-cols-2 gap-8 mb-8">
             <div>
               <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Strategic Findings</h4>
               <ul className="space-y-2">
                 {study.analysis.map((a: any, i: number) => (
                   <li key={i} className="text-xs text-gray-400 flex gap-2">
                     <span className="text-primary font-bold">»</span>
                     {a.finding}
                   </li>
                 ))}
               </ul>
             </div>
             <div>
               <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Recommendations</h4>
               <ul className="space-y-2">
                 {study.recommendations.map((r: any, i: number) => (
                   <li key={i} className="text-xs text-gray-400 flex gap-2">
                     <span className="text-green-500 font-bold">✓</span>
                     {r.title}
                   </li>
                 ))}
               </ul>
             </div>
           </div>
           <Link href={`/case-studies/${study.id}`} className="inline-flex items-center gap-2 text-primary text-xs font-black uppercase tracking-widest group">
             Read Full Strategic Analysis 
             <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>
      </div>
    </motion.article>
  )
}

function CaseStudyCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center gap-8 py-8 border-b border-gray-800 last:border-0 group"
    >
      <div className="hidden md:block w-32 h-32 relative flex-shrink-0 rounded-xl overflow-hidden">
        <Image src={project.image} alt={project.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{project.title}</h4>
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{project.year}</span>
        </div>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 4).map(t => (
            <span key={t} className="text-[10px] bg-gray-900 px-2 py-0.5 rounded text-gray-500">{t}</span>
          ))}
        </div>
      </div>
      <Link href={`/case-studies/${project.id}`} className="p-3 rounded-full bg-gray-900 border border-gray-800 text-gray-400 hover:text-primary transition-all">
        <ArrowRightIcon className="w-5 h-5" />
      </Link>
    </motion.article>
  )
}