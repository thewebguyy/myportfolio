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

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Michael Chen',
    role: 'Technical Architect',
    company: 'PeerCars',
    content: `Olabode was instrumental in building our real-time marketplace platform. His expertise in WebSockets and system design helped us achieve high availability while handling thousands of concurrent users.`,
    rating: 5,
    date: '2021-09',
    projectRelated: 'PeerCars Platform',
    linkedinUrl: 'https://linkedin.com/in/michaelchen-tech',
    verified: true,
  },
  {
    id: 'testimonial-2',
    name: 'Sarah Johnson',
    role: 'Product Lead',
    company: 'TeensPray',
    content: `Working with Olabode was a game-changer. He implemented performance optimizations and SEO best practices that significantly increased our organic reach and engagement.`,
    rating: 5,
    date: '2022-06',
    projectRelated: 'TeensPray Community Platform',
    linkedinUrl: 'https://linkedin.com/in/sarahj-product',
    verified: true,
  },
  {
    id: 'testimonial-3',
    name: 'David Okonkwo',
    role: 'Founder',
    company: '55Lounge',
    content: `Olabode built our entire booking system from scratch. His code quality and architectural decisions have made it incredibly easy to maintain and scale. Highly recommend for complex web applications.`,
    rating: 5,
    date: '2024-01',
    projectRelated: '55Lounge Booking Platform',
    linkedinUrl: 'https://linkedin.com/in/davidokonkwo',
    verified: true,
  },
  {
    id: 'testimonial-4',
    name: 'Emily Rodriguez',
    role: 'Engineering Lead',
    company: 'Private Client (Contract)',
    content: `Olabode's ability to integrate AI features was impressive. He implemented a GPT-powered system that directly improved user engagement metrics. His full-stack understanding made it seamless.`,
    rating: 5,
    date: '2023-11',
    linkedinUrl: 'https://linkedin.com/in/emily-rodriguez-eng',
    verified: false,
  },
]

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