import React, { useEffect, useState } from 'react'
import { inactivePosts } from '../api'
import {Header, PostCard,Container} from '../components/index.js'

function InactivePosts() {
    const [posts,setPosts]=useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(()=>{
        const fetchInactivePosts = async()=>{
            try {
                setLoading(true)
                setError("")
                const res = await inactivePosts()
                if(res?.data?.data){
                    setPosts(res.data.data)
                }
            } catch (error) {
                console.error("Failed to fetch inactive posts:", error)
                setError("Failed to load inactive posts. Please try again later.")
            } finally {
                setLoading(false)
            }
        }

        fetchInactivePosts()
    },[])

    // Loading state
    if (loading) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8'>
                <Container>
                    <div className="text-center py-12">
                        <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <h2 className="text-xl font-semibold text-gray-700">Loading inactive posts...</h2>
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

    // Empty state
    if (posts.length === 0) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8'>
                <Container>
                    <div className="text-center py-12">
                        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 max-w-md mx-auto">
                            <div className="w-16 h-16 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Inactive Posts</h2>
                            <p className="text-gray-600 mb-6">There are no inactive posts to display at the moment.</p>
                            <button 
                                onClick={() => window.location.href = '/'} 
                                className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                            >
                                View All Posts
                            </button>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8'>
            <Container>
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent mb-4">
                        Inactive Posts
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Posts that are currently inactive or archived
                    </p>
                </div>

                {/* Posts Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {posts.map((post) => (
                        <div 
                            key={post._id} 
                            className='group transform hover:scale-105 transition-transform duration-300'
                        >
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>

                {/* Back to Top Button */}
                {posts.length > 0 && (
                    <div className="text-center mt-12">
                        <button 
                            className="bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-8 rounded-lg shadow-lg hover:shadow-xl border border-gray-200 transition-all duration-200"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                            Back to Top
                        </button>
                    </div>
                )}
            </Container>
        </div>
    )
}

export default InactivePosts