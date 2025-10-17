'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { client, urlForImage } from '@/lib/sanity'

interface HomeData {
  heroImage: {
    asset: {
      _ref: string
      _type: string
    }
    _type: string
  }
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [logoImage, setLogoImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchLogoImage = async () => {
      try {
        const data: HomeData = await client.fetch(`*[_type == "home"][0]{ heroImage }`)
        if (data?.heroImage) {
          const imageUrl = urlForImage(data.heroImage).width(100).height(100).url()
          setLogoImage(imageUrl)
        }
      } catch (error) {
        console.error('Error fetching logo image:', error)
      }
    }

    fetchLogoImage()
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Events', href: '/events' },
    { name: 'Contact', href: '/contact' }
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 lg:py-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo - No Pill Shape */}
          <Link href="/" className="flex items-center space-x-2 group">
            {logoImage ? (
              <div className="w-7 h-7 rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={logoImage}
                  alt="AI Club @ GSU Logo"
                  width={28}
                  height={28}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="w-7 h-7 bg-gradient-to-br from-gsu-gold-400 to-gsu-gold-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <span className="text-gsu-white font-bold text-xs">AI</span>
              </div>
            )}
            <div className="hidden md:block">
              <h1 className="font-heading font-bold text-sm text-gsu-white group-hover:text-gsu-lime-500 transition-colors duration-300">
                AI Club
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation - Individual Glass Pills */}
          <div className="hidden lg:flex items-center space-x-2 flex-1 justify-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="glass-effect-navbar rounded-full px-4 py-2 text-gsu-white/90 hover:text-gsu-lime-500 transition-all duration-300 font-medium text-sm"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center space-x-2">
            <Link
              href="/blog"
              className="glass-effect-navbar rounded-full px-4 py-2 text-gsu-white/90 hover:text-gsu-lime-500 transition-all duration-300 font-medium text-sm"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="glass-effect-strong rounded-full px-5 py-2 text-gsu-lime-500 hover:text-gsu-white font-semibold text-sm hover:scale-105 transform transition-all duration-300 border border-gsu-lime-500/30"
            >
              Join Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden glass-effect-navbar rounded-full p-2 text-gsu-white/90 hover:text-gsu-lime-500 transition-all duration-300"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Decorative Line Below Nav Items */}
        <div className="hidden lg:flex justify-center mt-4">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/15 via-gsu-lime-500/10 to-transparent"></div>
        </div>

        {/* Compact Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3">
            <div className="glass-effect-strong rounded-2xl p-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gsu-white/90 hover:text-gsu-lime-500 transition-colors duration-300 font-medium text-sm py-2 px-3 rounded-lg hover:bg-gsu-white/5"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-gsu-white/10 space-y-1">
                <Link
                  href="/blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gsu-white/90 hover:text-gsu-lime-500 transition-colors duration-300 font-medium text-sm py-2 px-3 rounded-lg hover:bg-gsu-white/5"
                >
                  Blog
                </Link>
                <Link
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center glass-effect-strong text-gsu-lime-500 hover:text-gsu-white font-semibold text-sm px-4 py-2 rounded-full border border-gsu-lime-500/30"
                >
                  Join Us
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
