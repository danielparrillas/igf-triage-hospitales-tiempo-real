import { getLocalDateTimestamp } from '../../../utils/datetimeUtil'
import { urgenciaValuesLabel } from '../../../types/urgenciaEnum'
import { putIngreso } from '../../../services/ingresoService'
import { Ingreso } from '../../../types'
import { toast } from 'sonner'

interface Props {
  ingreso: Ingreso
  onFinish: () => void
}

export function IngresoDialogEditForm({ ingreso, onFinish }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const objFormData = Object.fromEntries(formData)
    const data = {
      paciente: objFormData.paciente as string,
      dui: objFormData.dui as string,
      fecha: new Date(objFormData.fecha as string).toISOString(),
      urgencia: +objFormData.urgencia,
      razon: objFormData.razon as string
    }
    putIngreso(ingreso.id, data)
      .then(() => {
        onFinish()
      })
      .catch((error) => {
        console.error(error)
        toast.error('Error al actualizar el ingreso')
      })
  }

  return (
    <div>
      <dialog open>
        <article>
          <header>
            <button rel="prev" onClick={onFinish}></button>
            <p>
              <strong>🗓️ Nuevo ingreso</strong>
            </p>
          </header>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <label>
                Paciente
                <input
                  name="paciente"
                  placeholder="Nombre de paciente"
                  defaultValue={ingreso.paciente}
                  required
                />
              </label>
              <label>
                DUI
                <input
                  name="dui"
                  placeholder="DUI"
                  defaultValue={ingreso.dui}
                  required
                />
              </label>
              <label>
                Fecha
                <input
                  type="datetime-local"
                  name="fecha"
                  defaultValue={getLocalDateTimestamp(ingreso.fecha)}
                  required
                />
              </label>
              <label>
                Urgencia
                <select
                  name="urgencia"
                  defaultValue={ingreso.urgencia.toString()}
                  required
                >
                  {urgenciaValuesLabel.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Razón
                <textarea
                  name="razon"
                  placeholder="Razón de ingreso"
                  defaultValue={ingreso.razon}
                  required
                ></textarea>
              </label>
            </fieldset>
            <input type="submit" value="Actualizar" />
          </form>
        </article>
      </dialog>
    </div>
  )
}
