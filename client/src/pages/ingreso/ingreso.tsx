import { useEffect, useState } from 'react'
import { getIngreso } from './ingresoService'
import { toast } from 'sonner'
import { Ingreso } from '.'
import { useSocket } from '../../hooks/useSocket'
import UrgenciaBadge from '../../components/urgencia-badge'
import { useParams } from 'react-router-dom'

export default function IngresoPage() {
  const [ingreso, setIngreso] = useState<Ingreso | null>(null)
  const socket = useSocket()
  const { id } = useParams()

  useEffect(() => {
    if (!socket) return

    socket.on('editar_ingreso', (ingreso: Ingreso) => {
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
      if (ingreso.id === ingreso?.id) {
        getIngreso({ id: ingreso.id })
          .then((data) => setIngreso(data))
          .catch((error) => {
            toast.error('Error al obtener los ingreso')
            console.error(error)
          })
      }
    })

    return () => {
      socket.off('editar_ingreso')
    }
  }, [socket])

  useEffect(() => {
    if (!id || !Number(id)) return
    getIngreso({ id: Number(id) })
      .then((data) => setIngreso(data))
      .catch((error) => {
        toast.error('Error al obtener los ingreso')
        console.error(error)
      })
  }, [id])

  return (
    <main className="flex flex-col grow py-4 sm:px-6 lg:px-8 overflow-hidden min-w-full">
      <section className="bg-slate-50/70 flex grow shadow border rounded max-h-[80vh] overflow-y-auto">
        {!ingreso ? (
          <div className="flex h-full w-full items-center justify-center text-center animate-pulse text-slate-600 font-semibold text-2xl">
            Cargando ...
          </div>
        ) : (
          <div>
            <header className="sticky top-0 p-4 bg-white/50 backdrop-blur-sm shadow-sm">
              <h4>
                Paciente {ingreso.paciente.nombre}{' '}
                <UrgenciaBadge urgencia={ingreso.urgencia} />
              </h4>
              <p className="text-sm">
                Fecha de ingreso: {new Date(ingreso.fecha).toLocaleString()}
              </p>
            </header>
            <div className="p-4">
              <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <label>
                  Peso
                  <input value={ingreso.peso} readOnly />
                </label>
                <label>
                  Altura
                  <input value={ingreso.altura} readOnly />
                </label>
                <label>
                  Temperatura
                  <input value={ingreso.temperatura} readOnly />
                </label>
                <label>
                  Presión
                  <input value={ingreso.presion} readOnly />
                </label>
              </section>
              <section className="grid md:grid-cols-2">
                <label>
                  Síntomas
                  <textarea value={ingreso.sintomas} readOnly />
                </label>
                <label>
                  Razón
                  <textarea value={ingreso.razon} readOnly />
                </label>
              </section>
              <section className="grid md:grid-cols-2">
                <label>
                  Enfermero
                  <input
                    value={ingreso.enfermero?.nombre || 'Sin enfermero'}
                    readOnly
                  />
                </label>
                <label>
                  Doctor
                  <input
                    value={ingreso.doctor?.nombre || 'Sin doctor'}
                    readOnly
                  />
                </label>
              </section>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
