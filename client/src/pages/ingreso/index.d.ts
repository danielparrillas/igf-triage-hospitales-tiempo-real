import { UrgenciaEnum } from '../../types/urgenciaEnum.ts'

export interface Paciente {
  id: number
  nombre: string
  dui: string
  fechaNacimiento: string
  sexo: number
}

export interface Doctor {
  id: number
  nombre: string
  dui: string
  userId: number
}

export interface Enfermero {
  id: number
  nombre: string
  dui: string
  userId: number
}

export interface Ingreso {
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
  doctor?: Doctor
  enfermero?: Enfermero
}
