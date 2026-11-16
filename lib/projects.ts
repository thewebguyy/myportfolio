/**
 * Project data structure
 * Centralized source of truth for portfolio projects
 */

export interface ProjectOutcome {
  stat: string
  label: string
}

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  problemSummary: string
  roleScope: string
  challengeSummary: string
  imageCaption: string
  interactiveProofHref?: string
  interactiveProofLabel?: string
  category: string
  company: string
  tags: string[]
  image: string
  liveUrl?: string
  githubUrl?: string
  metrics?: {
    [key: string]: string
  }
  outcomeHighlights?: ProjectOutcome[]
  tech: string[]
  featured: boolean
  year: number
  teamSize: string
  duration: string
}

export const projects: Project[] = [
  {
    id: 'servia',
    title: 'Servia',
    description: 'Restaurant operations platform with PostgreSQL Serializable reservation transactions, P2034 conflict handling, and JWT dual-token auth',
    longDescription: `Built Servia as a full-stack restaurant operations platform covering table reservations, order lifecycle, and seating capacity state. The public repository implements PostgreSQL SERIALIZABLE isolation for capacity-sensitive reservation writes, maps Prisma P2034 serialization conflicts to HTTP 409, and uses JWT access/refresh tokens with bcrypt-hashed refresh-token rotation. The Next.js frontend and Express API share a @servia/shared TypeScript contract package. Redis caching and load-test metrics are not published in the public repository and are not claimed here.`,
    problemSummary: 'Restaurants operating on disconnected ticket tools or naive CRUD backends suffer from double-booked tables during peak dinner rushes, duplicate payment charges when mobile clients retry on weak Wi-Fi, and state drift between host stands and kitchen displays.',
    roleScope: 'Solo Full-Stack Engineer — Next.js frontend, Express/Prisma API, PostgreSQL transaction design, JWT authentication, and GitHub Actions CI.',
    challengeSummary: 'Concurrent reservation requests can read the same remaining capacity before either commits. Servia wraps the capacity check-and-insert in a Prisma SERIALIZABLE transaction and maps PostgreSQL P2034 serialization conflicts to HTTP 409 so the client can retry or choose another slot without overbooking.',
    imageCaption: 'Servia restaurant operations dashboard & table capacity state interface.',
    interactiveProofHref: '/#isolate',
    interactiveProofLabel: 'Interactive Proof 03: Serializable Isolation',
    category: 'Operations Platform',
    company: 'Solo build · public repository',
    tags: ['Serializable Isolation', 'P2034 Handling', 'Shared Contracts', 'JWT Auth', 'CI/CD'],
    image: '/projects/servia.jpg',
    githubUrl: 'https://github.com/thewebguyy/servia',
    metrics: {
      'Reservation Writes': 'SERIALIZABLE transaction',
      'Conflict Handling': 'P2034 → HTTP 409',
      'Authentication': 'Rotating JWT refresh tokens'
    },
    outcomeHighlights: [
      { stat: 'SERIALIZABLE', label: 'Capacity check-and-insert transaction' },
      { stat: 'P2034 → 409', label: 'Serialization conflicts mapped for retry' },
      { stat: 'JWT', label: 'Access + bcrypt-hashed rotating refresh tokens' },
    ],
    tech: ['Next.js', 'TypeScript', 'Express.js', 'PostgreSQL', 'Prisma', 'JWT', 'GitHub Actions'],
    featured: true,
    year: 2026,
    teamSize: 'Solo',
    duration: '6 Weeks',
  },
  {
    id: 'servicebridge',
    title: 'ServiceBridge',
    description: 'Real-time service marketplace architected for intermittent mobile connectivity and multi-instance WebSocket dispatch',
    longDescription: `Architected and built a two-sided service marketplace connecting homeowners with vetted tradespeople across West Africa. Replaced a connection-exhausting HTTP polling MVP with persistent Socket.io WebSockets backed by Redis Pub/Sub multi-node fan-out, adaptive payload shaping for constrained 3G/offline mobile networks, transactional booking slot locks in PostgreSQL, and resilient Paystack/Flutterwave webhook reconciliation with wallet fallback.`,
    problemSummary: 'Connecting homeowners and mobile tradespeople in real time across variable West African mobile networks failed under standard HTTP polling—exhausting PostgreSQL connection pools at ~60 concurrent users, delaying match notifications by 5+ seconds, and causing mismatched booking/payment states during bank maintenance windows.',
    roleScope: 'Solo Full-Stack Engineer — System architecture, React client with offline/reconnection state recovery, Node.js/Socket.io real-time matching engine, Redis Pub/Sub & caching tier, and payment settlement integration.',
    challengeSummary: 'Eliminating two compounding production failures: (1) HTTP long-polling holding open DB connections until pool exhaustion, solved by migrating to stateful Socket.io rooms with Redis Pub/Sub horizontal fan-out; and (2) an 11-minute dispatch/payment desync during a GTBank/Flutterwave webhook timeout, solved via asynchronous webhook reconciliation and adaptive bandwidth-aware API payloads.',
    imageCaption: 'ServiceBridge real-time dispatch & multi-layer caching topology.',
    interactiveProofHref: '/#constrain',
    interactiveProofLabel: 'Interactive Proof 06: Adaptive Network Payloads',
    category: 'Marketplace Engine',
    company: 'Solo build · production specification',
    tags: ['WebSockets', 'Redis Pub/Sub', 'Network Resilience', 'PostgreSQL Locks'],
    image: '/projects/servicebridge.png',
    metrics: {
      'Dispatch Latency': '<100ms via WebSockets',
      'API Response P95': '<200ms on 3G networks',
      'Booking Contention': '0 duplicate slot locks'
    },
    outcomeHighlights: [
      { stat: '<100ms', label: 'Match notification delivery via Socket.io & Redis Pub/Sub' },
      { stat: '<200ms', label: 'API latency measured under constrained mobile connectivity' },
      { stat: '70% smaller', label: 'Degraded-mode JSON payload size on slow/3G connections' },
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'Socket.io', 'Redis Pub/Sub', 'PostgreSQL', 'Paystack / Flutterwave'],
    featured: true,
    year: 2023,
    teamSize: 'Solo',
    duration: '12 Weeks',
  },
  {
    id: 'subscription-manager',
    title: 'Subscription Manager',
    description: 'Seerbit subscription SDK integration demo (Python/Flask) covering creation, charging, OTP validation, and subscription queries',
    longDescription: `Built a public Python/Flask demo that wraps the Seerbit subscription SDK. It exposes endpoints to create a subscription, charge a billing ID, validate an OTP, update a subscription, and query customer/merchant subscriptions. The demo uses placeholder credentials and is an integration reference, not a production billing engine. No PostgreSQL ledger, Zod validation layer, Stripe adapter, idempotency service, or reconciliation worker is present in the public repository.`,
    problemSummary: 'Merchant engineers need a compact reference for the call shapes and sequencing of the Seerbit subscription API. A small Flask demo documents those calls without claiming to be a production billing service.',
    roleScope: 'Solo Engineer (Contract — Seerbit) — Python/Flask SDK integration demo covering subscription creation, charging, OTP validation, updates, and query endpoints.',
    challengeSummary: 'Mapping the Seerbit subscription lifecycle into a small set of readable HTTP endpoints while keeping the demo runnable with placeholder credentials.',
    imageCaption: 'Seerbit subscription SDK demonstration endpoints.',
    interactiveProofHref: '/#recover',
    interactiveProofLabel: 'Interactive Proof 05: Payment Retry Simulation',
    category: 'Fintech Infrastructure',
    company: 'Seerbit (Contract)',
    tags: ['Seerbit API', 'Python', 'Flask', 'Subscription SDK'],
    image: '/projects/checkout.png',
    githubUrl: 'https://github.com/thewebguyy/seerbit-subscription-manager',
    metrics: {
      'Public Demo': 'Python / Flask',
      'SDK Endpoints': '6 routes',
      'Evidence Scope': 'Integration reference'
    },
    outcomeHighlights: [
      { stat: '6', label: 'Flask endpoints wrapping Seerbit subscription SDK calls' },
      { stat: 'Python', label: 'Flask implementation in the public demo' },
      { stat: 'SDK demo', label: 'Integration reference, not a billing engine' },
    ],
    tech: ['Python', 'Flask', 'Seerbit API'],
    featured: true,
    year: 2023,
    teamSize: 'Solo (Contract)',
    duration: '8 Weeks',
  },
  {
    id: 'checkout-system',
    title: 'Checkout System',
    description: 'Tokenized multi-gateway payment checkout flow engineered for high completion rates on mobile networks',
    longDescription: `Developed a modular e-commerce checkout and payment gateway integration reference system for Seerbit. Focused on client-side state resilience, tokenized card/account handoffs to keep merchant servers out of PCI scope, deterministic step progression, and graceful error recovery when upstream payment authorizations fail.`,
    problemSummary: 'E-commerce merchants integrating regional payment gateways frequently lose conversions to multi-step form drop-offs, unclear gateway decline errors, and broken browser back-button states during redirect flows.',
    roleScope: 'Solo Engineer (Contract — Seerbit) — Checkout state machine, gateway tokenization integration, validation layer, and developer reference implementation.',
    challengeSummary: 'Preserving checkout session state across asynchronous 3DS/bank redirect callbacks without exposing sensitive payment credentials or allowing double-submission on slow mobile browsers.',
    imageCaption: 'Tokenized checkout state flow and gateway handoff architecture.',
    category: 'API Integration',
    company: 'Seerbit (Contract)',
    tags: ['Payments', 'Tokenization', 'Checkout UX', 'API Integration'],
    image: '/projects/checkout.png',
    metrics: {
      'PCI Scope': 'Tokenized (Zero raw PAN)',
      'Gateway Support': 'Multi-provider adapter',
      'Submission Guard': 'Single-flight lock'
    },
    tech: ['JavaScript', 'HTML5 / CSS3', 'Seerbit Gateway API', 'Tokenization', 'REST APIs'],
    featured: false,
    year: 2023,
    teamSize: 'Solo (Contract)',
    duration: '4 Weeks',
  },
  {
    id: 'laverita-hair',
    title: 'La Verita Hair',
    description: 'Mobile-first e-commerce storefront optimized for fast First Contentful Paint and high-intent checkout',
    longDescription: `Built a custom e-commerce storefront for La Verita Hair focused on performance under mobile bandwidth constraints and organic search discoverability. Engineered a lightweight catalog filtering system, responsive image loading pipeline, and streamlined cart-to-payment conversion flow without heavy framework bloat.`,
    problemSummary: 'Heavy off-the-shelf e-commerce themes suffered from multi-second script blocking on mobile devices in Nigeria, causing high bounce rates from social and search traffic before product catalogs even rendered.',
    roleScope: 'Solo Freelance Engineer — Frontend architecture, catalog UX, mobile performance optimization, technical SEO, and deployment.',
    challengeSummary: 'Delivering a rich visual product catalog that loads and remains interactive on mid-range mobile devices over 3G/4G connections by eliminating third-party bundle bloat.',
    imageCaption: 'La Verita Hair mobile-first product catalog and storefront interface.',
    category: 'E-commerce',
    company: 'La Verita Hair (Freelance)',
    tags: ['E-commerce', 'Mobile Performance', 'Technical SEO', 'Frontend'],
    image: '/projects/laveritahair.png',
    liveUrl: 'http://laveritahair.com/',
    metrics: {
      'Target Device': 'Mobile-first (<50KB JS)',
      'Catalog UX': 'Zero-reload filtering',
      'Architecture': 'Static-first delivery'
    },
    tech: ['JavaScript', 'Semantic HTML5', 'CSS Grid / Flexbox', 'Technical SEO', 'Web Performance'],
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
