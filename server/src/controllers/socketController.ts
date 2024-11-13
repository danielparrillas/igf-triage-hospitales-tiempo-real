import { Server, Socket } from 'socket.io'
import prisma from '../utils/db'
import { Doctor, Ingreso } from '@prisma/client'
import { assignIngresosToDoctors } from '../services/doctorService'
import { emit } from 'nodemon'

export const handleSocketConnection = (io: Server) => {
  io.on('connection', (socket: Socket) => {

    (async () => {
      await assignIngresosToDoctors();
      const updatedIngresos = await prisma.ingreso.findMany({ where: { estado: 2 },
        include:{doctor:true,paciente:true} });
      io.emit('updateIngresos', updatedIngresos);
    })();


    exampleSocket(io, socket)
    ingresoSocket(io, socket)
    doctorSockets(io,socket)
  })
}

const exampleSocket = (io: Server, socket: Socket) => {
  socket.on('join_room', (room: string) => {
    socket.join(room)
    console.log(`Usuario con ID: ${socket.id} se unió a la sala: ${room}`)

    socket.emit('message', `Bienvenido a la sala ${room}`)
  })

  socket.on('send_message', (data: { room: string; message: string }) => {
    io.to(data.room).emit('message', data.message)
  })

  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id)
  })
}

const ingresoSocket = (io: Server, socket:Socket) => {
  socket.on('ingresos', () => {
    socket.join('ingresos')



    console.log()
  })

  socket.on('add_ingreso', async (data: Omit<Ingreso, 'id'>) => {
    try {
      const nuevoIngreso = await prisma.ingreso.create({
        data
      })
      socket.emit('message', `Ingreso creado`)
    } catch (error) {
      socket.emit('message', 'Error al crear ingreso')
    }
  })}

//TO-DO ccambiar nombre de doctorConnected a doctorAvailabilityChanged
const doctorSockets = (io:Server,socket:Socket) => {

  socket.on('doctorConnected',async (doctor:Doctor) =>{
//El estado '2' indica que estan 'En espera' y se obtienen todos los ingresos en este estado
   let allIngresos:Ingreso[] = await prisma.ingreso.findMany({ where:{estado:2}, orderBy:[ {urgencia:'asc'} ] } )

  //Se obtiene el primer ingreso en orden del urgencia a visitia regular
  let ingresoUrgenteEnAtencionProxima:Ingreso = allIngresos[0]

  //Se actualiza el ingreso seleccionado y se cambia su estado y se asignado un doctor a este
  const ingresoAsignado:Ingreso = await prisma.ingreso.update({
    where:{id:ingresoUrgenteEnAtencionProxima.id},
    data:{estado:4,doctorId:doctor.id},
    include:{
      doctor:true,
      paciente:true
    }
  })

//Se cambia la disponibilidad del doctor
  prisma.doctor.update({
    where:{id:doctor.id},
    data:{disponible:false}
  })

  //Emitimos un evento que muestre al doctor que fue asignado al paciente del ingreso
  //socket.emit('ingresoAsignadoConDoctorConectado',ingresoAsignado);


    io.emit('ingresosWaitingListChanged',)

  //!!!SI el ingreso ya esta en atencion quiere decir que un doctor ya fue asignado

  //emitimos un evento que actualize en el front end la lista de ingresos en espera

  //io.emit('ingresosWaitingChanged',allIngresos.slice(1,allIngresos.length))

  })


  socket.on('doctorDisponibilidadCambio', async (doctor:Doctor) => {


    if(doctor.disponible == true){
      let allIngresos:Ingreso[] = await prisma.ingreso.findMany({ where:{estado:2}, orderBy:[ {urgencia:'asc'} ] } )

      if(allIngresos.length > 0){
        let ingresoUrgenteEnAtencionProxima:Ingreso = allIngresos[0]

        const ingresoAsignado:Ingreso = await prisma.ingreso.update({
          where:{id:ingresoUrgenteEnAtencionProxima.id},
          data:{estado:4,doctorId:doctor.id},
          include:{ doctor:true, paciente:true }
        })

        await prisma.doctor.update( { where:{id:doctor.id}, data:{disponible:false} } )
        socket.emit('ingresoAsignadoConDoctorDisponible',ingresoAsignado)

      }




      await notifyAllIngresosWaitingChanged(socket,io)

    }




  })


  socket.on('doctorIsDoneWithPatient',async (doctor:Doctor) =>{
    const doctorAvailableAgain:Doctor = await prisma.doctor.update({where:{id:doctor.id},data:{disponible:true}})
  })
}


//Notifica a todos los subscribers sobre los cambios en la lista de ingresos(pacientes) en espera
const notifyAllIngresosWaitingChanged = async (socket:Socket,io:Server) => {

  const allIngresosWaiting:Ingreso[] = await prisma.ingreso.findMany({where:{estado:2}})

  io.emit('listaDeIngresosEsperandoHaCambiado',allIngresosWaiting)

}