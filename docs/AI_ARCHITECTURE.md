# AI Orchestration Architecture

This document outlines the architecture powering the AI modules demonstrated in this portfolio. It is designed to provide transparency into how the models are orchestrated, validated, and constrained.

## Overview
The AI layer is an orchestration service rather than a standalone chat wrapper. It connects specific frontend interfaces (Resume Analyzer, Technical Audit, Decision Simulator, and Chatbot) to LLMs via structured API routes, enforcing rigid schema validation and deterministic output formatting.

## Architecture Flow
```text
Client Request -> Next.js API Route -> Rate Limiter -> Prompt Builder -> LLM (OpenAI/Anthropic) -> Zod Validator -> Client Response
```

## Module Breakdown
1. **Resume Analyzer (`/api/analyze-resume`)**: Extracts structured career data via OpenAI's JSON mode, mapped to and validated against a rigorous Zod schema.
2. **Project Recommender (`/api/recommend-project`)**: Matches user constraints to internal project metadata using structured prompting, verified by Zod before client delivery.
3. **Technical Audit (`/api/consult`)**: Simulates a senior engineering review of system architecture proposals.
4. **Engineering Assistant (`/api/chat`)**: A streaming chat interface backed by Anthropic's Claude. It handles open-ended technical queries with aggressive prompt injection shielding.

## Cross-Cutting Concerns
- **Rate Limiting**: Built on an Upstash/Redis pattern with an in-memory fallback mechanism to ensure demo stability.
- **Schema Validation**: All structured outputs are strictly parsed through Zod. If the LLM hallucinates a property or provides a malformed response, the orchestrator catches the validation error before it reaches the client.
- **Prompt Injection Defense**: Evaluates incoming text against known injection patterns (e.g., "ignore previous instructions", "system prompt") and short-circuits malicious requests.
- **Model Routing**: The system employs a polyglot model strategy, routing structured data tasks to OpenAI and open-ended chat tasks to Anthropic.

## Out of Scope
To remain honest about the system's capabilities, the following are *not* currently implemented:
- **No RAG / Vector Database**: The models rely entirely on in-context learning injected at runtime.
- **No Autonomous Agent Loops**: The system is highly deterministic; there are no self-correcting autonomous agent chains.
- **No Fine-tuning**: All models are zero-shot or few-shot prompted using base models.
