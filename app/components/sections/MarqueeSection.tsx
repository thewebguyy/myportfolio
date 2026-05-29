'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { projects } from '@/lib/projects'

export function MarqueeSection() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Calculate offset based on scroll position
      const sectionTop = document.getElementById('marquee-section')?.offsetTop || 0
      const newOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3
      setOffset(newOffset)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Initialize
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Duplicate projects to ensure we have enough images to fill the screen
  const rowImages = [...projects, ...projects, ...projects].filter(p => p.image).map(p => p.image)

  return (
    <section id="marquee-section" className="overflow-hidden py-24 bg-background border-b-[0.5px] border-border-wire">
      <div className="flex flex-col gap-8">
        {/* Row 1 */}
        <div 
          className="flex gap-8 whitespace-nowrap w-max"
          style={{ 
            transform: `translate3d(${offset - 400}px, 0, 0)`,
            willChange: 'transform'
          }}
        >
          {rowImages.map((src, i) => (
            <div key={`row1-${i}`} className="relative w-[420px] h-[270px] flex-shrink-0 rounded-2xl overflow-hidden border border-border-wire">
              <div className="absolute inset-0 bg-surface" />
              <Image 
                src={src} 
                alt="Project showcase" 
                fill 
                className="object-cover relative z-10"
                sizes="420px"
              />
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div 
          className="flex gap-8 whitespace-nowrap w-max"
          style={{ 
            transform: `translate3d(${-(offset - 200)}px, 0, 0)`,
            willChange: 'transform'
          }}
        >
          {rowImages.map((src, i) => (
            <div key={`row2-${i}`} className="relative w-[420px] h-[270px] flex-shrink-0 rounded-2xl overflow-hidden border border-border-wire">
              <div className="absolute inset-0 bg-surface" />
              <Image 
                src={src} 
                alt="Project showcase" 
                fill 
                className="object-cover relative z-10"
                sizes="420px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
