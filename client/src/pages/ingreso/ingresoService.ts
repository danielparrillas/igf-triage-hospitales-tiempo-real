import axios from 'axios'
import { Ingreso } from '.'

export const getIngreso = async (params?: { id: number }): Promise<Ingreso> => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/ingresos/${params?.id}`,
      { params }
    )
    return data
  } catch (error) {
    console.error('Error al obtener los ingresos')
    throw error
  }
}
