'use client'

import { useEffect, useState } from 'react'
import { client } from '@/lib/sanity'
import Link from 'next/link'

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
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gsu-blue-900 via-gsu-purple-900 to-gsu-black-600">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gsu-lime-500"></div>
      </section>
    )
  }

  if (!homeData) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center text-gsu-white bg-gradient-to-br from-gsu-blue-900 via-gsu-purple-900 to-gsu-black-600">
        <div className="text-center px-6 max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-16 bg-gsu-white/20 rounded mb-6 w-3/4 mx-auto"></div>
            <div className="h-8 bg-gsu-white/20 rounded mb-8 w-2/3 mx-auto"></div>
            <div className="h-12 bg-gsu-white/20 rounded w-48 mx-auto"></div>
          </div>
          <p className="text-gsu-white/70 mt-4">Loading content</p>
        </div>
      </section>
    )
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particle Background - DISABLED */}
      {/* <div className="absolute inset-0 z-[-1]">
        <ParticleBackground />
      </div> */}

      {/* Content */}
      <div className="relative text-center container-custom max-w-6xl mx-auto text-gsu-white">
        <div className="animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold mb-6 text-shadow-lg leading-tight text-gsu-white">
            {homeData.title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-12 text-gsu-white/90 max-w-4xl mx-auto leading-relaxed font-light">
            {homeData.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="https://pin.gsu.edu/organization/ai-club" target="_blank" rel="noopener noreferrer" className="glass-effect text-gsu-white hover:text-gsu-lime-500 px-8 py-4 rounded-xl font-semibold hover:border-gsu-lime-500/50 transition-all duration-200 text-lg">
              Join Us Today
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
