// /backend/src/services/doctorService.ts
import prisma from '../utils/db'
import { number } from 'zod'

export async function assignIngresosToDoctors(): Promise<void> {
  const doctors = await prisma.doctor.findMany({
    where: { disponible: true }
  });



  const pendingIngresos = await prisma.ingreso.findMany({
    where: { estado: 0 },
    orderBy:[{urgencia:'asc'}]
  });




  for (let i:number = 0  ; i < doctors.length; i += 1) {
    let doctor = doctors[i]
    let ingreso =  pendingIngresos[i]

    if(pendingIngresos.length > 0 && doctors.length > 0){
      await prisma.ingreso.update({
        where: {id: ingreso.id},
        data: {doctorId:doctor.id,estado:2},
      })

      await prisma.doctor.update({
        where: {id: doctor.id},
        data: {disponible:false},
      })
    }



   }
}
