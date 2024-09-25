import { UrgenciaEnum } from './urgenciaEnum'

interface Ingreso {
  id: number
  paciente: string
  dui: string
  fecha: string
  razon: string
  urgencia: UrgenciaEnum
  encargadoId: number
}
