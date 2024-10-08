import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import prisma from '../utils/db'

// Registrar un nuevo usuario
export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body
  console.log('email', email)
  console.log('password', password)

  try {
    // Verificar si el usuario ya existe
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (user) {
      res.status(400).json({ message: 'El usuario ya existe' })
      return
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword
      }
    })

    const { password: _, ...userWithoutPassword } = newUser

    res
      .status(201)
      .json({ message: 'Usuario registrado', user: userWithoutPassword })
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario' })
  }
}

// Iniciar sesión de un usuario
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body

  console.log('body', req.body)

  try {
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

    res.cookie('token', token, {
      httpOnly: true, // No accesible desde JavaScript
      secure: process.env.NODE_ENV === 'production', // Solo en HTTPS en producción
      maxAge: 3600000 // 1 hora
    })

    res.header('Authorization', `Bearer ${token}`)
    res.status(200).json({ message: 'Inicio de sesión exitoso', token })
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión' })
  }
}

export interface UserRequest extends Request {
  user?: string | JwtPayload
}
