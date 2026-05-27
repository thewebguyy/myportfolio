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
  }
}
