// /backend/src/services/doctorService.ts
import prisma from '../utils/db'

export async function assignIngresosToDoctors(): Promise<void> {
  const doctors = await prisma.doctor.findMany({
    where: { disponible: true },
    include: { ingresos: true }
  });



  const pendingIngresos = await prisma.ingreso.findMany({
    where: { estado: 0 },
    orderBy:[{urgencia:'asc'}]
  });

  for (const doctor of doctors) {
    for (const ingreso of pendingIngresos) {
      let ingresoAsignado = await prisma.ingreso.update({
        where: { id: ingreso.id },
        data: { doctorId: doctor.id, estado: 2 }
      });

      await prisma.doctor.update({
        where: { id: doctor.id },
        data: { disponible: false }
      });
      break;
      console.log(ingresoAsignado)
    }
  }
}
