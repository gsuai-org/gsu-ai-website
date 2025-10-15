'use client'

import { useEffect, useState } from 'react'
import { client } from '@/lib/sanity'
import Link from 'next/link'
import ParticleBackground from './ParticleBackground'

interface HomeData {
  title: string
  subtitle: string
}

export default function HomeSection() {
  const [homeData, setHomeData] = useState<HomeData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const data = await client.fetch(`*[_type == "home"][0]`)
        setHomeData(data)
      } catch (error) {
        console.error('Error fetching home data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchHomeData()
  }, [])

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gsu-blue-500">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </section>
    )
  }

  if (!homeData) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gsu-blue-500 to-gsu-blue-700 text-white">
        <div className="text-center px-6 max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-16 bg-white/20 rounded mb-6 w-3/4 mx-auto"></div>
            <div className="h-8 bg-white/20 rounded mb-8 w-2/3 mx-auto"></div>
            <div className="h-12 bg-white/20 rounded w-48 mx-auto"></div>
          </div>
          <p className="text-gsu-blue-100 mt-4">Loading content from Sanity...</p>
        </div>
      </section>
    )
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0 z-[-1]">
        <ParticleBackground />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-600/70 via-blue-800/80 to-blue-900/90"></div>

      {/* Content */}
      <div className="relative z-[1] text-center container-custom max-w-6xl mx-auto text-white">
        <div className="animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold mb-6 text-shadow-lg leading-tight">
            {homeData.title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-12 text-gsu-blue-100 max-w-4xl mx-auto leading-relaxed font-light">
            {homeData.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="btn-secondary text-lg px-8 py-4 rounded-xl shadow-large hover:scale-105 transform transition-all duration-300">
              <Link href="https://pin.gsu.edu/organization/ai-club" target="_blank" rel="noopener noreferrer">Join Us Today</Link>  
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
