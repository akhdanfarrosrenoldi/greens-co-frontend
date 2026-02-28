'use client'

import { useEffect, useState } from 'react'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import { User } from '@/types'
import { supabase } from '@/lib/supabase'

function mapUser(supabaseUser: SupabaseUser): User {
  const role =
    supabaseUser.user_metadata?.role ??
    supabaseUser.app_metadata?.role ??
    'CUSTOMER'
  return {
    id: supabaseUser.id,
    name: supabaseUser.user_metadata?.name ?? supabaseUser.email ?? '',
    email: supabaseUser.email ?? '',
    role: (role as string).toUpperCase() as User['role'],
  }
}

function setCookies(token: string, role: string) {
  document.cookie = `token=${token}; path=/; max-age=86400`
  document.cookie = `role=${role.toLowerCase()}; path=/; max-age=86400`
}

function clearCookies() {
  document.cookie = 'token=; path=/; max-age=0'
  document.cookie = 'role=; path=/; max-age=0'
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Hydrate from current session
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ? mapUser(data.user) : null)
      setLoading(false)
    })

    // Keep state in sync across tabs / token refresh
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? mapUser(session.user) : null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    const userData = mapUser(data.user)
    setUser(userData)
    setCookies(data.session.access_token, userData.role)
    return userData
  }

  const register = async (name: string, email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    })
    if (error) throw error
    const userData = mapUser(data.user!)
    if (data.session) {
      setUser(userData)
      setCookies(data.session.access_token, userData.role)
    }
    return userData
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    clearCookies()
  }

  return { user, loading, login, register, logout }
}
