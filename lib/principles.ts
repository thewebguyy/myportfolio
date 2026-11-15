/**
 * Eight engineering principles derived from Olabode Olusegun's production work.
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
    incident: 'Before changing Servia\'s reservation path, I had to establish what the repository actually implemented.',
    body: [
      'The first step was reading the reservation transaction, its tests, and the ADR rather than assuming the architecture matched the pitch. The public repository documents a SERIALIZABLE transaction and P2034 handling; it does not publish load-test artifacts.',
      'Without a reproducible benchmark, a performance change is unverifiable. That is why this portfolio no longer claims Redis or latency numbers that the public repository cannot support. The observable facts are the transaction boundary, the 409 mapping, and the tests around them.',
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
        claim: 'SERIALIZABLE transaction + P2034 → HTTP 409 verified in the public repository; no load-test metrics are published.',
        quote: 'The public code shows the transaction boundary. The benchmark numbers were not part of the repository, so they are not claimed here.',
      },
      {
        project: 'servicebridge',
        projectTitle: 'ServiceBridge',
        category: 'Marketplace Engine',
        year: 2023,
        duration: '12 weeks',
        role: 'Solo',
        claim: 'Real-time dispatch design is documented in the portfolio; no public repository or reproducible benchmark is linked.',
        quote: 'A number without a reproducible environment is an anecdote, not evidence.',
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
      'I created a shared TypeScript package — @servia/shared — that lives between the Express server and the Next.js frontend. Every request and response type is defined once in that package and consumed by both sides. The compiler enforces the contract at build time. The amount field is typed as number. Passing "100" is now a compile-time error, not a runtime mystery discovered by a customer.',
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
        claim: 'Shared @servia/shared TypeScript package defines request/response types for the Express API and Next.js client.',
        quote: 'The amount field is typed as number in @servia/shared. Contract drift becomes a compile error.',
      },
      {
        project: 'subscription-manager',
        projectTitle: 'Subscription Manager',
        category: 'Fintech Infrastructure',
        year: 2023,
        duration: '8 weeks',
        role: 'Solo (Contract)',
        claim: 'Public Subscription Manager demo is a Python/Flask SDK wrapper; no Zod or runtime schema layer is present in the public repository.',
        quote: 'The public demo shows the Seerbit call shapes, not a typed production service contract.',
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
    incident: 'Two concurrent requests can read the same remaining capacity before either commits.',
    body: [
      'The failure mode is simple: two requests read the same seating sum before either commits. Under PostgreSQL\'s default Read Committed isolation, both can decide there is room and both can write. The public ADR records the decision to move the capacity check-and-insert into a SERIALIZABLE transaction.',
      'The fix wraps the check-and-insert flow inside a Prisma transaction at SERIALIZABLE isolation. PostgreSQL tracks read-write dependencies; when a concurrent transaction invalidates a capacity read, it aborts the second write with P2034. The service maps that code to HTTP 409 so the client can retry or choose another slot.',
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
        claim: 'SERIALIZABLE reservation transaction + P2034 → HTTP 409 verified in public code.',
        quote: 'Two concurrent requests can both read the same capacity. The database, not application code, has to decide the conflict.',
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
    incident: 'Serialization conflicts are expected when capacity is contended; the question is whether they resolve safely.',
    body: [
      'Under capacity contention, PostgreSQL P2034 serialization errors are expected. The important question is whether the service maps them to a response the client can act on. In Servia, the service layer translates P2034 to HTTP 409. The public repository does not publish a load-test abort rate, so no percentage is claimed here.',
      'In ServiceBridge, load testing was used to find the connection count where the Node.js event loop showed backpressure. That threshold became the horizontal scaling trigger. The portfolio does not publish a reproducible benchmark for it.',
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
        claim: 'P2034 conflicts mapped to HTTP 409; no public load-test rate is claimed.',
        quote: 'The failure mode matters more than a benchmark number I cannot reproduce.',
      },
      {
        project: 'servicebridge',
        projectTitle: 'ServiceBridge',
        category: 'Marketplace Engine',
        year: 2023,
        duration: '12 weeks',
        role: 'Solo',
        claim: 'Backpressure threshold identified through load testing; no public benchmark is linked.',
        quote: 'The failure mode, not the headline latency, set the scaling trigger.',
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
      'The public Subscription Manager repository is a compact Flask SDK demo. It shows the Seerbit create/charge/OTP/query call shapes, but it does not include the idempotency ledger described in earlier drafts. The design lesson still matters: a retryable payment path needs an atomic guard before outbound I/O.',
      'A correct implementation checks a client-generated idempotency key inside a database transaction before contacting the gateway. If the key already exists, the stored response is returned and no second charge is attempted. Application-level checks can race; a unique database constraint cannot.',
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
        claim: 'Public demo: six Flask endpoints wrapping the Seerbit SDK. No idempotency ledger is published.',
        quote: 'The public demo shows the call shape. It is not evidence of a production ledger.',
      },
      {
        project: 'servia',
        projectTitle: 'Servia',
        category: 'Operations Platform',
        year: 2026,
        duration: '6 weeks',
        role: 'Solo',
        claim: 'P2034 serialization errors translated to HTTP 409 with a structured conflict response.',
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
        claim: 'Public Seerbit subscription SDK demo: create, charge, OTP, and query endpoints. No reconciliation worker is published.',
        quote: 'The public demo documents the API calls; production reconciliation is not part of the public repository.',
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
      'Servia\'s CI pipeline runs four gates on every pull request: ESLint, TypeScript strict mode, integration tests, and production build. Not just on merges to main — on every PR. The type-check gate is where a payment amount bug would be caught before staging. The integration tests are where booking logic regressions surface before customers experience them. The build gate catches anything that would prevent deployment before a live release.',
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
        claim: 'Public Seerbit SDK demo; no deployment or rollback automation is published.',
        quote: 'The public repository does not include deployment automation.',
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
      'This body of work is not a record of projects. It is a record of what each system forced me to understand that I did not know before I built it. The reservation concurrency work at Servia required a working understanding of PostgreSQL isolation levels. The connection pool exhaustion at ServiceBridge required understanding the difference between the system I had designed and the system I had built. The most valuable engineering skill is not knowing the right answer. It is recognising when you were wrong and changing.',
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
        claim: 'ADR 0007 documents the Read Committed failure mode and the move to SERIALIZABLE for reservation writes.',
        quote: 'The public ADR records what the first design missed; the fix lives in the transaction boundary.',
      },
    ],
    axiom: '"The system will\nalways know more\nthan the plan."',
  },
]

export function getPrincipleById(id: string): Principle | undefined {
  return principles.find(p => p.id === id)
}
