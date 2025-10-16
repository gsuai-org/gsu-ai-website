'use client'

import { useEffect, useRef, type CSSProperties } from 'react'

const HIGHLIGHT_MASK =
  'radial-gradient(circle 220px at var(--cursor-x) var(--cursor-y), rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.65) 55%, transparent 100%)'

export default function DottedBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (event: MouseEvent) => {
      container.style.setProperty('--cursor-x', `${event.clientX}px`)
      container.style.setProperty('--cursor-y', `${event.clientY}px`)
      container.style.setProperty('--cursor-opacity', '1')
    }

    const handleMouseLeave = (event: MouseEvent) => {
      if (!event.relatedTarget) {
        container.style.setProperty('--cursor-opacity', '0')
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseout', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseout', handleMouseLeave)
    }
  }, [])

  const containerStyle = {
    '--cursor-x': '50vw',
    '--cursor-y': '50vh',
    '--cursor-opacity': '0'
  } as CSSProperties

  const highlightStyle = {
    opacity: 'var(--cursor-opacity)',
    WebkitMaskImage: HIGHLIGHT_MASK,
    maskImage: HIGHLIGHT_MASK,
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    transition: 'opacity 200ms ease-out'
  } as CSSProperties

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[1]"
      style={containerStyle}
    >
      {/* Base dot pattern */}
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(rgba(229,231,235,0.14)_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Hover highlight */}
      <div
        className="absolute inset-0 h-full w-full" 
        style={highlightStyle}
      >
        <div className="absolute inset-0 h-full w-full bg-[radial-gradient(rgba(247,55,79,0.85)_1px,transparent_1px)] [background-size:16px_16px] mix-blend-screen" />
        <div className="absolute inset-0 h-full w-full bg-[radial-gradient(rgba(71,19,150,0.75)_1px,transparent_1px)] [background-size:16px_16px] mix-blend-screen" />
        <div className="absolute inset-0 h-full w-full bg-[radial-gradient(rgba(12,19,79,0.65)_1px,transparent_1px)] [background-size:16px_16px] mix-blend-screen" />
      </div>
    </div>
  )
}

