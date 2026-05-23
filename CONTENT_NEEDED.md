# Candidate Content Required

The following slots have been created in the codebase and require candidate-provided content or assets.

## Phase 4 Polish Content

- **Hero Subhead (`app/components/sections/Hero.tsx`)**
  - **Purpose:** Two sentences of personal voice in the Hero section.
  - **Location:** Find `{/* PLACEHOLDER: Hero subhead */}` in `Hero.tsx`.

- **Manifesto Statements (`app/components/sections/Manifesto.tsx`)**
  - **Placeholder A:** What you care about in engineering practice.
  - **Placeholder B:** Your methodology (reliability, latency, constrained-connectivity).
  - **Placeholder C:** What you've built that proves it.
  - **Location:** Find `{/* PLACEHOLDER A/B/C */}` inside the `<motion.p>` tags in `Manifesto.tsx`. Maximum 150 words combined recommended.

- **About Section (`app/components/sections/About.tsx`)**
  - **Placeholder 1:** Two sentences on career trajectory — where the candidate started, what they've shipped, where they are now.
  - **Placeholder 2:** Two sentences on technical focus — what problems they like solving, what stacks they reach for.
  - **Placeholder 3:** One sentence on what they're looking for next (currently defaults to "Open to senior and founding engineering roles. Lagos-based, working globally.").

- **ServiceBridge Case Study Post-Mortem (`lib/case-study-content.ts`)**
  - **Placeholder `whatBroke`:** Outline a specific post-mortem event demonstrating engineering reality.
  - **Placeholder `whatChanged`:** Outline reflection on what you would do differently in hindsight.

## Launch Blockers (Deferred)
*These items are explicitly deferred to the dedicated Launch Phase after Phase 4.*

- **`public/headshot.jpg`**
  - **Purpose:** Next.js `<Image>` slot in the Hero component.
  - **Specs:** Square aspect ratio recommended. Will be rendered at 48x48px (w-12 h-12) rounded full. The UI gracefully degrades if missing.

- **`NEXT_PUBLIC_FORMSPREE_ENDPOINT`**
  - **Purpose:** Enables the live contact form.
  - **Setup:** Create a free account at formspree.io, create a new form, and add the endpoint to `.env.local`. Form gracefully degrades with a LinkedIn fallback if missing.

- **`NEXT_PUBLIC_RESUME_URL`**
  - **Purpose:** Activates the "Download CV" button in the Hero section and Navbar.
  - **Setup:** *Currently populated with the default Google Drive link, which hides the CV buttons until changed.*
