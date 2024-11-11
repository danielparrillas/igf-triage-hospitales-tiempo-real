import { PrismaClient } from '@prisma/client'

import pacientesData from './seeds/pacientes.json'

const prisma = new PrismaClient()

async function main() {
  await prisma.paciente.createMany({
    data: pacientesData
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
