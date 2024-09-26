import { useEffect, useState } from 'react'
import { IngresoDialogNewForm } from './components/ingreso-dialog-new-form'
import { Ingreso } from '../../types'
import { getIngresos } from '../../services/ingresoService'
import { useSocket } from '../../hooks/useSocket'
import { toast } from 'sonner'
import UrgenciaBadge from '../../components/urgencia-badge'
import { MainLayout } from '../../layouts/main-layout'
import { IngresoDialogEditForm } from './components/ingreso-dialog-edit-form'

export default function RecepcionPage() {
  const [ingresos, setIngresos] = useState<Ingreso[]>([])
  const [ingresoEdit, setIngresoEdit] = useState<Ingreso | null>(null)
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

    socket.on('editar_ingreso', (ingreso: Ingreso) => {
      setIngresos((prevIngresos) =>
        prevIngresos.map((ing) => (ing.id === ingreso.id ? ingreso : ing))
      )
      toast.message(`Ingreso actualizado: ${ingreso.paciente}`, {
        description: (
          <div className="mt-2 flex flex-col">
            <UrgenciaBadge urgencia={ingreso.urgencia} />
            <time className="text-right text-slate-500 mt-1">
              {new Date(ingreso.fecha).toLocaleString()}
            </time>
          </div>
        )
      })
    })

    return () => {
      socket.off('nuevo_ingreso')
      socket.off('editar_ingreso')
    }
  }, [socket])
  return (
    <MainLayout>
      <main className="p-4 bg-white rounded shadow m-4">
        <header className="flex justify-between mb-4">
          <h4>Ingresos</h4>
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
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="text-xs">
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
                  <td>
                    <button
                      onClick={() => setIngresoEdit(ingreso)}
                      className="p-1 text-xs bg-yellow-600 border-none"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </main>
      {ingresoEdit && (
        <IngresoDialogEditForm
          ingreso={ingresoEdit}
          onFinish={() => setIngresoEdit(null)}
        />
      )}
    </MainLayout>
  )
}
