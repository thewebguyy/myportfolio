# Positioning Refactor: Banned Vocabulary Removals

This table logs every instance of banned vocabulary that was successfully removed during the Phase 2 positioning rewrite, alongside its replacement and file location.

| Banned Phrase | Replaced With | File Location |
|---|---|---|
| `Sovereign Engineering Environment.` | `Full-stack engineer building production systems for African fintech and marketplace platforms.` | `app/components/sections/Hero.tsx` |
| `market dominance` | `Keep it running.` | `app/components/sections/Manifesto.tsx` |
| `operational friction into compounding return on investment` | `(Removed in placeholder rewrite)` | `app/components/sections/Manifesto.tsx` |
| `[SYSTEM_LOG: PROFESSIONAL_MANIFESTO]` | `[HOW I WORK]` | `app/components/sections/Manifesto.tsx` |
| `Strategy Advisor` | `Engineering Assistant` | `app/components/ai/FloatingChatbot.tsx` |
| `AI Business Advisor` | `Engineering Assistant` | `app/components/ai/FloatingChatbot.tsx` |
| `Strategic Audit Interface` | `AI assistant` | `app/components/ai/FloatingChatbot.tsx` |
| `Analytical Mode Active` | `Online` | `app/components/ai/FloatingChatbot.tsx` |
| `Enterprise Strategy Engine` | `GPT-4o` | `app/components/ai/FloatingChatbot.tsx` |
| `ROI Focused` | `gpt-4o · streaming` | `app/components/ai/FloatingChatbot.tsx` |
| `AI Candidate Screener` | `Resume Analyzer` | `app/components/sections/AIShowcase.tsx`, `CandidateScreener.tsx` |
| `Opportunity Matcher` | `Project Recommender` | `app/components/sections/AIShowcase.tsx`, `OpportunityMatcher.tsx` |
| `hiringRiskScore` | `matchScore` | `CandidateScreener.tsx`, `ai-orchestrator.ts` |
| `retentionRisk` | `skillGap` | `CandidateScreener.tsx`, `ai-orchestrator.ts` |
| `roiPotential` | `performancePotential` | `OpportunityMatcher.tsx`, `openai.ts` |
| `riskLevel` (as complexity) | `complexityLevel` | `DecisionSimulator.tsx`, `OpportunityMatcher.tsx`, `simulate/route.ts` |
| `strategicReasoning` | `technicalReasoning` | `OpportunityMatcher.tsx`, `openai.ts` |
| `businessModel` | `approach` | `OpportunityMatcher.tsx`, `openai.ts` |
| `scenarios.bestCase` | `scenarios.optimalExecution` | `DecisionSimulator.tsx`, `openai.ts` |
| `scenarios.worstCase` | `scenarios.edgeCase` | `DecisionSimulator.tsx`, `openai.ts` |
| `financialImpact` | `systemImpact` / `technicalImpact` | `DecisionSimulator.tsx`, `TechnicalAudit.tsx`, `case-studies.ts` |
| `expectedRoi` | `expectedPerfGain` | `TechnicalAudit.tsx` |
| `riskMitigation` | `developmentPlan` | `TechnicalAudit.tsx`, `openai.ts`, `ai-orchestrator.ts` |

**Verification:** A post-refactor grep check confirms that zero instances of these consulting-register terms remain in the user-facing codebase.
