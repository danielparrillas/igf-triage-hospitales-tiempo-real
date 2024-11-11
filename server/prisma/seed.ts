import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import pacientesData from './seeds/pacientes.json'
import doctoresData from './seeds/doctores.json'
import enfermerosData from './seeds/enfermeros.json'
import { RoleEnum } from '../src/types/roleEnum'

const prisma = new PrismaClient()

async function main() {
  for (const pacienteData of pacientesData) {
    await prisma.paciente.upsert({
      where: { id: pacienteData.id },
      update: pacienteData,
      create: pacienteData
    })
  }

  for (const userData of doctoresData) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
        role: RoleEnum.DOCTOR
      },
      create: {
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
        role: RoleEnum.DOCTOR
      }
    })

    const { doctor } = userData

    await prisma.doctor.upsert({
      where: { userId: user.id },
      update: {
        dui: doctor.dui,
        nombre: doctor.nombre
      },
      create: {
        dui: doctor.dui,
        user: {
          connect: { id: user.id }
        },
        nombre: doctor.nombre
      }
    })
  }

  for (const userData of enfermerosData) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
        role: RoleEnum.ENFERMERO
      },
      create: {
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
        role: RoleEnum.ENFERMERO
      }
    })

    const { enfermero } = userData

    await prisma.enfermero.upsert({
      where: { userId: user.id },
      update: {
        dui: enfermero.dui,
        nombre: enfermero.nombre
      },
      create: {
        dui: enfermero.dui,
        user: {
          connect: { id: user.id }
        },
        nombre: enfermero.nombre
      }
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
