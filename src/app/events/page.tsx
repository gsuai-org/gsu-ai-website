'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { client, urlForImage } from '@/lib/sanity'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DottedBackground from '@/components/DottedBackground'

const EVENTS_QUERY = `*[_type == "event"] | order(date desc) {
  _id,
  title,
  date,
  location,
  description,
  bannerImage,
  link
}`

interface Event {
  _id: string
  title: string
  date: string
  location: string
  description: string
  link?: string
  bannerImage?: {
    asset: {
      _ref: string
      _type: string
    }
    _type: string
  }
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all')

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await client.fetch(EVENTS_QUERY)
        setEvents(data)
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

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

  const isUpcoming = (dateString: string) => {
    return new Date(dateString) > new Date()
  }

  const filteredEvents = events.filter(event => {
    if (filter === 'upcoming') return isUpcoming(event.date)
    if (filter === 'past') return !isUpcoming(event.date)
    return true
  })

  if (loading) {
    return (
      <main className="min-h-screen relative bg-gradient-to-br from-gsu-blue-900 via-gsu-purple-900 to-gsu-black-600">
        <DottedBackground />
        <div className="relative z-10">
          <Navbar />
          <section className="pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">
              <div className="animate-pulse">
                <div className="h-12 bg-gsu-white/20 rounded mb-6 w-1/3 mx-auto"></div>
                <div className="h-6 bg-gsu-white/20 rounded mb-12 w-2/3 mx-auto"></div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-96 bg-gsu-white/20 rounded-lg"></div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen relative bg-gradient-to-br from-gsu-blue-900 via-gsu-purple-900 to-gsu-black-600">
      <DottedBackground />
      <div className="relative z-10">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold text-gsu-white mb-6 leading-tight">
                All Events
              </h1>
              <p className="text-xl lg:text-2xl text-gsu-white/80 max-w-3xl mx-auto leading-relaxed">
                Explore all our workshops, speaker sessions, and learning experiences
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <button
                onClick={() => setFilter('all')}
                className={`glass-effect px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                  filter === 'all'
                    ? 'text-gsu-lime-500 border-gsu-lime-500/50'
                    : 'text-gsu-white/90 hover:text-gsu-lime-500'
                }`}
              >
                All Events ({events.length})
              </button>
              <button
                onClick={() => setFilter('upcoming')}
                className={`glass-effect px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                  filter === 'upcoming'
                    ? 'text-gsu-lime-500 border-gsu-lime-500/50'
                    : 'text-gsu-white/90 hover:text-gsu-lime-500'
                }`}
              >
                Upcoming ({events.filter(e => isUpcoming(e.date)).length})
              </button>
              <button
                onClick={() => setFilter('past')}
                className={`glass-effect px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                  filter === 'past'
                    ? 'text-gsu-lime-500 border-gsu-lime-500/50'
                    : 'text-gsu-white/90 hover:text-gsu-lime-500'
                }`}
              >
                Past Events ({events.filter(e => !isUpcoming(e.date)).length})
              </button>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-6">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-20">
                <div className="glass-card rounded-3xl p-12 max-w-2xl mx-auto">
                  <svg className="w-20 h-20 text-gsu-white/40 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4h6m4 0V9a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-2" />
                  </svg>
                  <h3 className="text-2xl font-heading font-bold text-gsu-white mb-4">
                    No {filter !== 'all' ? filter : ''} events found
                  </h3>
                  <p className="text-gsu-white/70 text-lg">
                    Check back soon for updates!
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                {filteredEvents.map((event) => (
                  <article
                    key={event._id}
                    className="glass-card rounded-2xl overflow-hidden group hover:scale-105 transition-transform duration-300"
                  >
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
                      
                      {/* Upcoming/Past Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          isUpcoming(event.date)
                            ? 'bg-gsu-lime-500 text-gsu-black-600'
                            : 'bg-gsu-white/20 text-gsu-white backdrop-blur-sm'
                        }`}>
                          {isUpcoming(event.date) ? 'Upcoming' : 'Past Event'}
                        </span>
                      </div>
                    </div>

                    {/* Event Content */}
                    <div className="p-6 lg:p-8">
                      <h3 className="font-heading font-bold text-xl text-gsu-white mb-4 line-clamp-2 leading-tight">
                        {event.title}
                      </h3>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-gsu-lime-500">
                          <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4h6m4 0V9a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-2" />
                          </svg>
                          <span className="font-semibold text-sm">{formatDate(event.date)}</span>
                        </div>

                        <div className="flex items-center text-gsu-lime-500">
                          <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-semibold text-sm">{formatTime(event.date)}</span>
                        </div>

                        <div className="flex items-start text-gsu-white/60">
                          <svg className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-sm">{event.location}</span>
                        </div>
                      </div>

                      <p className="text-gsu-white/70 text-base mb-6 line-clamp-3 leading-relaxed">
                        {event.description}
                      </p>

                      {event.link ? (
                        <a
                          href={event.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 glass-effect px-4 py-2 rounded-full text-gsu-white/90 font-semibold hover:text-gsu-lime-500 transition-all duration-200"
                        >
                          Learn More
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      ) : (
                        <Link
                          href={`/events/${event._id}`}
                          className="inline-flex items-center gap-2 glass-effect px-4 py-2 rounded-full text-gsu-white/90 font-semibold hover:text-gsu-lime-500 transition-all duration-200"
                        >
                          Learn More
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Call to Action */}
            {filteredEvents.length > 0 && (
              <div className="text-center mt-16">
                <div className="glass-card rounded-3xl p-8 lg:p-12 max-w-2xl mx-auto">
                  <h3 className="font-heading font-bold text-2xl text-gsu-white mb-4">
                    Stay Updated
                  </h3>
                  <p className="text-gsu-white/70 text-lg mb-6 leading-relaxed">
                    Coming soon
                  </p>
                  <Link
                    href="/newsletter"
                    target="_self"
                    rel="noopener noreferrer"
                    className="inline-block glass-effect text-gsu-white hover:text-gsu-lime-500 px-6 py-3 rounded-xl font-semibold hover:border-gsu-lime-500/50 transition-all duration-200"
                  >
                    Join Our Newsletter
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}

