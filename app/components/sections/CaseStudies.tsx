'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/lib/projects'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

/**
 * Case Studies Section
 * Showcases in-depth project narratives with STAR method
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
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Recent Highlights
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Deep-Dive <span className="gradient-text">Case Studies</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore detailed breakdowns of how I've solved complex technical challenges,
            including architecture decisions, performance optimizations, and measurable outcomes
          </p>
        </motion.div>

        <div className="space-y-12">
          {projects.slice(0, 3).map((project, index) => (
            <CaseStudyCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* CTA to full case studies page */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link href="/case-studies" className="btn btn-primary inline-flex items-center gap-2">
            View All Case Studies
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

/**
 * Case Study Card Component
 * Individual project card with preview and metrics
 */
function CaseStudyCard({ project, index }: { project: any; index: number }) {
  const isEven = index % 2 === 0

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 group"
    >
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8`}>
        {/* Image */}
        <div className="lg:w-1/2 relative h-64 lg:h-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Content */}
        <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <div className="inline-block">
            <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full">
              {project.category}
            </span>
          </div>

          <h3 className="text-3xl font-bold mt-4 mb-4 text-white group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          <p className="text-gray-400 mb-6 leading-relaxed">
            {project.longDescription}
          </p>

          {/* Metrics */}
          {project.metrics && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              {Object.entries(project.metrics).map(([key, value]) => (
                <div key={key} className="border-l-2 border-primary pl-4">
                  <div className="text-2xl font-bold text-primary">{value}</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech: string) => (
              <span
                key={tech}
                className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-lg"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4">
            <Link
              href={`/case-studies/${project.id}`}
              className="btn btn-primary text-sm group/btn"
            >
              Read Case Study
              <ArrowRightIcon className="w-4 h-4 ml-2 inline-block group-hover/btn:translate-x-1 transition-transform" />
            </Link>
            {project.liveUrl && (
              
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary text-sm"
              >
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}