import axios from 'axios'

export interface Paciente {
  id: number
  nombre: string
  dui: string
  fechaNacimiento: string
  sexo: number
}

export const getPacientes = async (): Promise<Paciente[]> => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/pacientes`
    )
    if (Array.isArray(data)) {
      return data
    } else {
      throw new Error('La data debe ser un arreglo')
    }
  } catch (error) {
    console.error('Error al obtener los pacientes')
    throw error
  }
}
