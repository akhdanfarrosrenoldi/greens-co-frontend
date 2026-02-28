'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2, Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '@/hooks/useAuth'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})
type LoginForm = z.infer<typeof loginSchema>

function LoginForm() {
  const [showPass, setShowPass] = useState(false)
  const [serverError, setServerError] = useState('')
  const { login } = useAuth()
  const router = useRouter()
  const params = useSearchParams()
  const redirect = params.get('redirect') || '/'

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) })

  const onSubmit = async (data: LoginForm) => {
    setServerError('')
    try {
      const user = await login(data.email, data.password)
      router.push(user.role === 'ADMIN' ? '/admin' : redirect)
    } catch {
      setServerError('Invalid email or password.')
    }
  }

  return (
    <div className="min-h-screen bg-white flex justify-center items-start pt-20 px-8 pb-12">
      <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-bold mb-1">Welcome Back</h1>
            <p className="text-sm text-muted">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted uppercase tracking-wider block mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                <input
                  type="email"
                  {...register('email')}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 text-sm border border-[#e5e7eb] rounded-xl focus:outline-none focus:border-green-DEFAULT transition-colors bg-[#f9fafb] focus:bg-white"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
              )}
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
                  {...register('password')}
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
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            {serverError && (
              <p className="text-xs text-red-500 bg-red-50 border border-red-100 px-3 py-2.5 rounded-lg">
                {serverError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 0', background: '#16a34a', color: '#ffffff', border: 'none', borderRadius: 100, fontFamily: 'DM Sans, sans-serif', fontSize: 15, fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 16px rgba(22,163,74,0.25)', marginTop: 8, transition: 'background 0.2s, transform 0.2s', opacity: isSubmitting ? 0.6 : 1 }}
              onMouseEnter={e => { if (!isSubmitting) { e.currentTarget.style.background = '#15803d'; e.currentTarget.style.transform = 'translateY(-1px)' } }}
              onMouseLeave={e => { e.currentTarget.style.background = '#16a34a'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              {isSubmitting && <Loader2 size={16} className="animate-spin" />}
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
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
