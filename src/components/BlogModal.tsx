'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity'
import { PortableText, PortableTextReactComponents } from '@portabletext/react'

interface BlogPost {
  _id: string
  title: string
  author: string
  datePosted: string
  tags: string[]
  body: Array<{
    _type: string
    [key: string]: unknown
  }>
  featuredImage?: {
    asset: {
      _ref: string
      _type: string
    }
    _type: string
  }
}

interface BlogModalProps {
  blogPost: BlogPost | null
  isOpen: boolean
  onClose: () => void
}

const TAG_LABELS: Record<string, string> = {
  'machine-learning': 'Machine Learning',
  'deep-learning': 'Deep Learning',
  'nlp': 'Natural Language Processing',
  'computer-vision': 'Computer Vision',
  'data-science': 'Data Science',
  'ai-ethics': 'AI Ethics',
  'research': 'Research',
  'tutorial': 'Tutorial',
  'news': 'News',
  'events': 'Events',
  'career': 'Career',
  'technology': 'Technology',
}

const portableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => (
      <div className="my-8">
        <Image
          src={urlForImage(value as { asset: { _ref: string; _type: string }; _type: string }).width(800).height(600).url()}
          alt={(value as { alt?: string })?.alt || 'Blog image'}
          width={800}
          height={600}
          className="rounded-lg w-full h-auto"
        />
      </div>
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-heading font-bold text-gsu-white mb-6 mt-8">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-heading font-bold text-gsu-white mb-4 mt-6">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-heading font-bold text-gsu-white mb-3 mt-5">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="text-gsu-white/80 mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gsu-lime-500 pl-6 my-6 italic text-gsu-white/90">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside text-gsu-white/80 mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside text-gsu-white/80 mb-4 space-y-2">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-gsu-white">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-gsu-lime-500">{children}</em>
    ),
    code: ({ children }) => (
      <code className="bg-gsu-black-600/50 text-gsu-lime-500 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a
        href={(value as { href: string })?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gsu-lime-500 hover:text-gsu-lime-400 underline transition-colors"
      >
        {children}
      </a>
    ),
  },
}

export default function BlogModal({ blogPost, isOpen, onClose }: BlogModalProps) {
  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (!isOpen || !blogPost) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] glass-card rounded-3xl overflow-hidden">
        {/* Header with Close Button */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gsu-white/10 bg-gsu-black-600/80 backdrop-blur-md">
          <h2 className="text-xl font-heading font-bold text-gsu-white truncate pr-4">
            {blogPost.title}
          </h2>
          <button
            onClick={onClose}
            className="flex-shrink-0 glass-effect p-2 rounded-full text-gsu-white/70 hover:text-gsu-white transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)] custom-scrollbar">
          <div className="p-6 lg:p-8">
            {/* Blog Post Header */}
            <header className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-heading font-bold text-gsu-white mb-6 leading-tight">
                {blogPost.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center text-gsu-lime-500">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-semibold">{blogPost.author}</span>
                </div>

                <div className="flex items-center text-gsu-white/60">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4h6m4 0V9a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-2" />
                  </svg>
                  <span>{formatDate(blogPost.datePosted)}</span>
                </div>
              </div>

              {/* Tags */}
              {blogPost.tags && blogPost.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {blogPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gsu-lime-500/20 text-gsu-lime-500 rounded-full text-sm font-medium"
                    >
                      {TAG_LABELS[tag] || tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Featured Image */}
              {blogPost.featuredImage && (
                <div className="relative h-48 sm:h-64 lg:h-80 rounded-2xl overflow-hidden mb-8">
                  <Image
                    src={urlForImage(blogPost.featuredImage).width(1200).height(600).url()}
                    alt={blogPost.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              )}
            </header>

            {/* Blog Content */}
            <div className="prose prose-lg max-w-none">
              <PortableText
                value={blogPost.body}
                components={portableTextComponents}
              />
            </div>

            {/* Footer Actions */}
            <div className="mt-12 pt-8 border-t border-gsu-white/10">
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={onClose}
                  className="glass-effect text-gsu-white hover:text-gsu-lime-500 px-6 py-3 rounded-xl font-semibold hover:border-gsu-lime-500/50 transition-all duration-200"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    // Share functionality could be added here
                    navigator.share?.({
                      title: blogPost.title,
                      text: `Check out this blog post: ${blogPost.title}`,
                      url: window.location.href
                    }).catch(() => {
                      // Fallback: copy to clipboard
                      navigator.clipboard?.writeText(window.location.href)
                    })
                  }}
                  className="glass-effect-strong text-gsu-lime-500 hover:text-gsu-white px-6 py-3 rounded-xl font-semibold border border-gsu-lime-500/30 transition-all duration-200"
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 195, 74, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 195, 74, 0.7);
        }
      `}</style>
    </div>
  )
}
