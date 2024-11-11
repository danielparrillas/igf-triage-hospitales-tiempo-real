import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { AuthProvider } from './contexts/auth-context'
import HomePage from './pages/home/home-page'
import LoginPage from './pages/login/login-page'
import ProtectedRoute from './components/protected-route'
import { useAuth } from './hooks/useAuth'
import { Toaster } from 'sonner'
import IngresosPage from './pages/recepcion/ingresos-page'
import IngresoPage from './pages/ingreso/ingreso'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="relative min-h-screen flex flex-col">
          <nav className="bg-white shadow sticky top-0 w-full z-10">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <Link
                      to="/"
                      className="text-xl font-bold text-indigo-600 no-underline"
                    >
                      Triaje
                    </Link>
                  </div>
                  <div className="ml-6 flex space-x-8">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/ingresos">Ingresos</NavLink>
                  </div>
                </div>
                <AuthStatus />
              </div>
            </div>
          </nav>
          <div className="relative w-full h-full flex flex-col grow mx-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/ingresos"
                element={
                  <ProtectedRoute>
                    <IngresosPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ingresos/:id"
                element={
                  <ProtectedRoute>
                    <IngresoPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<div>404</div>} />
            </Routes>
            <div className="absolute">
              <Toaster richColors />
            </div>
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
      className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 no-underline"
    >
      {children}
    </Link>
  )
}

function AuthStatus() {
  const { auth, logout } = useAuth()

  if (!auth) {
    return (
      <div className="flex items-center">
        <Link to="/login">
          <button className="bg-transparent border-none text-sm font-medium text-indigo-600 hover:text-indigo-500 text-nowrap">
            Log in
          </button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center">
      <span className="text-sm font-medium text-gray-700 mr-4">
        Welcome, {auth.user?.name || 'User'}!
      </span>
      <button
        onClick={logout}
        className="bg-transparent border-none text-sm font-medium text-indigo-600 hover:text-indigo-500 text-nowrap"
      >
        Log out
      </button>
    </div>
  )
}

export default App
