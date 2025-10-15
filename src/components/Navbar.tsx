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
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [logoImage, setLogoImage] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Mission', href: '#mission' },
    { name: 'Events', href: '#events' },
    { name: 'Contact', href: '#contact' }
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-gsu-blue-900/95 backdrop-blur-md shadow-lg border-b border-white/10' 
        : 'bg-transparent'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="#home" className="flex items-center space-x-3 group">
            {logoImage ? (
              <div className="w-10 h-10 rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={logoImage}
                  alt="AI Club @ GSU Logo"
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-gsu-gold-400 to-gsu-gold-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <span className="text-gsu-blue-900 font-bold text-lg">AI</span>
              </div>
            )}
            <div className="hidden sm:block">
              <h1 className="font-heading font-bold text-xl text-white group-hover:text-gsu-gold-400 transition-colors duration-300">
                AI Club @ GSU
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white hover:text-gsu-gold-400 transition-colors duration-300 font-medium relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gsu-gold-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/"
              className="text-gsu-blue-100 hover:text-white transition-colors duration-300 font-medium"
            >
              Directory
            </Link>
            <Link
              href="/blog"
              className="text-gsu-blue-100 hover:text-white transition-colors duration-300 font-medium"
            >
              Blog
            </Link>
            <Link
              href="#contact"
              className="btn-primary text-sm px-6 py-2 hover:scale-105 transform transition-all duration-300"
            >
              Join Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-gsu-gold-400 transition-colors duration-300"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-gsu-blue-900/95 backdrop-blur-md border-t border-white/10">
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-white hover:text-gsu-gold-400 transition-colors duration-300 font-medium py-2"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gsu-blue-100 hover:text-white transition-colors duration-300 font-medium"
                >
                  Directory
                </Link>
                <Link
                  href="/blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gsu-blue-100 hover:text-white transition-colors duration-300 font-medium"
                >
                  Blog
                </Link>
                <Link
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-primary text-sm px-6 py-2 inline-block hover:scale-105 transform transition-all duration-300"
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
