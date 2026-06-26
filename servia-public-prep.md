# Servia — Public Repo Preparation Checklist

Repository: `https://github.com/thewebguyy/servia`

This checklist is derived entirely from the case study narrative and technical
claims in `lib/case-study-content.ts`, `lib/projects.ts`, and the portfolio
case study page. Work through it in the Servia repo before flipping visibility
to public.

---

## 1. Technical Claims That Must Be Verifiable in the Repo

Each item below is a specific claim made in the public case study. A hiring
engineer or reviewer who reads the portfolio and visits the repo will look for
evidence of each one. If the code does not show it, the claim is unsupported.

### Serializable Transaction Isolation + P2034 Handling

- [ ] There is a reservation booking route that wraps the check-and-insert
      inside a Prisma transaction block using `isolationLevel: Prisma.TransactionIsolationLevel.Serializable`.
- [ ] The service layer catches Prisma error code `P2034` specifically (not a
      generic catch-all).
- [ ] The caught P2034 is translated to an HTTP 409 response with a body that
      signals a concurrency conflict (not a bare 500).
- [ ] A comment near the transaction block explains *why* Serializable isolation
      is used here (the race condition it prevents). This is the non-obvious
      constraint that makes the code credible.

**What to check in the repo:**
```
src/routes/reservations.ts   (or equivalent)
src/services/reservationService.ts
```

---

### Idempotency Keys on Payments and Orders

- [ ] Payment and order endpoints accept a client-generated idempotency key
      (a UUID, typically in a header like `Idempotency-Key` or in the request
      body).
- [ ] The key is stored in the database and checked atomically *before* the
      payment gateway is contacted.
- [ ] Duplicate requests (same key) return the original response, not a new
      charge.
- [ ] There is at least one test that submits the same idempotency key twice
      and asserts no duplicate is created.

**What to check in the repo:**
```
src/routes/payments.ts       (or equivalent)
src/routes/orders.ts
src/middleware/idempotency.ts (if extracted)
```

---

### JWT Dual-Token Auth (Access + Refresh)

- [ ] Access tokens are short-lived (check the expiry — the case study implies
      minutes, not hours).
- [ ] Refresh tokens are stored in `HttpOnly`, `SameSite=Strict` cookies (not
      in localStorage or a response body).
- [ ] Refresh tokens are stored as **bcrypt hashes** in the database, not
      plaintext.
- [ ] There is a token rotation endpoint that issues a new refresh token and
      invalidates the old one (revocation support).

**What to check in the repo:**
```
src/routes/auth.ts
src/middleware/auth.ts
src/utils/jwt.ts (or equivalent)
database/migrations/  — look for a refresh_tokens table with a hashed column
```

---

### CI/CD Pipeline Gates

- [ ] There is a `.github/workflows/` directory with at least one workflow.
- [ ] The workflow runs linting (ESLint or equivalent).
- [ ] The workflow runs TypeScript strict type-checking (`tsc --noEmit`).
- [ ] The workflow runs integration tests before allowing merge to main.
- [ ] The workflow includes a build step.
- [ ] The case study claims these are "mandatory automated gates" — confirm the
      workflow is triggered on PR, not just on push to main.

**What to check in the repo:**
```
.github/workflows/ci.yml    (or equivalent)
```

---

### k6 Load Test Results (350 RPS reads / 120 RPS writes, 14.5% P2034 rate)

This is the most specific quantitative claim in the case study. It is also the
most likely thing a senior engineer will probe.

**Claim (exact from case study):**
> Tested with 50 concurrent Virtual Users (VUs) executing booking creations
> over 30s. P95 latency remained under 180ms. With extreme capacity slot
> contention, 14.5% of requests collided and threw PostgreSQL P2034
> serialization errors. All aborted writes successfully bubbled to the client
> layer and completed cleanly on automatic client retries, ensuring zero
> double-bookings occurred.

