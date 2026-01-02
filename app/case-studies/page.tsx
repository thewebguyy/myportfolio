import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { projects } from '@/lib/projects'
import { ArrowRightIcon, ClockIcon, CodeBracketIcon } from '@heroicons/react/24/outline'

/**
 * Case Studies Listing Page
 * Displays all portfolio projects with filtering and sorting
 */
export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'In-depth technical breakdowns of projects built by Olabode Olusegun, including architecture decisions, challenges, and measurable outcomes.',
}

export default function CaseStudiesPage() {
  // Sort projects by year (newest first) and featured status
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return b.year - a.year
  })

  return (
    <main className="min-h-screen bg-gray-950">
      {/* Header */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-primary 
                     transition-colors mb-8"
          >
            ← Back to Home
          </Link>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Case <span className="gradient-text">Studies</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl">
            Deep technical dives into real-world projects. Each case study includes architecture 
            diagrams, challenges faced, solutions implemented, and measurable outcomes.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-8">
            <div>
              <div className="text-3xl font-bold text-primary">{projects.length}</div>
              <div className="text-sm text-gray-500">Total Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">
                {projects.filter(p => p.featured).length}
              </div>
              <div className="text-sm text-gray-500">Featured</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">5+</div>
              <div className="text-sm text-gray-500">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

/**
 * Project Card Component
 */
function ProjectCard({ project, index }: { project: any; index: number }) {
  return (
    <article className="group glass rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300">
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-gray-900">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {project.featured && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-black text-xs font-semibold rounded-full">
            FEATURED
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
            {project.category}
          </span>
          <span className="text-gray-500 text-xs">{project.year}</span>
        </div>

        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        <p className="text-gray-400 mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Metrics Preview */}
        {project.metrics && (
          <div className="flex flex-wrap gap-3 mb-4 pb-4 border-b border-gray-800">
            {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
              <div key={key} className="text-sm">
                <span className="text-primary font-semibold">{value as string}</span>
                <span className="text-gray-500 ml-1">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 4).map((tech: string) => (
            <span
              key={tech}
              className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded">
              +{project.tech.length - 4} more
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          <Link
            href={`/case-studies/${project.id}`}
            className="flex-1 btn btn-primary text-sm text-center group/btn"
          >
            Read Case Study
            <ArrowRightIcon className="w-4 h-4 ml-2 inline-block group-hover/btn:translate-x-1 transition-transform" />
          </Link>
          {project.liveUrl && (
            
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg 
                       transition-colors text-sm font-semibold"
            >
              Demo
            </a>
          )}
        </div>
      </div>
    </article>
  )
}