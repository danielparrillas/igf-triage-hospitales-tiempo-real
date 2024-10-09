import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/home/home-page'
import RecepcionPage from './pages/recepcion/recepcion-page'
import { SocketProvider } from './contexts/socket-context'
import ExamplePage from './pages/example/ExamplePage'
import PrivateRoute from './contexts/private-route'
import LoginPage from './pages/login/login-page'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    )
  },
  {
    path: '/recepcion',
    element: (
      <PrivateRoute>
        <RecepcionPage />
      </PrivateRoute>
    )
  },
  {
    path: '/example',
    element: (
      <PrivateRoute>
        <ExamplePage />
      </PrivateRoute>
    )
  },
  {
    path: '/login',
    element: <LoginPage />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SocketProvider>
      <RouterProvider router={router} />
    </SocketProvider>
  </StrictMode>
)
