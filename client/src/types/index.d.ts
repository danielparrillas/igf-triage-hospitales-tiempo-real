import { UrgenciaEnum } from './urgenciaEnum'

interface Paciente {
  id: number
  nombre: string
  dui: string
  fechaNacimiento: string
  sexo: number
}

interface Ingreso {
  id: number
  pacienteId: number
  doctorId: number | null
  enfermeroId: number | null
  fecha: string
  peso: number
  altura: number
  temperatura: number
  presion: string
  sintomas: string
  razon: string
  urgencia: UrgenciaEnum
  estado: number
  paciente: Paciente
}
