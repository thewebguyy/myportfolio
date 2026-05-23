import React from 'react'
import { Metadata } from 'next'
import { projects } from '@/lib/projects'
import { CaseStudiesClient } from './CaseStudiesClient'

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
    <CaseStudiesClient
      sortedProjects={sortedProjects}
    />
  )
}