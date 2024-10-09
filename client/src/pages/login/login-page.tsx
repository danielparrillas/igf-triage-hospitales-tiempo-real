import axios from 'axios'
import { toast, Toaster } from 'sonner'
import { useAuthStore } from '../../hooks/useAuthStore'
import { useLocation, useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const setAuth = useAuthStore((state) => state.setAuth)
  //get state from react -router
  const { state } = useLocation()
  const navigate = useNavigate()
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formdata = new FormData(event.currentTarget)
    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/login`, formdata, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(({ data }) => {
        console.log(data)
        toast.success(data.message)
        if (data.token && data.user) {
          setAuth(data.user, data.token)
          //redirect to the previous page from state
          navigate(state?.from || '/')
        }
      })
      .catch((error) => {
        if (error?.response?.data?.message) {
          toast.error(error.response.data.message)
          return
        }
        toast.error('Error al iniciar sesión')
        console.error('Error al iniciar sesión:', error)
      })
  }
  return (
    <div className="h-screen flex items-center justify-center pattern">
      <form
        onSubmit={handleSubmit}
        className="p-4 rounded-md max-w-md w-full shadow-md bg-white"
      >
        <label htmlFor="email">Usuario</label>
        <input type="text" name="email" id="email" required />
        <label htmlFor="password">Contraseña</label>
        <input type="password" name="password" id="password" required />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded-md p-2 uppercase"
        >
          Iniciar sesión
        </button>
      </form>
      <Toaster />
    </div>
  )
}
