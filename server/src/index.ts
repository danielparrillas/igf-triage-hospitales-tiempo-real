import express, { Request, Response } from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import path from 'path'
import { handleSocketConnection } from './controllers/socketController'
import * as dotenv from 'dotenv'
import authRouter from './routes/authRoutes'
import ingresoRouter from './routes/ingresoRouter'
import pacientesRouter from './routes/pacienteRouter'
import { injectSocketIO } from './middlewares/socketInjector'

dotenv.config({ path: '../.env' })

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? process.env.BASE_URL : '*'
  }
})
handleSocketConnection(io)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(injectSocketIO(io))

//Rutas
app.use('/api/auth', authRouter)
app.use('/api/ingresos', ingresoRouter)
app.use('/api/pacientes', pacientesRouter)

// 1. Configura Express para servir archivos estáticos del build de React
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '../../client/dist') // Ajusta el path según tu estructura
  app.use(express.static(clientBuildPath))

  // 2. Servir index.html para cualquier ruta no reconocida (Single Page Application - SPA)
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(clientBuildPath, 'index.html'))
  })
}
const PORT = process.env.PORT || 3000
server.listen(PORT, () =>
  console.log(`Servidor corriendo en el puerto ${PORT}`)
)
