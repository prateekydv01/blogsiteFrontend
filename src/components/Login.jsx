import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from "../store/authSlice"
import { useDispatch } from 'react-redux'
import { Button, Input, Logo } from './index'
import { loginUser, getCurrentUser } from '../api/auth'
import { useForm } from "react-hook-form"

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const login = async (data) => {
    setError("")
    setIsLoading(true)
    try {
      const session = await loginUser(data)
      console.log(session)
      if (session) {
        const { data: userResLevel1 } = await getCurrentUser()
        console.log(userResLevel1)
        const user = userResLevel1.data
         console.log(user)
        if (user) {
         
          dispatch(authLogin({ userData: user }))
          navigate("/")
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center w-full bg-gradient-to-br from-blue-50 to-indigo-100 p-4'>
      <div className='mx-auto w-full max-w-md bg-white rounded-2xl p-8 shadow-xl border border-gray-100 transform hover:scale-105 transition-transform duration-300'>
        
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full p-3 shadow-lg">
            <span className="inline-block w-full max-w-[60px] text-white">
              <Logo width="100%" />
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          Welcome Back
        </h2>
        
        {/* Sign up link */}
        <p className="text-center text-gray-600 mb-8">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="font-semibold text-blue-600 hover:text-indigo-600 transition-colors duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg shadow-sm">
            <p className="text-red-700 text-sm text-center font-medium">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(login)} className='space-y-5'>
          
          {/* Email input */}
          <div className="group">
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 placeholder-gray-400"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Email address must be valid"
                  }
                })}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-2 animate-pulse">{errors.email.message}</p>
            )}
          </div>

          {/* Password input */}
          <div className="group">
            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 placeholder-gray-400"
                {...register("password", {
                  required: "Password is required"
                })}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-2 animate-pulse">{errors.password.message}</p>
            )}
          </div>

          {/* Submit button */}
          <Button 
            type="submit" 
            className="w-full mt-8 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Signing in...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        {/* Forgot password link */}
        <div className="mt-8 text-center">
          <Link
            to="/forgot-password"
            className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:underline"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login