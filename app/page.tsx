import { Hero } from './components/sections/Hero'
import { BentoGrid } from './components/sections/BentoGrid'
import { CaseStudies } from './components/sections/CaseStudies'
import { Testimonials } from './components/sections/Testimonials'
import { AIProjectRecommender } from './components/ai/AIProjectRecommender'
import { ResumeAnalyzer } from './components/ai/ResumeAnalyzer'
import { SkillRadar } from './components/viz/SkillRadar'
import { Playground } from './components/Playground'
import { ContactSection } from './components/sections/ContactSection'
import { Footer } from './components/sections/Footer'
import { FloatingChatbot } from './components/ai/FloatingChatbot'

/**
 * Homepage Component
 * Assembles all sections in strategic order for maximum engagement
 * 
 * Section Flow:
 * 1. Hero - Hook with value proposition
 * 2. BentoGrid - Quick project overview
 * 3. CaseStudies - Deep dives with metrics
 * 4. Testimonials - Client feedback and social proof
 * 5. AIProjectRecommender - Interactive AI demo #1
 * 6. SkillRadar - Technical proficiency visualization
 * 7. ResumeAnalyzer - Interactive AI demo #2
 * 8. Playground - API testing environment
 * 9. ContactSection - Call to action
 * 10. Footer - Site information
 * 
 * Additional: FloatingChatbot (always visible)
 */
export default function HomePage() {
  return (
    <div className="relative">
      {/* Main Content */}
      <Hero />
      <BentoGrid />
      <CaseStudies />
      <Testimonials />
      <AIProjectRecommender />
      <SkillRadar />
      <ResumeAnalyzer />
      <Playground />
      <ContactSection />
      <Footer />

      {/* Floating Chatbot - Always accessible */}
      <FloatingChatbot />
    </div>
  )
}