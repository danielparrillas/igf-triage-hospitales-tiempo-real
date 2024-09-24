import express, { Request, Response } from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import path from 'path'
import { handleSocketConnection } from './controllers/socketController'
import * as dotenv from 'dotenv'
import authRouter from './routes/authRoutes'

dotenv.config({ path: '../.env' })

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})
handleSocketConnection(io)

app.use(cors())

//Rutas
app.use('/api/auth', authRouter)

// 1. Configura Express para servir archivos estáticos del build de React
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '../../client/dist') // Ajusta el path según tu estructura
  app.use(express.static(clientBuildPath))

  // 2. Servir index.html para cualquier ruta no reconocida (Single Page Application - SPA)
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(clientBuildPath, 'index.html'))
  })
}
const PORT = process.env.PORT || 4000
server.listen(PORT, () =>
  console.log(`Servidor corriendo en el puerto ${PORT}`)
)
