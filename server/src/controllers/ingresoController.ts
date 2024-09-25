import { Request, Response } from 'express'
import { Ingreso } from '@prisma/client'
import prisma from '../utils/db'
import { Server } from 'socket.io'

export const getAll = async (req: Request, res: Response): Promise<void> => {
  const {} = req.params
  try {
    const ingresos = await prisma.ingreso.findMany()

    res.status(200).json(ingresos)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error: 'Error inespera al intentar recuperar los ingresos' })
  }
}

export const save = async (
  req: Request & { io?: Server },
  res: Response
): Promise<void> => {
  const { body } = req
  try {
    const ingreso = await prisma.ingreso.create({
      data: body
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