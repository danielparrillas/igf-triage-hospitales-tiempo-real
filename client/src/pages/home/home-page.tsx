import { Link } from 'react-router-dom'

const salas = [
  {
    id: 1,
    nombre: 'Sala 1',
    encargado: 'Dr. Juan Pérez',
    estado: 'Libre'
  },
  {
    id: 2,
    nombre: 'Sala 2',
    encargado: 'Dra. María López',
    estado: 'Ocupado'
  },
  {
    id: 3,
    nombre: 'Sala 3',
    encargado: 'Dr. Carlos García',
    estado: 'Libre'
  },
  {
    id: 4,
    nombre: 'Sala 4',
    encargado: 'Dra. Ana Martínez',
    estado: 'En limpieza'
  },
  {
    id: 5,
    nombre: 'Sala 5',
    encargado: 'Dr. Luis Rodríguez',
    estado: 'Libre'
  },
  {
    id: 6,
    nombre: 'Sala 6',
    encargado: 'Dra. Laura Fernández',
    estado: 'Ocupado'
  },
  {
    id: 7,
    nombre: 'Sala 7',
    encargado: 'Dr. Pedro Sánchez',
    estado: 'Libre'
  },
  {
    id: 8,
    nombre: 'Sala 8',
    encargado: 'Dra. Elena Gómez',
    estado: 'En limpieza'
  },
  {
    id: 9,
    nombre: 'Sala 9',
    encargado: 'Dr. Javier Díaz',
    estado: 'Libre'
  },
  {
    id: 10,
    nombre: 'Sala 10',
    encargado: 'Dra. Patricia Ruiz',
    estado: 'Ocupado'
  }
]

export default function HomePage() {
  // const navigate = useNavigate()

  // useEffect(() => {
  //   navigate('/login')
  // }, [navigate])

  return (
    <main>
      <nav className="p-4">
        <ul>
          <li>
            <Link to={'/'}>
              <h2>Triaje</h2>
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to={'/recepcion'}>Recepción</Link>
          </li>
          <li>
            <a href="#">Administración</a>
          </li>
        </ul>
      </nav>
      <section className="p-4 gap-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {salas.map((sala) => (
          <article key={sala.id}>
            <header>{sala.nombre}</header>
            <p>Encargado: {sala.encargado}</p>
            <footer>Estado: {sala.estado}</footer>
          </article>
        ))}
      </section>
    </main>
  )
}
