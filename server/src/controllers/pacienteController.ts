import { Request, Response } from 'express'
import prisma from '../utils/db'

export const getAll = async (req: Request, res: Response): Promise<void> => {
  const {} = req.params
  try {
    const pacientes = await prisma.paciente.findMany()

    res.status(200).json(pacientes)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error: 'Error inesperado al intentar recuperar los pacientes' })
  }
}
