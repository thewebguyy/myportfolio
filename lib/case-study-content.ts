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
      "Servia is a full-stack restaurant operations platform engineered to coordinate table reservations, order lifecycles, kitchen display state, and payment processing under high dinner-hour concurrency. Rather than treating restaurant software as simple CRUD forms, Servia was designed around strict transactional isolation, end-to-end compile-time type contracts, and automated CI verification.",
    problem:
      "Restaurants managing operations using legacy single-client setups or naive web backends frequently suffer from data synchronization lag and race conditions. Kitchen staff, hosts, and diners act on stale capacity data, leading to double-booked reservations during peak hours, duplicate payment charges when mobile clients retry over weak venue Wi-Fi, and silent type mismatches between API payloads and UI state.",
    scope: [
      "Architected and built the complete monorepo: Next.js frontend application, stateless Express.js API server, and @packages/shared TypeScript contract package.",
      "Designed the PostgreSQL 15 schema and Prisma ORM transaction layer, enforcing SERIALIZABLE isolation on capacity-sensitive booking paths.",
      "Implemented custom dual-token JWT authentication (short-lived in-memory access tokens + HttpOnly rotated refresh tokens hashed with bcrypt).",
      "Authored k6 concurrency load-testing suites and a 4-stage GitHub Actions CI pipeline (ESLint, tsc --noEmit, Jest integration suite, production build)."
    ],
    constraints: [
      "Zero overbooking under concurrent load — simultaneous requests for the final available seats in a time slot must resolve deterministically without exceeding room capacity.",
      "Idempotent financial and order writes — clients on flaky restaurant Wi-Fi retry requests; duplicate submissions must return the original result without double-charging.",
      "Compile-time boundary safety — API request/response payloads must be validated against a single source of truth shared between backend and frontend.",
      "Stateless horizontal scalability — authentication and request handling must not rely on sticky server memory."
    ],
    architectureNotes:
      "The system separates the Next.js presentation client from a stateless Express.js API tier, linked at build time through @packages/shared. Authentication uses a dual-token flow: short-lived access tokens verify endpoints without database lookups, while long-lived refresh tokens sit in Secure, HttpOnly, SameSite=Strict cookies matched against bcrypt hashes in PostgreSQL. Capacity-critical operations execute inside Prisma SERIALIZABLE transactions, while high-read reservation lookups use Redis caching with targeted invalidation (reducing P95 lookup latency from 180ms to 47ms).",
    whatBroke:
      "Two critical failures surfaced during early testing: first, a payment amount passed as the string \"100\" instead of number 100 produced silent NaN formatting in the UI. Second, when we ran a 20-client concurrency test against the reservation endpoint under PostgreSQL's default Read Committed isolation, two concurrent threads read the same seating sum (48 of 50 seats booked), both calculated room for a party of 4, and both committed—resulting in 56 seats booked in a 50-seat dining room.",
    whatChanged:
      "First, we extracted all DTOs and Zod schemas into @packages/shared so any string/number drift fails the TypeScript build immediately. Second, we wrapped the reservation check-and-insert flow inside a Prisma transaction block at the SERIALIZABLE isolation level. PostgreSQL now tracks read-write predicate dependencies across concurrent sessions; when a concurrent write invalidates a prior capacity read, Postgres aborts the second transaction with error code P2034. The service layer catches P2034 and returns a structured HTTP 409 Conflict, prompting clean client retry.",
    keyDecisions: [
      {
        decision: "PostgreSQL SERIALIZABLE isolation level for reservation writes.",
        alternatives: "Application-level mutexes, Redis distributed locks (Redlock), or PostgreSQL Read Committed with row-level SELECT FOR UPDATE.",
        rationale: "Capacity checks depend on an aggregate query (SUM(partySize) WHERE slot = X) rather than a single pre-existing row. SERIALIZABLE predicate locking prevents phantom reads and aggregate race conditions natively inside the database without external lock coordination.",
        tradeoff: "Incurs a 14.5% P2034 serialization abort rate under extreme 50-VU contention on the same slot, requiring deterministic HTTP 409 mapping and client retry handling."
      },
      {
        decision: "Shared @packages/shared TypeScript contract package across Express and Next.js.",
        alternatives: "Duplicated frontend/backend interfaces or OpenAPI codegen pipelines.",
        rationale: "Eliminated contract drift (such as string vs. number currency amounts) with zero runtime codegen overhead; changing an API response shape immediately flags compiler errors in consuming Next.js components.",
        tradeoff: "Couples frontend and backend TypeScript build pipelines inside a single workspace monorepo."
      },
      {
        decision: "Database-backed idempotency key verification prior to payment execution.",
        alternatives: "In-memory deduplication cache or relying solely on downstream payment gateway deduplication.",
        rationale: "Checking and locking client-generated UUID idempotency keys inside an atomic database transaction guarantees that network retries never trigger a second outbound charge.",
        tradeoff: "Adds an indexed database write/lookup on payment initiation and requires clients to generate and persist request UUIDs per checkout attempt."
      },
      {
        decision: "Custom JWT dual-token rotation over stateful server sessions.",
        alternatives: "Server-side Redis session store or long-lived single JWTs in localStorage.",
        rationale: "Keeps standard API endpoints stateless and fast while protecting refresh credentials in HttpOnly cookies with database-backed revocation on token reuse detection.",
        tradeoff: "Requires silent token-refresh interceptors on the client and bcrypt hash storage for active refresh tokens."
      }
    ],
    testingAndOps: [
      "Automated 4-gate GitHub Actions CI pipeline running on every pull request: ESLint, TypeScript strict check (tsc --noEmit), Jest integration test suite, and Next.js production build.",
      "k6 load testing suite establishing verified baselines (350 RPS reads, 120 RPS writes) before and after Redis caching optimizations.",
      "Structured JSON logging via Pino with request correlation IDs to trace HTTP 409 conflict retries across client and API logs."
    ],
    outcomes: [
      "0 double-bookings across sustained 50-VU concurrent reservation stress tests.",
      "350 RPS read throughput and 120 RPS write throughput verified via k6 against containerized Postgres 15.",
      "74% reduction in P95 reservation lookup latency (from 180ms down to 47ms) after introducing Redis caching.",
      "100% of duplicate payment retry requests intercepted safely without duplicate gateway charges."
    ],
    limitations:
      "Running SERIALIZABLE isolation across all reservation writes works exceptionally well for single-venue or moderate multi-venue throughput, but under global mega-scale contention on a single table slot, serialization aborts increase retry traffic. If scaled to thousands of restaurants simultaneously, partitioning reservation predicates by venue_id + date slot or pre-allocating slot inventory rows for SELECT FOR UPDATE SKIP LOCKED would reduce retry overhead.",
    interactiveDemo: {
      title: "Interactive Proof 03 — Read Committed vs. Serializable Concurrency",
      description: "Trigger two simultaneous booking requests for the last remaining seat on the homepage to observe how Read Committed double-books (-1 seats) while Serializable returns HTTP 409.",
      href: "/#isolate",
      ctaLabel: "Run Concurrency Simulation →"
    },
    evidence: {
      tool: "k6",
      rps: "350 RPS (Reads) / 120 RPS (Writes) · P95 47ms (Cached Reads)",
      environment: "Docker container (1 vCPU, 1GB RAM) simulating Railway node runtime against PostgreSQL 15 (2 vCPU, 4GB RAM) & Redis",
      details: "Tested with 50 concurrent Virtual Users (VUs) executing booking creations over 30s. Baseline P95 latency stayed under 180ms (and dropped to 47ms on cached lookup paths). Under deliberate capacity contention, 14.5% of concurrent writes triggered PostgreSQL P2034 serialization conflicts; 100% mapped cleanly to HTTP 409 and resolved without a single overbooking."
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
      "Subscription Manager is a recurring billing and payment orchestration engine developed during a contract engagement with Seerbit. It was engineered to solve the hardest problem in emerging-market recurring revenue: guaranteeing that merchants are charged accurately—and never double-charged—when payment gateway webhooks arrive late, arrive twice, or drop entirely.",
    problem:
      "In recurring billing systems, payment webhooks are non-deterministic. A scheduled renewal charges a customer's card or account, the upstream gateway takes 40+ seconds to respond during a bank window, the client or scheduler retries, or the gateway delivers duplicate webhook callbacks. Without atomic idempotency and boundary validation, merchants suffer duplicate deductions, corrupted subscription lifecycles, and manual accounting reconciliation.",
    scope: [
      "Architected and implemented the recurring subscription engine, payment state machine, and idempotency layer in Node.js, TypeScript, and Express.",
      "Designed the PostgreSQL transactional ledger ensuring atomic idempotency key locking prior to any outbound Seerbit or Stripe API call.",
      "Implemented strict Zod runtime schema validation at every external webhook and REST API boundary.",
      "Built the automated reconciliation worker and zero-downtime rollback health checks."
    ],
    constraints: [
      "Strict idempotency — 100% of duplicate client retries or duplicate gateway webhooks must return the original recorded outcome without re-charging.",
      "Zero silent schema corruption — malformed or unexpected third-party gateway payloads must fail loudly at the edge before touching ledger logic.",
      "Multi-gateway resilience — support Seerbit and Stripe recurring billing cycles with automated wallet/retry fallback when primary rails degrade.",
      "Auditability — every state transition (INITIATED → PENDING → CONFIRMED / FAILED) must be immutably logged with correlation keys."
    ],
    architectureNotes:
      "Every payment or renewal request requires a deterministic idempotency key (client-generated UUID or hash of subscription_id + billing_cycle_date). Before contacting Seerbit or Stripe, the service opens a PostgreSQL transaction and performs an atomic insert-or-read on the idempotency_keys ledger table. If the key is already IN_FLIGHT or COMPLETED, the service short-circuits and returns the stored response immediately. Incoming webhooks pass through HMAC signature verification and Zod schema parsing before updating subscription state, backed by an asynchronous reconciliation job that queries gateway status for any transaction stuck in PENDING beyond threshold.",
    whatBroke:
      "Early integration testing revealed two failure modes: first, checking idempotency keys in application code (SELECT then INSERT without a database constraint/transaction) allowed two simultaneous retry requests arriving within 15 milliseconds of each other to both pass the check and trigger two gateway charges. Second, an upstream gateway sandbox update slightly altered a numeric webhook field format, which would have silently written corrupted renewal timestamps if not caught at the boundary.",
    whatChanged:
      "I moved idempotency enforcement strictly into the database layer using a unique constraint and atomic transactional locking before any external network I/O occurs—making race conditions structurally impossible regardless of how many Node instances are running. I also placed Zod validation middleware at every inbound webhook and API route so contract mismatches reject immediately at the perimeter with structured diagnostics.",
    keyDecisions: [
      {
        decision: "Database-level atomic idempotency key lock before external gateway contact.",
        alternatives: "Application-memory deduplication or post-charge webhook deduplication only.",
        rationale: "Application code can race across concurrent requests or server restarts; PostgreSQL unique constraints and transactional locks cannot. Locking before outbound I/O guarantees a charge is never initiated twice.",
        tradeoff: "Requires a synchronous database round-trip before initiating every payment request (<250ms total verification overhead)."
      },
      {
        decision: "Mandatory Zod runtime validation on all third-party gateway responses and webhooks.",
        alternatives: "Trusting TypeScript compile-time interfaces (`as WebhookPayload`) on external JSON.",
        rationale: "TypeScript types disappear at runtime. External payment gateways occasionally change payload shapes or return unexpected nulls during bank outages; Zod enforces the contract at the runtime edge.",
        tradeoff: "Minor CPU parsing overhead on high-volume webhook ingestion (negligible compared to network I/O)."
      },
      {
        decision: "Hybrid webhook + scheduled reconciliation state machine.",
        alternatives: "Relying 100% on push webhooks to advance subscription renewal state.",
        rationale: "When webhooks drop or time out during bank maintenance windows, the scheduled reconciliation worker polls the gateway's transaction status API by reference ID and converges the ledger automatically.",
        tradeoff: "Requires maintaining idempotent state transitions so both a late webhook and a reconciliation poll can safely process the same transaction."
      }
    ],
    testingAndOps: [
      "Concurrent retry storm simulation firing duplicate payment requests and simultaneous webhook callbacks with identical idempotency keys to verify zero double-charges.",
      "Contract boundary testing injecting malformed gateway payloads to verify Zod edge rejection and alerting.",
      "Automated deployment health checks configured to trigger rollback if payment error rate thresholds breach after release."
    ],
    outcomes: [
      "100% of duplicate retry requests and repeated webhooks return the original cached transaction response.",
      "0 duplicate merchant charges across retry storm testing and production billing cycles.",
      "Sub-250ms atomic idempotency lock and ledger verification overhead.",
      "Eliminated manual support intervention for delayed webhook settlements via automated background reconciliation."
    ],
    limitations:
      "Storing idempotency keys and cached response payloads directly in PostgreSQL works cleanly for moderate transaction volumes, but requires a TTL archival policy (e.g., pruning or partitioning keys older than 30 days) so the hot idempotency index remains compact over multi-year growth.",
    interactiveDemo: {
      title: "Interactive Proof 05 — Payment Retry & Idempotency Simulator",
      description: "Simulate a network timeout on a $50 payment and click Retry with and without an idempotency key to observe how duplicate charges happen and how atomic keys prevent them.",
      href: "/#recover",
      ctaLabel: "Test Idempotent Payment Retry →"
    },
    evidence: {
      tool: "Concurrent Retry & Webhook Replay Suite",
      rps: "100% Idempotent Replay Consistency · <250ms Lock Overhead",
      environment: "Node.js / Express service with PostgreSQL transactional ledger & Seerbit/Stripe sandbox harnesses",
      details: "Verified under concurrent double-click and timeout-retry scenarios: parallel requests bearing identical idempotency keys serialized cleanly at the database layer, dispatching exactly one upstream gateway charge."
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
      "Eliminated client-side double-submission errors via deterministic state locking.",
      "Clean reference implementation published as open-source code for merchant engineers."
    ],
    limitations:
      "As a lightweight client-and-gateway integration module, server-side recurring billing and multi-day webhook reconciliation were intentionally scoped into the dedicated Subscription Manager service."
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
