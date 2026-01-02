import { Hero } from './components/sections/Hero'
import { BentoGrid } from './components/sections/BentoGrid'
import { CaseStudies } from './components/sections/CaseStudies'
import { AIProjectRecommender } from './components/ai/AIProjectRecommender'
import { ResumeAnalyzer } from './components/ai/ResumeAnalyzer'
import { SkillRadar } from './components/viz/SkillRadar'
import { Playground } from './components/Playground'
import { ContactSection } from './components/sections/ContactSection'
import { Footer } from './components/sections/Footer'
import { FloatingChatbot } from './components/ai/FloatingChatbot'
import { ThemeToggle } from './components/ui/ThemeToggle'

/**
 * Homepage Component
 * Assembles all sections in strategic order for maximum engagement
 * 
 * Section Flow:
 * 1. Hero - Hook with value proposition
 * 2. BentoGrid - Quick project overview
 * 3. CaseStudies - Deep dives with metrics
 * 4. AIProjectRecommender - Interactive AI demo #1
 * 5. SkillRadar - Technical proficiency visualization
 * 6. ResumeAnalyzer - Interactive AI demo #2
 * 7. Playground - API testing environment
 * 8. ContactSection - Call to action
 * 9. Footer - Site information
 * 
 * Additional: FloatingChatbot (always visible)
 */
export default function HomePage() {
  return (
    <div className="relative">
      {/* Fixed Theme Toggle */}
      <div className="fixed top-6 right-6 z-40 no-print">
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <Hero />
      <BentoGrid />
      <CaseStudies />
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