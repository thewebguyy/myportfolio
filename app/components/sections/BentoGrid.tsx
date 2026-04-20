'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { getFeaturedProjects, type Project } from '@/lib/projects'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

/**
 * Bento Grid Component
 * Modern card-based layout showcasing featured projects
 * Responsive grid with varying card sizes
 */
export function BentoGrid() {
  const featuredProjects = getFeaturedProjects()

  return (
    <section id="bento" className="section bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-black uppercase tracking-[0.4em] mb-4 block">Strategic Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Engagements</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-serif italic">
            High-impact solutions spanning operational strategy, risk mitigation, and enterprise-grade architecture.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[240px]">
          {/* Large featured project - ServiceBridge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-4 md:row-span-2 group"
          >
            <Link href="/case-studies/servicebridge">
              <div className="h-full glass rounded-3xl p-10 overflow-hidden relative 
                            hover:border-primary/50 transition-all duration-500 cursor-pointer border-primary/10">
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest rounded mb-6">
                    HIGH-SCALE INFRASTRUCTURE
                  </span>
                  <h3 className="text-4xl font-bold mb-4 text-white">ServiceBridge</h3>
                  <p className="text-gray-400 mb-6 text-xl font-serif italic leading-relaxed max-w-2xl">
                    Real-time marketplace infrastructure optimized for 10,000+ concurrent providers, 
                    driving regional operational efficiency.
                  </p>

                  {/* Metrics */}
                  <div className="flex flex-wrap gap-4 mb-8">
                    <MetricBadge label="10K+ Users" />
                    <MetricBadge label="99.9% Uptime" />
                    <MetricBadge label="40% Efficiency Increase" />
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {['Enterprise Node.js', 'Distributed Redis', 'Real-time WebSockets'].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-900 text-gray-500 text-[10px] font-black uppercase tracking-tighter rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow icon */}
                <ArrowTopRightOnSquareIcon className="absolute top-10 right-10 w-6 h-6 text-primary 
                                                      opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          </motion.div>

          {/* Tech Stack Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 glass rounded-3xl p-8 border-primary/5"
          >
            <h4 className="text-xs font-black mb-6 text-gray-500 uppercase tracking-widest">Strategic Competencies</h4>
            <div className="flex flex-wrap gap-2">
              {['System Audit', 'Risk Mitigation', 'ROI Modeling', 'AI Strategy', 'Enterprise Architecture'].map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1 bg-gray-900 text-gray-400 text-[10px] font-black uppercase tracking-tighter rounded 
                           hover:bg-primary/20 hover:text-primary transition-colors cursor-default border border-gray-800"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Team Collaboration Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 glass rounded-3xl p-8 border-primary/10"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              <h4 className="text-xs font-black text-white uppercase tracking-widest">Engineering Leadership</h4>
            </div>
            <p className="text-gray-400 text-sm font-serif italic leading-relaxed mb-6">
              Leading cross-functional teams in high-stakes environments, ensuring alignment between 
              technical execution and business objectives.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Big 4 Experience', 'Agile Delivery', 'Risk Mapping'].map((tag) => (
                <span key={tag} className="text-[9px] font-black uppercase bg-white/5 border border-white/10 px-2 py-0.5 rounded text-gray-500">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Additional Projects */}
          {featuredProjects.slice(1, 4).map((project, index) => (
            <ProjectCard key={project.id} project={project} delay={0.3 + index * 0.1} />
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-light 
                     font-semibold transition-colors group"
          >
            View All Case Studies
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

/**
 * Project Card Component
 * Smaller cards for additional projects in the grid
 */
function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="md:col-span-2 group"
    >
      <Link href={`/case-studies/${project.id}`}>
        <div className="h-full glass rounded-2xl p-6 hover:border-primary/50 
                      transition-all duration-300 cursor-pointer">
          <h4 className="text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors">
            {project.title}
          </h4>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 3).map((tech: string) => (
              <span
                key={tech}
                className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

/**
 * Metric Badge Component
 * Small badge displaying a metric
 */
function MetricBadge({ label }: { label: string }) {
  return (
    <div className="px-3 py-1 bg-gray-800/80 border border-primary/30 rounded-lg">
      <span className="text-primary font-semibold text-sm">{label}</span>
    </div>
  )
}