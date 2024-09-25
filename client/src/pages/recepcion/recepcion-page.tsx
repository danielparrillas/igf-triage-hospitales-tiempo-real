import { useEffect, useState } from 'react'
import { IngresoDialogNewForm } from './components/ingreso-dialog-new-form'
import { Ingreso } from '../../types'
import { getIngresos } from '../../services/ingresoService'
import { UrgenciaEnumLabels } from '../../types/urgenciaEnum'

export default function RecepcionPage() {
  const [ingresos, setIngresos] = useState<Ingreso[]>([])

  useEffect(() => {
    getIngresos().then(setIngresos).catch(console.error)
  }, [])
  return (
    <div>
      <main className="p-4">
        <header className="flex justify-between">
          <h1>Ingresos</h1>
          <IngresoDialogNewForm />
        </header>
        <table>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Urgencia</th>
              <th scope="col">Fecha</th>
              <th scope="col">Paciente</th>
              <th scope="col">Razón</th>
            </tr>
          </thead>
          <tbody>
            {ingresos.map((ingreso, index) => (
              <tr key={ingreso.id}>
                <td scope="row">{index + 1}</td>
                <td>{UrgenciaEnumLabels[ingreso.urgencia]}</td>
                <td>{new Date(ingreso.fecha).toLocaleString()}</td>
                <td>{ingreso.paciente}</td>
                <td>{ingreso.razon}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  )
}
