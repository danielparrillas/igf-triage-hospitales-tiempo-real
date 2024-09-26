import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/login/login-page'
import HomePage from './pages/home/home-page'
import RecepcionPage from './pages/recepcion/recepcion-page'
import { SocketProvider } from './contexts/socket-context'
import ExamplePage from './pages/example/ExamplePage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/recepcion',
    element: <RecepcionPage />
  },
  {
    path: '/example',
    element: <ExamplePage />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SocketProvider>
      <RouterProvider router={router} />
    </SocketProvider>
  </StrictMode>
)
