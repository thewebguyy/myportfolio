# Olabode Olusegun - Portfolio 2026

Modern, AI-powered portfolio website showcasing full-stack development expertise, distributed systems architecture, and deep AI engineering integration.

## 🏗️ System Architecture & AI Engineering

This portfolio demonstrates more than just frontend development; it showcases a deep understanding of distributed systems and specialized AI engineering:

### Distributed Systems: ServiceBridge
- **Real-time Pipeline:** Sub-200ms latency matching engine using Socket.io and Redis cluster for session persistence and pub/sub.
- **Data Integrity:** PostgreSQL with multi-AZ read-replicas for high-traffic scalability and data resilience.
- **Monitoring & Observability:** Integrated Datadog APM for distributed tracing and New Relic for full-stack visibility.

### AI Engineering beyond API Consumption
- **Hybrid RAG Strategy:** Implemented Retrieval-Augmented Generation using Pinecone vector search (Sentence-BERT embeddings) for intent-based projects and service matching.
- **Evaluation Framework:** Custom evaluation pipeline measuring NDCG@5 (0.84) and Precision@1 (0.72) to objectively validate AI relevance.
- **RAG vs. Fine-tuning Tradeoffs:** Expert transition from static prompts to dynamic hybrid RAG to balance costs and real-time accuracy.

## 🧪 Robust Testing Strategy

We follow the "Testing Trophy" methodology to ensure reliability across all critical paths:
- **Unit Tests:** Jest tests for core utility functions and AI data parsing.
- **Integration Tests:** Test coverage for cross-module flows and project filtering.
- **API Tests:** Mock-based testing of Next.js API routes with OpenAI SDK interception.
- **E2E Tests:** Playwright suites covering critical user flows (Case Study exploration, AI Resume Analysis).
- **CI/CD:** Automated GitHub Actions pipeline running `lint`, `type-check`, and `jest` on every PR.

## 🚀 Features

### AI-Powered Components
- **Project Recommender**: GPT-4 semantic matching for portfolio projects
- **Resume Analyzer**: AI-powered skill gap analysis and collaboration finder
- **Floating Chatbot**: Real-time Q&A assistant for portfolio navigation

### Interactive Visualizations
- **Skill Radar Chart**: Interactive proficiency visualization across technical domains
- **API Playground**: Live testing environment for AI endpoints

### Performance Optimizations
- **Sub-1s Load Time**: Next.js 14 with App Router, image optimization, code splitting
- **WCAG 2.2 Level AA**: Full accessibility compliance with keyboard navigation
- **Dark Mode**: System preference detection with smooth transitions

## 🛠️ Tech Stack

### Core
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion

### AI Integration
- **LLM**: OpenAI GPT-4 Turbo
- **APIs**: Custom prompt engineering for semantic analysis

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

## 📊 Performance Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Lighthouse Performance | 100 | 100 |
| First Contentful Paint | <1.0s | 0.8s |
| Largest Contentful Paint | <1.5s | 1.2s |
| Time to Interactive | <2.0s | 1.8s |
| Accessibility Score | 100 | 100 |

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