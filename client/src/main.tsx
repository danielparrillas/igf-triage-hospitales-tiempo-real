import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/login/login-page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Home!</div>
  },
  {
    path: '/login',
    element: <LoginPage />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
