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
    description: 'Production-grade restaurant operations platform with idempotent payments, serializable transactions, and JWT dual-token auth',
    longDescription: `Built Servia as an end-to-end restaurant operations platform handling table reservations, live kitchen order routing, payment processing, and seating capacity state. Engineering focus was correctness under concurrency: idempotent payment and order writes to survive flaky restaurant Wi-Fi retries, PostgreSQL SERIALIZABLE transaction isolation to prevent double-bookings and overselling, a shared TypeScript contract package (@packages/shared) across frontend and API, and a JWT dual-token (access + refresh) rotation flow.`,
    problemSummary: 'Restaurants operating on disconnected ticket tools or naive CRUD backends suffer from double-booked tables during peak dinner rushes, duplicate payment charges when mobile clients retry on weak Wi-Fi, and state drift between host stands and kitchen displays.',
    roleScope: 'Solo Full-Stack Engineer — End-to-end architecture, Next.js frontend, Express/Prisma API, PostgreSQL transaction design, k6 load testing, and GitHub Actions CI/CD.',
    challengeSummary: 'Under 50-VU concurrent load testing, PostgreSQL default Read Committed isolation allowed concurrent requests to read the same 48/50 seat count and book 56 seats in a 50-seat room. Resolved by wrapping capacity check-and-insert in a Prisma SERIALIZABLE transaction, intercepting P2034 serialization conflicts at the service boundary, and returning structured HTTP 409 responses for clean client retry.',
    imageCaption: 'Servia restaurant operations dashboard & table capacity state interface.',
    interactiveProofHref: '/#isolate',
    interactiveProofLabel: 'Interactive Proof 03: Serializable Isolation',
    category: 'Operations Platform',
    company: 'Solo build · production specification',
    tags: ['Serializable Isolation', 'Idempotency', 'Shared Contracts', 'JWT Auth', 'CI/CD'],
    image: '/projects/servia.jpg',
    githubUrl: 'https://github.com/thewebguyy/servia',
    metrics: {
      'Double-Bookings': '0 since launch',
      'Read / Write Throughput': '350 / 120 RPS',
      'Reservation P95 Latency': '47ms (cached) / <180ms'
    },
    outcomeHighlights: [
      { stat: '0', label: 'Double-bookings across 50-VU concurrent k6 stress runs' },
      { stat: '350 RPS', label: 'Verified read baseline (120 RPS writes, P95 < 180ms)' },
      { stat: '180ms → 47ms', label: 'Reservation lookup P95 drop after Redis caching' },
    ],
    tech: ['Next.js', 'TypeScript', 'Express.js', 'PostgreSQL', 'Prisma', 'Redis', 'JWT', 'GitHub Actions', 'k6'],
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
    liveUrl: 'https://servicebridge.netlify.app/',
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
    description: 'Idempotent recurring billing and webhook reconciliation engine built for non-deterministic payment delivery',
    longDescription: `Engineered a recurring billing and subscription orchestration service during a contract engagement for Seerbit. Designed specifically to guarantee zero duplicate merchant charges when payment webhooks arrive late, arrive multiple times, or time out during bank maintenance windows. Enforced atomic database-level idempotency keys prior to gateway invocation, strict Zod schema validation at every external API boundary, and automated ledger reconciliation.`,
    problemSummary: 'Recurring subscription billing in emerging-market fintech faces non-deterministic webhook delivery: callbacks can arrive 40 seconds late, fire twice, or drop during bank maintenance windows—causing naive retry loops to double-charge merchants or leave subscriptions in zombie states.',
    roleScope: 'Solo Backend & Integration Engineer (Contract — Seerbit) — Idempotency state machine, PostgreSQL transactional ledger, Zod boundary validation, Seerbit & Stripe gateway adapters, and automated reconciliation workers.',
    challengeSummary: 'Preventing race-condition double charges when both a client retry and a delayed payment webhook attempt to settle the same renewal cycle simultaneously. Solved by checking and locking client-generated idempotency keys atomically at the PostgreSQL layer before any outbound gateway call is dispatched.',
    imageCaption: 'Subscription Manager payment orchestration & idempotent webhook pipeline.',
    interactiveProofHref: '/#recover',
    interactiveProofLabel: 'Interactive Proof 05: Idempotent Payment Retries',
    category: 'Fintech Infrastructure',
    company: 'Seerbit (Contract / Open Source)',
    tags: ['Idempotency', 'Webhook Reliability', 'Zod Validation', 'Payment Ledger'],
    image: '/projects/checkout.png',
    githubUrl: 'https://github.com/thewebguyy/seerbit-subscription-manager',
    metrics: {
      'Duplicate Charges': '0 across retry storms',
      'Retry Consistency': '100% original response',
      'Processing Overhead': '<250ms lock & verify'
    },
    outcomeHighlights: [
      { stat: '100%', label: 'Duplicate retry requests safely return cached original response' },
      { stat: '0', label: 'Double-charges under concurrent client retry + late webhook delivery' },
      { stat: '<250ms', label: 'Atomic DB idempotency verification & state transition overhead' },
    ],
    tech: ['Node.js', 'TypeScript', 'Express', 'PostgreSQL', 'Zod', 'Seerbit API', 'Stripe API'],
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
    company: 'Seerbit (Contract / Open Source)',
    tags: ['Payments', 'Tokenization', 'Checkout UX', 'API Integration'],
    image: '/projects/checkout.png',
    githubUrl: 'https://github.com/thewebguyy/checkoutsystem',
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
