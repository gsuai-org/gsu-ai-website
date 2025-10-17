'use client'

import { useEffect, useState } from 'react'
import { client } from '@/lib/sanity'

interface BoardMember {
  _id: string
  name: string
  position: string
  year: string
  major: string
  linkedin?: string
  email: string
  bio?: string
  interests?: string[]
}

export default function EBoardSection() {
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBoardMembers = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "boardMember"] {
            _id,
            name,
            position,
            year,
            major,
            linkedin,
            email,
            bio,
            interests
          }`
        )
        setBoardMembers(data)
      } catch (error) {
        console.error('Error fetching board members:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBoardMembers()
  }, [])

  if (boardMembers.length === 0 && !loading) {
    return (
      <section id="e-board" className="py-20 bg-gradient-to-br from-gsu-blue-900 via-gsu-purple-900 to-gsu-black-600">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gsu-white mb-4">
              Meet Our E-Board
            </h2>
            <p className="text-xl text-gsu-white/80 max-w-3xl mx-auto mb-8">
              No board members are currently listed. Check back soon for updates!
            </p>
            <div className="bg-gsu-black-600/50 rounded-xl p-8 border border-gsu-purple-500/30">
              <p className="text-gsu-white/70">Loading board member data from Sanity...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const formatYear = (year: string) => {
    const yearMap: { [key: string]: string } = {
      'freshman': 'Freshman',
      'sophomore': 'Sophomore', 
      'junior': 'Junior',
      'senior': 'Senior',
      'graduate': 'Graduate Student',
      'alumni': 'Alumni'
    }
    return yearMap[year] || year
  }

  const formatPosition = (position: string) => {
    const positionMap: { [key: string]: string } = {
      'president': 'President',
      'vice-president': 'Vice President',
      'secretary': 'Secretary',
      'treasurer': 'Treasurer',
      'technical-lead': 'Technical Lead',
      'events-coordinator': 'Events Coordinator',
      'marketing-director': 'Marketing Director',
      'outreach-coordinator': 'Outreach Coordinator',
      'board-member': 'Board Member'
    }
    return positionMap[position] || position
  }

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gsu-blue-900 via-gsu-purple-900 to-gsu-black-600">
        <div className="max-w-6xl mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gsu-white/20 rounded mb-4 w-1/2 mx-auto"></div>
            <div className="h-6 bg-gsu-white/20 rounded mb-8 w-2/3 mx-auto"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-80 bg-gsu-white/20 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="e-board" className="section-padding relative overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="animate-slide-up">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gsu-white mb-6 leading-tight">
              Meet Our E-Board
            </h2>
            <p className="text-xl lg:text-2xl text-gsu-white/80 max-w-4xl mx-auto leading-relaxed">
              The passionate leaders driving innovation and building community in AI at GSU
            </p>
          </div>
        </div>

        {/* Board Members Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {boardMembers.map((member) => (
            <article
              key={member._id}
              className="glass-card rounded-2xl overflow-hidden group hover:scale-105 transition-transform duration-300"
            >
              {/* Header with Position Badge */}
              <div className="relative bg-gradient-to-br from-gsu-blue-500/20 to-gsu-purple-500/20 p-6 border-b border-gsu-white/10">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block px-3 py-1 bg-gsu-lime-500/20 text-gsu-lime-500 rounded-full text-sm font-semibold">
                    {formatPosition(member.position)}
                  </span>
                  <div className="w-12 h-12 bg-gradient-to-br from-gsu-lime-500/20 to-gsu-lime-500/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-gsu-lime-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>

                <h3 className="font-heading font-bold text-xl text-gsu-white mb-2 leading-tight">
                  {member.name}
                </h3>
                
                <div className="space-y-1">
                  <p className="text-gsu-lime-500 font-semibold text-sm">
                    {formatYear(member.year)}
                  </p>
                  <p className="text-gsu-white/70 text-sm">
                    {member.major}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Bio */}
                {member.bio && (
                  <p className="text-gsu-white/80 text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>
                )}

                {/* Interests Pills */}
                {member.interests && member.interests.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-gsu-white/90 font-semibold text-xs uppercase tracking-wide mb-3">
                      Interests
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {member.interests.map((interest, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gsu-white/10 text-gsu-white/80 rounded-full text-xs font-medium hover:bg-gsu-lime-500/20 hover:text-gsu-lime-500 transition-colors"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Links */}
                <div className="flex gap-2">
                  <a 
                    href={`mailto:${member.email}`}
                    className="flex-1 glass-effect text-gsu-white/90 hover:text-gsu-lime-500 px-3 py-2 rounded-lg font-medium hover:border-gsu-lime-500/50 transition-all duration-200 flex items-center justify-center text-sm"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </a>
                  
                  {member.linkedin && (
                    <a 
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-effect text-gsu-white/90 hover:text-gsu-lime-500 px-3 py-2 rounded-lg font-medium hover:border-gsu-lime-500/50 transition-all duration-200 flex items-center justify-center"
                      title="LinkedIn Profile"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

