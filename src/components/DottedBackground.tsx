'use client'

import { useEffect, useRef } from 'react'

export default function DottedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePosRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to cover entire document
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = document.documentElement.scrollHeight || document.body.scrollHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('scroll', resizeCanvas)

    // Mouse tracking with scroll offset
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { 
        x: e.clientX, 
        y: e.clientY + window.scrollY 
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)

    // Dot grid configuration
    const dotSpacing = 20 // Space between dots
    const dotRadius = 1 // Dot size
    const hoverRadius = 150 // Radius of hover effect

    // Draw dots
    const drawDots = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const cols = Math.ceil(canvas.width / dotSpacing)
      const rows = Math.ceil(canvas.height / dotSpacing)

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * dotSpacing
          const y = j * dotSpacing

          // Calculate distance from mouse
          const dx = mousePosRef.current.x - x
          const dy = mousePosRef.current.y - y
          const distance = Math.sqrt(dx * dx + dy * dy)

          ctx.beginPath()
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2)

          if (distance < hoverRadius) {
            // Gradient effect on hover
            const intensity = 1 - (distance / hoverRadius)
            
            // Create gradient from dark pink to purple to navy blue
            const r = Math.floor(139 + (226 - 139) * intensity) // Pink-ish
            const g = Math.floor(12 + (90 - 12) * intensity)
            const b = Math.floor(168 + (102 - 168) * intensity) // Purple-ish
            
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${intensity * 0.8})`
            ctx.fill()
          } else {
            // Default faint gray dots
            ctx.fillStyle = 'rgba(200, 200, 200, 0.15)'
            ctx.fill()
          }
        }
      }

      requestAnimationFrame(drawDots)
    }

    drawDots()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('scroll', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full pointer-events-none"
      style={{ zIndex: 1, height: '100%' }}
    />
  )
}

