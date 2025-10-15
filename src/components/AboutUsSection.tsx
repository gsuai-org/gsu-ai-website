'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { client, urlForImage } from '@/lib/sanity'

interface BoardMember {
  _id: string
  name: string
  year: string
  major: string
  linkedin?: string
  email: string
  profileImage: {
    asset: {
      _ref: string
      _type: string
    }
    _type: string
  } | null
}

export default function AboutUsSection() {
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBoardMembers = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "boardMember"] {
            _id,
            name,
            year,
            major,
            linkedin,
            email,
            profileImage
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
      <section id="about" className="py-20 bg-gradient-to-br from-gsu-blue-900 via-gsu-purple-900 to-gsu-black-600">
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
    <section id="about" className="section-padding bg-gradient-to-br from-gsu-blue-900 via-gsu-purple-900 to-gsu-black-600 relative overflow-hidden">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
          {boardMembers.map((member) => (
            <div key={member._id} className="glass-card rounded-2xl overflow-hidden group">
              {/* Profile Image */}
              <div className="relative h-72 bg-gradient-to-br from-gsu-blue-100 to-gsu-blue-200 overflow-hidden">
                {member.profileImage ? (
                  <Image
                    src={urlForImage(member.profileImage).width(300).height(300).url()}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-28 h-28 bg-gradient-to-br from-gsu-blue-300 to-gsu-blue-400 rounded-full flex items-center justify-center shadow-soft">
                      <svg className="w-14 h-14 text-gsu-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>

              {/* Member Info */}
              <div className="p-6 lg:p-8">
                <h3 className="font-heading font-bold text-xl text-gsu-white mb-2 leading-tight">
                  {member.name}
                </h3>
                
                <p className="text-gsu-lime-500 font-semibold text-lg mb-2">
                  {formatYear(member.year)}
                </p>
                
                <p className="text-gsu-white/70 text-base mb-6 leading-relaxed">
                  {member.major}
                </p>

                {/* Contact Links */}
                <div className="flex space-x-3">
                  <a 
                    href={`mailto:${member.email}`}
                    className="flex-1 glass-effect text-gsu-white hover:text-gsu-lime-500 px-4 py-3 rounded-xl font-semibold hover:border-gsu-lime-500/50 transition-all duration-200 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </a>
                  
                  {member.linkedin && (
                    <a 
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-effect text-gsu-white hover:text-gsu-lime-500 px-4 py-3 rounded-xl font-semibold hover:border-gsu-lime-500/50 transition-all duration-200 flex items-center justify-center"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
