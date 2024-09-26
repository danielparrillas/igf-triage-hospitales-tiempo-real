import { Link } from 'react-router-dom'
import { Toaster } from 'sonner'

interface Props {
  children: React.ReactNode
}

export function MainLayout({ children }: Props) {
  return (
    <div className="bg-purple-50 h-screen">
      <Toaster richColors />
      <nav className="bg-purple-800/70 px-4 shadow-lg sticky top-0">
        <ul>
          <li>
            <Link to={'/'}>
              <h2 className="text-white">Triaje</h2>
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to={'/recepcion'} className="text-white/80 hover:text-white">
              Recepción
            </Link>
          </li>
          <li>
            <a href="#" className="text-white/80 hover:text-white">
              Administración
            </a>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  )
}
