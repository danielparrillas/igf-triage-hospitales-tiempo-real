import {Request, Response} from 'express'
import prisma from '../utils/db'
import { Doctor } from '@prisma/client'


const getDoctor = async (req: Request, res: Response) => {
  const { id } = req.params
  let doctor:Doctor | null

  if (!id) {
     res.status(404).json({ error: 'No hay encontrado' })
  }

  doctor = await prisma.doctor.findUnique({where: {id: Number(id)}})

  if (!doctor) {
     res.status(404).json({ error: 'No hay encontrado' })
  }

   res.status(200).json(doctor)

}