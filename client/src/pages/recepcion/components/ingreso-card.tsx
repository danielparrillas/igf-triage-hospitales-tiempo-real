import { Ingreso } from '../../../types'

interface Props {
  ingreso: Ingreso
}

export default function IngresoCard({ ingreso }: Props) {
  return (
    <div className="rounded-md p-4 shadow">
      <header>
        <h3>{ingreso.paciente.nombre}</h3>
        <p>{ingreso.fecha}</p>
      </header>
      <section>
        <p>{ingreso.razon}</p>
        <p>{ingreso.urgencia}</p>
      </section>
    </div>
  )
}
