import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllPosts } from '../api/blog'
import { Container } from '../components'

function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()



  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        setError("")
        if (authStatus) {
          const res = await getAllPosts()
          if (res?.data?.data) {
            // Sort posts by date in descending order (latest first)
            const sortedPosts = res.data.data.sort((a, b) => {
              const dateA = new Date(a.createdAt || a.date || a.updatedAt)
              const dateB = new Date(b.createdAt || b.date || b.updatedAt)
              return dateB - dateA // Descending order (latest first)
            })
            setPosts(sortedPosts)
          }
        }
      } catch (error) {
        console.error("Failed to load posts:", error)
        setError("Failed to load posts. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [authStatus])

  // Function to strip HTML tags and truncate text
  const truncateText = (htmlText, maxLength = 150) => {
    if (!htmlText) return 'No preview available'
    const textOnly = htmlText.replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, ' ')
      .trim()
    if (textOnly.length <= maxLength) return textOnly
    return textOnly.substring(0, maxLength).trim() + '...'
  }

  // Function to format date
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch (error) {
      return 'Date not available'
    }
  }

  // Function to handle read full button click
  const handleReadFull = (postId) => {
    navigate(`/post/${postId}`)
  }

  // Function to handle avatar image error
  const handleAvatarError = (e, username) => {
    e.target.style.display = 'none'
    const fallbackDiv = e.target.nextElementSibling
    if (fallbackDiv) {
      fallbackDiv.style.display = 'flex'
    }
  }

  // Not logged in state
  if (!authStatus) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 opacity-90"></div>
          <div className="relative z-10 py-24 px-4">
            <Container>
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Welcome to <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">BlogSphere</span>
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                  Discover amazing stories, insights, and ideas from our community of passionate writers
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => navigate('/login')}
                    className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    Get Started
                  </button>
                  <button
                    onClick={() => navigate('/signup')}
                    className="bg-transparent border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
                  >
                    Join Community
                  </button>
                </div>
              </div>
            </Container>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 px-4">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                Why Choose BlogSphere?
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Join thousands of writers and readers in our vibrant community
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Feature 1 */}
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 text-center transform hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Rich Content</h3>
                <p className="text-gray-600">Create and share beautiful articles with our advanced editor</p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 text-center transform hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Community</h3>
                <p className="text-gray-600">Connect with like-minded writers and readers worldwide</p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 text-center transform hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Fast & Secure</h3>
                <p className="text-gray-600">Lightning-fast performance with enterprise-grade security</p>
              </div>
            </div>
          </Container>
        </div>
      </div>
    )
  }

  // Loading state
  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8'>
        <Container>
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-700">Loading posts...</h2>
          </div>
        </Container>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8'>
        <Container>
          <div className="text-center py-12">
            <div className="bg-red-50 border-l-4 border-red-400 rounded-r-lg p-6 max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-red-800 mb-2">Oops! Something went wrong</h2>
              <p className="text-red-700">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <Container>
        {/* Welcome Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Latest Stories
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the most recent articles from our amazing community
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl p-12 shadow-xl border border-gray-100 max-w-md mx-auto">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">No Posts Yet</h2>
                <p className="text-gray-600 mb-6">Be the first to share something amazing with the community!</p>
                <button 
                  onClick={() => navigate('/add-post')} 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Create Your First Post
                </button>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
              {posts.map((post) => (
                <article 
                  key={post._id} 
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer transform hover:-translate-y-2"
                  onClick={() => handleReadFull(post._id)}
                >
                  {/* Featured Image */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                    {(post.featuredImage || post.image || post.thumbnail) ? (
                      <img
                        src={post.featuredImage || post.image || post.thumbnail}
                        alt={post.title || 'Blog post image'}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.parentNode.innerHTML = `
                            <div class="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                              <svg class="w-16 h-16 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                              </svg>
                            </div>
                          `
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                        <svg className="w-16 h-16 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    
                    {/* Category Badge */}
                    {post.category && (
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-blue-700 shadow-lg">
                          {post.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Author and Date */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                          {/* Profile Image */}
                          {post.owner?.image ? (
                            <>
                              <img
                                src={post.owner.image}
                                alt={post.owner?.username || 'User avatar'}
                                className="w-full h-full object-cover"
                                onError={(e) => handleAvatarError(e, post.owner?.username)}
                              />
                              {/* Fallback div (hidden by default) */}
                              <div 
                                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center"
                                style={{ display: 'none' }}
                              >
                                <span className="text-white text-sm font-semibold">
                                  {(post.owner?.username || 'A').charAt(0).toUpperCase()}
                                </span>
                              </div>
                            </>
                          ) : (
                            /* Show initial letter if no image */
                            <div className="w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                              <span className="text-white text-sm font-semibold">
                                {(post.owner?.username || 'A').charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 text-sm truncate">
                            {post.owner?.username || 'Anonymous'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatDate(post.createdAt || post.date || post.updatedAt)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Post Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                      {post.title || 'Untitled Post'}
                    </h3>

                    {/* Post Excerpt */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {truncateText(post.content || post.excerpt || post.description, 120)}
                    </p>

                    {/* Read More Link */}
                    <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors duration-200">
                      <span>Read more</span>
                      <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>

                  {/* Bottom Border Accent */}
                  <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </article>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}

export default Home
