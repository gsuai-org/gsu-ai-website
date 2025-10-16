'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { client } from '@/lib/sanity'

interface ContactData {
  instagram?: string
  linkedin?: string
}

export default function Footer() {
  const [contactData, setContactData] = useState<ContactData | null>(null)

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const data = await client.fetch(`*[_type == "contact"][0]{ instagram, linkedin }`)
        setContactData(data)
      } catch (error) {
        console.error('Error fetching contact data:', error)
      }
    }
    fetchContactData()
  }, [])
  const sections = [
    { name: 'Home', href: '/' },
    { name: 'Events', href: '/events' },
    { name: 'Contact', href: '/contact' }
  ]

  return (
    <footer className="text-gsu-white py-12 border-t border-gsu-white/20">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Section Map */}
          <div>
            <h3 className="font-heading font-bold text-xl mb-4 text-gsu-white">Navigate</h3>
            <nav className="space-y-2">
              {sections.map((section) => (
                <Link
                  key={section.name}
                  href={section.href}
                  className="block text-gsu-white/70 hover:text-gsu-lime-500 transition-colors duration-300"
                >
                  {section.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Directory & Blog Links */}
          <div>
            <h3 className="font-heading font-bold text-xl mb-4 text-gsu-white">Resources</h3>
            <div className="space-y-2">
              <Link
                href="/blog"
                className="block text-gsu-white/70 hover:text-gsu-lime-500 transition-colors duration-300"
              >
                Blog
              </Link>
              <Link
                href="https://pin.gsu.edu/organization/ai-club" 
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gsu-white/70 hover:text-gsu-lime-500 transition-colors duration-300"
              >
                PIN Page
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-bold text-xl mb-4 text-gsu-white">Connect</h3>
            <p className="text-gsu-white/70 mb-4">
              Join our community and stay updated with the latest AI innovations.
            </p>
            <div className="flex space-x-4">
              <a
                href="#contact"
                className="text-gsu-lime-500 hover:text-gsu-lime-400 transition-colors duration-300"
                aria-label="Contact us"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              {contactData?.instagram && (
                <a
                  href={contactData.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gsu-lime-500 hover:text-gsu-lime-400 transition-colors duration-300"
                  aria-label="Follow us on Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}
              {contactData?.linkedin && (
                <a
                  href={contactData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gsu-lime-500 hover:text-gsu-lime-400 transition-colors duration-300"
                  aria-label="Connect with us on LinkedIn"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gsu-white/20 text-center">
          <p className="text-gsu-white/70 text-sm">
            © 2025 AI Club @ GSU. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
