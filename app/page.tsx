import { TitlePage } from './components/principia/TitlePage'
import { ChapterIndex } from './components/principia/ChapterIndex'
import { Chapter } from './components/principia/Chapter'
import { Colophon } from './components/principia/Colophon'
import { principles } from '@/lib/principles'

export default function HomePage() {
  return (
    <div style={{ background: 'var(--paper)' }}>
      <TitlePage />
      <ChapterIndex />
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
