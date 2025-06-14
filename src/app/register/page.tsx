'use client'

import { useState } from 'react'
import { supabase } from '@/app/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleRegister = async () => {
    setIsLoading(true)
    setMessage('')

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/dashboard`,
      },
    })

    setIsLoading(false)

    if (error) {
      alert(error.message)
    } else {
      setMessage('📧 Link verifikasi telah dikirim ke email Anda.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Create Account</h2>
        <p className="text-center text-gray-500 mb-6 text-sm">Register to start managing your notes</p>

        {message && (
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md mb-4 text-sm text-center">
            {message}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="8+ characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              disabled={isLoading}
            />
          </div>

          <button
            onClick={handleRegister}
            disabled={isLoading}
            className={`w-full py-2 rounded-lg font-semibold transition duration-300 shadow ${
              isLoading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600 text-white'
            }`}
          >
            {isLoading ? 'Processing...' : 'Register'}
          </button>

       {/* Divider */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mt-4">
            <div className="flex-1 h-px bg-gray-300" />
            or
            <div className="flex-1 h-px bg-gray-300" />
          </div>


          <button
          onClick={async () => {
            await supabase.auth.signInWithOAuth({
              provider: 'google',
              options: {
                redirectTo: `${location.origin}/dashboard`,
              },
            })
          }}
          className="mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition duration-300 shadow"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21.35 11.1h-9.18v2.92h5.78c-.25 1.44-1.4 2.67-2.77 3.23v2.7h4.49c2.63-2.42 4.1-6.01 4.1-8.94 0-.61-.05-1.2-.15-1.77l-.27-1.14z" />
            <path d="M12.17 21c2.38 0 4.38-.78 5.84-2.12l-2.76-2.7c-.76.5-1.74.78-3.08.78-2.36 0-4.36-1.57-5.08-3.7h-3.07v2.29c1.46 2.89 4.5 5.45 8.15 5.45z" />
            <path d="M7.09 12.96c-.18-.54-.29-1.13-.29-1.75s.1-1.2.28-1.74V7.18H3.99A8.944 8.944 0 0 0 3 11.2c0 1.49.36 2.9.99 4.02l3.1-2.26z" />
            <path d="M12.17 4.96c1.3 0 2.46.44 3.38 1.31l2.53-2.52C16.53 2.17 14.53 1.2 12.17 1.2 8.52 1.2 5.48 3.76 3.99 6.62l3.1 2.29c.72-2.14 2.72-3.7 5.08-3.7z" />
          </svg>
          Register with Google
        </button>

        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  )
}
