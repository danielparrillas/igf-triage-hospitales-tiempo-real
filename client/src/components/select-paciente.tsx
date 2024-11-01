import { useEffect, useState } from 'react'
import { getPacientes, Paciente } from '../services/pacienteService'
import { toast } from 'sonner'

interface Props {
  selected?: number | string
  initialValue?: string | number
  name?: string
  required?: boolean
}

export default function SelectPaciente({
  selected,
  initialValue,
  name,
  required
}: Props) {
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [mostrarCampoTexto, setMostrarCampoTexto] = useState(!!initialValue)

  useEffect(() => {
    if (mostrarCampoTexto) return
    getPacientes()
      .then((data) => {
        setPacientes(data)
      })
      .catch(() => {
        toast.error('Error al obtener los pacientes')
      })
  }, [mostrarCampoTexto])

  if (mostrarCampoTexto || !pacientes.length) {
    return (
      <>
        <input
          type="text"
          readOnly
          defaultValue={initialValue}
          onClick={() => setMostrarCampoTexto(false)}
        />
        <input type="hidden" name={name} value={selected} />
      </>
    )
  }

  return (
    <select
      name={name}
      required={required}
      className="w-full p-2 border border-gray-300 rounded-md"
    >
      <option value="">Seleccione un paciente</option>
      {pacientes.map((paciente) => (
        <option
          key={paciente.id}
          value={paciente.id}
          selected={paciente.id === selected}
        >
          {paciente.nombre}
        </option>
      ))}
    </select>
  )
}
