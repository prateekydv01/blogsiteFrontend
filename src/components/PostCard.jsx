import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getFilePreview } from '../api/blog'

function PostCard({ post }) {
  if (!post) return null

  const { title, _id, imagePublicId, excerpt, author, username, createdAt, tags, readTime } = post
  const [previewUrl, setPreviewUrl] = useState(null)
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (!imagePublicId) {
      setImageLoading(false)
      return
    }

    setImageLoading(true)
    setImageError(false)

    getFilePreview(imagePublicId)
      .then(res => {
        setPreviewUrl(res.data.data.url)
        setImageLoading(false)
      })
      .catch(err => {
        console.error('Error fetching preview:', err)
        setImageError(true)
        setImageLoading(false)
        setPreviewUrl(null)
      })
  }, [imagePublicId])

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }

  return (
    <Link to={`/post/${_id}`} className="block group">
      <article className="w-full bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:transform group-hover:scale-[1.02]">
        {/* Image Section */}
        <div className="relative w-full h-32 sm:h-40 md:h-48 bg-gray-200 overflow-hidden">
          {imageLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="flex items-center space-x-2 text-gray-500">
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs sm:text-sm">Loading...</span>
              </div>
            </div>
          )}
          
          {previewUrl && !imageError ? (
            <img 
              src={previewUrl} 
              alt={title}
              onLoad={handleImageLoad}
              onError={handleImageError}
              className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
            />
          ) : !imageLoading && (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-xs sm:text-sm">No image available</p>
              </div>
            </div>
          )}
          
          {/* Tags Overlay */}
          {tags && tags.length > 0 && (
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
              <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                {tags[0]}
              </span>
            </div>
          )}
          
          {/* Read Time */}
          {readTime && (
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
              {readTime} min read
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-3 sm:p-4 md:p-5">
          {/* Title */}
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
            {title}
          </h2>
          
          {/* Excerpt */}
          {excerpt && (
            <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 leading-relaxed">
              {excerpt}
            </p>
          )}
          
          {/* Author and Date */}
          <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              {(author || username) && (
                <div className="flex items-center space-x-1 min-w-0">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-medium text-xs">
                      {(author || username).charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    {author && (
                      <span className="font-medium block truncate text-xs sm:text-sm">
                        {author}
                      </span>
                    )}
                    {username && (
                      <span className="text-gray-400 block truncate text-xs">
                        @{username}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {createdAt && (
              <time className="text-gray-400 text-xs whitespace-nowrap ml-2">
                {formatDate(createdAt)}
              </time>
            )}
          </div>
        </div>
        
        {/* Hover Effect Border */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-200 rounded-xl transition-colors duration-300 pointer-events-none"></div>
      </article>
    </Link>
  )
}

export default PostCard