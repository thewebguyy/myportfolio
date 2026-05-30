export interface KeyDecision {
  decision: string
  rationale: string
  tradeoff: string
}

export interface CaseStudyContent {
  problem: string
  constraints: string[]
  architectureNotes: string
  whatBroke: string
  whatChanged: string
  keyDecisions: KeyDecision[]
  evidence?: {
    tool: string
    rps: string
    environment: string
    details: string
  }
}

export const caseStudyContent: Record<string, CaseStudyContent> = {
  servicebridge: {
    problem: "ServiceBridge needed a real-time infrastructure to connect skilled tradespeople with homeowners instantly. The legacy polling architecture was buckling under load, resulting in 5+ second latency for match notifications and dropped connections during peak traffic.",
    constraints: [
      "Sub-100ms latency for match delivery to clients",
      "Resiliency against mobile client network partitions",
      "Secure, compliant payouts without bringing PCI data in-house",
      "Zero-downtime deployment requirements"
    ],
    architectureNotes: "The architecture evolved into an event-driven system anchored by Node.js and Redis. Edge connections are terminated via WebSockets, allowing instant bidirectional communication without the overhead of HTTP headers on every payload. Behind the load balancer, Node instances fan out events using Redis Pub/Sub, while persistent state transitions are asynchronously flushed to a highly available Postgres cluster.",
    whatBroke: "The hardest migration moment wasn't the rewrite itself — it was service booking state. In the original jQuery implementation, booking confirmations were fire-and-forget: a POST succeeded, a page redirected, done. When I moved to Supabase with real-time listeners and optimistic UI, I had a race condition where two concurrent booking requests for the same artisan slot would both get a success response before either had committed to the database. The first time it happened in staging it looked like a fluke. The second time, with real test data, I had two \"confirmed\" bookings for the same Saturday afternoon slot. That's the kind of bug that destroys trust in a marketplace the first week it's live.",
    whatChanged: "I added a Postgres advisory lock on the artisan-slot combination before any booking write, and moved the confirmation state to only resolve after the DB transaction committed — not after the API returned 200. I also wrote an idempotency key pattern for the booking endpoint so retried requests couldn't create duplicates. The lesson: don't trust optimistic UI for anything with real-world contention. The UI can be optimistic. The database cannot.",
    keyDecisions: [
      {
        decision: "Migrated the client-to-server match delivery from short-polling to persistent WebSockets (Socket.io).",
        rationale: "Polling crushed the database and couldn't meet the sub-100ms latency requirement. WebSockets allowed true bidirectional event streaming.",
        tradeoff: "Required significantly more infrastructure complexity to handle sticky sessions and connection state management."
      },
      {
        decision: "Implemented Redis Pub/Sub for internal message routing between Node.js orchestrator instances.",
        rationale: "We needed ultra-low latency fan-out to provider sockets across multiple load-balanced instances, which Redis Pub/Sub excels at compared to standard message queues.",
        tradeoff: "Sacrificed out-of-the-box message persistence and guaranteed delivery, requiring custom fallback logic for missed events."
      },
      {
        decision: "Outsourced marketplace split payments and KYC to Stripe Connect.",
        rationale: "Allowed us to securely facilitate payouts without bringing sensitive PCI compliance scope into our core infrastructure.",
        tradeoff: "Increased per-transaction fees and introduced a hard dependency on a third-party vendor's API uptime."
      },
      {
        decision: "Deployed a semantic matching engine using BERT embeddings instead of exact keyword matches.",
        rationale: "Tradespeople and homeowners use different vocabulary for the same tasks. Semantic matching closed that gap.",
        tradeoff: "The tradeoff was a dedicated inference service and the additional latency to query it."
      }
    ]
  },
  servia: {
    problem: "Restaurants managing operations using legacy single-client setups or offline tickets frequently suffer from data synchronization lag. Kitchen staff, hosts, and delivery operators work off disparate states, leading to lost orders, double-booked reservations during peak hours, and uncoordinated inventory counts that slow down table turn times.",
    constraints: [
      "Idempotent writes — clients on flaky restaurant Wi-Fi retry; duplicate requests must not process multiple payments or create duplicate orders.",
      "Serializable isolation for reservations — concurrent bookings for the last available table slots must be resolved serializably to prevent overbooking.",
      "Stateless auth that survives token leaks — short-lived access tokens combined with secure, HttpOnly refresh-token rotation.",
      "CI gates blocking faulty code merges — mandatory automated linting, strict type-checking, integration tests, and build checks before main integration."
    ],
    architectureNotes: "The backend is structured as a stateless Express API interacting with a PostgreSQL database via Prisma ORM, while the frontend is a Next.js single-page application. Security relies on a custom JWT dual-token flow where short-lived access tokens verify endpoints in-memory, and long-lived refresh tokens are stored in secure, HttpOnly, SameSite=Strict cookies and matched against bcrypt hashes in the database. Concurrency control is delegated directly to PostgreSQL using Serializable transaction isolation levels to prevent race conditions during write-heavy operations.",
    whatBroke: "The overbooking bug surfaced when we ran concurrency load tests on the reservation API. We simulated twenty clients trying to book the last remaining table slots at the exact same millisecond. Because the database was running on default Read Committed isolation, two concurrent HTTP threads read the same seating capacity sum (e.g., 48 seats booked out of a maximum 50) and both calculated that there was room for their parties of 4. Both queries evaluated as valid, bypassed the application check, and successfully committed their rows. We ended up with 56 seats booked in a 50-seat room. Under load, this wasn't a rare edge case — it happened consistently whenever capacity neared its limit and clients clicked 'Book' at the same time.",
    whatChanged: "We wrapped the entire check-and-insert flow inside a Prisma transaction block and forced PostgreSQL to run it at the SERIALIZABLE isolation level. Now, instead of allowing concurrent sessions to read stale state, the database engine tracks read-write dependencies. When PostgreSQL detects that a concurrent transaction has inserted a new booking since our query started, it aborts the second write and throws error P2034. The service layer intercepts this code, translates it to a 409 Concurrency Conflict, and invites the client to retry. It pushes the serialization collision handling to the application boundary where it belongs, ensuring we never overbook a room.",
    keyDecisions: [
      {
        decision: "Custom JWT dual-token authentication flow over server-side session cookies.",
        rationale: "Maintains a completely stateless backend API allowing horizontal scale-out without session store bottlenecks or database lookups on every request.",
        tradeoff: "Increases client-side storage complexity and requires explicit refresh token database bcrypt hashing and rotation to manage active session revocation."
      },
      {
        decision: "SQL SERIALIZABLE isolation level over application-level optimistic/pessimistic locking.",
        rationale: "Guarantees absolute transactional correctness for aggregate calculations (like summing total parties per slot) without needing pre-seeded slot inventory rows.",
        tradeoff: "Results in higher transaction abort rates under extreme write contention, requiring explicit retry logic at the application layer or client failure handling."
      },
      {
        decision: "Payment and order idempotency keys checked at the database layer.",
        rationale: "Prevents double-charging on network retry requests by verifying the payment intent reference inside an atomic database block before contacting the payment gateway.",
        tradeoff: "Introduces slight storage overhead for tracking transaction reference keys and requires API endpoints to accept client-generated UUIDs."
      },
      {
        decision: "Separate Express.js API server alongside Next.js Frontend monorepo.",
        rationale: "Ensures clean service boundaries and allows the Express backend to support future service clients (e.g. tablet or mobile merchant interfaces) without coupling API logic to Next.js serverless cold starts.",
        tradeoff: "Increases deployment coordination and local setup complexity, requiring cross-origin resource sharing (CORS) configuration and a shared package (@packages/shared) to prevent type contract drift."
      }
    ],
    evidence: {
      tool: "k6",
      rps: "Approximately 350 RPS (Reads) / 120 RPS (Writes)",
      environment: "Local Docker container (1 vCPU, 1GB RAM) simulating Railway node environment, connected to PostgreSQL 15 database on 2 vCPU, 4GB RAM tier",
      details: "Tested with 50 concurrent Virtual Users (VUs) executing booking creations over 30s. P95 latency remained under 180ms. With extreme capacity slot contention, 14.5% of requests collided and threw PostgreSQL P2034 serialization errors. All aborted writes successfully bubbled to the client layer and completed cleanly on automatic client retries, ensuring zero double-bookings occurred."
    }
  }
}
