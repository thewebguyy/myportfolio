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

/**
 * Strategy & Audit Interface
 * Repositioned for consulting, audit, and strategy.
 * 
 * Section Flow:
 * 1. Hero - Strategy Hook
 * 2. ConsultingInterface - Flagship AI Audit Tool
 * 3. Testimonials - Social Proof (Enterprise)
 * 4. BentoGrid - Strategic Engagements
 * 5. CaseStudies - Audit Deep Dives
 * 6. ResumeAnalyzer - Talent Intelligence
 * 7. AIProjectRecommender - Opportunity Engine
 * 8. SkillRadar - Competency Mapping
 * 9. Playground - Technical Sandbox
 * 10. Contact - Consultation Booking
 */
export default function HomePage() {
  return (
    <div className="relative bg-secondary">
      {/* Main Content */}
      <Hero />
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