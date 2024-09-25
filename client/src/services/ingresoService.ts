import axios from 'axios'
import { Ingreso } from '../types'

export const getIngresos = async (params?: {
  urgencia: boolean
}): Promise<Ingreso[]> => {
  try {
    const { data } = await axios.get('/api/ingresos', { params })
    if (Array.isArray(data)) {
      return data
    } else {
      throw new Error('La data debe ser un arreglo')
    }
  } catch (error) {
    console.error('Error al obtener los ingresos:', error)
    throw error
  }
}
