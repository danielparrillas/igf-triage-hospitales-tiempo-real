import {Request, Response} from 'express'
import prisma from '../utils/db'
import { Doctor } from '@prisma/client'


export const getDoctor = async (req: Request, res: Response) => {
  const { idUser } = req.params
  let doctor:Doctor | null

  if (!idUser) {
     res.status(404).json({ error: 'No hay encontrado' })
  }

  doctor = await prisma.doctor.findUnique({where: {userId: Number(idUser)}})

  if (!doctor) {
     res.status(404).json({ error: 'No hay encontrado' })
  }

   res.status(200).json(doctor)

}