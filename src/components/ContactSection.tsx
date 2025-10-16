'use client'

import { useEffect, useState } from 'react'
import { client } from '@/lib/sanity'
import Link from 'next/link'  

interface ContactData {
  email?: string
  discord?: string
  orgWebsite?: string
  instagram?: string
  twitter?: string
  linkedin?: string
}

export default function ContactSection() {
  const [contactData, setContactData] = useState<ContactData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const data = await client.fetch(`*[_type == "contact"][0]`)
        setContactData(data)
      } catch (error) {
        console.error('Error fetching contact data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContactData()
  }, [])

  if (!contactData) {
    return (
      <section id="contact" className="py-20 section-padding bg-gradient-to-br from-gsu-blue-900 via-gsu-purple-900 to-gsu-black-600 text-gsu-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-gsu-white">
              Get In Touch
            </h2>
            <p className="text-xl text-gsu-white/80 max-w-3xl mx-auto mb-8">
              Loading contact information from Sanity...
            </p>
            <div className="bg-gsu-white/10 backdrop-blur-sm rounded-xl p-8 border border-gsu-white/10">
              <p className="text-gsu-white/80">Please wait while we load our contact details.</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const socialLinks = [
    {
      name: 'Email',
      url: contactData.email ? `mailto:${contactData.email}` : undefined,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      description: 'Send us an email'
    },
    {
      name: 'Discord',
      url: contactData.discord,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
        </svg>
      ),
      description: 'Join our Discord community'
    },
    {
      name: 'Instagram',
      url: contactData.instagram,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      description: 'Follow us on Instagram'
    },
    {
      name: 'LinkedIn',
      url: contactData.linkedin,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      description: 'Connect with us on LinkedIn'
    }
  ]

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gsu-blue-900 via-gsu-purple-900 to-gsu-black-600">
        <div className="max-w-6xl mx-auto px-6">
          <div className="animate-pulse text-center">
            <div className="h-8 bg-gsu-white/20 rounded mb-4 w-1/2 mx-auto"></div>
            <div className="h-6 bg-gsu-white/20 rounded mb-8 w-2/3 mx-auto"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-gsu-white/20 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="section-padding text-gsu-white relative overflow-hidden">
      
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="animate-slide-up">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight text-gsu-white">
              Get In Touch
            </h2>
            <p className="text-xl lg:text-2xl text-gsu-white/80 max-w-4xl mx-auto leading-relaxed">
              Connect with us on social media, join our community, and stay updated on the latest AI innovations
            </p>
          </div>
        </div>

        {/* Social Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-20">
          {socialLinks.map((link) => (
            link.url && (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-xl p-6 group hover:scale-105 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="text-gsu-lime-500 mb-3 group-hover:scale-110 transition-transform duration-300">
                    {link.icon}
                  </div>
                  <h3 className="font-heading font-bold text-lg text-gsu-white mb-2">{link.name}</h3>
                  <p className="text-gsu-white/70 text-sm leading-relaxed">
                    {link.description}
                  </p>
                </div>
              </a>
            )
          ))}
        </div>

        {/* Contact Info */}
        <div className="glass-card rounded-3xl p-8 lg:p-16 text-center mb-16">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-heading font-bold text-3xl lg:text-4xl mb-6 text-gsu-white">
              Ready to Join the AI Revolution?
            </h3>
            <p className="text-gsu-white/80 text-lg lg:text-xl mb-8 leading-relaxed">
              Whether you&apos;re a complete beginner or an experienced developer, there&apos;s a place for you in our community. 
              Join us to learn, build, and shape the future of artificial intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="glass-effect text-gsu-white hover:text-gsu-lime-500 px-8 py-4 rounded-xl font-semibold hover:border-gsu-lime-500/50 transition-all duration-200 text-lg">
                Join Our Discord
              </button>
              <Link href="https://pin.gsu.edu/organization/ai-club" target="_blank" rel="noopener noreferrer" className="glass-effect text-gsu-white hover:text-gsu-lime-500 px-8 py-4 rounded-xl font-semibold hover:border-gsu-lime-500/50 transition-all duration-200 text-lg">
                Attend Next Event
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
