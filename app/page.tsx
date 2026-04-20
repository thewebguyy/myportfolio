import { Hero } from './components/sections/Hero'
import { BentoGrid } from './components/sections/BentoGrid'
import { AIShowcase } from './components/sections/AIShowcase'
import { CaseStudies } from './components/sections/CaseStudies'
import { SkillsGrid } from './components/sections/SkillsGrid'
import { BlogSection } from './components/sections/BlogSection'
import { Testimonials } from './components/sections/Testimonials'
import { ContactSection } from './components/sections/ContactSection'
import { Footer } from './components/sections/Footer'

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <Hero />
      <BentoGrid />
      <AIShowcase />
      <CaseStudies />
      <SkillsGrid />
      <BlogSection />
      <Testimonials />
      <ContactSection />
      <Footer />
    </main>
  )
}