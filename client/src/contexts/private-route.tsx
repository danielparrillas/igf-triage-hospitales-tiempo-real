import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../hooks/useAuthStore'

export default function PrivateRoute({
  children
}: {
  children: React.ReactNode
}) {
  const user = useAuthStore((state) => state.user)
  const path = useLocation().pathname
  console.log('user', user)
  return user ? (
    children
  ) : (
    <Navigate
      to="/login"
      state={{
        from: path
      }}
    />
  )
}
