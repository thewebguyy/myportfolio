'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Project } from '@/lib/projects'
import { ProjectCard } from './ProjectCard'

export function CaseStudiesClient({ sortedProjects, totalProjects, featuredCount }: {
    sortedProjects: Project[],
    totalProjects: number,
    featuredCount: number
}) {
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
                            <div className="text-3xl font-bold text-primary">{totalProjects}</div>
                            <div className="text-sm text-gray-500">Total Projects</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-primary">
                                {featuredCount}
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
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {sortedProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                            >
                                <ProjectCard project={project} index={index} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </main>
    )
}
