import { TitlePage } from './components/principia/TitlePage'
import { FeaturedWork } from './components/principia/FeaturedWork'
import { Background } from './components/principia/Background'
import { EngineeringIntro } from './components/principia/EngineeringIntro'
import { Chapter } from './components/principia/Chapter'
import { Colophon } from './components/principia/Colophon'
import { principles } from '@/lib/principles'

export default function HomePage() {
  return (
    <div style={{ background: 'var(--paper)' }}>
      <TitlePage />
      <FeaturedWork />
      <Background />
      <EngineeringIntro />
      {principles.map((p, i) => (
        <Chapter
          key={p.id}
          principle={p}
          isLast={i === principles.length - 1}
        />
      ))}
      <Colophon />
    </div>
  )
}
