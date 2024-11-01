import { z } from '../utils/zod-es'

export const ingresoSchema = z.object({
  fecha: z.string().datetime(), // Campo opcional, usa la fecha actual por defecto
  razon: z.string().min(1),
  peso: z.number().positive(),
  altura: z.number().positive(),
  temperatura: z.number().min(35).max(42),
  presion: z.string().min(1),
  sintomas: z.string().min(1),
  urgencia: z.number().int().min(1).max(5),
  estado: z.number().int().min(0).max(4),
  doctorId: z.number().int().optional(), // Puede ser nulo o un número entero
  pacienteId: z.number().int(),
  enfermeroId: z.number().int().optional()
})

export type NewIngreso = z.infer<typeof ingresoSchema>
