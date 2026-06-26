/**
 * Engineering Principia — chapter data
 *
 * Eight principles that define the engineering operating system.
 * Projects are citations. The principles are the subject.
 */

export interface Citation {
  project: string   // project id
  claim: string     // the specific thing this project proves
}

export interface Principle {
  index: string     // "01" through "08"
  id: string        // url slug
  word: string      // the single governing word
  thesis: string    // one sentence: the principle in full
  question: string  // the question this principle answers
  body: string[]    // 2–3 paragraphs
  citations: Citation[]
  axiom: string     // short aphorism — appears large
}

export const principles: Principle[] = [
  {
    index: '01',
    id: 'observe',
    word: 'Observe',
    thesis: 'You cannot improve a system you cannot measure.',
    question: 'What is actually happening?',
    body: [
      'Before every optimization, before every refactor, before every architectural decision — there is observation. Not intuition. Not assumption. Measurement.',
      'The first question is never "how do I make this faster?" It is "do I know how fast it is now?" Without a baseline, every change is guesswork wearing the costume of engineering.',
      'Observability is not dashboards. It is the discipline of designing systems that expose their own internal state — so that when something fails at 2am in Lagos with no staging environment and a client losing money, you already know where to look.',
    ],
    citations: [
      { project: 'servicebridge', claim: 'Sub-200ms API latency measured under real West African connectivity, not sandbox conditions.' },
      { project: 'servia', claim: 'k6 load test established baseline: 350 RPS reads, 120 RPS writes, P95 < 180ms — before optimizing anything.' },
    ],
    axiom: '"A number without a baseline\nis an opinion."',
  },
  {
    index: '02',
    id: 'model',
    word: 'Model',
    thesis: 'A shared model of the domain prevents an entire class of bugs from being written.',
    question: 'What are we actually agreeing on?',
    body: [
      'Type systems are contracts. Schema validation is a promise. A shared package between services is a treaty. When two systems agree on the shape of data, a disagreement at runtime becomes a compile-time impossibility.',
      'The most expensive bugs are not logic errors. They are contract mismatches — where two parts of a system hold different beliefs about reality and only discover the disagreement in production.',
      'Modelling is the practice of encoding the domain into the type system so precisely that invalid states cannot be represented. Not just "what can go wrong?" but "what can we make structurally impossible?"',
    ],
    citations: [
      { project: 'servia', claim: 'Shared @packages/shared TypeScript package prevents type contract drift between Express API and Next.js frontend.' },
      { project: 'subscription-manager', claim: 'Zod runtime validation at API boundaries — the schema is the contract, not documentation.' },
    ],
    axiom: '"Make illegal states\nunrepresentable."',
  },
  {
    index: '03',
    id: 'isolate',
    word: 'Isolate',
    thesis: 'A system that fails together has not been designed — it has been assembled.',
    question: 'What can fail independently?',
    body: [
      'Isolation is the most misunderstood principle in distributed systems. It is not about microservices. It is not about containers. It is about whether a failure in one part of the system can propagate into parts that should be unaffected.',
      'Transaction isolation is the clearest expression of this. Under Read Committed isolation, two concurrent reservation requests can read the same available slot, both confirm availability, and both write — producing 56 bookings in a 50-seat room. That is not a bug. That is what happens when you do not isolate.',
      'Serializable isolation changes the invariant. One transaction wins. The other is aborted and retried. The system is slower. It is also correct. Correctness under concurrency is not free. The cost is explicit. The alternative — corruption — has no receipt.',
    ],
    citations: [
      { project: 'servia', claim: 'Serializable transaction isolation on reservation booking route catches P2034 serialization failures, translates to HTTP 409, zero double-bookings since launch.' },
      { project: 'servicebridge', claim: 'Multi-tenant request isolation prevents cascading failures across service provider connections.' },
    ],
    axiom: '"Correctness under\nconcurrency has a price.\nPay it."',
  },
  {
    index: '04',
    id: 'stress',
    word: 'Stress',
    thesis: 'The system\'s real specification is what it does under load, not what it does in a demo.',
    question: 'Where does it break?',
    body: [
      'A load test is not a performance test. A performance test tells you how fast. A load test tells you where the assumptions were wrong. The number you find interesting is not the RPS — it is the failure mode.',
      'At 50 concurrent virtual users executing booking creations over 30 seconds, 14.5% of requests collided and threw PostgreSQL serialization errors. That number is not a problem to be fixed. That number is the proof that the isolation logic is working exactly as designed.',
      'Stress testing is the practice of being the first adversarial user. Every failure found in a load test is a failure that did not happen to a real customer. That is the only meaningful metric.',
    ],
    citations: [
      { project: 'servia', claim: 'k6 test: 50 VUs, 30s, 14.5% P2034 collision rate, all cleanly retried — zero double-bookings across the test run.' },
      { project: 'servicebridge', claim: 'Redis Pub/Sub under load: sub-100ms notification delivery maintained through sustained WebSocket connection storms.' },
    ],
    axiom: '"The failure mode\nis the specification."',
  },
  {
    index: '05',
    id: 'recover',
    word: 'Recover',
    thesis: 'Resilience is not the absence of failure. It is the presence of recovery.',
    question: 'What happens when it breaks?',
    body: [
      'Every distributed system fails. The question is never "will this fail?" The question is "when this fails, what does the system do next?" The answer must be designed, not discovered.',
      'Idempotency is recovery made structural. A payment that fails midway and is retried must not produce two charges. The idempotency key is not a feature — it is the acknowledgement that networks are unreliable and clients will retry. Designing as if they won\'t is not optimism. It is negligence.',
      'The recovery contract must be explicit: what does the client see? A 409 with a structured body that signals a concurrency conflict is recoverable. A bare 500 is not — it is an abdication of responsibility at the exact moment the client needs guidance.',
    ],
    citations: [
      { project: 'subscription-manager', claim: 'Idempotency keys stored and checked atomically before payment gateway contact — duplicate requests return original response, not new charge.' },
      { project: 'servia', claim: 'P2034 serialization errors translated to HTTP 409 with structured conflict body, enabling automatic client retry with exponential backoff.' },
    ],
    axiom: '"Design the recovery\nbefore you design\nthe success path."',
  },
  {
    index: '06',
    id: 'constrain',
    word: 'Constrain',
    thesis: 'Constraints are not the enemy of good design. They are the source of it.',
    question: 'What are the real limits?',
    body: [
      'Building production systems in West Africa means the specification is different. A payment provider webhook that arrives 40 seconds late is not a bug report. It is the environment. The system must be designed to tolerate it, reconcile against it, and still maintain correctness.',
      'Flaky mobile connections, async payment settlements, intermittent DNS failures, infrastructure that costs money by the millisecond — these constraints force decisions that sandbox engineering never surfaces. The system either survives the real specification or it does not.',
      'The engineers who produce the most durable work are not the ones with the most resources. They are the ones who made the constraints explicit and designed within them deliberately, not in spite of them.',
    ],
    citations: [
      { project: 'servicebridge', claim: 'Optimized API payloads and multi-layer Redis caching designed specifically for bandwidth constraints across West African mobile connections.' },
      { project: 'subscription-manager', claim: 'Webhook reliability layer and automated reconciliation built for payment providers with non-deterministic delivery guarantees.' },
    ],
    axiom: '"The constraint\nis the brief."',
  },
  {
    index: '07',
    id: 'ship',
    word: 'Ship',
    thesis: 'Deployment should be the most boring event in the engineering lifecycle.',
    question: 'How does it reach production?',
    body: [
      'The most expensive moment in software delivery is the one where a human makes a manual decision. Every gate that depends on human judgement is a gate that will sometimes be wrong under pressure, at 2am, with a hotfix in one hand and a production incident in the other.',
      'A CI/CD pipeline is not a convenience. It is a proof that the team\'s standards are machine-checkable. Linting means the codebase has an agreed style. Type-checking means the contracts are verified. Integration tests mean the system\'s behaviour is documented as executable specifications.',
      'The goal is not deployment automation. The goal is that deployment is so reliably boring that it stops being an event and becomes a background process. That is when the team can focus on engineering instead of deployments.',
    ],
    citations: [
      { project: 'servia', claim: 'Mandatory CI gates: lint → TypeScript strict → integration tests → build. Triggered on every PR, not just main branch merges.' },
      { project: 'checkout-system', claim: 'Zero-downtime deployment pipeline with automated rollback triggers on error rate threshold breach.' },
    ],
    axiom: '"Boring deployments\nare a sign of\nmature engineering."',
  },
  {
    index: '08',
    id: 'evolve',
    word: 'Evolve',
    thesis: 'The most valuable engineering skill is knowing when you were wrong and changing.',
    question: 'What did the system teach you?',
    body: [
      'Every post-mortem is a gift. Not because something failed — failure is expensive and painful and often avoidable. But because the post-mortem is the one moment when the team is forced to look at the gap between what they believed the system was and what the system actually is.',
      'The engineers who stopped learning are recognisable: they advocate for what they already know. They build the same system again with new names. Their code is confident and brittle. The engineers who keep evolving are uncomfortable in a productive way — they are always learning something the system taught them.',
      'This body of work is not a record of projects. It is a record of what each system forced me to understand that I did not know before I built it.',
    ],
    citations: [
      { project: 'servia', claim: 'The double-booking bug under Read Committed was discovered in production. The fix required a full understanding of PostgreSQL isolation levels that did not exist before the bug did.' },
      { project: 'servicebridge', claim: 'HTTP polling replaced with WebSocket after observing production connection pool exhaustion — the system revealed the architecture\'s flaw.' },
    ],
    axiom: '"The system will\nalways know more\nthan the plan."',
  },
]

export function getPrincipleById(id: string): Principle | undefined {
  return principles.find(p => p.id === id)
}
