# Olabode Olusegun — Engineering Portfolio 2026

This repository contains the source code for my 2026 engineering portfolio. It is built to demonstrate both frontend execution and systems engineering judgment, featuring a polyglot AI architecture, dynamic content orchestration, and strict type safety.

## 🏗️ Technical Architecture

This application is built on **Next.js 14 (App Router)** and deployed on Vercel. 

### Core Stack
- **Framework**: Next.js 14 (React 18)
- **Styling**: Tailwind CSS, Framer Motion (for physics-based animations)
- **Language**: TypeScript (Strict Mode)
- **Validation**: Zod (for API payloads and LLM structured outputs)
- **Icons**: Heroicons

### Polyglot AI Strategy
The portfolio includes interactive AI modules designed to simulate real-world engineering workflows. Rather than using a single model for all tasks, the architecture routes workloads based on the task constraints:

- **Anthropic Claude (`claude-opus-4-7`)**: Powers the open-ended engineering chat assistant. Utilized for its superior instruction-following and nuanced technical communication via the Anthropic SDK with Edge streaming.
- **OpenAI (GPT-4o)**: Drives the structured output tasks (Resume Analyzer, Technical Audit). Outputs are coerced into JSON mode and strictly validated against Zod schemas on the backend before being delivered to the client.

For detailed information on how these models are orchestrated and secured against injection, see [`docs/AI_ARCHITECTURE.md`](docs/AI_ARCHITECTURE.md).

## 🚀 Getting Started

To run this project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/portfolio-2026.git
   cd portfolio-2026
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Copy the example environment file and populate the required keys.
   ```bash
   cp .env.local.example .env.local
   ```
   *Note: To run the AI features locally, you will need active API keys for both OpenAI and Anthropic.*

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Verify the build:**
   ```bash
   npm run type-check
   npm run lint
   npm run test:ci
   npm run build
   ```

## 📂 Project Structure

- `/app` — Next.js 14 App Router pages, layouts, and API routes.
- `/app/components/ui` — Reusable, atomic UI components.
- `/app/components/sections` — Major page sections (Hero, Case Studies, AI Showcase).
- `/app/components/ai` — Client-side React components for the interactive AI modules.
- `/lib` — Utility functions, typed content (projects, blog posts), and API clients.
- `/services` — Backend orchestration logic (e.g., `ai-orchestrator.ts`).
- `/docs` — Deep-dive technical documentation for recruiters and engineering managers.

## 📝 Content Philosophy

The content in this portfolio is structured around **engineering trade-offs**. Case studies explicitly document *why* a technology was chosen and *what* was given up in exchange. The aesthetic aims for a "developer-tool" feel — high information density, terminal-inspired typography, and subtle, precise interactions.

---

*This project is actively maintained. Please ensure you are running the latest version before initiating a build.*