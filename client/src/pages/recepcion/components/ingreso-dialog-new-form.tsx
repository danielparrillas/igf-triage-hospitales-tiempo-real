import { useState } from 'react'
import { getLocalDateTimestamp } from '../../../utils/datetimeUtil'
import { urgenciaValuesLabel } from '../../../types/urgenciaEnum'
import { postIngreso } from '../../../services/ingresoService'
import ErrorMessage from '../../../components/error-message'
import { toast } from 'sonner'
import SelectPaciente from '../../../components/select-paciente'

export function IngresoDialogNewForm() {
  const [open, setOpen] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const objFormData = Object.fromEntries(formData)
    const data = {
      fecha: new Date(objFormData.fecha as string).toISOString(),
      razon: objFormData.razon as string,
      peso: +objFormData.peso,
      altura: +objFormData.altura,
      temperatura: +objFormData.temperatura,
      sintomas: objFormData.sintomas as string,
      presion: objFormData.presion as string,
      pacienteId: +objFormData.pacienteId,
      urgencia: +objFormData.urgencia,
      estado: 2
    }

    postIngreso(data)
      .then(() => {
        setOpen(false)
        form.reset()
        setErrors({})
      })
      .catch((error) => {
        console.error(error)
        toast.error('Error al guardar el ingreso')
        const errors = error?.response?.data?.error
        if (typeof errors === 'object') {
          setErrors(errors)
        }
      })
  }

  return (
    <div>
      <button onClick={() => setOpen(true)} className="p-2 text-xs bg-blue-700">
        Nuevo
      </button>
      <dialog open={open}>
        <article>
          <header>
            <button rel="prev" onClick={() => setOpen(false)}></button>
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
                  defaultValue={getLocalDateTimestamp()}
                  required
                />
              </label>
              <label>
                Paciente
                <ErrorMessage>{errors.pacienteId}</ErrorMessage>
                <SelectPaciente name="pacienteId" required />
              </label>
              <label>
                Peso
                <ErrorMessage>{errors.peso}</ErrorMessage>
                <input name="peso" type="number" step="0.01" required />
              </label>
              <label>
                Altura
                <ErrorMessage>{errors.altura}</ErrorMessage>
                <input name="altura" type="number" step="0.01" required />
              </label>
              <label>
                Temperatura
                <ErrorMessage>{errors.temperatura}</ErrorMessage>
                <input name="temperatura" type="number" step="0.01" required />
              </label>
              <label>
                Presión
                <ErrorMessage>{errors.presion}</ErrorMessage>
                <input name="presion" required />
              </label>
              <label>
                Síntomas
                <ErrorMessage>{errors.sintomas}</ErrorMessage>
                <textarea
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
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Razón
                <ErrorMessage>{errors.razon}</ErrorMessage>
                <textarea
                  name="razon"
                  placeholder="Razón de ingreso"
                  required
                ></textarea>
              </label>
            </fieldset>

            <input type="submit" value="Guardar" className="bg-blue-600" />
          </form>
        </article>
      </dialog>
    </div>
  )
}
