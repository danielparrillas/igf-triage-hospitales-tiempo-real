import { urgenciaValuesLabel } from '../../../types/urgenciaEnum'
import { putIngreso } from '../../../services/ingresoService'
import { Ingreso } from '../../../types'
import { toast } from 'sonner'
import { useState } from 'react'
import ErrorMessage from '../../../components/error-message'
import { formatLocalDateTime } from '../../../utils/datetimeUtil'
import SelectPaciente from '../../../components/select-paciente'

interface Props {
  ingreso: Ingreso
  onFinish: () => void
}

export function IngresoDialogEditForm({ ingreso, onFinish }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({})

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
        form.reset()
        setErrors({})
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
                Fecha
                <ErrorMessage>{errors.fecha}</ErrorMessage>
                <input
                  type="datetime-local"
                  name="fecha"
                  defaultValue={formatLocalDateTime(ingreso.fecha)}
                  required
                />
              </label>
              <label>
                Paciente
                <SelectPaciente
                  initialValue={ingreso.paciente.nombre}
                  selected={ingreso.paciente.id}
                  name="pacienteId"
                  required
                />
              </label>
              <label>
                Peso
                <ErrorMessage>{errors.peso}</ErrorMessage>
                <input
                  defaultValue={ingreso.peso}
                  name="peso"
                  type="number"
                  step="0.01"
                  required
                />
              </label>
              <label>
                Altura
                <ErrorMessage>{errors.altura}</ErrorMessage>
                <input
                  defaultValue={ingreso.altura}
                  name="altura"
                  type="number"
                  step="0.01"
                  required
                />
              </label>
              <label>
                Temperatura
                <ErrorMessage>{errors.temperatura}</ErrorMessage>
                <input
                  defaultValue={ingreso.temperatura}
                  name="temperatura"
                  type="number"
                  step="0.01"
                  required
                />
              </label>
              <label>
                Presión
                <ErrorMessage>{errors.presion}</ErrorMessage>
                <input defaultValue={ingreso.presion} name="presion" required />
              </label>
              <label>
                Síntomas
                <ErrorMessage>{errors.sintomas}</ErrorMessage>
                <textarea
                  defaultValue={ingreso.sintomas}
                  name="sintomas"
                  placeholder="Síntomas del paciente"
                  required
                ></textarea>
              </label>
              <label>
                Urgencia
                <ErrorMessage>{errors.urgencia}</ErrorMessage>
                <select name="urgencia" required>
                  {urgenciaValuesLabel.map(({ value, label }) => (
                    <option
                      key={value}
                      value={value}
                      selected={ingreso.urgencia === value}
                    >
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Razón
                <ErrorMessage>{errors.razon}</ErrorMessage>
                <textarea
                  defaultValue={ingreso.razon}
                  name="razon"
                  placeholder="Razón de ingreso"
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
