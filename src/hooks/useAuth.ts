'use client'

import { useEffect, useState } from 'react'
import { User } from '@/types'
import { getToken, getSavedUser, saveToken, saveUser, removeToken } from '@/lib/auth'
import { login as apiLogin, register as apiRegister, getMe } from '@/lib/api'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getToken()
    if (token) {
      const saved = getSavedUser() as User | null
      if (saved) {
        setUser(saved)
        setLoading(false)
      } else {
        getMe()
          .then((res) => {
            setUser(res.data.data)
            saveUser(res.data.data)
          })
          .catch(() => removeToken())
          .finally(() => setLoading(false))
      }
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    const res = await apiLogin({ email, password })
    const { token, user: userData } = res.data.data
    saveToken(token)
    saveUser(userData)
    setUser(userData)
    return userData as User
  }

  const register = async (name: string, email: string, password: string) => {
    const res = await apiRegister({ name, email, password })
    const { token, user: userData } = res.data.data
    saveToken(token)
    saveUser(userData)
    setUser(userData)
    return userData as User
  }

  const logout = () => {
    removeToken()
    setUser(null)
  }

  return { user, loading, login, register, logout }
}
