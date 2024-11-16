import {Doctor} from '../pages/ingreso'
import axios from 'axios'

export const getDoctor = async (userId: number):Promise<Doctor> => {

  const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/doctores/doctor/${userId}`)

  return data
}

