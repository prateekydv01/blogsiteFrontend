import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

import { getPostById, deletePost } from "../api/blog";
import { Button, Container } from "../components";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { postId } = useParams();
    const navigate = useNavigate();
    const userData = useSelector(
        (state) => state.auth.userData
    );

    const isAuthor = post && userData ? post.owner._id === userData._id : false;

    useEffect(() => {
        const fetchPost = async () => {
            if (postId) {
                try {
                    setLoading(true);
                    setError("");
                    const res = await getPostById(postId);
                    if (res?.data?.data) {
                        setPost(res.data.data);
                    } else {
                        setError("Post not found");
                        setTimeout(() => navigate("/"), 2000);
                    }
                } catch (err) {
                    console.error("Failed to fetch post", err);
                    setError("Failed to load post");
                    setTimeout(() => navigate("/"), 2000);
                } finally {
                    setLoading(false);
                }
            } else {
                navigate("/");
            }
        };

        fetchPost();
    }, [postId, navigate]);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
            try {
                const res = await deletePost(postId);
                console.log("Delete Response:", res.data);
                if (res?.data?.success) {
                    navigate("/");
                } else {
                    console.error("Delete failed:", res.data.message);
                }
            } catch (err) {
                console.error("Error deleting post:", err.response?.data || err.message);
            }
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
                        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                        <div className="h-64 bg-gray-200 rounded mb-8"></div>
                        <div className="space-y-3">
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button 
                        onClick={() => navigate("/")}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        ← Back to home
                    </button>
                </div>
            </div>
        );
    }

    return post ? (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b border-gray-100 bg-white sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors duration-200"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Blog
                    </button>
                    
                    {isAuthor && (
                        <div className="flex items-center space-x-2">
                            {/* Edit Button */}
                            <Link to={`/edit-post/${post._id}`}>
                                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 group">
                                    <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit
                                </button>
                            </Link>
                            
                            {/* Delete Button */}
                            <button 
                                onClick={handleDelete}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-200 group"
                            >
                                <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </header>

            {/* Article */}
            <article className="max-w-4xl mx-auto px-4 py-12">
                {/* Title */}
                <header className="mb-12">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                        {post.title}
                    </h1>
                    
                    {/* Author & Date */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center text-gray-600 text-sm">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                                    <span className="text-gray-600 font-medium">
                                        {(post.owner?.username || 'A').charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">
                                        {post.owner?.username || 'Anonymous'}
                                    </p>
                                    <p className="text-gray-500">
                                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Edit/Delete Actions */}
                        {isAuthor && (
                            <div className="flex items-center space-x-2 md:hidden">
                                <Link to={`/edit-post/${post._id}`}>
                                    <button className="p-2 text-blue-700 bg-blue-50 border border-blue-200 rounded-full hover:bg-blue-100 transition-colors duration-200">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                </Link>
                                <button 
                                    onClick={handleDelete}
                                    className="p-2 text-red-700 bg-red-50 border border-red-200 rounded-full hover:bg-red-100 transition-colors duration-200"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                {/* Featured Image */}
                {post.image && (
                    <div className="mb-12">
                        <div className="relative w-full" style={{ aspectRatio: '16/9', maxHeight: '500px' }}>
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover rounded-lg shadow-lg"
                                style={{
                                    objectPosition: 'center center'
                                }}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                    <style jsx>{`
                        .prose {
                            font-family: Georgia, 'Times New Roman', Times, serif;
                            line-height: 1.7;
                            color: #374151;
                        }
                        .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
                            color: #111827;
                            font-weight: 700;
                            margin-top: 2rem;
                            margin-bottom: 1rem;
                            line-height: 1.3;
                        }
                        .prose h1 { font-size: 2.25rem; }
                        .prose h2 { font-size: 1.875rem; }
                        .prose h3 { font-size: 1.5rem; }
                        .prose h4 { font-size: 1.25rem; }
                        .prose p {
                            margin-bottom: 1.5rem;
                            font-size: 1.125rem;
                        }
                        .prose img {
                            margin: 2rem auto;
                            border-radius: 0.5rem;
                            max-width: 100%;
                            height: auto;
                            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                        }
                        .prose blockquote {
                            border-left: 4px solid #e5e7eb;
                            margin: 2rem 0;
                            padding-left: 1.5rem;
                            font-style: italic;
                            color: #6b7280;
                        }
                        .prose ul, .prose ol {
                            margin: 1.5rem 0;
                            padding-left: 1.5rem;
                        }
                        .prose li {
                            margin: 0.5rem 0;
                        }
                        .prose a {
                            color: #2563eb;
                            text-decoration: underline;
                        }
                        .prose a:hover {
                            color: #1d4ed8;
                        }
                        .prose code {
                            background-color: #f3f4f6;
                            padding: 0.125rem 0.25rem;
                            border-radius: 0.25rem;
                            font-size: 0.875rem;
                        }
                        .prose pre {
                            background-color: #1f2937;
                            color: #f9fafb;
                            padding: 1rem;
                            border-radius: 0.5rem;
                            overflow-x: auto;
                            margin: 1.5rem 0;
                        }
                        .prose hr {
                            border: none;
                            height: 1px;
                            background-color: #e5e7eb;
                            margin: 3rem 0;
                        }
                    `}</style>
                    <div>{parse(post.content)}</div>
                </div>

                {/* Footer */}
                <footer className="mt-16 pt-8 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                                <span className="text-gray-600 font-medium text-lg">
                                    {(post.owner?.username || 'A').charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">
                                    {post.owner?.username || 'Anonymous'}
                                </h4>
                                <p className="text-gray-500 text-sm">Author</p>
                            </div>
                        </div>
                        
                        <button
                            onClick={() => navigate("/")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                        >
                            Read More Articles
                        </button>
                    </div>
                </footer>
            </article>
        </div>
    ) : null;
}
