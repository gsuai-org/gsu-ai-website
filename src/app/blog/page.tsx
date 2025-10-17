'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link' 
import { client, urlForImage } from '@/lib/sanity'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DottedBackground from '@/components/DottedBackground'
import BlogModal from '@/components/BlogModal'

const BLOG_QUERY = `*[_type == "blog"] | order(datePosted desc) {
  _id,
  title,
  author,
  datePosted,
  tags,
  excerpt,
  body,
  featuredImage,
  "bodyPreview": array::join(string::split((pt::text(body)), "")[0..150], "") + "..."
}`

interface BlogPost {
  _id: string
  title: string
  author: string
  datePosted: string
  tags: string[]
  excerpt?: string
  body: Array<{
    _type: string
    [key: string]: unknown
  }>
  bodyPreview: string
  featuredImage?: {
    asset: {
      _ref: string
      _type: string
    }
    _type: string
  }
}

type SortOption = 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc'

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

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<SortOption>('date-desc')
  const [availableTags, setAvailableTags] = useState<string[]>([])
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const data = await client.fetch(BLOG_QUERY)
        setBlogPosts(data)
        
        // Extract unique tags from all blog posts
        const allTags = data.flatMap((post: BlogPost) => post.tags || [])
        const uniqueTags = Array.from(new Set(allTags)).sort() as string[]
        setAvailableTags(uniqueTags)
      } catch (error) {
        console.error('Error fetching blog posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }


  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const clearAllTags = () => {
    setSelectedTags([])
  }

  const openModal = (blogPost: BlogPost) => {
    setSelectedBlogPost(blogPost)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedBlogPost(null)
  }

  const sortPosts = (posts: BlogPost[], sortOption: SortOption): BlogPost[] => {
    return [...posts].sort((a, b) => {
      switch (sortOption) {
        case 'date-desc':
          return new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime()
        case 'date-asc':
          return new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime()
        case 'title-asc':
          return a.title.localeCompare(b.title)
        case 'title-desc':
          return b.title.localeCompare(a.title)
        default:
          return 0
      }
    })
  }

  const filteredAndSortedPosts = sortPosts(
    blogPosts.filter(post => 
      selectedTags.length === 0 || 
      selectedTags.some(tag => post.tags?.includes(tag))
    ),
    sortBy
  )

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
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
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
                Blog
              </h1>
              <p className="text-xl lg:text-2xl text-gsu-white/80 max-w-3xl mx-auto leading-relaxed">
                Insights, tutorials, freebies, and the latest in AI
              </p>
            </div>

            {/* Filters and Sorting */}
            <div className="mb-12 space-y-6">
              {/* Sort Options */}
              <div className="flex flex-wrap justify-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="glass-effect px-4 py-2 rounded-full font-semibold text-gsu-white/90 bg-transparent border border-gsu-white/20 focus:border-gsu-lime-500/50 focus:outline-none"
                >
                  <option value="date-desc" className="bg-gsu-black-600 text-gsu-white">Newest First</option>
                  <option value="date-asc" className="bg-gsu-black-600 text-gsu-white">Oldest First</option>
                  <option value="title-asc" className="bg-gsu-black-600 text-gsu-white">A-Z</option>
                  <option value="title-desc" className="bg-gsu-black-600 text-gsu-white">Z-A</option>
                </select>
              </div>

              {/* Tag Filters */}
              <div className="text-center">
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`glass-effect px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                        selectedTags.includes(tag)
                          ? 'text-gsu-lime-500 border-gsu-lime-500/50 bg-gsu-lime-500/10'
                          : 'text-gsu-white/90 hover:text-gsu-lime-500 hover:border-gsu-lime-500/30'
                      }`}
                    >
                      {TAG_LABELS[tag] || tag}
                    </button>
                  ))}
                </div>
                
                {selectedTags.length > 0 && (
                  <div className="flex justify-center items-center gap-4">
                    <span className="text-gsu-white/70 text-sm">
                      Filtering by: {selectedTags.map(tag => TAG_LABELS[tag] || tag).join(', ')}
                    </span>
                    <button
                      onClick={clearAllTags}
                      className="text-gsu-lime-500 hover:text-gsu-lime-400 text-sm font-semibold transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-6">
            {filteredAndSortedPosts.length === 0 ? (
              <div className="text-center py-20">
                <div className="glass-card rounded-3xl p-12 max-w-2xl mx-auto">
                  <svg className="w-20 h-20 text-gsu-white/40 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <h3 className="text-2xl font-heading font-bold text-gsu-white mb-4">
                    No blog posts found
                  </h3>
                  <p className="text-gsu-white/70 text-lg">
                    {selectedTags.length > 0 
                      ? 'Try adjusting your filters or check back soon for new content!'
                      : 'Check back soon for our latest insights and tutorials!'
                    }
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Desktop Grid: 3-4 columns */}
                <div className="hidden md:grid md:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
                  {filteredAndSortedPosts.map((post) => (
                    <article
                      key={post._id}
                      className="glass-card rounded-2xl overflow-hidden group hover:scale-105 transition-transform duration-300"
                    >
                      {/* Featured Image */}
                      <div className="relative h-48 bg-gradient-to-br from-gsu-blue-500 to-gsu-blue-700 overflow-hidden">
                        {post.featuredImage ? (
                          <Image
                            src={urlForImage(post.featuredImage).width(400).height(250).url()}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="w-16 h-16 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="font-heading font-bold text-lg text-gsu-white mb-3 line-clamp-2 leading-tight">
                          {post.title}
                        </h3>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-gsu-lime-500 text-sm">
                            <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="font-semibold">{post.author}</span>
                          </div>

                          <div className="flex items-center text-gsu-white/60 text-sm">
                            <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4h6m4 0V9a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-2" />
                            </svg>
                            <span>{formatDate(post.datePosted)}</span>
                          </div>
                        </div>

                        <p className="text-gsu-white/70 text-sm mb-4 line-clamp-3 leading-relaxed">
                          {post.excerpt || post.bodyPreview}
                        </p>

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-4">
                            {post.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-gsu-lime-500/20 text-gsu-lime-500 rounded text-xs font-medium"
                              >
                                {TAG_LABELS[tag] || tag}
                              </span>
                            ))}
                            {post.tags.length > 2 && (
                              <span className="px-2 py-1 bg-gsu-white/10 text-gsu-white/60 rounded text-xs font-medium">
                                +{post.tags.length - 2}
                              </span>
                            )}
                          </div>
                        )}

                        <button
                          onClick={() => openModal(post)}
                          className="inline-flex items-center gap-2 glass-effect px-4 py-2 rounded-full text-gsu-white/90 font-semibold hover:text-gsu-lime-500 transition-all duration-200 text-sm"
                        >
                          View More
                          <svg
                            className="w-3 h-3"
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
                        </button>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Mobile Layout: Horizontal stacked cards */}
                <div className="md:hidden space-y-4">
                  {filteredAndSortedPosts.map((post) => (
                    <article
                      key={post._id}
                      className="glass-card rounded-xl overflow-hidden group"
                    >
                      <div className="flex h-32">
                        {/* Featured Image */}
                        <div className="relative w-32 flex-shrink-0 bg-gradient-to-br from-gsu-blue-500 to-gsu-blue-700 overflow-hidden">
                          {post.featuredImage ? (
                            <Image
                              src={urlForImage(post.featuredImage).width(200).height(150).url()}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-4 flex flex-col justify-between">
                          <div>
                            <h3 className="font-heading font-bold text-base text-gsu-white mb-2 line-clamp-2 leading-tight">
                              {post.title}
                            </h3>
                            
                            <div className="flex items-center gap-4 text-xs text-gsu-white/60 mb-2">
                              <span className="text-gsu-lime-500 font-semibold">{post.author}</span>
                              <span>{formatDate(post.datePosted)}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Tags */}
                            <div className="flex gap-1">
                              {post.tags && post.tags.slice(0, 1).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 bg-gsu-lime-500/20 text-gsu-lime-500 rounded text-xs font-medium"
                                >
                                  {TAG_LABELS[tag] || tag}
                                </span>
                              ))}
                            </div>

                            <button
                              onClick={() => openModal(post)}
                              className="inline-flex items-center gap-1 text-gsu-white/90 hover:text-gsu-lime-500 transition-colors text-xs font-semibold"
                            >
                              View
                              <svg
                                className="w-3 h-3"
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
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        <Footer />
      </div>

      {/* Blog Modal */}
      <BlogModal
        blogPost={selectedBlogPost}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </main>
  )
}
