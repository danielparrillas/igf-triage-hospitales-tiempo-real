import express, { Request, Response } from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

app.use(cors())

io.on('connection', (socket) => {
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

const PORT = 4000
server.listen(PORT, () =>
  console.log(`Servidor corriendo en el puerto ${PORT}`)
)
