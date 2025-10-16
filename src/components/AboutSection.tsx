'use client'

import { useEffect, useState, useRef } from 'react'
import { client } from '@/lib/sanity'
import DottedBackground from './DottedBackground'

interface Tag {
  text: string
  icon: string
}

interface AboutData {
  description: string
  tags?: Tag[]
}

export default function AboutSection() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const data = await client.fetch(`*[_type == "about"][0]{ description, tags }`)
        setAboutData(data)
      } catch (error) {
        console.error('Error fetching about data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAboutData()
  }, [])

  // Auto-scroll carousel
  useEffect(() => {
    if (aboutData?.tags && aboutData.tags.length > 0) {
      autoScrollRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex >= aboutData.tags!.length - 1 ? 0 : prevIndex + 1
        )
      }, 3000) // Auto-scroll every 3 seconds

      return () => {
        if (autoScrollRef.current) {
          clearInterval(autoScrollRef.current)
        }
      }
    }
  }, [aboutData?.tags])

  const scrollToIndex = (index: number) => {
    setCurrentIndex(index)
    // Reset auto-scroll timer
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current)
      autoScrollRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex >= aboutData!.tags!.length - 1 ? 0 : prevIndex + 1
        )
      }, 3000)
    }
  }

  const handlePrevious = () => {
    if (aboutData?.tags) {
      const newIndex = currentIndex === 0 ? aboutData.tags.length - 1 : currentIndex - 1
      scrollToIndex(newIndex)
    }
  }

  const handleNext = () => {
    if (aboutData?.tags) {
      const newIndex = currentIndex >= aboutData.tags.length - 1 ? 0 : currentIndex + 1
      scrollToIndex(newIndex)
    }
  }

  if (loading) {
    return (
      <section className="section-padding bg-gradient-to-br from-gsu-blue-900 via-gsu-purple-900 to-gsu-black-600 relative overflow-hidden">
        <div className="container-custom">
          <div className="animate-pulse max-w-4xl mx-auto">
            <div className="h-12 bg-gsu-white/20 rounded mb-6 w-1/3 mx-auto"></div>
            <div className="h-6 bg-gsu-white/20 rounded mb-4"></div>
            <div className="h-6 bg-gsu-white/20 rounded mb-4"></div>
            <div className="h-6 bg-gsu-white/20 rounded w-2/3"></div>
          </div>
        </div>
      </section>
    )
  }

  if (!aboutData) {
    return (
      <section id="about-info" className="section-padding  relative overflow-hidden">
        <DottedBackground />
        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gsu-white mb-6">
              About Us
            </h2>
            <p className="text-gsu-white/70 text-lg">
              No content available. Please add content in the Sanity Studio.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="about-info" className="section-padding relative overflow-hidden">
      <div className="container-custom">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gsu-white mb-8 leading-tight">
            About Us
          </h2>
          <p className="text-xl lg:text-2xl text-gsu-white/90 leading-relaxed mb-12">
            {aboutData.description}
          </p>
        </div>

        {/* Tags Carousel */}
        {aboutData.tags && aboutData.tags.length > 0 && (
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Carousel Container */}
              <div className="overflow-hidden" ref={carouselRef}>
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {aboutData.tags.map((tag, index) => (
                    <div
                      key={index}
                      className="w-full flex-shrink-0 px-4"
                    >
                      <div className="glass-effect text-gsu-white hover:text-gsu-lime-500 px-6 py-4 rounded-xl font-semibold hover:border-gsu-lime-500/50 transition-all duration-200 flex items-center justify-center gap-3 max-w-md mx-auto">
                        {/* Icon */}
                        <div 
                          className="w-6 h-6 flex-shrink-0"
                          dangerouslySetInnerHTML={{ __html: tag.icon }}
                        />
                        {/* Text */}
                        <span className="text-lg">{tag.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              {aboutData.tags.length > 1 && (
                <>
                  <button
                    onClick={handlePrevious}
                    className="absolute left-0 top-1/2 -translate-y-1/2 glass-effect-navbar rounded-full p-3 text-gsu-white/90 hover:text-gsu-lime-500 transition-all duration-300"
                    aria-label="Previous tag"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 glass-effect-navbar rounded-full p-3 text-gsu-white/90 hover:text-gsu-lime-500 transition-all duration-300"
                    aria-label="Next tag"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Dots Indicator */}
            {aboutData.tags.length > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {aboutData.tags.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-gsu-lime-500 w-8' 
                        : 'bg-gsu-white/30 hover:bg-gsu-white/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

