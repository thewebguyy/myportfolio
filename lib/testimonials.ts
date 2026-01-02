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
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Michael Chen',
    role: 'CTO',
    company: 'PeerCars',
    content: `Olabode was instrumental in building our real-time marketplace platform. His expertise 
    in WebSockets and system design helped us achieve 99.9% uptime while handling thousands of 
    concurrent users. His attention to performance optimization reduced our server costs by 40%.`,
    rating: 5,
    date: '2021-09',
    projectRelated: 'PeerCars Platform',
  },
  {
    id: 'testimonial-2',
    name: 'Sarah Johnson',
    role: 'Product Manager',
    company: 'TeensPray',
    content: `Working with Olabode was a game-changer for our project. He not only delivered a 
    beautiful, responsive website but also implemented SEO best practices that tripled our organic 
    traffic within 3 months. His technical knowledge and communication skills are exceptional.`,
    rating: 5,
    date: '2022-06',
    projectRelated: 'TeensPray Community Platform',
  },
  {
    id: 'testimonial-3',
    name: 'David Okonkwo',
    role: 'Founder',
    company: '55Lounge',
    content: `Olabode built our entire booking system from scratch, including payment integration 
    and real-time availability tracking. His code quality and architectural decisions have made 
    it incredibly easy to maintain and scale. Highly recommend for complex web applications.`,
    rating: 5,
    date: '2024-01',
    projectRelated: '55Lounge Booking Platform',
  },
  {
    id: 'testimonial-4',
    name: 'Emily Rodriguez',
    role: 'Engineering Lead',
    company: 'Freelance Client',
    content: `Olabode's ability to integrate AI features into our platform was impressive. He 
    implemented a GPT-4 powered recommendation system that increased user engagement by 60%. 
    His understanding of both frontend and backend made the integration seamless.`,
    rating: 5,
    date: '2023-11',
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