# Candidate Content Required

The following slots have been created in the codebase and require candidate-provided content or assets before final launch.

### Assets Needed
- **`public/headshot.jpg`**
  - **Purpose:** Next.js `<Image>` slot in the Hero component.
  - **Specs:** Square aspect ratio recommended. Will be rendered at 48x48px (w-12 h-12) rounded full. Currently renders a broken image icon.

### Copy Needed
- **Hero Subhead (`app/components/sections/Hero.tsx`)**
  - **Purpose:** Two sentences of personal voice in the Hero section.
  - **Location:** Find `{/* PLACEHOLDER: Hero subhead */}` in `Hero.tsx`.

- **Manifesto Statements (`app/components/sections/Manifesto.tsx`)**
  - **Placeholder A:** What you care about in engineering practice.
  - **Placeholder B:** Your methodology (reliability, latency, constrained-connectivity).
  - **Placeholder C:** What you've built that proves it.
  - **Location:** Find `{/* PLACEHOLDER A/B/C */}` inside the `<motion.p>` tags in `Manifesto.tsx`. Maximum 150 words combined recommended.

### Configuration Needed
- **`NEXT_PUBLIC_FORMSPREE_ENDPOINT`**
  - **Purpose:** Enables the live contact form.
  - **Setup:** Create a free account at formspree.io, create a new form, and add the endpoint to `.env.local`.

- **`NEXT_PUBLIC_RESUME_URL`**
  - **Purpose:** Activates the "Download CV" button in the Hero section.
  - **Setup:** Host your CV/Resume online (e.g., Google Drive or Vercel Blob) and add the URL to `.env.local`. Button remains hidden if unset.
