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
    users?: string
    uptime?: string
    performance?: string
    transactions?: string
  }
  tech: string[]
  featured: boolean
  year: number
}

export const projects: Project[] = [
  {
    id: 'servicebridge',
    title: 'ServiceBridge',
    description: 'Real-time service marketplace connecting 10,000+ users',
    longDescription: `Architected a high-scale marketplace platform connecting service providers with customers in real-time. Implemented WebSocket-based matching, Redis caching for 40% latency reduction, and PostgreSQL with read replicas for high-traffic queries.`,
    category: 'Web Application',
    tags: ['Real-time', 'Marketplace', 'WebSockets', 'Redis'],
    image: '/projects/servicebridge.jpg',
    liveUrl: 'https://servicebridge.netlify.app/',
    metrics: {
      users: '10,000+',
      uptime: '99.9%',
      performance: '40% faster',
      transactions: '$500K+',
    },
    tech: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Socket.io', 'TensorFlow.js'],
    featured: true,
    year: 2023,
  },
  {
    id: 'teenspray',
    title: 'TeensPray',
    description: 'Community platform with modern responsive design',
    longDescription: `Built a responsive community website focused on youth engagement. Implemented modern frontend practices with performance optimization and SEO best practices.`,
    category: 'Website',
    tags: ['Community', 'Responsive', 'Frontend'],
    image: '/projects/teenspray.jpg',
    liveUrl: 'https://teenspray.netlify.app/',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    featured: false,
    year: 2022,
  },
  {
    id: 'subscription-manager',
    title: 'Subscription Manager',
    description: 'Automated recurring payment system with API integration',
    longDescription: `Developed a robust backend system for managing recurring subscriptions. Integrated payment gateway APIs, implemented webhook handlers, and built automated billing cycles.`,
    category: 'Backend System',
    tags: ['Payments', 'API', 'Automation'],
    image: '/projects/checkout.jpg',
    githubUrl: 'https://github.com/thewebguyy/seerbit-subscription-manager',
    tech: ['Node.js', 'Express', 'PostgreSQL', 'Payment APIs'],
    featured: true,
    year: 2023,
  },
  {
    id: '55lounge',
    title: '55Lounge',
    description: 'Full-stack booking platform for hospitality services',
    longDescription: `Created a comprehensive booking system with real-time availability, payment processing, and customer management. Focused on user experience and performance optimization.`,
    category: 'Web Application',
    tags: ['Booking System', 'Full-Stack', 'Payments'],
    image: '/projects/55lounge.jpg',
    liveUrl: 'https://55lounge.ng/',
    tech: ['React', 'Node.js', 'MongoDB', 'Payment Integration'],
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