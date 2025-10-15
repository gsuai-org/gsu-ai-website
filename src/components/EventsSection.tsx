'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { client, urlForImage } from '@/lib/sanity'
import Link from 'next/link'

interface Event {
  _id: string
  title: string
  date: string
  location: string
  description: string
  bannerImage?: {
    asset: {
      _ref: string
      _type: string
    }
    _type: string
  }
}

export default function EventsSection() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "event"] | order(date desc)[0..2] {
            _id,
            title,
            date,
            location,
            description,
            bannerImage
          }`
        )
        setEvents(data)
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (events.length === 0 && !loading) {
    return (
      <section id="events" className="py-20 section-padding bg-gradient-to-br from-gsu-blue-900 via-gsu-purple-900 to-gsu-black-600">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gsu-white mb-4">
              Upcoming Events
            </h2>
            <p className="text-xl text-gsu-white/80 max-w-3xl mx-auto mb-8">
              No events are currently scheduled. Check back soon for updates!
            </p>
            <div className="bg-gsu-black-600/50 rounded-xl p-8 border border-gsu-purple-500/30">
              <p className="text-gsu-white/70">Loading events from Sanity...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  if (loading) {
    return (
      <section className="py-20 bg-gsu-black-500">
        <div className="max-w-6xl mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gsu-white/20 rounded mb-4 w-1/2 mx-auto"></div>
            <div className="h-6 bg-gsu-white/20 rounded mb-8 w-2/3 mx-auto"></div>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-gsu-white/20 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="events" className="section-padding bg-gradient-to-br from-gsu-blue-900 via-gsu-purple-900 to-gsu-black-600 relative overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="animate-slide-up">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gsu-white mb-6 leading-tight">
              Upcoming Events
            </h2>
            <p className="text-xl lg:text-2xl text-gsu-white/80 max-w-4xl mx-auto leading-relaxed">
              Join us for workshops, speaker sessions, and hands-on learning experiences
            </p>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {events.map((event) => (
            <div key={event._id} className="glass-card rounded-2xl overflow-hidden group">
              {/* Event Image */}
              <div className="relative h-56 bg-gradient-to-br from-gsu-blue-500 to-gsu-blue-700 overflow-hidden">
                {event.bannerImage ? (
                  <Image
                    src={urlForImage(event.bannerImage).width(400).height(250).url()}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-20 h-20 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4h6m4 0V9a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-2" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Event Content */}
              <div className="p-6 lg:p-8">
                <h3 className="font-heading font-bold text-xl text-gsu-white mb-4 line-clamp-2 leading-tight">
                  {event.title}
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gsu-lime-500">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4h6m4 0V9a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-2" />
                    </svg>
                    <span className="font-semibold">{formatDate(event.date)}</span>
                  </div>

                  <div className="flex items-center text-gsu-lime-500">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold">{formatTime(event.date)}</span>
                  </div>

                  <div className="flex items-center text-gsu-white/60">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>

                <p className="text-gsu-white/70 text-base mb-6 line-clamp-3 leading-relaxed">
                  {event.description}
                </p>

                <button className="w-full glass-effect text-gsu-white hover:text-gsu-lime-500 px-4 py-3 rounded-xl font-semibold hover:border-gsu-lime-500/50 transition-all duration-200 text-center">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="glass-card rounded-3xl p-8 lg:p-12 max-w-2xl mx-auto">
            <h3 className="font-heading font-bold text-2xl text-gsu-white mb-4">
              Stay Updated
            </h3>
            <p className="text-gsu-white/70 text-lg mb-6 leading-relaxed">
              Want to stay updated on all our events and announcements?
            </p>
            <Link href="/newsletter" target="_blank" rel="noopener noreferrer" className="inline-block glass-effect text-gsu-white hover:text-gsu-lime-500 px-4 py-3 rounded-xl font-semibold hover:border-gsu-lime-500/50 transition-all duration-200">
              Join Our Newsletter
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
