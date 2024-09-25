import { useState } from 'react'
import { getLocalDateTimestamp } from '../../../utils/datetimeUtil'
import { urgenciaValuesLabel } from '../../../types/urgenciaEnum'
import { postIngreso } from '../../../services/ingresoService'

export function IngresoDialogNewForm() {
  const [open, setOpen] = useState(true)

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
    postIngreso(data)
      .then(() => {
        setOpen(false)
      })
      .catch((error) => {
        console.error(error)
        alert('Error al guardar el ingreso')
      })
  }

  return (
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
              Paciente
              <input
                name="paciente"
                placeholder="Nombre de paciente"
                required
              />
            </label>
            <label>
              DUI
              <input name="dui" placeholder="DUI" required />
            </label>
            <label>
              Fecha
              <input
                type="datetime-local"
                name="fecha"
                defaultValue={getLocalDateTimestamp()}
                required
              />
            </label>
            <label>
              Urgencia
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
              <textarea
                name="razon"
                placeholder="Razón de ingreso"
                required
              ></textarea>
            </label>
          </fieldset>

          <input type="submit" value="Guardar" />
        </form>
      </article>
    </dialog>
  )
}
