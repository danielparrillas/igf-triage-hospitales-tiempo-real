import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import prisma from '../utils/db'

// Registrar un nuevo usuario
export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body

  try {
    // Verificar si el usuario ya existe
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (user) {
      res.status(400).json({ message: 'El usuario ya existe' })
      return
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // Crear el nuevo usuario
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword
      }
    })

    res.status(201).json({ message: 'Usuario registrado', user: newUser })
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario' })
  }
}

// Iniciar sesión de un usuario
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body

  try {
    // Verificar si el usuario existe
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      res.status(400).json({ message: 'Usuario o contraseña incorrectos' })
      return
    }

    // Comparar las contraseñas
    const isMatch = await bcrypt.compare(password, user.password || '')

    if (!isMatch) {
      res.status(400).json({ message: 'Usuario o contraseña incorrectos' })
      return
    }

    // Generar un token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    )

    res.status(200).json({ message: 'Inicio de sesión exitoso', token })
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' })
  }
}

export interface UserRequest extends Request {
  user?: string | JwtPayload
}

// Middleware para verificar el token JWT
export const verifyToken = (
  req: UserRequest,
  res: Response,
  next: Function
): void => {
  const token = req.headers['authorization']?.split(' ')[1]

  if (!token) {
    res.status(401).json({ message: 'No se proporcionó un token' })
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    req.user = decoded // Agrega una propiedad 'user' al objeto Request
    next()
  } catch (error) {
    res.status(403).json({ message: 'Token inválido' })
  }
}
