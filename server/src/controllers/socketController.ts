import { Server, Socket } from 'socket.io'
import prisma from '../utils/db'
import { Ingreso } from '@prisma/client'

export const handleSocketConnection = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('Usuario conectado:', socket.id)
    exampleSocket(io, socket)
    ingresoSocket(io, socket)
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

const ingresoSocket = (io: Server, socket: Socket) => {
  socket.on('ingresos', () => {
    socket.join('ingresos')
    console.log()
  })

  socket.on('add_ingreso', async (data: Omit<Ingreso, 'id'>) => {
    try {
      const nuevoIngreso = await prisma.ingreso.create({
        data
      })
      socket.emit(
        'message',
        `Ingreso creado para el paciente: ${data.paciente}`
      )
    } catch (error) {
      socket.emit('message', 'Error al crear ingreso')
    }
  })
}
