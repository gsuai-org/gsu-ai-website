'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { client, urlForImage } from '@/lib/sanity'

interface HomeData {
  title: string
  subtitle: string
  heroImage: {
    asset: {
      _ref: string
      _type: string
    }
    _type: string
  }
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
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={urlForImage(homeData.heroImage).width(1920).height(1080).url()}
          alt="GSU AI Club Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gsu-blue-900/85 via-gsu-blue-800/75 to-gsu-blue-700/65"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center container-custom max-w-6xl mx-auto text-white">
        <div className="animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold mb-6 text-shadow-lg leading-tight">
            {homeData.title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-12 text-gsu-blue-100 max-w-4xl mx-auto leading-relaxed font-light">
            {homeData.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="btn-secondary text-lg px-8 py-4 rounded-xl shadow-large hover:scale-105 transform transition-all duration-300">
              Join Us Today
            </button>
            <button className="btn-outline text-lg px-8 py-4 rounded-xl border-white text-white hover:bg-white hover:text-gsu-blue-900 transition-all duration-300 hover:scale-105 transform">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center text-white/80 hover:text-white transition-colors cursor-pointer">
          <span className="text-sm font-medium mb-2">Scroll to explore</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
