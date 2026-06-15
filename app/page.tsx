import { Hero } from './components/sections/Hero'
import { TrustBar } from './components/sections/TrustBar'
import { About } from './components/sections/About'
import { Manifesto } from './components/sections/Manifesto'
import { CaseStudies } from './components/sections/CaseStudies'
import { AIShowcase } from './components/sections/AIShowcase'
import { BlogSection } from './components/sections/BlogSection'
import { CurrentlyBuilding } from './components/sections/CurrentlyBuilding'
import { ContactSection } from './components/sections/ContactSection'
import { Footer } from './components/sections/Footer'

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-background">
      <Hero />
      <TrustBar />
      <About />
      <Manifesto />
      <CaseStudies />
      <AIShowcase />
      <BlogSection />
      <CurrentlyBuilding />
      <ContactSection />
      <Footer />
    </main>
  )
}