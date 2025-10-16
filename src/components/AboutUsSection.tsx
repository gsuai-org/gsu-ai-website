'use client'

import { useEffect, useState } from 'react'
import { client } from '@/lib/sanity'

interface Tag {
  text: string
  icon: string
}

interface AboutData {
  description: string
  tags?: Tag[]
}

export default function AboutUsSection() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null)
  const [loading, setLoading] = useState(true)

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
      <section id="about" className="section-padding relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gsu-white mb-6">
              About Us
            </h2>
            <p className="text-gsu-white/70 text-lg">
              No about us data available. Reload the page to try again.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="container-custom">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gsu-white mb-8 leading-tight">
            About Us
          </h2>
          <p className="text-xl lg:text-2xl text-gsu-white/90 leading-relaxed mb-12">
            {aboutData.description}
          </p>
        </div>

        {/* Auto-scrolling Tags Bar */}
        {aboutData.tags && aboutData.tags.length > 0 && (
          <div className="relative w-full overflow-hidden">
            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gsu-blue-900 via-gsu-purple-900 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gsu-blue-900 via-gsu-purple-900 to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex animate-scroll-left">
              {/* First set of tags */}
              {aboutData.tags.map((tag, index) => (
                <div
                  key={`tag-1-${index}`}
                  className="flex-shrink-0 mx-3"
                >
                  <div className="glass-effect text-gsu-white px-6 py-4 rounded-xl font-semibold flex items-center gap-3 whitespace-nowrap">
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
              
              {/* Duplicate set for seamless loop */}
              {aboutData.tags.map((tag, index) => (
                <div
                  key={`tag-2-${index}`}
                  className="flex-shrink-0 mx-3"
                >
                  <div className="glass-effect text-gsu-white px-6 py-4 rounded-xl font-semibold flex items-center gap-3 whitespace-nowrap">
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
        )}
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }
        
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
