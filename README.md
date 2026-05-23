# Olabode Olusegun - Portfolio 2026

A modern, high-fidelity portfolio website showcasing full-stack development expertise, distributed systems architecture, and professional AI engineering integration.

## 🏗️ System Architecture & AI Engineering

This portfolio demonstrates robust software engineering principles applied to web application design and AI integration:

### System & Persistence Design
- **Structured Persistency:** Lightweight data persistence abstraction (`lib/storage.ts`) supporting generated strategy reports with local storage serialization.
- **Fail-safe Rate Limiting:** Rate limiting middleware configured for API routes, falling back gracefully to system defaults if service interfaces are absent.
- **Type-Safe API Boundaries:** Zod request schema validations applied on all API endpoints for strict request/response data compliance.

### Factual AI Engineering
- **Multi-Step Reasoners:** Multi-step strategic analysis pipelines (`services/ai-orchestrator.ts`) instead of simple prompt-reply loops, allowing structured output projection.
- **Robust Error Handling:** Diagnostic wrappers (`lib/openai.ts`) mapping raw LLM and connection errors (timeouts, network drops, rate limits) into clear user-facing messages.
- **AI-Driven Tools:** Full-stack integration of interactive tools (Resume Analyzer, Decision Simulator, Engineering Assistant) using verified models.

## 🧪 Robust Testing Strategy

We follow the "Testing Trophy" methodology to ensure reliability across all critical paths:
- **Unit Tests:** Jest tests for core utility functions and AI data parsing.
- **Integration Tests:** Test coverage for cross-module flows and project filtering.
- **API Tests:** Mock-based testing of Next.js API routes with OpenAI SDK interception.
- **E2E Tests:** Playwright suites covering critical user flows (Case Study exploration, AI Resume Analysis).
- **CI/CD:** Automated GitHub Actions pipeline running `lint`, `type-check`, and `jest` on every PR.

## 🚀 Features

### AI-Powered Components
- **Project Recommender**: GPT-based semantic matching for portfolio projects.
- **Resume Analyzer**: AI-powered skill gap analysis and collaboration finder.
- **Decision Simulator**: Project outcome modeling against operational constraints.
- **Floating Chatbot**: Real-time Q&A assistant for portfolio navigation.

### Interactive Visualizations
- **Skill Radar Chart**: Interactive proficiency visualization across technical domains.
- **System Activity Feed**: Marquee ticker of live simulated and saved system reports.

### Performance & Accessibility
- **Sub-1s Load Time**: Next.js 14 with App Router, image optimization, and code splitting.
- **Dark Mode**: Sovereign terminal center theme with deep navy surfaces and vibrant highlights.

## 🛠️ Tech Stack

### Core
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion

### AI Integration
- **LLM**: OpenAI GPT-4o
- **APIs**: Custom prompt engineering for strategic analysis

### Data Visualization
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: Heroicons

### Deployment
- **Platform**: Vercel Edge Network
- **Analytics**: Vercel Analytics & Speed Insights

## 📦 Installation
```bash
# Clone repository
git clone https://github.com/thewebguyy/portfolio-2026.git
cd portfolio-2026

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Add your OPENAI_API_KEY

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🔑 Environment Variables
```bash
OPENAI_API_KEY=sk-your-api-key-here
NEXT_PUBLIC_SITE_URL=https://olabodeolusegun.com
```

## 🏗️ Project Structure
```
portfolio-2026/
├── app/
│   ├── components/     # React components
│   ├── api/           # API routes
│   ├── case-studies/  # Case study pages
│   └── blog/          # Blog posts
├── lib/               # Utilities and data
└── public/            # Static assets
```

## 🚢 Deployment
```bash
# Build for production
npm run build

# Deploy to Vercel
npx vercel --prod
```

## 📝 License

© 2024-2026 Olabode Olusegun. All rights reserved.

## 📧 Contact

- **Email**: olabodewebdesigns02@gmail.com
- **LinkedIn**: [olabode-olusegun](https://www.linkedin.com/in/olabode-olusegun-8328141bb/)
- **GitHub**: [@thewebguyy](https://github.com/thewebguyy)
- **Twitter**: [@thewebguyy](https://twitter.com/thewebguyy)

---

Built with ❤️ in Lagos, Nigeria 🇳🇬