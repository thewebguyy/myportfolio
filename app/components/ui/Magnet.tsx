'use client'

import React, { useState, useEffect, useRef } from 'react'

interface MagnetProps {
  children: React.ReactNode
  padding?: number
  strength?: number
  className?: string
}

export function Magnet({ children, padding = 150, strength = 3, className = '' }: MagnetProps) {
  const [isActive, setIsActive] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const magnetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!magnetRef.current) return
      
      const { left, top, width, height } = magnetRef.current.getBoundingClientRect()
      const centerX = left + width / 2
      const centerY = top + height / 2
      
      const distX = Math.abs(centerX - e.clientX)
      const distY = Math.abs(centerY - e.clientY)
      
      // Check if within padding box
      if (distX < width / 2 + padding && distY < height / 2 + padding) {
        setIsActive(true)
        setPosition({
          x: (e.clientX - centerX) / strength,
          y: (e.clientY - centerY) / strength
        })
      } else {
        setIsActive(false)
        setPosition({ x: 0, y: 0 })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [padding, strength])

  return (
    <div
      ref={magnetRef}
      className={className}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isActive ? 'transform 0.3s ease-out' : 'transform 0.6s ease-in-out',
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  )
}
