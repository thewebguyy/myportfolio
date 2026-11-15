export interface KeyDecision {
  decision: string
  alternatives: string
  rationale: string
  tradeoff: string
}

export interface CaseStudyContent {
  introduction: string
  problem: string
  scope: string[]
  constraints: string[]
  architectureNotes: string
  whatBroke: string
  whatChanged: string
  keyDecisions: KeyDecision[]
  testingAndOps: string[]
  outcomes: string[]
  limitations: string
  interactiveDemo?: {
    title: string
    description: string
    href: string
    ctaLabel: string
  }
  evidence?: {
    tool: string
    rps: string
    environment: string
    details: string
  }
}

export const caseStudyContent: Record<string, CaseStudyContent> = {
  servia: {
    introduction:
      "Servia is a full-stack restaurant operations platform with a Next.js frontend and an Express/Prisma/PostgreSQL API. The public repository focuses on two correctness problems: preventing reservation overbooking under concurrency with PostgreSQL SERIALIZABLE transactions, and keeping authentication state safe with a dual-token JWT flow.",
    problem:
      "Two reservations can read the same remaining capacity before either commits, allowing both to proceed. Separately, short-lived access tokens and long-lived refresh tokens need a rotation strategy that limits exposure if a refresh token is reused.",
    scope: [
      "Built the monorepo: Next.js frontend, Express/Prisma API, and a shared @servia/shared TypeScript contract package.",
      "Implemented capacity-sensitive reservation writes inside a Prisma SERIALIZABLE transaction.",
      "Mapped Prisma P2034 serialization conflicts to HTTP 409 responses.",
      "Implemented JWT access/refresh tokens with bcrypt-hashed refresh-token storage and rotation.",
      "Configured GitHub Actions CI to run type-check, lint, build, and tests on pull requests."
    ],
    constraints: [
      "Concurrent reservations must not exceed capacity.",
      "Serialization conflicts must be visible to the client as a retryable outcome.",
      "Refresh tokens must be stored hashed and rotated rather than reused indefinitely.",
      "Frontend and API payloads should share one TypeScript contract."
    ],
    architectureNotes:
      "The Next.js client and stateless Express API share types through @servia/shared. Reservations run inside a Prisma transaction at SERIALIZABLE isolation; if PostgreSQL detects a conflicting write, Prisma raises P2034 and the service returns HTTP 409. Authentication uses a 15-minute access token and a 7-day refresh token stored as a bcrypt hash in PostgreSQL and rotated on use. The public repository does not include a Redis cache or published load-test artifacts.",
    whatBroke:
      "Under PostgreSQL's default Read Committed isolation, two concurrent requests could read the same remaining capacity before either committed and both could proceed. The public ADR records the decision to move the capacity check-and-insert into a SERIALIZABLE transaction.",
    whatChanged:
      "The reservation write now runs inside a Prisma SERIALIZABLE transaction. PostgreSQL aborts the conflicting transaction with P2034, and the service layer maps that code to HTTP 409 so the client can retry or choose another slot.",
    keyDecisions: [
      {
        decision: "PostgreSQL SERIALIZABLE isolation level for reservation writes.",
        alternatives: "Application-level mutexes, distributed locks, or Read Committed with SELECT FOR UPDATE.",
        rationale: "Capacity depends on an aggregate query over existing reservations. SERIALIZABLE predicate locking prevents two compatible-looking reads from both committing.",
        tradeoff: "Under contention, serialization conflicts surface as Prisma P2034 and require a client retry path."
      },
      {
        decision: "Shared @servia/shared TypeScript contract package across Express and Next.js.",
        alternatives: "Duplicated frontend/backend interfaces or OpenAPI codegen pipelines.",
        rationale: "One package defines request/response shapes for both sides and lets the compiler catch contract drift.",
        tradeoff: "Frontend and backend builds are coupled to the same workspace package."
      },
      {
        decision: "Webhook-driven order confirmation with a status guard.",
        alternatives: "Confirming orders optimistically on the client before gateway verification.",
        rationale: "The Paystack webhook handler only advances orders that are still PENDING and verifies the paid amount, so duplicate success events do not re-confirm an order.",
        tradeoff: "The public implementation does not include a general-purpose idempotency-key ledger for client-initiated order creation."
      },
      {
        decision: "Custom JWT dual-token rotation over stateful server sessions.",
        alternatives: "Long-lived JWTs in localStorage or a server-side session store.",
        rationale: "Access tokens stay short-lived, refresh tokens live in HttpOnly/SameSite=Strict cookies, and the database stores only a bcrypt hash.",
        tradeoff: "Silent refresh and rotation require client-side token handling."
      }
    ],
    testingAndOps: [
      "GitHub Actions runs type-check, lint, build, and Jest tests on pull requests.",
      "Reservation and authentication behaviour are covered by backend Jest tests.",
      "Structured JSON logging via Pino with request correlation IDs."
    ],
    outcomes: [
      "Reservation capacity checks execute inside a Prisma SERIALIZABLE transaction.",
      "Prisma P2034 conflicts are mapped to HTTP 409.",
      "Refresh tokens are bcrypt-hashed, rotated on use, and cleared when reuse is detected.",
      "CI covers type-check, lint, build, and tests."
    ],
    limitations:
      "SERIALIZABLE isolation is appropriate for moderate single-venue throughput; high contention on one slot increases retries. The public repository does not include Redis caching, a k6 load-test suite, published throughput/latency figures, or a client-initiated payment idempotency ledger. Those claims are intentionally not made here.",
    interactiveDemo: {
      title: "Interactive Proof 03 — Read Committed vs. Serializable Concurrency",
      description: "A browser simulation of two concurrent booking requests. It is a teaching model, not a benchmark of the deployed system.",
      href: "/#isolate",
      ctaLabel: "Run the concurrency simulation →"
    },
    evidence: {
      tool: "Public repository + ADR review",
      rps: "No load-test artifacts published",
      environment: "TypeScript monorepo: Express/Prisma/PostgreSQL API and Next.js frontend",
      details: "Verified in the public repository: backend/src/services/reservation.service.ts uses a SERIALIZABLE transaction and maps P2034 to HTTP 409; auth.service.ts bcrypt-hashes and rotates refresh tokens; CI runs type-check, lint, build, and tests. Redis caching and k6 throughput/latency figures are not present and are not claimed."
    }
  },

  servicebridge: {
    introduction:
      "ServiceBridge is a real-time two-sided marketplace connecting homeowners with vetted tradespeople (plumbers, electricians, technicians) across West Africa. It was architected specifically around two real-world operational constraints: intermittent mobile network quality (3G drops and high packet loss) and non-deterministic banking/webhook latency during regional bank maintenance windows.",
    problem:
      "When a homeowner requests urgent trade service, match notifications must reach nearby providers immediately and booking confirmations must be trustworthy. The initial MVP used HTTP short-polling, which collapsed under real traffic—exhausting the PostgreSQL connection pool at ~60 concurrent users and delaying notifications by 5+ seconds. Worse, assuming payment webhooks were instantaneous led to a live 11-minute incident where a provider was dispatched before a timed-out Flutterwave/GTBank payment had actually cleared.",
    scope: [
      "Designed and built the full-stack marketplace: React client application, Node.js/Express API, and Socket.io real-time matching gateway.",
      "Re-architected match delivery from stateless HTTP polling to persistent WebSockets backed by Redis Pub/Sub for multi-instance fan-out.",
      "Engineered bandwidth-adaptive API responses and multi-layer Redis caching to keep the client usable on degraded 3G and offline connections.",
      "Implemented PostgreSQL advisory locks and idempotency keys on artisan slot bookings, plus asynchronous Paystack/Flutterwave webhook reconciliation with wallet fallback."
    ],
    constraints: [
      "Sub-100ms match notification delivery to mobile service providers without exhausting database connection pools.",
      "Graceful degradation on 3G / 50 Kbps connections — payloads must strip non-essential fields and restore session state seamlessly after brief disconnects.",
      "Transactional booking integrity — two homeowners cannot lock the same artisan's time slot concurrently.",
      "Resilience against regional bank maintenance windows — dispatch state must never outrun verified payment settlement."
    ],
    architectureNotes:
      "Clients connect through an NGINX load balancer to stateless Node.js API instances and a stateful Socket.io WebSocket tier. Providers join geographic zone rooms (e.g., zone_lagos_mainland). When a match event occurs on any Node instance, Redis Pub/Sub broadcasts the payload across all instances in under 100ms. Read-heavy catalog and session lookups hit a multi-layer Redis cache, while booking mutations acquire a PostgreSQL transaction-scoped advisory lock on the (artisan_id, slot_timestamp) pair before committing.",
    whatBroke:
      "Two production realities forced major architectural evolution. First, HTTP long-polling held open database connections per active client, exhausting the PostgreSQL connection pool at roughly 60 concurrent users. Second, in November 2023, a Flutterwave webhook hit a GTBank maintenance window and timed out; because the UI relied on optimistic client confirmation before webhook verification, the booking showed confirmed and dispatched a tradesperson while the payment had not cleared—leaving two users with contradictory truths for 11 minutes.",
    whatChanged:
      "First, I replaced HTTP polling with Socket.io WebSockets + Redis Pub/Sub so idle connected clients consume zero database connections, cutting match notification latency from 5+ seconds to under 100ms. Second, I removed optimistic UI resolution on contested state: booking locks now require a committed PostgreSQL advisory lock, and payment state transitions through an explicit PENDING_SETTLEMENT state with a wallet fallback and background reconciliation worker when gateway webhooks lag.",
    keyDecisions: [
      {
        decision: "Persistent WebSockets (Socket.io) + Redis Pub/Sub over HTTP polling.",
        alternatives: "HTTP short-polling (5s interval), HTTP long-polling, or Server-Sent Events (SSE).",
        rationale: "Eliminated thousands of empty polling queries per minute that were starving PostgreSQL connections, enabling sub-100ms push dispatch to geographic provider rooms across multiple Node processes.",
        tradeoff: "Introduced sticky-session requirements at the load balancer, heartbeat management, and custom client reconnection state sync for mobile dead zones."
      },
      {
        decision: "Network-aware payload shaping and multi-layer Redis session caching.",
        alternatives: "Uniform full-fidelity JSON payloads across all clients.",
        rationale: "On constrained 3G connections, stripping non-critical metadata (high-res vehicle/profile imagery, full route polylines) reduces payload size by up to 70% so core match & fare data arrives reliably.",
        tradeoff: "Requires the client UI to gracefully render partial DTOs and progressively hydrate secondary visuals when bandwidth permits."
      },
      {
        decision: "PostgreSQL advisory locks + idempotency keys on artisan slot bookings.",
        alternatives: "Optimistic UI confirmation with post-hoc conflict resolution.",
        rationale: "Prevented two homeowners from booking the same tradesperson's Saturday afternoon slot simultaneously, ensuring confirmation only renders after the database transaction commits.",
        tradeoff: "Slightly increases booking write latency (~35ms) compared to fire-and-forget optimistic updates."
      },
      {
        decision: "Paystack / Flutterwave integration with wallet fallback & async reconciliation.",
        alternatives: "Synchronous single-gateway checkout assuming immediate webhook callback.",
        rationale: "Protected marketplace trust during Nigerian bank maintenance windows by decoupling dispatch confirmation from brittle synchronous webhook arrival.",
        tradeoff: "Required building and maintaining a wallet ledger and scheduled reconciliation polling job for pending transactions."
      }
    ],
    testingAndOps: [
      "Simulated WebSocket connection storms and Redis Pub/Sub fan-out to identify the exact Node.js event-loop backpressure threshold for horizontal scaling.",
      "Tested network throttling profiles (4G, 3G 1.5 Mbps, Slow 50 Kbps, Offline) to verify session state restoration without full page reloads.",
      "Structured JSON logging with P99 latency alerts replacing unreadable console output under concurrent load."
    ],
    outcomes: [
      "Match notification latency reduced from 5,000ms+ (HTTP polling) to <100ms via Socket.io and Redis Pub/Sub.",
      "Sub-200ms P95 API response times sustained under simulated West African mobile network conditions.",
      "Zero duplicate artisan slot bookings after enforcing PostgreSQL advisory locks and idempotent booking keys.",
      "Eliminated connection pool exhaustion previously triggered at ~60 concurrent polling users."
    ],
    limitations:
      "In hindsight, while bidirectional Socket.io WebSockets solved the polling crisis, 90% of real-time traffic was server-to-client dispatch notifications while client-to-server actions (accepting a job) could be standard HTTP POSTs. Evaluating Server-Sent Events (SSE) over HTTP/2 earlier might have delivered the same sub-100ms push latency without sticky-session load-balancer complexity.",
    interactiveDemo: {
      title: "Interactive Proof 06 & 08 — Adaptive Network Payloads & Architecture Evolution",
      description: "Test the bandwidth slider in Chapter 06 to watch ServiceBridge strip non-essential JSON fields on 3G/Offline connections, or inspect the Plan vs. Production Reality matrix in Chapter 08.",
      href: "/#constrain",
      ctaLabel: "Test Network Payload Adaptation →"
    },
    evidence: {
      tool: "WebSocket & API Load Profiling + Network Throttling Suite",
      rps: "<100ms Pub/Sub Fan-out · <200ms API P95",
      environment: "Node.js cluster with Redis Pub/Sub adapter & PostgreSQL primary/replica setup tested under 3G/4G network profiles",
      details: "Verified that migrating from 5-second HTTP polling to Socket.io + Redis Pub/Sub eliminated idle database query load and sustained sub-100ms notification delivery across connected provider rooms."
    }
  },

  "subscription-manager": {
    introduction:
      "Subscription Manager is a public Seerbit subscription SDK demonstration built with Python and Flask. It documents six endpoints covering subscription creation, charging, OTP validation, updates, and customer/merchant subscription queries.",
    problem:
      "Merchant engineers need a compact reference for the call shapes and sequencing of Seerbit's subscription API. The public demo makes those calls concrete without claiming to be a production billing service.",
    scope: [
      "Implemented six Flask routes wrapping Seerbit subscription SDK calls.",
      "Covered subscription creation, charging a billing ID, OTP validation, updates, and customer/merchant queries.",
      "Kept the demo runnable with placeholder credentials and no committed secrets."
    ],
    constraints: [
      "The demo must remain small and readable as an integration reference.",
      "Credentials and customer identifiers must stay as placeholders.",
      "The public code must not imply persistence or production billing guarantees it does not implement."
    ],
    architectureNotes:
      "The public repository is a single Flask application (subscriptions.py) plus static HTML/CSS/JS. Each route maps to one Seerbit SDK call. There is no PostgreSQL database, Zod schema layer, Stripe adapter, idempotency ledger, webhook verifier, or reconciliation worker in the public code.",
    whatBroke:
      "The public demo is not a production billing service: it has no persistence, webhook verification, idempotency ledger, or reconciliation job, and it requires real credentials to exercise end to end.",
    whatChanged:
      "This case study now describes only the public implementation. The production billing architecture described in earlier drafts is not present in the public repository and is therefore not claimed here.",
    keyDecisions: [
      {
        decision: "Small Flask SDK wrapper as an integration reference.",
        alternatives: "A framework-heavy service with persistence and queue infrastructure.",
        rationale: "The public repository is intended to show the Seerbit call shapes in the smallest runnable form.",
        tradeoff: "It does not demonstrate database transactions, idempotency, webhook handling, or production operations."
      },
      {
        decision: "Placeholder credentials instead of committed secrets.",
        alternatives: "Checking in sandbox keys or customer identifiers.",
        rationale: "Keeps the public repository safe to share.",
        tradeoff: "The demo cannot be exercised end to end without the reader supplying credentials."
      }
    ],
    testingAndOps: [
      "No automated test suite is present in the public demo.",
      "Endpoint smoke testing requires valid Seerbit sandbox credentials.",
      "The repository includes a one-line README and static UI files."
    ],
    outcomes: [
      "Six Flask endpoints wrap Seerbit subscription creation, charging, OTP validation, update, and query calls.",
      "The public repository is a compact SDK integration reference.",
      "No PostgreSQL, Zod, Stripe, idempotency, or reconciliation code is present in the public repository."
    ],
    limitations:
      "This is a demonstration, not a production billing engine. It does not include persistence, idempotency, webhook verification, reconciliation, or operational hardening. Any separate private implementation would need to be identified and evidenced separately before being presented as production work.",
    interactiveDemo: {
      title: "Interactive Proof 05 — Payment Retry Simulation",
      description: "A browser simulation of idempotent retry behaviour. It is not a demonstration of the Subscription Manager repository.",
      href: "/#recover",
      ctaLabel: "Open the retry simulation →"
    },
    evidence: {
      tool: "Public repository inspection",
      rps: "No performance benchmarks published",
      environment: "Python/Flask app + Seerbit SDK + static HTML/CSS/JS",
      details: "The public repository contains six Flask routes wrapping the Seerbit SDK with placeholder credentials. It does not contain PostgreSQL, Zod, Stripe, idempotency, or reconciliation code. This page claims only what is present."
    }
  },

  "checkout-system": {
    introduction:
      "Checkout System is a security-focused payment gateway integration and reference checkout flow built during a contract with Seerbit. It provides e-commerce merchants with a streamlined, multi-gateway checkout experience that keeps raw card data out of merchant servers while maximizing mobile transaction completion.",
    problem:
      "Many regional e-commerce integrations suffer from fragile multi-step forms, accidental double-submissions when users tap 'Pay' multiple times on slow mobile connections, and poor error recovery when a bank declines a card or a 3DS redirect fails.",
    scope: [
      "Built the end-to-end checkout flow and gateway integration layer for Seerbit payment rails.",
      "Implemented client-side single-flight submission locks and tokenized credential handoffs to minimize PCI-DSS compliance scope.",
      "Designed clear, actionable decline and retry states so customers can switch payment methods without losing cart context."
    ],
    constraints: [
      "Zero raw cardholder data (PAN/CVV) stored or logged on merchant application servers.",
      "Single-flight submission lock — rapid double-taps on mobile devices must not initiate parallel checkout sessions.",
      "Fast initial load and clear visual feedback across mobile browsers."
    ],
    architectureNotes:
      "The checkout client collects customer billing metadata and delegates sensitive payment instrument capture to tokenized gateway frames/endpoints. A deterministic client state machine (`IDLE → VALIDATING → AUTHORIZING → VERIFYING → COMPLETE / RETRYABLE_ERROR`) disables duplicate form dispatches and verifies transaction status server-side before rendering receipt confirmation.",
    whatBroke:
      "During mobile browser testing, users navigating back from a 3D Secure bank verification screen occasionally triggered stale form re-submissions or saw an empty cart state.",
    whatChanged:
      "Persisted non-sensitive checkout session references in session storage keyed by transaction nonce, allowing the checkout view to detect an in-flight authorization on page restore and query its status cleanly.",
    keyDecisions: [
      {
        decision: "Tokenized gateway handoff over direct server-proxied card processing.",
        alternatives: "Posting raw card details through the merchant backend API.",
        rationale: "Reduces merchant PCI-DSS exposure to SAQ-A/A-EP levels while delegating 3DS and fraud checks to the gateway.",
        tradeoff: "Less customization over the innermost OTP/3DS challenge frame."
      },
      {
        decision: "Deterministic client-side state machine with single-flight button locking.",
        alternatives: "Ad-hoc boolean loading flags.",
        rationale: "Prevents impossible UI states (such as simultaneous error and success banners) and blocks accidental double-taps on high-latency mobile networks.",
        tradeoff: "Requires explicit timeout transitions if the browser network connection drops mid-flight."
      }
    ],
    testingAndOps: [
      "Tested across simulated 3G mobile throttling and interrupted 3DS redirect flows.",
      "Validated gateway callback signature verification and reference matching."
    ],
    outcomes: [
      "Zero raw PAN exposure on merchant backend infrastructure.",
      "Eliminated client-side double-submission errors via deterministic state locking."
    ],
    limitations:
      "As a lightweight client-and-gateway integration module, server-side recurring billing and multi-day webhook reconciliation were out of scope for this checkout module."
  },

  "laverita-hair": {
    introduction:
      "La Verita Hair is a custom mobile-first e-commerce storefront built for a retail beauty brand. The engineering goal was to replace bloated, slow-loading template themes with a lean, high-conversion catalog and checkout experience tailored for mobile shoppers.",
    problem:
      "Over 85% of the brand's customers browsed from mobile devices over variable cellular connections. Off-the-shelf e-commerce templates shipped megabytes of render-blocking JavaScript and unoptimized imagery, causing multi-second blank screens and high cart abandonment.",
    scope: [
      "Designed and built the responsive storefront, product catalog filtering, and cart workflow.",
      "Optimized asset delivery, responsive image sizing, and semantic HTML structure for technical SEO.",
      "Streamlined the mobile checkout funnel to minimize form fields and friction before payment."
    ],
    constraints: [
      "Strict JavaScript and image weight budget for fast rendering on mid-range mobile phones.",
      "Zero-reload catalog browsing and filtering.",
      "High search-engine crawlability with semantic markup and structured product metadata."
    ],
    architectureNotes:
      "Built with a static-first architecture using semantic HTML5, modern CSS Grid/Flexbox, and modular vanilla JavaScript without heavy SPA framework overhead. Product imagery uses lazy loading and aspect-ratio containers to prevent Cumulative Layout Shift (CLS).",
    whatBroke:
      "High-resolution product photography initially caused layout jumps and slow scrolling on mobile Safari as images decoded asynchronously.",
    whatChanged:
      "Enforced explicit aspect-ratio containers, compressed web-ready image variants, and native lazy-loading below the fold, stabilizing visual layout and scroll frame rates.",
    keyDecisions: [
      {
        decision: "Zero-framework semantic HTML/CSS/JS architecture over a heavy SPA bundle.",
        alternatives: "Client-rendered React SPA or bloated multipurpose CMS theme.",
        rationale: "For a focused retail catalog, eliminating 150KB+ of framework hydration JavaScript delivered near-instant First Contentful Paint on mobile networks.",
        tradeoff: "Requires structured manual DOM state management for cart and filter interactions."
      }
    ],
    testingAndOps: [
      "Audited Core Web Vitals (LCP, CLS, TBT) under simulated mobile throttling.",
      "Verified semantic heading hierarchy and OpenGraph/SEO metadata for search indexing."
    ],
    outcomes: [
      "Fast, layout-shift-free mobile product browsing experience.",
      "Clean organic search indexing via semantic HTML structure.",
      "Production storefront deployed and operated for live retail customers."
    ],
    limitations:
      "Inventory updates in this initial build were managed statically; scaling to hundreds of SKUs with real-time warehouse sync would warrant a headless commerce backend."
  }
}
