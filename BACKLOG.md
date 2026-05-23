# Phase 2 Backlog

The following items were identified during the Phase 2 audit but deferred from the current implementation scope. They represent technical debt or feature regressions that should be addressed in future phases.

### Components Not Rendered
- **`SkillsGrid.tsx`**: Present in the codebase but not currently mounted on the homepage. Needs integration into `layout.tsx` or `page.tsx`.
- **`Testimonials` / `Recommendations`**: Present in the codebase (and tested via `testimonials.test.ts`) but not mounted on the homepage. Needs integration.
- **`About` section**: Missing from the homepage flow entirely. 

### Hardcoded / Mock Data
- **`ServiceBridgeMonitoring`**: Currently uses fake data treatment. Requires actual observability integration or robust simulation logic to avoid looking like a static mockup.
- **`SystemStatus` / `SystemActivityFeed`**: Contains hardcoded "business operations" context or simulated events that may need deletion or rewriting to match the new engineering persona.

### Navigation / UI Polish
- **Navigation Menu Labels**: Still contain bracketed formatting (`[NAVIGATION]`, `[WORK]`) which might feel too terminal-heavy for some audiences. Needs UX review.
- **Navbar CV Link**: The global navigation bar lacks a direct "Download CV" link, which is currently only accessible via the Hero section CTA.
