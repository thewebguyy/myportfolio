import { Hero } from './components/sections/Hero'
import { BentoGrid } from './components/sections/BentoGrid'
import { CaseStudies } from './components/sections/CaseStudies'
import { Testimonials } from './components/sections/Testimonials'
import { AIProjectRecommender } from './components/ai/AIProjectRecommender'
import { ResumeAnalyzer } from './components/ai/ResumeAnalyzer'
import { ConsultingInterface } from './components/ai/ConsultingInterface'
import { SkillRadar } from './components/viz/SkillRadar'
import { Playground } from './components/Playground'
import { ContactSection } from './components/sections/ContactSection'
import { Footer } from './components/sections/Footer'
import { FloatingChatbot } from './components/ai/FloatingChatbot'
import { SystemStatus } from './components/ui/SystemStatus'

/**
 * Strategy & Audit Interface
 * Repositioned for consulting, audit, and strategy.
 */
export default function HomePage() {
  return (
    <div className="relative bg-secondary">
      {/* Main Content */}
      <Hero />
      <SystemStatus />
      <ConsultingInterface />
      <Testimonials />
      <BentoGrid />
      <CaseStudies />
      <div className="grid lg:grid-cols-2 bg-gray-950 border-y border-gray-900">
        <ResumeAnalyzer />
        <AIProjectRecommender />
      </div>
      <SkillRadar />
      <Playground />
      <ContactSection />
      <Footer />

      {/* Floating Strategy Advisor */}
      <FloatingChatbot />
    </div>
  )
}