import axios from 'axios'
import { toast } from 'sonner'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAuth()

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
          const from = location.state?.from?.pathname || '/'
          auth.login({ token: data.token, user: data.user })
          navigate(from, { replace: true })
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
    <div className="flex grow items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="p-4 rounded-md max-w-md w-full shadow-md bg-white py-16"
      >
        <h3 className="text-center">Login</h3>
        <label htmlFor="email">Usuario</label>
        <input type="email" name="email" id="email" required />
        <label htmlFor="password">Contraseña</label>
        <input type="password" name="password" id="password" required />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded-md p-2 uppercase"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  )
}
