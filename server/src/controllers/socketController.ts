import { Server, Socket } from 'socket.io'

export const handleSocketConnection = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('Usuario conectado:', socket.id)

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
  })
}
