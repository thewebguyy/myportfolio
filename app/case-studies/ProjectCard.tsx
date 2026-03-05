'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { Project } from '@/lib/projects'

export function ProjectCard({ project, index: _index }: { project: Project; index: number }) {
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
                                <span className="text-primary font-semibold">{value || ''}</span>
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
                        <a
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
