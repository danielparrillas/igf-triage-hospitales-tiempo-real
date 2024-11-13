import { Request, Response } from 'express'
import prisma from '../utils/db'
import { Server } from 'socket.io'
import { ingresoSchema } from '../schemas/ingresoSchemas'
import { Ingreso } from '@prisma/client'

export const getAll = async (req: Request, res: Response): Promise<void> => {
  const {} = req.params
  try {
    const ingresos = await prisma.ingreso.findMany({
      include: { paciente: true }
    })

    res.status(200).json(ingresos)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error: 'Error inesperado al intentar recuperar los ingresos' })
  }
}

export const getById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    const ingreso = await prisma.ingreso.findUnique({
      where: { id: parseInt(id) },
      include: { paciente: true, doctor: true, enfermero: true }
    })

    if (ingreso) {
      res.status(200).json(ingreso)
    } else {
      res.status(404).json({ error: 'Ingreso no encontrado' })
    }
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error: 'Error inesperado al intentar recuperar el ingreso' })
  }
}

export const create = async (
  req: Request & { io?: Server },
  res: Response
): Promise<void> => {
  const { body } = req

  const ingresoData = ingresoSchema.safeParse(body)

  if (!ingresoData.success || !ingresoData.data) {
    const errores: Record<string, string> = {}
    ingresoData.error.errors.forEach((err) => {
      const campo = err.path.join('.')
      errores[campo] = err.message
    })
    res.status(500).json({ error: errores })
    return
  }

  try {
    const ingreso = await prisma.ingreso.create({
      data: ingresoData.data,
      include: { paciente: true }
    })

    // Enviamos el evento `nuevo_ingreso` a todos los clientes conectados
    req.io?.emit('nuevo_ingreso', ingreso)

    res.status(201).json(ingreso)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error: 'Error inespera al intentar guardar el ingreso' })
  }
}

export const edit = async (
  req: Request & { io?: Server },
  res: Response
): Promise<void> => {
  const { id } = req.params
  const { body } = req

  const ingresoData = ingresoSchema.safeParse(body)

  if (!ingresoData.success || !ingresoData.data) {
    const errores: Record<string, string> = {}
    ingresoData.error.errors.forEach((err) => {
      const campo = err.path.join('.')
      errores[campo] = err.message
    })
    res.status(500).json({ error: errores })
    return
  }

  try {
    const ingreso = await prisma.ingreso.update({
      where: { id: parseInt(id) },
      data: ingresoData.data,
      include: { paciente: true }
    })

    // Enviamos el evento `editar_ingreso` a todos los clientes conectados
    req.io?.emit('editar_ingreso', ingreso)

    res.status(200).json(ingreso)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error: 'Error inespera al intentar editar el ingreso' })
  }
}


export const getIngresoByIdDoctorAsignado = async (request: Request, res: Response): Promise<void> => {
  const {idDoctor } = request.params
  console.log()

  if (!idDoctor) {
    res.status(404).json({ error: 'Ingreso no encontrado' })
  }

  let ingresoAsinadoConDoctor:Ingreso | null = await prisma.ingreso.findUnique({
    where: { id: Number(idDoctor) },
    include: { paciente: true }
  })

  if (!ingresoAsinadoConDoctor) {
    res.status(404).json({ error: 'Ingreso no encontrado' })
    return
  }

  res.status(200).json(ingresoAsinadoConDoctor)

}