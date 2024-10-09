import { create } from 'zustand'

interface User {
  id: string
  email: string
  name: string
  role: number
}

interface AuthStore {
  user: User | null
  token: string | null
  setAuth: (user: User, token: string) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  setAuth: (user, token) => set({ user, token })
}))

export const isAuthenticated = () => {
  const user = useAuthStore.getState().user
  return user !== null
}
