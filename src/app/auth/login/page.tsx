'use client'

import { Suspense, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2, Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const router = useRouter()
  const params = useSearchParams()
  const redirect = params.get('redirect') || '/'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return setError('Please fill in all fields.')
    setError('')
    setLoading(true)
    try {
      const user = await login(email, password)
      router.push(user.role === 'ADMIN' ? '/admin' : redirect)
    } catch {
      setError('Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left — Branding */}
      <div className="hidden lg:flex w-[440px] shrink-0 bg-[#f0fdf4] flex-col justify-between p-10 overflow-hidden">
        <Link href="/" className="font-heading text-2xl font-bold text-green-DEFAULT">
          Greens & Co.
        </Link>
        <div className="space-y-4">
          <p className="font-heading text-[34px] font-bold text-[#111827] leading-tight">
            Fresh food,{' '}
            <em className="italic text-green-DEFAULT">delivered</em>
            <br />
            to your door.
          </p>
          <p className="text-[#6b7280] text-[15px] leading-[1.7]">
            Join thousands of customers enjoying healthy, locally-sourced meals every day.
          </p>
        </div>
        <div className="relative h-56 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80"
            alt="Fresh salad"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f0fdf4]/80 via-transparent to-transparent" />
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 bg-white">
        <div className="w-full max-w-sm">
          <Link
            href="/"
            className="font-heading text-xl font-bold text-green-DEFAULT lg:hidden block mb-8"
          >
            Greens & Co.
          </Link>
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-bold mb-1">Welcome Back</h1>
            <p className="text-sm text-muted">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted uppercase tracking-wider block mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 text-sm border border-[#e5e7eb] rounded-xl focus:outline-none focus:border-green-DEFAULT transition-colors bg-[#f9fafb] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-muted uppercase tracking-wider">
                  Password
                </label>
                <span className="text-xs text-green-DEFAULT cursor-pointer hover:underline font-medium">
                  Forgot password?
                </span>
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 text-sm border border-[#e5e7eb] rounded-xl focus:outline-none focus:border-green-DEFAULT transition-colors bg-[#f9fafb] focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-[#111827] transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-500 bg-red-50 border border-red-100 px-3 py-2.5 rounded-lg">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-green-DEFAULT text-white rounded-full font-semibold hover:bg-green-dark hover:-translate-y-0.5 transition-all disabled:opacity-60 shadow-[0_4px_16px_rgba(22,163,74,0.25)] mt-2"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-muted mt-8">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="text-green-DEFAULT font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
