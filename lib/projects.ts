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
  company: string
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
  teamSize: string
  duration: string
}

export const projects: Project[] = [
  {
    id: 'servicebridge',
    title: 'ServiceBridge',
    description: 'High-availability service marketplace architected for regional connectivity challenges',
    longDescription: `Architected a high-scale marketplace platform connecting service providers in emerging markets. Engineering focus was on availability and data efficiency for intermittent connectivity. Implemented WebSocket matching, multi-layer Redis caching, and optimized API payloads to reduce bandwidth usage while maintaining real-time responsiveness.`,
    category: 'Marketplace Engine',
    company: 'Solo build · production specification',
    tags: ['Distributed Systems', 'Real-time', 'Redis HA', 'Data Efficiency'],
    image: '/projects/servicebridge.jpg',
    liveUrl: 'https://servicebridge.netlify.app/',
    metrics: {
      latency: 'sub-200ms API',
      volume: '$500K+ infra capacity',
    },
    tech: ['React', 'Node.js', 'PostgreSQL', 'Redis Cluster', 'Socket.io', 'Kubernetes'],
    featured: true,
    year: 2023,
    teamSize: 'Solo',
    duration: '12 Weeks',
  },
  {
    id: 'subscription-manager',
    title: 'Subscription Manager',
    description: 'Automated recurring payment orchestration with multi-gateway support',
    longDescription: `Engineered an automated payment orchestration system for managing complex recurring billing cycles. Focused on idempotent transaction handling and webhook reliability to ensure zero-loss processing. Integrated Seerbit and Stripe APIs with custom failure recovery logic and automated reconciliation pipelines.`,
    category: 'Fintech Infrastructure',
    company: 'Seerbit (Contract / Open Source)',
    tags: ['Payments', 'Idempotency', 'Automation', 'API Design'],
    image: '/projects/checkout.jpg',
    githubUrl: 'https://github.com/thewebguyy/seerbit-subscription-manager',
    metrics: {
      processing_time: '<1s',
      reliability: 'Idempotent'
    },
    tech: ['Node.js', 'Express', 'PostgreSQL', 'Seerbit API', 'Stripe'],
    featured: true,
    year: 2023,
    teamSize: 'Solo (Contract)',
    duration: '8 Weeks',
  },
  {
    id: 'servia',
    title: 'Servia',
    description: 'Production-grade restaurant operations platform with idempotent payments, serializable transactions, and JWT dual-token auth',
    longDescription: `Built Servia as an end-to-end restaurant operations platform handling orders, reservations, payments, and live kitchen state. Engineering focus was correctness under concurrency: idempotent payment processing to survive client retries, serializable transaction isolation to prevent double-bookings and overselling, and a JWT dual-token (access + refresh) auth flow with revocation. Shipped through a full CI/CD pipeline with automated linting, type-checking, test, and build gates.`,
    category: 'Operations Platform',
    company: 'Solo build · production specification',
    tags: ['Idempotency', 'Concurrency Control', 'JWT Auth', 'CI/CD'],
    image: '/projects/servia.jpg',
    githubUrl: 'https://github.com/thewebguyy/servia',
    metrics: {
      double_bookings: '0 since launch',
      idempotency: 'Zero duplicates in retry tests',
      write_latency: '<200ms p95'
    },
    tech: ['Next.js', 'Express.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'JWT', 'GitHub Actions', 'Pino'],
    featured: true,
    year: 2026,
    teamSize: 'Solo',
    duration: '6 Weeks',
  },
  {
    id: 'checkout-system',
    title: 'Checkout System',
    description: 'Secure payment gateway integration for e-commerce',
    longDescription: `Developed a high-security checkout system supporting multiple global payment gateways. Engineered for PCI-DSS compliance standards with a focus on tokenization and secure request handling. Optimized the multi-step flow to maximize transaction success rates.`,
    category: 'API Integration',
    company: 'Seerbit (Contract / Open Source)',
    tags: ['Payments', 'Security', 'API'],
    image: '/projects/checkout.jpg',
    githubUrl: 'https://github.com/thewebguyy/checkoutsystem',
    tech: ['JavaScript', 'Payment APIs', 'Security'],
    featured: false,
    year: 2023,
    teamSize: 'Solo (Contract)',
    duration: '4 Weeks',
  },
  {
    id: 'laverita-hair',
    title: 'La Verita Hair',
    description: 'E-commerce platform for hair products',
    longDescription: `Built a performant e-commerce platform with a focus on frontend optimization and search visibility. Implemented a custom product catalog and a lightweight checkout flow optimized for high-conversion mobile traffic.`,
    category: 'E-commerce',
    company: 'La Verita Hair (Freelance)',
    tags: ['E-commerce', 'Frontend', 'SEO'],
    image: '/projects/laveritahair.png',
    liveUrl: 'http://laveritahair.com/',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'E-commerce'],
    featured: false,
    year: 2022,
    teamSize: 'Solo',
    duration: '4 Weeks',
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