import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No hay token.' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido o expirado' })
  }
}