- [ ] A k6 test script exists in the repo (e.g. `load-tests/booking.js` or
      `k6/reservation.js`). If you ran this locally, the script should be
      committed even if the output file is not.
- [ ] The k6 script targets the reservation booking endpoint specifically,
      simulates concurrent capacity-contention writes, and is configured for
      50 VUs over 30 seconds.
- [ ] **Optional but strongly recommended:** A `load-test-results/` directory
      (or a section in the README) with a screenshot or text summary of one
      real k6 run showing:
      - Achieved RPS (reads and writes)
      - P95 latency ≤ 180ms
      - ~14.5% check failure rate on the serialization conflict check
      - 0 double-bookings (verified by a DB query after the test)
- [ ] If you cannot reproduce the exact environment, document the test
      environment (Docker spec, Railway tier) in a comment at the top of the
      k6 script so the numbers are contextualised.

> NOTE: The k6 file in this portfolio repo (`docs/load-test-k6.js`) tests the
> portfolio's own API endpoints, not Servia's reservation system. Do not copy
> that file into Servia. The Servia load test script must target Servia's
> booking route.

---

### Double-Booking Bug Narrative

The case study includes a specific story: 20 concurrent clients booking the
last table slots caused 56 seats to be booked in a 50-seat room under Read
Committed isolation.

- [ ] There is either a test or a comment in the codebase that documents this
      original failure mode and the fix.
- [ ] The reservation route comment (or a `DECISIONS.md`) explains that
      **Read Committed was the original isolation level** and Serializable was
      the deliberate upgrade.

---

### Monorepo Structure (Express API + Next.js Frontend + Shared Package)

The case study explicitly mentions:
> Separate Express.js API server alongside Next.js Frontend monorepo. A shared
> package (`@packages/shared`) to prevent type contract drift.

- [ ] The repo root has a monorepo structure (e.g. `apps/api`, `apps/web`,
      `packages/shared`) or equivalent.
- [ ] `@packages/shared` (or equivalent) exports shared TypeScript types used
      by both the API and frontend.
- [ ] A `README.md` in the shared package explains what it contains.

---

## 2. Files That Must NOT Be Public

Before making the repo public, confirm none of the following are committed.
Run `git log --all --full-history -- <file>` for each to check history, not
just the current HEAD.

| File/Pattern | Why |
|---|---|
| `.env` | Contains database credentials, JWT secrets, payment API keys |
| `.env.local` | Same |
| `.env.production` | Same — especially dangerous |
| `*.pem`, `*.key`, `*.p12` | TLS certificates or signing keys |
| Any file containing `DATABASE_URL` with a real password | DB credentials |
| Any file containing `JWT_SECRET` with a real value | Would allow token forgery |
| Any file containing `STRIPE_SECRET_KEY` | Payment provider key |
| Hardcoded bcrypt hashes from production (in seeds or fixtures) | Not credentials but PII-adjacent |
| Any SQL dump from production with real customer data | GDPR/privacy risk |
| Internal business documents or contracts | Not yours to publish |

**How to check:**
```bash
# Check for env files in git history
git log --all --full-history -- .env
git log --all --full-history -- .env.production

# Search committed content for secrets
git grep -i "DATABASE_URL" $(git rev-list --all)
git grep -i "JWT_SECRET" $(git rev-list --all)
git grep -i "STRIPE_SECRET" $(git rev-list --all)

# If any of the above return hits in history, use git-filter-repo
# (not git filter-branch) to scrub them before going public:
#   pip install git-filter-repo
#   git filter-repo --path .env --invert-paths
```

Ensure `.env.example` exists and documents every required variable with a
placeholder value, not a real one. This is the only env file that should be
committed.

---

## 3. Suggested Repo Description

**GitHub repo description (one line, shown under the repo name):**
```
Restaurant operations platform — serializable reservations, idempotent payments, JWT dual-token auth, and CI/CD gates. Built with Next.js, Express, PostgreSQL, and Prisma.
```

