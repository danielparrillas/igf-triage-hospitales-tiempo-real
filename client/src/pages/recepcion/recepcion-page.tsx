import { useEffect, useState } from 'react'
import { IngresoDialogNewForm } from './components/ingreso-dialog-new-form'
import { Ingreso } from '../../types'
import { getIngresos } from '../../services/ingresoService'
import { useSocket } from '../../hooks/useSocket'
import { toast } from 'sonner'
import UrgenciaBadge from '../../components/urgencia-badge'

export default function RecepcionPage() {
  const [ingresos, setIngresos] = useState<Ingreso[]>([])
  const socket = useSocket()

  useEffect(() => {
    getIngresos().then(setIngresos).catch(console.error)
  }, [])

  useEffect(() => {
    if (!socket) return

    socket.on('nuevo_ingreso', (ingreso: Ingreso) => {
      setIngresos((prevIngresos) => [ingreso, ...prevIngresos])
      toast.message(`Nuevo ingreso registrado: ${ingreso.paciente}`, {
        description: (
          <div className="mt-2 flex  flex-col">
            <UrgenciaBadge urgencia={ingreso.urgencia} />
            <time className="text-right text-slate-500 mt-1">
              {new Date(ingreso.fecha).toLocaleString()}
            </time>
          </div>
        )
      })
      console.log('Nuevo ingreso registrado', ingreso)
    })

    return () => {
      socket.off('nuevo_ingreso')
    }
  }, [socket])
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
            {ingresos
              .sort((a, b) => a.fecha.localeCompare(b.fecha))
              .sort((a, b) => a.urgencia - b.urgencia)
              .map((ingreso, index) => (
                <tr key={ingreso.id}>
                  <td scope="row">{index + 1}</td>
                  <td>
                    <UrgenciaBadge urgencia={ingreso.urgencia} />
                  </td>
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
