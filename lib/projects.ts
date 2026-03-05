/**
 * Project data structure
 * Centralized source of truth for portfolio projects
 */

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  category: string
  tags: string[]
  image: string
  liveUrl?: string
  githubUrl?: string
  metrics?: {
    [key: string]: string
  }
  tech: string[]
  featured: boolean
  year: number
}

export const projects: Project[] = [
  {
    id: 'servicebridge',
    title: 'ServiceBridge',
    description: 'High-availability service marketplace architected for regional connectivity challenges',
    longDescription: `Lead Architect for a high-scale marketplace platform connecting service providers in emerging markets. Engineering focus was on high-availability (99.9% design target) and data efficiency for users with intermittent connectivity. Implemented WebSocket matching, multi-layer Redis caching, and optimized API payloads to reduce bandwidth usage by 60%.`,
    category: 'Marketplace Engine',
    tags: ['Distributed Systems', 'Real-time', 'Redis HA', 'Data Efficiency'],
    image: '/projects/servicebridge.jpg',
    liveUrl: 'https://servicebridge.netlify.app/',
    metrics: {
      capacity: '10k+ peak users',
      availability: '99.9% design',
      latency: 'sub-200ms API',
      volume: '$500K+ infra capacity',
    },
    tech: ['React', 'Node.js', 'PostgreSQL', 'Redis Cluster', 'Socket.io', 'Kubernetes'],
    featured: true,
    year: 2023,
  },
  {
    id: 'subscription-manager',
    title: 'Subscription Manager',
    description: 'Automated recurring payment orchestration with multi-gateway support',
    longDescription: `Developed a robust payment orchestration system for managing recurring billing. Built with a focus on idempotent transaction handling and webhook reliability. Integrated Seerbit and Stripe APIs with custom failure recovery logic.`,
    category: 'Fintech Infrastructure',
    tags: ['Payments', 'Idempotency', 'Automation', 'API Design'],
    image: '/projects/checkout.jpg',
    githubUrl: 'https://github.com/thewebguyy/seerbit-subscription-manager',
    tech: ['Node.js', 'Express', 'PostgreSQL', 'Seerbit API', 'Stripe'],
    featured: true,
    year: 2023,
  },
  {
    id: '55lounge',
    title: '55Lounge',
    description: 'Full-stack booking platform with real-time availability tracking',
    longDescription: `Created a high-performance booking system featuring real-time state synchronization, secure payment processing, and an optimized customer dashboard. Solved complex concurrency issues in reservation logic.`,
    category: 'E-commerce / Booking',
    tags: ['Concurrency', 'Real-time Sync', 'Payments'],
    image: '/projects/55lounge.jpg',
    liveUrl: 'https://55lounge.ng/',
    tech: ['React', 'Node.js', 'MongoDB', 'Redis', 'Payment APIs'],
    featured: true,
    year: 2024,
  },
  {
    id: 'checkout-system',
    title: 'Checkout System',
    description: 'Secure payment gateway integration for e-commerce',
    longDescription: `Implemented a secure checkout system with multiple payment gateway support. Built with PCI compliance in mind and optimized for conversion rates.`,
    category: 'API Integration',
    tags: ['Payments', 'Security', 'API'],
    image: '/projects/checkout.jpg',
    githubUrl: 'https://github.com/thewebguyy/simpleseerbitcheckout',
    tech: ['JavaScript', 'Payment APIs', 'Security'],
    featured: false,
    year: 2023,
  },
  {
    id: 'laverita-hair',
    title: 'La Verita Hair',
    description: 'E-commerce platform for hair products',
    longDescription: `Developed a modern e-commerce website with product catalog, shopping cart, and checkout flow. Optimized for mobile users and search engines.`,
    category: 'E-commerce',
    tags: ['E-commerce', 'Frontend', 'SEO'],
    image: '/projects/laveritahair.png',
    liveUrl: 'http://laveritahair.com/',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'E-commerce'],
    featured: false,
    year: 2022,
  },
]

/**
 * Get project by ID
 */
export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id)
}

/**
 * Get featured projects
 */
export function getFeaturedProjects(): Project[] {
  return projects.filter(p => p.featured)
}

/**
 * Get projects by category
 */
export function getProjectsByCategory(category: string): Project[] {
  return projects.filter(p => p.category === category)
}

/**
 * Search projects by keyword
 */
export function searchProjects(query: string): Project[] {
  const lowerQuery = query.toLowerCase()
  return projects.filter(p =>
    p.title.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    p.tech.some(tech => tech.toLowerCase().includes(lowerQuery))
  )
}