**Topics to add on GitHub** (improves discoverability):
```
nextjs  express  postgresql  prisma  typescript  jwt  idempotency  transactions  restaurant  monorepo
```

---

## 4. README Outline

The README should mirror the case study narrative so that a reader who arrives
from the portfolio already has context. Suggested structure:

```markdown
# Servia — Restaurant Operations Platform

> End-to-end restaurant platform handling orders, reservations, payments, and
> live kitchen state. Engineering focus: correctness under concurrency.

## The Problem It Solves
[1–2 paragraphs matching the case study problem statement: fragmented state
across kitchen, host, and delivery causing lost orders, overbooking, and slow
table turn times.]

## Architecture
[Diagram or ASCII art of the monorepo structure: apps/api, apps/web,
packages/shared. Mention: Express API, Next.js frontend, PostgreSQL via Prisma,
JWT dual-token auth, Railway deployment.]

## Key Engineering Decisions

### 1. Serializable Transaction Isolation (Reservations)
[Explain the double-booking bug under Read Committed. Explain the fix: wrapping
check-and-insert in a SERIALIZABLE transaction, catching P2034, returning 409.]

### 2. Idempotent Payments and Orders
[Explain client-generated UUIDs as idempotency keys, checked atomically before
the payment gateway call. Show the relevant code snippet or link to the file.]

### 3. JWT Dual-Token Auth
[Access token short-lived, refresh token in HttpOnly cookie, stored as bcrypt
hash, rotation on use.]

### 4. CI/CD Pipeline
[List the gates: lint → type-check → test → build. Link to the workflow file.]

## Load Test Results
[Include the k6 command, the test environment spec, and a summary of results:
350 RPS reads, 120 RPS writes, P95 < 180ms, 14.5% P2034 collision rate,
zero double-bookings.]

## Local Setup
\`\`\`bash
cp .env.example .env
# Fill in values
npm install
npm run db:migrate
npm run dev
\`\`\`

## Running Tests
\`\`\`bash
npm test
\`\`\`

## Running the Load Test
\`\`\`bash
k6 run load-tests/booking.js
\`\`\`
```

---

## 5. Instructions for Making the Repo Public on GitHub

Do these steps in order. Do not skip step 1.

1. **Audit secrets in git history** (section 2 above). If any secrets are
   found in history, scrub with `git-filter-repo` and force-push before
   proceeding. A public repo with secrets in history is permanently compromised
   even after the file is deleted from HEAD.

2. **Verify all claims are supported** (section 1 above). Go through the
   checklist. If a claim is in the case study but the code doesn't show it,
   either add the code/comment or remove the claim from the portfolio before
   going public.

3. **Write (or update) the README** using the outline in section 4.

4. **Add `.env.example`** with every required variable listed as a placeholder.

5. **Check your `.gitignore`** includes: `.env`, `.env.*`, `node_modules/`,
   `dist/`, `.next/`, `*.log`.

6. **On GitHub:** Settings → Danger Zone → Change repository visibility →
   Make public. GitHub will warn you — confirm you have completed step 1.

7. **Update the portfolio** (`lib/projects.ts`) if anything about the repo
   changes (e.g. if the `githubUrl` field is currently `https://github.com/thewebguyy/servia`
   — that is already set and will resolve once the repo is public).

8. **Test the link** from the live portfolio. The "View project" button on the
   Servia case study card links to the case study page, not directly to GitHub.
   The GitHub link is surfaced in the ledger entry metadata panel under
   `REPO: PUBLIC`. Confirm it renders correctly after publishing.

---

## Priority Order

If you have limited time, do these first:

1. Secrets audit (non-negotiable — do this before anything else)
2. Serializable transaction + P2034 catch (the core claim)
3. k6 script committed to the repo (even without saved output)
4. README with the load test results section
5. CI workflow file visible and passing
6. Idempotency key implementation visible
7. JWT refresh token as bcrypt hash (visible in migration or schema)
