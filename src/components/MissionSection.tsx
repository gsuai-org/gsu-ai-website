'use client'

import { useEffect, useState } from 'react'
import { client } from '@/lib/sanity'

interface MissionData {
  title: string
  subtitle: string
  heading1: string
  heading2: string
  memberCount: number
  projectCount: number
  description: string
}

export default function MissionSection() {
  const [missionData, setMissionData] = useState<MissionData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMissionData = async () => {
      try {
        const data = await client.fetch(`*[_type == "mission"][0]`)
        setMissionData(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMissionData()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gsu-blue-900 via-gsu-purple-900 to-gsu-black-600">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gsu-white/20 rounded mb-4 w-1/2 mx-auto"></div>
            <div className="h-6 bg-gsu-white/20 rounded mb-8 w-2/3 mx-auto"></div>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="h-40 bg-gsu-white/20 rounded"></div>
              <div className="h-40 bg-gsu-white/20 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!missionData) {
    return (
      <section className="py-20 bg-gradient-to-br from-gsu-blue-900 via-gsu-purple-900 to-gsu-black-600">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gsu-white/20 rounded mb-4 w-1/2 mx-auto"></div>
            <div className="h-6 bg-gsu-white/20 rounded mb-8 w-2/3 mx-auto"></div>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="h-40 bg-gsu-white/20 rounded"></div>
              <div className="h-40 bg-gsu-white/20 rounded"></div>
            </div>
          </div>
          <p className="text-gsu-white/70 mt-4">Loading mission data from Sanity...</p>
        </div>
      </section>
    )
  }

  return (
    <section id="mission" className="section-padding bg-gradient-to-br from-gsu-blue-900 via-gsu-purple-900 to-gsu-black-600 relative overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="animate-slide-up">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gsu-white mb-6 leading-tight">
              {missionData.title}
            </h2>
            <p className="text-xl lg:text-2xl text-gsu-white/80 max-w-4xl mx-auto leading-relaxed">
              {missionData.subtitle}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-20">
          <div className="glass-card rounded-3xl p-8 lg:p-12 text-center group">
            <div className="text-6xl lg:text-7xl font-bold text-gsu-lime-500 mb-4 group-hover:scale-110 transition-transform duration-300">
              {missionData.memberCount}+
            </div>
            <h3 className="text-2xl lg:text-3xl font-heading font-semibold text-gsu-white mb-6">
              {missionData.heading1}
            </h3>
            <p className="text-gsu-white/70 text-lg leading-relaxed">
              Active members learning and growing together in the field of artificial intelligence
            </p>
          </div>
          <div className="glass-card rounded-3xl p-8 lg:p-12 text-center group">
            <div className="text-6xl lg:text-7xl font-bold text-gsu-lime-500 mb-4 group-hover:scale-110 transition-transform duration-300">
              {missionData.projectCount}+
            </div>
            <h3 className="text-2xl lg:text-3xl font-heading font-semibold text-gsu-white mb-6">
              {missionData.heading2}
            </h3>
            <p className="text-gsu-white/70 text-lg leading-relaxed">
              Innovative projects and research initiatives completed by our members
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="glass-card rounded-3xl p-8 md:p-12 lg:p-16">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-xl lg:text-2xl leading-relaxed text-gsu-white/90 font-light">
              {missionData.description}
            </p>
          </div>
        </div>

        {/* Mission Points */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 lg:gap-12">
          <div className="text-center group">
            <div className="glass-effect rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg className="w-10 h-10 text-gsu-lime-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h4 className="font-heading font-bold text-xl text-gsu-white mb-4">Education</h4>
            <p className="text-gsu-white/70 text-lg leading-relaxed">Workshops, lectures, and hands-on learning experiences</p>
          </div>
          <div className="text-center group">
            <div className="glass-effect rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg className="w-10 h-10 text-gsu-lime-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h4 className="font-heading font-bold text-xl text-gsu-white mb-4">Innovation</h4>
            <p className="text-gsu-white/70 text-lg leading-relaxed">Cutting-edge projects and research initiatives</p>
          </div>
          <div className="text-center group">
            <div className="glass-effect rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg className="w-10 h-10 text-gsu-lime-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h4 className="font-heading font-bold text-xl text-gsu-white mb-4">Community</h4>
            <p className="text-gsu-white/70 text-lg leading-relaxed">Networking and collaboration opportunities</p>
          </div>
        </div>
      </div>
    </section>
  )
}
