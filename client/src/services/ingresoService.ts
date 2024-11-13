import axios from 'axios'
import { Ingreso } from '../types'

export const getIngresos = async (params?: {
  urgencia: boolean
}): Promise<Ingreso[]> => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/ingresos`,
      { params }
    )
    if (Array.isArray(data)) {
      return data
    } else {
      throw new Error('La data debe ser un arreglo')
    }
  } catch (error) {
    console.error('Error al obtener los ingresos')
    throw error
  }
}

export const postIngreso = async (ingreso: unknown): Promise<Ingreso> => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/ingresos`,
      ingreso
    )
    return data
  } catch (error) {
    console.error('Error al guardar el ingreso')
    throw error
  }
}

export const putIngreso = async (
  id: number,
  ingreso: unknown
): Promise<Ingreso> => {
  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_URL}/ingresos/${id}`,
      ingreso
    )
    return data
  } catch (error) {
    console.error('Error al editar el ingreso')
    throw error
  }
}

export const getIngresoConDoctorAsignado = async (idDoctor:number):Promise<Ingreso> =>{

  const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/ingresoPacienteAsignado/${idDoctor}`)


  return data;


}