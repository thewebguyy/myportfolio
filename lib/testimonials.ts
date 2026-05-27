/**
 * Testimonials Data
 * Client recommendations and feedback for social proof
 */

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  image?: string
  content: string
  rating: number
  date: string
  projectRelated?: string
  linkedinUrl?: string
  verified: boolean
}

// Add real testimonials here when you have them.
// Each entry should have a verifiable LinkedIn URL and be from a real person.
export const testimonials: Testimonial[] = []

/**
 * Get testimonial by ID
 */
export function getTestimonialById(id: string): Testimonial | undefined {
  return testimonials.find(t => t.id === id)
}

/**
 * Get testimonials by rating
 */
export function getTestimonialsByRating(minRating: number): Testimonial[] {
  return testimonials.filter(t => t.rating >= minRating)
}

/**
 * Get testimonials for a specific project
 */
export function getTestimonialsByProject(projectId: string): Testimonial[] {
  return testimonials.filter(t =>
    t.projectRelated?.toLowerCase().includes(projectId.toLowerCase())
  )
}