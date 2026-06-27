import { TitlePage } from './components/principia/TitlePage'
import { Background } from './components/principia/Background'
import { Chapter } from './components/principia/Chapter'
import { Colophon } from './components/principia/Colophon'
import { principles } from '@/lib/principles'

export default function HomePage() {
  return (
    <div style={{ background: 'var(--paper)' }}>
      <TitlePage />
      <Background />
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
