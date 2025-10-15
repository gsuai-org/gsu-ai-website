'use client'

import { useEffect, useState } from 'react'
import { client } from '@/lib/sanity'
import Footer from './Footer'

interface ContactData {
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
      <section id="contact" className="py-20 bg-gsu-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gsu-blue-100 max-w-3xl mx-auto mb-8">
              Loading contact information from Sanity...
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <p className="text-gsu-blue-100">Please wait while we load our contact details.</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const socialLinks = [
    {
      name: 'Discord',
      url: contactData.discord,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
        </svg>
      ),
      description: 'Join our Discord community for real-time discussions and updates'
    },
    {
      name: 'Website',
      url: contactData.orgWebsite,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      description: 'Visit our main website for more resources and information'
    },
    {
      name: 'Instagram',
      url: contactData.instagram,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323C5.902 8.198 7.053 7.708 8.35 7.708s2.448.49 3.323 1.297c.876.875 1.366 2.026 1.366 3.323s-.49 2.448-1.366 3.323c-.875.876-2.026 1.366-3.323 1.366zm7.718 0c-1.297 0-2.448-.49-3.323-1.297-.876-.875-1.366-2.026-1.366-3.323s.49-2.448 1.366-3.323c.875-.876 2.026-1.366 3.323-1.366s2.448.49 3.323 1.366c.876.875 1.366 2.026 1.366 3.323s-.49 2.448-1.366 3.323c-.875.876-2.026 1.366-3.323 1.366z"/>
        </svg>
      ),
      description: 'Follow us for photos, events, and behind-the-scenes content'
    },
    {
      name: 'Twitter',
      url: contactData.twitter,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
      description: 'Stay updated with our latest news and announcements'
    },
    {
      name: 'LinkedIn',
      url: contactData.linkedin,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      description: 'Connect with us professionally and network with members'
    }
  ]

  if (loading) {
    return (
      <section className="py-20 bg-gsu-blue-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="animate-pulse text-center">
            <div className="h-8 bg-white/20 rounded mb-4 w-1/2 mx-auto"></div>
            <div className="h-6 bg-white/20 rounded mb-8 w-2/3 mx-auto"></div>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-white/20 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-gsu-blue-800 via-gsu-blue-900 to-gsu-blue-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="animate-slide-up">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
              Get In Touch
            </h2>
            <p className="text-xl lg:text-2xl text-gsu-blue-100 max-w-4xl mx-auto leading-relaxed">
              Connect with us on social media, join our community, and stay updated on the latest AI innovations
            </p>
          </div>
        </div>

        {/* Social Links Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {socialLinks.map((link) => (
            link.url && (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-soft rounded-xl p-8 hover:bg-white/20 transition-all duration-300 border border-white/20 group hover:scale-105 transform"
              >
                <div className="flex items-center mb-4">
                  <div className="text-gsu-gold-400 mr-4 group-hover:scale-110 transition-transform duration-300">
                    {link.icon}
                  </div>
                  <h3 className="font-heading font-bold text-xl">{link.name}</h3>
                </div>
                <p className="text-gsu-blue-100 text-base leading-relaxed">
                  {link.description}
                </p>
              </a>
            )
          ))}
        </div>

        {/* Contact Info */}
        <div className="bg-white/10 backdrop-blur-soft rounded-xl p-8 lg:p-16 border border-white/20 text-center mb-16">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-heading font-bold text-3xl lg:text-4xl mb-6">
              Ready to Join the AI Revolution?
            </h3>
            <p className="text-gsu-blue-100 text-lg lg:text-xl mb-8 leading-relaxed">
              Whether you&apos;re a complete beginner or an experienced developer, there&apos;s a place for you in our community. 
              Join us to learn, build, and shape the future of artificial intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="btn-secondary text-lg px-8 py-4 hover:scale-105 transform transition-all duration-300">
                Join Our Discord
              </button>
              <button className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-gsu-blue-900 hover:scale-105 transform transition-all duration-300">
                Attend Next Event
              </button>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </section>
  )
}
