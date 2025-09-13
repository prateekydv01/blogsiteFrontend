import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components/index.js'
import { useNavigate, useParams } from 'react-router-dom'
import { getPostById } from '../api/blog.js'

function EditPost() {
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const { postId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPost = async () => {
            if (postId) {
                try {
                    setLoading(true)
                    setError("")
                    const res = await getPostById(postId)
                    if (res?.data?.data) {
                        setPost(res.data.data)
                    } else {
                        setError("Post not found")
                        setTimeout(() => navigate('/'), 2000)
                    }
                } catch (err) {
                    console.error("Failed to fetch post", err)
                    setError("Failed to load post")
                    setTimeout(() => navigate('/'), 2000)
                } finally {
                    setLoading(false)
                }
            } else {
                navigate('/')
            }
        }

        fetchPost()
    }, [postId, navigate])

    // Loading state
    if (loading) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8'>
                <Container>
                    <div className="text-center py-12">
                        <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <h2 className="text-xl font-semibold text-gray-700">Loading post...</h2>
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
                            <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Post</h2>
                            <p className="text-red-700">{error}</p>
                            <p className="text-red-600 text-sm mt-2">Redirecting to home...</p>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return post ? (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8'>
            <Container>
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
                        Edit Post
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Update your post and share your improved thoughts
                    </p>
                </div>

                {/* Form Container */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6">
                            <h2 className="text-2xl font-bold text-white">Edit: {post.title}</h2>
                            <p className="text-orange-100 mt-2">Make your changes and update your story</p>
                        </div>
                        <div className="p-8">
                            <PostForm post={post} />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null
}

export default EditPost
