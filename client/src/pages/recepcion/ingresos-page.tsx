import { useEffect, useState } from 'react'
import { IngresoDialogNewForm } from './components/ingreso-dialog-new-form'
import { Ingreso } from '../../types'
import { getIngresos } from '../../services/ingresoService'
import { useSocket } from '../../hooks/useSocket'
import { toast } from 'sonner'
import UrgenciaBadge from '../../components/urgencia-badge'
import { IngresoDialogEditForm } from './components/ingreso-dialog-edit-form'
import { Pencil } from 'lucide-react'

export default function IngresosPage() {
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
      toast.message(`Nuevo ingreso registrado: ${ingreso?.paciente?.nombre}`, {
        description: (
          <div className="mt-2 flex  flex-col">
            <UrgenciaBadge urgencia={ingreso.urgencia} />
            <time className="text-right text-slate-500 mt-1">
              {new Date(ingreso.fecha).toLocaleString()}
            </time>
          </div>
        )
      })
    })

    socket.on('editar_ingreso', (ingreso: Ingreso) => {
      setIngresos((prevIngresos) =>
        prevIngresos.map((ing) => (ing.id === ingreso.id ? ingreso : ing))
      )
      toast.message(`Ingreso actualizado: ${ingreso?.paciente?.nombre}`, {
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
    <main className="flex flex-col grow py-4 sm:px-6 lg:px-8 overflow-hidden min-w-full">
      <header className="flex gap-4 mb-4">
        <h4 className="text-gray-800">Ingresos</h4>
        <IngresoDialogNewForm />
      </header>
      <section className="bg-white grow px-2 shadow border rounded max-h-[75vh] overflow-y-auto">
        <table className="text-xs w-full min-w-full">
          <thead className="sticky top-0">
            <tr>
              <th scope="col" className="h-12">
                #
              </th>
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
                  <td>{ingreso.paciente.nombre}</td>
                  <td>{ingreso.razon}</td>
                  <td>
                    <button
                      onClick={() => setIngresoEdit(ingreso)}
                      className="px-1 pt-0 pb-0.5 text-xs bg-amber-500 border-none"
                    >
                      <Pencil className="size-3" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
      {ingresoEdit && (
        <IngresoDialogEditForm
          ingreso={ingresoEdit}
          onFinish={() => setIngresoEdit(null)}
        />
      )}
    </main>
  )
}
