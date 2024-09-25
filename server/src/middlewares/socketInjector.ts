import { Request, Response, NextFunction } from 'express'
import { Server } from 'socket.io'

/**
 * Este middleware inyecta el servidor `io` en `req` para que esté disponible en los controladores
 * @param io
 * @returns
 */
export const injectSocketIO = (io: Server) => {
  return (
    req: Request & { io?: Server },
    res: Response,
    next: NextFunction
  ) => {
    req.io = io // Inyectamos io en el objeto req
    next()
  }
}
