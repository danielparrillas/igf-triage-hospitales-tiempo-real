import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { AuthProvider } from './contexts/auth-context'
import HomePage from './pages/home/home-page'
import LoginPage from './pages/login/login-page'
import ProtectedRoute from './components/protected-route'
import { useAuth } from './hooks/useAuth'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <Link to="/" className="text-xl font-bold text-indigo-600">
                      ProtectedApp
                    </Link>
                  </div>
                  <div className="ml-6 flex space-x-8">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    <NavLink to="/profile">Profile</NavLink>
                  </div>
                </div>
                <AuthStatus />
              </div>
            </div>
          </nav>

          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <div>Dashboard</div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <div>Profile</div>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  )
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
    >
      {children}
    </Link>
  )
}

function AuthStatus() {
  const { auth, logout } = useAuth()

  if (!auth) {
    return (
      <Link
        to="/login"
        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
      >
        Log in
      </Link>
    )
  }

  return (
    <div className="flex items-center">
      <span className="text-sm font-medium text-gray-700 mr-4">
        Welcome, {auth.user?.name || 'User'}!
      </span>
      <button
        onClick={logout}
        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
      >
        Log out
      </button>
    </div>
  )
}

export default App
