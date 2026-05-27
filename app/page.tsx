import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Manifesto } from './components/sections/Manifesto'
import { CaseStudies } from './components/sections/CaseStudies'
import { SkillsGrid } from './components/sections/SkillsGrid'
import { AIShowcase } from './components/sections/AIShowcase'
import { BlogSection } from './components/sections/BlogSection'
import { Footer } from './components/sections/Footer'

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-background">
      <Hero />
      <About />
      <Manifesto />
      <CaseStudies />
      <SkillsGrid />
      <AIShowcase />
      <BlogSection />
      <Footer />
    </main>
  )
}