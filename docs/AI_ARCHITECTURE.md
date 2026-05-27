# AI Orchestration Architecture

This document covers the two live AI modules in this portfolio. Both are real endpoints — not mocked — and can be exercised via the site UI.

## Architecture Flow

```text
Client → Next.js API Route → Rate Limiter → Prompt Builder → LLM → Zod Validator → Client
```

All structured outputs are validated against a Zod schema before being returned. The system uses two LLM providers, routed by task type.

## Live Modules

### Resume Analyzer (`/api/analyze-resume`)
Accepts raw resume text. Uses OpenAI in JSON mode to extract structured career data, then validates the response against a strict Zod schema before returning it. Output fields: `matchScore`, `skillGap`, `alignmentSignals`, `collaborationOpportunities`, `developmentPlan`, `reasoning`, `confidenceScore`, `assumptions`.

The Zod validation step is what makes this useful: if the model returns a malformed or incomplete object, the request fails explicitly rather than silently passing garbage to the client.

### Engineering Assistant (`/api/chat`)
A streaming chat interface backed by Anthropic's Claude. Configured with a short system prompt describing my stack and engineering approach. Handles open-ended questions with aggressive prompt-injection shielding — incoming messages are evaluated against known injection patterns before being forwarded to the model.

Honest limitation: this is a base Claude model with a short context prompt. It can answer questions about how I work and what I've built in general terms. It does not have RAG access to case study content or project specifics.

## Cross-Cutting Concerns

**Rate Limiting**: Built on an Upstash/Redis pattern with an in-memory fallback. The Resume Analyzer is gated at 10 requests/hour per IP.

**Schema Validation**: `/api/analyze-resume` validates LLM output through Zod before any client delivery. `/api/chat` streams raw tokens; validation is handled at the prompt-injection layer rather than on the output.

**Prompt Injection Defense**: Evaluates incoming text against known injection patterns (e.g., "ignore previous instructions", "system prompt override") and short-circuits flagged requests before they reach the LLM.

**Model Routing**: Polyglot strategy — structured data tasks route to OpenAI (JSON mode, deterministic output); open-ended chat routes to Anthropic (Claude, better at nuanced conversation).

## What This Is Not

- **No RAG / vector database**: Models rely on in-context prompting. No external knowledge retrieval.
- **No autonomous agents**: Deterministic pipelines. No self-correcting loops.
- **No fine-tuning**: Zero-shot or few-shot with base models.
- **No persistent memory**: Each request is stateless. Chat history is held client-side and sent on each turn.
