'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Loader2, Eye, EyeOff, Mail, Lock, User, CheckCircle2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '@/hooks/useAuth'

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})
type RegisterForm = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [serverError, setServerError] = useState('')
  const [success, setSuccess] = useState(false)
  const { register: registerUser } = useAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) })

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => router.push('/'), 2000)
      return () => clearTimeout(timer)
    }
  }, [success, router])

  const onSubmit = async (data: RegisterForm) => {
    setServerError('')
    try {
      await registerUser(data.name, data.email, data.password)
      setSuccess(true)
    } catch {
      setServerError('Registration failed. Email may already be in use.')
    }
  }

  return (
    <div className="min-h-screen bg-white flex justify-center items-start pt-20 px-8 pb-12">
      <div className="w-full max-w-sm">

          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#dcfce7] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-green-DEFAULT" />
              </div>
              <h2 className="font-heading text-2xl font-bold mb-2">Account Created!</h2>
              <p className="text-sm text-muted">Welcome to Greens & Co. Redirecting you now…</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="font-heading text-3xl font-bold mb-1">Create Account</h1>
                <p className="text-sm text-muted">Join Greens & Co. today</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-muted uppercase tracking-wider block mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                    <input
                      {...register('name')}
                      placeholder="Your full name"
                      className="w-full pl-10 pr-4 py-3 text-sm border border-[#e5e7eb] rounded-xl focus:outline-none focus:border-green-DEFAULT transition-colors bg-[#f9fafb] focus:bg-white"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                  )}
                </div>

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
                  <label className="text-xs font-semibold text-muted uppercase tracking-wider block mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                    <input
                      type={showPass ? 'text' : 'password'}
                      {...register('password')}
                      placeholder="Min. 6 characters"
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

                <div>
                  <label className="text-xs font-semibold text-muted uppercase tracking-wider block mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      {...register('confirmPassword')}
                      placeholder="Repeat your password"
                      className="w-full pl-10 pr-11 py-3 text-sm border border-[#e5e7eb] rounded-xl focus:outline-none focus:border-green-DEFAULT transition-colors bg-[#f9fafb] focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-[#111827] transition-colors"
                    >
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>
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
                  Create Account
                </button>
              </form>

              <p className="text-center text-sm text-muted mt-8">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-green-DEFAULT font-semibold hover:underline">
                  Sign In
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
  )
}
