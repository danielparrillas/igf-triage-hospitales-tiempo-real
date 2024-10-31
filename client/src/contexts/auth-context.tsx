import { createContext, useState, ReactNode, useEffect } from 'react'

interface User {
  id: string
  email: string
  name: string
  role: number
}

interface Auth {
  user: User | null
  token: string | null
}

interface AuthContextType {
  auth: Auth | null
  login: (auth: Auth) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<Auth | null>(() => {
    const authStored = localStorage.getItem('auth')
    return authStored ? JSON.parse(authStored) : null
  })

  useEffect(() => {
    if (auth) {
      localStorage.setItem('auth', JSON.stringify(auth))
    } else {
      localStorage.removeItem('auth')
    }
  }, [auth])

  const login = (newAuth: Auth) => {
    setAuth(newAuth)
  }

  const logout = () => {
    setAuth(null)
  }

  const value = { auth, login, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
