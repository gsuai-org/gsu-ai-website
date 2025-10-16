'use client'

import Link from 'next/link'

export default function Footer() {
  const sections = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Mission', href: '#mission' },
    { name: 'Events', href: '#events' },
    { name: 'Contact', href: '#contact' }
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
                href="/"
                className="block text-gsu-white/70 hover:text-gsu-lime-500 transition-colors duration-300"
              >
                Directory
              </Link>
              <Link
                href="/blog"
                className="block text-gsu-white/70 hover:text-gsu-lime-500 transition-colors duration-300"
              >
                Blog
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
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
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
