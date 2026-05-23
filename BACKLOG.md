# Backlog (Phase 4 Candidates)

The following items were identified during the Phase 2 & 3 audits but deferred from the current implementation scope. They represent technical debt or feature regressions that should be addressed in future phases.

### Navigation / UI Polish
- **Navigation Menu Labels**: Still contain bracketed formatting (`[NAVIGATION]`, `[WORK]`) which might feel too terminal-heavy for some audiences. Needs UX review. (Partially addressed in Phase 3)
- **Navbar CV Link**: The global navigation bar lacks a direct "Download CV" link, which is currently only accessible via the Hero section CTA. (Addressed in Phase 3)

### Marketing & SEO
- **Open Graph Image Generation**: Dynamic or static OG images for blog posts and case studies need generation to improve social sharing.
- **JSON-LD Structured Data**: Need to inject proper schema.org JSON-LD for the candidate profile and blog posts for SEO.

### AI Demos & Content
- **Migrating AI demos**: Consider migrating from OpenAI to Anthropic if latency/cost factors warrant it.
- **`docs/AI_ARCHITECTURE.md` generation**: Needs a deep dive document for recruiters asking about the RAG implementation.
- **Blog Post Chronology**: Verify and update blog post dates and content alignment.

### Missing Integrations
- **Full Link-Check Audit**: Run a script to ensure no dead links exist in the new structure.
- **GitHub Contribution Graph**: Consider integrating a live contribution graph for the About section.
