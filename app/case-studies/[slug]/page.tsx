import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { projects, getProjectById } from '@/lib/projects'
import { ArrowLeftIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import ServiceBridgeArchitecture from '@/app/components/visuals/ServiceBridgeArchitecture'
import ServiceBridgeMonitoring from '@/app/components/monitoring/ServiceBridgeMonitoring'

/**
 * Individual Case Study Page
 * Detailed STAR-method breakdown of a single project
 */

// Generate static params for all projects
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const project = getProjectById(params.slug)

  if (!project) {
    return {
      title: 'Case Study Not Found',
    }
  }

  return {
    title: `${project.title} - Case Study`,
    description: project.longDescription,
    openGraph: {
      title: `${project.title} - Olabode Olusegun`,
      description: project.longDescription,
      images: [project.image],
    },
  }
}

export default function CaseStudyPage({
  params
}: {
  params: { slug: string }
}) {
  const project = getProjectById(params.slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-primary 
                     transition-colors mb-8"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Case Studies
          </Link>

          <div className="mb-8">
            <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-semibold rounded-full">
              {project.category}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {project.title}
          </h1>

          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            {project.longDescription}
          </p>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary inline-flex items-center gap-2"
              >
                View Live Site
                <ArrowTopRightOnSquareIcon className="w-5 h-5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary inline-flex items-center gap-2"
              >
                View on GitHub
                <ArrowTopRightOnSquareIcon className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Project Image */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Metrics */}
      {project.metrics && (
        <section className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Key Metrics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {Object.entries(project.metrics).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                      {value || ''}
                    </div>
                    <div className="text-sm text-gray-400 uppercase tracking-wider">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* STAR Method Content */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose prose-invert prose-primary max-w-none">
          <STARContent projectId={project.id} />
        </div>
      </section>

      {/* Tech Stack */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-white">Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {project.tech.map((tech: string) => (
              <span
                key={tech}
                className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg border border-gray-700 
                         hover:border-primary/50 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-white">More Case Studies</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects
              .filter(p => p.id !== project.id)
              .slice(0, 2)
              .map(relatedProject => (
                <Link
                  key={relatedProject.id}
                  href={`/case-studies/${relatedProject.id}`}
                  className="glass rounded-xl p-6 hover:border-primary/50 transition-all group"
                >
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors">
                    {relatedProject.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {relatedProject.description}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  )
}

/**
 * STAR Method Content Component
 * Dynamic content based on project
 */
function STARContent({ projectId }: { projectId: string }) {
  // In a real implementation, this would fetch from MDX files or a CMS
  // For now, we'll use inline content for ServiceBridge as an example

  if (projectId === 'servicebridge') {
    return (
      <>
        <div className="glass rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4">Situation</h2>
          <p className="text-gray-300 leading-relaxed">
            Small businesses and service providers in Lagos, Nigeria struggled with fragmented
            communication channels for connecting with customers. The existing ecosystem relied
            on WhatsApp groups, Facebook posts, and word-of-mouth, leading to inefficiencies,
            missed opportunities, and trust issues.
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            Market research indicated potential for <strong className="text-primary">5,000+
              service providers</strong> and <strong className="text-primary">50,000+ customers
            </strong> in the Lagos metropolitan area alone.
          </p>
        </div>

        <div className="glass rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4">Task</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Design and build a real-time marketplace platform that could:
          </p>
          <ul className="space-y-2 text-gray-300">
            <li>✓ Handle <strong className="text-primary">10,000+ concurrent users</strong> without performance degradation</li>
            <li>✓ Provide <strong className="text-primary">sub-200ms response times</strong> for search and matching</li>
            <li>✓ Maintain <strong className="text-primary">99.9% uptime</strong> for business-critical operations</li>
            <li>✓ Securely process payments with escrow protection</li>
            <li>✓ Enable real-time communication between providers and customers</li>
          </ul>
        </div>

        <div className="glass rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4">Action</h2>

          <h3 className="text-2xl font-semibold mb-3 text-primary">Architecture & System Design</h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            Implemented a microservices architecture designed for high availability and low latency. The system centers around a custom <strong>ServiceBridge Core</strong> which handles message routing and state synchronization across distributed worker nodes.
          </p>

          <ServiceBridgeArchitecture />

          <h3 className="text-2xl font-semibold mb-3 text-primary mt-12">Infrastructure & Data Flow</h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            The system employs a distributed message queue (BullMQ on Redis) to handle background tasks such as payment verification, email notifications, and matching updates, ensuring the main request-response cycle remains sub-100ms.
          </p>
          <ul className="space-y-3 text-gray-300 mb-6">
            <li>
              <strong className="text-white">Real-time Matching Engine:</strong> Built with
              Socket.io for WebSocket connections, enabling instant notifications when service
              providers became available or customers posted new requests.
            </li>
            <li>
              <strong className="text-white">Caching Layer:</strong> Integrated Redis for
              session management and frequently-accessed data, achieving a <strong className="text-primary">
                40% reduction in database queries</strong> and significantly improved response times.
            </li>
            <li>
              <strong className="text-white">Database Architecture:</strong> PostgreSQL with
              read replicas for high-traffic queries, write-master for transactions, and proper
              indexing strategies for search optimization.
            </li>
            <li>
              <strong className="text-white">Payment Integration:</strong> Stripe Connect with
              custom escrow logic to hold funds until service completion, protecting both parties.
            </li>
          </ul>

          <h3 className="text-2xl font-semibold mb-3 text-primary">AI Matching Engineering</h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            To move beyond simple keyword matching, I implemented a semantic matching engine using a multi-stage approach:
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-5 bg-white/5 rounded-xl border border-white/10">
              <h4 className="text-white font-bold mb-2">RAG vs. Fine-tuning Tradeoff</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                We opted for a <strong>Hybrid RAG (Retrieval-Augmented Generation)</strong> approach using vector embeddings. While fine-tuning would provide domain specificity, RAG allowed us to maintain real-time service catalogs without expensive retraining cycles.
              </p>
            </div>
            <div className="p-5 bg-white/5 rounded-xl border border-white/10">
              <h4 className="text-white font-bold mb-2">Transformer Architecture</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                Used <strong>Sentence-BERT (SBERT)</strong> for generating dense vector embeddings of service requests. These are stored in a Pinecone vector database, allowing for sub-50ms similarity search against 100k+ provider profiles.
              </p>
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed mb-4 italic text-sm">
            Technical Evaluation: Achieved <strong>NDCG@5 of 0.84</strong> and <strong>Precision@1 of 0.72</strong> during blind testing against historical manual matches.
          </p>
          <ul className="space-y-2 text-gray-300 mb-6">
            <li>✓ Implemented collaborative filtering using TensorFlow.js for user preferences</li>
            <li>✓ Integrated GPT-4 via prompt engineering for intent classification and entity extraction</li>
            <li>✓ Built a custom evaluation pipeline to measure Hallucination Rates and Relevance</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-3 text-primary">Production Reliability & Observability</h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            Building for 10,000+ concurrent users required robust monitoring and failover strategies:
          </p>

          <ServiceBridgeMonitoring />

          <ul className="space-y-2 text-gray-300">
            <li>✓ <strong>Observability:</strong> Implemented Datadog APM for distributed tracing and New Relic for frontend error tracking.</li>
            <li>✓ <strong>Scaling:</strong> Horizontal Pod Autoscaling (HPA) in Kubernetes based on CPU and request count triggers.</li>
            <li>✓ <strong>Resilience:</strong> Implemented Circuit Breaker patterns for external API dependencies (Stripe/OpenAI) using Hystrix-style logic.</li>
            <li>✓ <strong>HA Database:</strong> Multi-AZ deployment with automated failover and 15-minute point-in-time recovery (PITR).</li>
          </ul>
        </div>

        <div className="glass rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-4">Result</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="border-l-4 border-primary pl-4">
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-gray-400">Active users within 6 months of launch</div>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-gray-400">Uptime maintained during peak hours</div>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <div className="text-4xl font-bold text-primary mb-2">$500K+</div>
              <div className="text-gray-400">In transactions processed through the platform</div>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <div className="text-4xl font-bold text-primary mb-2">40%</div>
              <div className="text-gray-400">Reduction in average booking time (5min → 3min)</div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-3 text-white">Team & Collaboration</h3>
          <p className="text-gray-300 leading-relaxed mb-6">
            Developed within a cross-functional team of 12 engineers. I served as the <strong>Lead System Architect</strong>, where my responsibilities included:
          </p>
          <ul className="space-y-4 text-gray-300">
            <li className="flex gap-4 p-4 glass border-white/5 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">🤝</div>
              <div>
                <h4 className="font-bold text-white tracking-tight">Mentorship & Peer Review</h4>
                <p className="text-sm">Led 100+ PR reviews and mentored 3 junior developers on backend best practices and distributed system principles.</p>
              </div>
            </li>
            <li className="flex gap-4 p-4 glass border-white/5 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">🔄</div>
              <div>
                <h4 className="font-bold text-white tracking-tight">Agile Workflow</h4>
                <p className="text-sm">Active participant in daily stand-ups, sprint planning, and quarterly technical roadmapping workshops with stakeholders.</p>
              </div>
            </li>
          </ul>

          <p className="text-gray-300 leading-relaxed mt-8">
            The platform successfully transformed how service providers and customers connect
            in Lagos, establishing a new standard for trust and efficiency in the local service
            marketplace. The technical architecture has proven scalable, with the system handling
            peak loads during promotional events without degradation.
          </p>
        </div>
      </>
    )
  }

  // Default content for other projects
  return (
    <div className="glass rounded-2xl p-8">
      <p className="text-gray-300 leading-relaxed">
        Detailed case study content coming soon. For now, you can explore the live project
        and codebase to see the implementation details.
      </p>
    </div>
  )
}