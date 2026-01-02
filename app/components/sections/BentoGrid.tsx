'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { projects, getFeaturedProjects } from '@/lib/projects'
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore my latest work in distributed systems, AI integration, and high-performance web applications
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
              <div className="h-full glass rounded-2xl p-8 overflow-hidden relative 
                            hover:border-primary/50 transition-all duration-300 cursor-pointer">
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full mb-4">
                    FEATURED
                  </span>
                  <h3 className="text-3xl font-bold mb-3 text-white">ServiceBridge</h3>
                  <p className="text-gray-400 mb-4 text-lg">
                    Real-time marketplace connecting 10,000+ service providers with customers
                  </p>
                  
                  {/* Metrics */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    <MetricBadge label="10K+ Users" />
                    <MetricBadge label="99.9% Uptime" />
                    <MetricBadge label="40% Faster" />
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Node.js', 'WebSockets', 'Redis'].map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Arrow icon */}
                <ArrowTopRightOnSquareIcon className="absolute top-8 right-8 w-6 h-6 text-primary 
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
            className="md:col-span-2 glass rounded-2xl p-6"
          >
            <h4 className="text-lg font-semibold mb-4 text-white">Core Stack</h4>
            <div className="flex flex-wrap gap-2">
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis'].map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-lg 
                           hover:bg-primary/20 hover:text-primary transition-colors cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Currently Learning Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 glass rounded-2xl p-6 border-secondary/30"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <h4 className="text-lg font-semibold text-white">Currently Exploring</h4>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Edge Computing, AI Agents, WebAssembly, and Green Coding practices for sustainable software
            </p>
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
function ProjectCard({ project, delay }: { project: any; delay: number }) {
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