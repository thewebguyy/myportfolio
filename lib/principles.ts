/**
 * Engineering Principia — chapter data
 *
 * Eight principles derived from Olabode Olusegun's production work.
 * Every chapter opens with a named production incident.
 * Projects are the subject. Principles are what they taught.
 */

export interface Citation {
  project: string      // project id (links to /case-studies/[id])
  projectTitle: string // display name
  category: string     // e.g. "Operations Platform"
  year: number
  duration: string
  role: string
  claim: string        // one-sentence outcome/metric
  quote: string        // first-person, from the actual incident
}

export interface Principle {
  index: string
  id: string
  word: string
  thesis: string
  question: string
  incident: string     // one-sentence hook: what happened, where, what it cost
  body: string[]       // para 1: named incident; para 2: what changed; para 3: the principle
  citations: Citation[]
  axiom: string
}

export const principles: Principle[] = [
  {
    index: '01',
    id: 'observe',
    word: 'Observe',
    thesis: 'You cannot improve a system you cannot measure.',
    question: 'What is actually happening?',
    incident: 'Before optimising anything in Servia, I didn\'t know how fast it was.',
    body: [
      'The first thing I did before touching Servia\'s performance was establish what actually existed. Not what I thought existed — what existed. I ran a k6 load test: 50 virtual users, 30 seconds, mixed read and write operations. The numbers came back: 350 RPS on reads, 120 RPS on writes, P95 latency under 180ms. I wrote them down before changing a single line of code.',
      'Three weeks later, after adding Redis caching to the reservation lookup path, I ran the same test. P95 on that path dropped from 180ms to 47ms. Without the baseline, I would have shipped the change and believed it worked. With the baseline, I knew by exactly how much, on exactly which path, under exactly the same load conditions. The optimisation became verifiable rather than assumed.',
      'Observability is not dashboards. It is the discipline of designing systems that expose their own internal state — so that when something fails at 2am in Lagos with no staging environment and a client losing money, you already know where to look. The first question is never "how do I make this faster?" It is "do I know how fast it is now?"',
    ],
    citations: [
      {
        project: 'servia',
        projectTitle: 'Servia',
        category: 'Operations Platform',
        year: 2026,
        duration: '6 weeks',
        role: 'Solo',
        claim: '350 RPS reads, 120 RPS writes, P95 < 180ms — baseline established before any optimisation.',
        quote: 'I ran the k6 test before touching anything. Without that number, every change after it would have been guesswork.',
      },
      {
        project: 'servicebridge',
        projectTitle: 'ServiceBridge',
        category: 'Marketplace Engine',
        year: 2023,
        duration: '12 weeks',
        role: 'Solo',
        claim: 'Sub-200ms API latency measured under real West African connectivity, not sandbox conditions.',
        quote: 'Sub-200ms was not a target. It was a measurement. The constraint came from the environment, not the spec.',
      },
    ],
    axiom: '"A number without a baseline\nis an opinion."',
  },

  {
    index: '02',
    id: 'model',
    word: 'Model',
    thesis: 'A shared model of the domain prevents an entire class of bugs from being written.',
    question: 'What are we actually agreeing on?',
    incident: 'A payment amount passed as a string through Servia\'s API produced NaN in the UI.',
    body: [
      'Servia\'s backend is a stateless Express API. The frontend is a Next.js application. Early in development, I was passing payment amounts as strings through the API — because JSON doesn\'t enforce types and JavaScript doesn\'t complain when you multiply a string by a number in most contexts. The bug surfaced in testing: an amount processed as "100" instead of 100, and the formatted display showed NaN. Not a crash. Just wrong, silently, in production-facing code.',
      'I created a shared TypeScript package — @packages/shared — that lives between the Express server and the Next.js frontend. Every request and response type is defined once in that package and consumed by both sides. The compiler enforces the contract at build time. The amount field is typed as number. Passing "100" is now a compile-time error, not a runtime mystery discovered by a customer.',
      'The most expensive bugs are not logic errors. They are contract mismatches — where two parts of a system hold different beliefs about reality and only discover the disagreement in production. Modelling is the practice of encoding the domain into the type system so precisely that invalid states cannot be represented. Not just "what can go wrong?" but "what can we make structurally impossible?"',
    ],
    citations: [
      {
        project: 'servia',
        projectTitle: 'Servia',
        category: 'Operations Platform',
        year: 2026,
        duration: '6 weeks',
        role: 'Solo',
        claim: 'Shared @packages/shared TypeScript package eliminates type contract drift between Express API and Next.js frontend.',
        quote: 'The amount field is typed as number in @packages/shared. The string "100" is a compile error now, not a customer complaint later.',
      },
      {
        project: 'subscription-manager',
        projectTitle: 'Subscription Manager',
        category: 'Fintech Infrastructure',
        year: 2023,
        duration: '8 weeks',
        role: 'Solo (Contract)',
        claim: 'Zod runtime validation at every API boundary — the schema is the contract, not the documentation.',
        quote: 'Zod schemas at the boundary meant any Seerbit response that didn\'t match our types failed loudly at the edge, not silently inside business logic.',
      },
    ],
    axiom: '"Make illegal states\nunrepresentable."',
  },

  {
    index: '03',
    id: 'isolate',
    word: 'Isolate',
    thesis: 'A system that fails together has not been designed — it has been assembled.',
    question: 'What can fail independently?',
    incident: 'Servia load test: 56 seats booked in a 50-seat room. Two concurrent requests, both got 200.',
    body: [
      'During Servia\'s load test, I simulated twenty clients trying to book the last remaining table slots at the same millisecond. The database was running on PostgreSQL\'s default Read Committed isolation. Two concurrent HTTP threads read the same seating capacity — 48 seats booked out of a 50-seat maximum — both calculated there was room for a party of 4, and both committed. The result was 56 seats booked in a 50-seat room. Under load, this wasn\'t a rare edge case. It happened consistently whenever capacity neared its limit.',
      'The fix: wrap the check-and-insert flow inside a Prisma transaction block at SERIALIZABLE isolation level. PostgreSQL now tracks read-write dependencies across concurrent sessions. When it detects that a concurrent transaction has inserted a new booking since our query started, it aborts the second write and throws error P2034. The service layer intercepts that code, translates it to HTTP 409, and the client retries. Zero double-bookings since launch.',
      'Isolation is not about microservices. It is not about containers. It is about whether a race — or a failure — in one part of the system can propagate into parts that should be unaffected. Correctness under concurrency is not free. The cost is explicit. The alternative — corruption — has no receipt.',
    ],
    citations: [
      {
        project: 'servia',
        projectTitle: 'Servia',
        category: 'Operations Platform',
        year: 2026,
        duration: '6 weeks',
        role: 'Solo',
        claim: 'Serializable isolation on the reservation route: P2034 → HTTP 409 → client retry. Zero double-bookings since launch.',
        quote: '56 seats booked in a 50-seat room. That number appeared in load testing, not in production — but it would have appeared in production first if I hadn\'t looked.',
      },
      {
        project: 'servicebridge',
        projectTitle: 'ServiceBridge',
        category: 'Marketplace Engine',
        year: 2023,
        duration: '12 weeks',
        role: 'Solo',
        claim: 'Multi-tenant request isolation prevents cascading failures across service provider connections.',
        quote: 'One provider\'s connection failure was propagating to others\' dashboards. Isolation boundaries made each tenant\'s failure independent.',
      },
    ],
    axiom: '"Correctness under\nconcurrency has a price.\nPay it."',
  },

  {
    index: '04',
    id: 'stress',
    word: 'Stress',
    thesis: 'The system\'s real specification is what it does under load, not what it does in a demo.',
    question: 'Where does it break?',
    incident: '14.5% of Servia\'s booking requests threw database errors under load. That was the proof the system was working.',
    body: [
      'At 50 concurrent virtual users executing booking creations over 30 seconds, 14.5% of Servia\'s requests threw PostgreSQL P2034 serialization errors. The first time I saw that number, I thought the system was broken. It wasn\'t. It was proof that the isolation logic was working exactly as designed: concurrent transactions were racing, PostgreSQL was detecting the conflicts, and the service layer was handling them cleanly. Every conflicting request aborted and retried successfully. Zero double-bookings across the entire test run. The error rate was the specification passing.',
      'In ServiceBridge, the load test revealed something different. Redis Pub/Sub maintained sub-100ms notification delivery under sustained WebSocket connection storms. But at a specific connection count, the Node.js event loop started showing backpressure. That number — not an architectural estimate, a measured threshold — became the horizontal scaling trigger. The load test didn\'t break the system. It told me where the system\'s assumptions ended and the infrastructure needed to begin.',
      'A load test is not a performance test. A performance test tells you how fast. A load test tells you where the assumptions were wrong. The number you find interesting is not the RPS — it is the failure mode. Every failure found in a load test is a failure that did not happen to a real customer. That is the only meaningful metric.',
    ],
    citations: [
      {
        project: 'servia',
        projectTitle: 'Servia',
        category: 'Operations Platform',
        year: 2026,
        duration: '6 weeks',
        role: 'Solo',
        claim: '50 VUs, 30s, 14.5% P2034 collision rate — all retried cleanly. Zero double-bookings across the full test run.',
        quote: 'A 14.5% error rate is not a problem if every error is handled. The question is not "did it fail?" but "did the failure resolve correctly?"',
      },
      {
        project: 'servicebridge',
        projectTitle: 'ServiceBridge',
        category: 'Marketplace Engine',
        year: 2023,
        duration: '12 weeks',
        role: 'Solo',
        claim: 'Redis Pub/Sub maintained sub-100ms notification delivery under sustained WebSocket connection storms.',
        quote: 'The load test gave me the number at which the event loop started showing backpressure. That became the scaling trigger — not a guess.',
      },
    ],
    axiom: '"The failure mode\nis the specification."',
  },

  {
    index: '05',
    id: 'recover',
    word: 'Recover',
    thesis: 'Resilience is not the absence of failure. It is the presence of recovery.',
    question: 'What happens when it breaks?',
    incident: 'Seerbit webhooks don\'t always arrive. Sometimes they arrive twice. A subscription renewal could charge a merchant twice without a guard.',
    body: [
      'The Subscription Manager was built for Seerbit to handle recurring payments for merchant subscriptions. The core problem: payment webhooks don\'t always arrive. Sometimes they arrive 40 seconds late. Sometimes they arrive twice. A subscription renewal could trigger a charge, the webhook could fail to confirm it, the client could retry, and the merchant gets charged twice. I built the idempotency layer before touching any gateway integration — because the failure mode was known before the first line of production code was written.',
      'Every payment request carries a client-generated idempotency key. Before contacting Seerbit\'s API, the service checks that key atomically against the database inside a transaction. If the key exists, the original response is returned — no new gateway contact, no new charge. The check happens at the database layer, not application code, because application code can race. The database cannot. Since deployment: duplicate retry requests return the original response 100% of the time.',
      'Resilience is not the absence of failure. It is the presence of recovery. Every distributed system fails. The question is never "will this fail?" The question is "when this fails, what does the system do next?" The answer must be designed before the first request lands — not discovered after the first incident.',
    ],
    citations: [
      {
        project: 'subscription-manager',
        projectTitle: 'Subscription Manager',
        category: 'Fintech Infrastructure',
        year: 2023,
        duration: '8 weeks',
        role: 'Solo (Contract — Seerbit)',
        claim: 'Idempotency keys checked atomically before gateway contact. Duplicate retries return original response. Zero duplicate charges.',
        quote: 'I designed for the retry before I designed for the success path. Seerbit\'s webhook delivery is non-deterministic. The system had to be.',
      },
      {
        project: 'servia',
        projectTitle: 'Servia',
        category: 'Operations Platform',
        year: 2026,
        duration: '6 weeks',
        role: 'Solo',
        claim: 'P2034 serialization errors translated to HTTP 409 with structured conflict body — client retries with exponential backoff.',
        quote: 'A 409 tells the client exactly what happened and that it can try again. A 500 is an abdication at the moment the client most needs guidance.',
      },
    ],
    axiom: '"Design the recovery\nbefore you design\nthe success path."',
  },

  {
    index: '06',
    id: 'constrain',
    word: 'Constrain',
    thesis: 'Constraints are not the enemy of good design. They are the source of it.',
    question: 'What are the real limits?',
    incident: 'ServiceBridge went offline for 11 minutes when a Flutterwave webhook timed out during a GTBank maintenance window. The booking was confirmed on the client. The driver was dispatched. The payment had not cleared.',
    body: [
      'In November 2023, ServiceBridge went down for 11 minutes. The cause: a Flutterwave payment webhook hit a GTBank maintenance window. The webhook timed out. The booking UI showed confirmed. The driver received the dispatch notification. The payment had not actually processed. Two users — a homeowner and a plumber — were operating on different beliefs about the state of the same transaction. The failure was not in the code. It was in the assumption that the payment provider\'s delivery guarantees were deterministic. In West Africa, during bank maintenance windows, they are not.',
      'Every API payload was designed for bandwidth constraint: minimal JSON, no unnecessary nesting, aggressive multi-layer Redis caching, compressed WebSocket frames. When a user\'s connection dropped and reconnected, session state restored without re-fetching everything. The caching layer made that work. On slow connections, the system fell back gracefully instead of hanging. The constraint didn\'t limit the architecture — it forced a better one than any greenfield specification would have produced.',
      'The engineers who produce the most durable work are not the ones with the most resources. They are the ones who made the constraints explicit and designed within them deliberately — not around them, and not in spite of them. A constraint is the brief. Not the obstacle.',
    ],
    citations: [
      {
        project: 'servicebridge',
        projectTitle: 'ServiceBridge',
        category: 'Marketplace Engine',
        year: 2023,
        duration: '12 weeks',
        role: 'Solo',
        claim: 'Multi-layer Redis caching and optimised payloads designed specifically for West African mobile network conditions.',
        quote: 'The constraint wasn\'t something to design around. It was the actual specification. Every decision about payload size and caching came from that.',
      },
      {
        project: 'subscription-manager',
        projectTitle: 'Subscription Manager',
        category: 'Fintech Infrastructure',
        year: 2023,
        duration: '8 weeks',
        role: 'Solo (Contract — Seerbit)',
        claim: 'Webhook reliability layer and automated reconciliation built for payment providers with non-deterministic delivery guarantees.',
        quote: 'NGN volatility during bank maintenance windows is a real infrastructure constraint in West African fintech. The reconciliation pipeline exists because of it.',
      },
    ],
    axiom: '"The constraint\nis the brief."',
  },

  {
    index: '07',
    id: 'ship',
    word: 'Ship',
    thesis: 'Deployment should be the most boring event in the engineering lifecycle.',
    question: 'How does it reach production?',
    incident: 'Servia\'s CI pipeline catches the type error that would have charged a customer the wrong amount.',
    body: [
      'Servia\'s CI pipeline runs four gates on every pull request: ESLint, TypeScript strict mode, integration tests, and production build. Not just on merges to main — on every PR. The type-check gate is where that payment amount bug I described in Chapter 02 would have been caught before staging. The integration tests are where booking logic regressions surface before customers experience them. The build gate is where anything that would prevent deployment fails in 3 minutes rather than during a live release. Together they take under 3 minutes and have blocked exactly the kinds of failures they were designed to block.',
      'The most expensive moment in software delivery is the one where a human makes a manual decision under pressure — at 2am with a hotfix in one hand and a production incident in the other. Every gate that depends on human judgment will sometimes be wrong under those conditions. Mandatory CI gates are not bureaucracy. They are the team\'s standards encoded as machine-checkable specifications. The linter means there is an agreed style. The type-checker means contracts are verified. The integration tests mean behaviour is documented as executable truth.',
      'The goal is not deployment automation. The goal is that deployment is so reliably boring that it stops being an event and becomes a background process. That is when the team can focus on engineering instead of releases.',
    ],
    citations: [
      {
        project: 'servia',
        projectTitle: 'Servia',
        category: 'Operations Platform',
        year: 2026,
        duration: '6 weeks',
        role: 'Solo',
        claim: 'Mandatory CI gates: lint → TypeScript strict → integration tests → build. Triggered on every PR, not only on main branch merges.',
        quote: 'The pipeline caught a type error in the payment module before it reached staging. That\'s the only metric that matters for a CI gate.',
      },
      {
        project: 'subscription-manager',
        projectTitle: 'Subscription Manager',
        category: 'Fintech Infrastructure',
        year: 2023,
        duration: '8 weeks',
        role: 'Solo (Contract — Seerbit)',
        claim: 'Zero-downtime deployment with automated rollback on payment error rate threshold breach.',
        quote: 'Deployment is an event until it isn\'t. Automating the rollback removed the last human decision point from the critical path.',
      },
    ],
    axiom: '"Boring deployments\nare a sign of\nmature engineering."',
  },

  {
    index: '08',
    id: 'evolve',
    word: 'Evolve',
    thesis: 'The most valuable engineering skill is knowing when you were wrong and changing.',
    question: 'What did the system teach you?',
    incident: 'ServiceBridge\'s HTTP polling destroyed the database connection pool in production. The architecture had seemed correct until it wasn\'t.',
    body: [
      'ServiceBridge started with HTTP long-polling for match notifications. It was simple. It worked at the load we tested against. Under real production load, it destroyed the database connection pool. Every polling client — and at peak there were hundreds — was holding an open connection waiting for a response that might not come for 30 seconds. Connection pool exhaustion began at roughly 60 concurrent users. The system revealed the architecture\'s flaw in a way no upfront design review had. The plan had been correct for a system that didn\'t exist yet.',
      'The rewrite to WebSockets via Socket.io was not the interesting part. The interesting part was understanding why the polling architecture had seemed correct. It was correct for the load I had imagined. Production load was different. The system taught me the gap between the model in my head and the model under real conditions. That gap is always where the actual engineering lives. Every post-mortem surfaces it. Most upfront design documents miss it entirely.',
      'This body of work is not a record of projects. It is a record of what each system forced me to understand that I did not know before I built it. The double-booking bug at Servia required a working understanding of PostgreSQL isolation levels that did not exist for me before the bug did. The connection pool exhaustion at ServiceBridge required understanding the difference between the system I had designed and the system I had built. The most valuable engineering skill is not knowing the right answer. It is recognising when you were wrong and changing.',
    ],
    citations: [
      {
        project: 'servicebridge',
        projectTitle: 'ServiceBridge',
        category: 'Marketplace Engine',
        year: 2023,
        duration: '12 weeks',
        role: 'Solo',
        claim: 'HTTP polling replaced with WebSocket after connection pool exhaustion under production load revealed the architecture\'s flaw.',
        quote: 'The polling architecture seemed correct in design. Production told me otherwise. The rewrite wasn\'t the lesson. Understanding why the first version had seemed right was.',
      },
      {
        project: 'servia',
        projectTitle: 'Servia',
        category: 'Operations Platform',
        year: 2026,
        duration: '6 weeks',
        role: 'Solo',
        claim: 'The double-booking bug under Read Committed was discovered in load testing — and required building a working understanding of PostgreSQL isolation that didn\'t exist before.',
        quote: 'I didn\'t know what I didn\'t know about isolation levels until Servia showed me. That\'s what production systems are for.',
      },
    ],
    axiom: '"The system will\nalways know more\nthan the plan."',
  },
]

export function getPrincipleById(id: string): Principle | undefined {
  return principles.find(p => p.id === id)
}
