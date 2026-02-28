const TOKEN_KEY = 'token'
const USER_KEY = 'user'

export const saveToken = (token: string) => {
  if (typeof window !== 'undefined') localStorage.setItem(TOKEN_KEY, token)
}

export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_KEY)
}

export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }
}

export const saveUser = (user: unknown) => {
  if (typeof window !== 'undefined')
    localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export const getSavedUser = () => {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export const isAuthenticated = (): boolean => {
  return !!getToken()
}
