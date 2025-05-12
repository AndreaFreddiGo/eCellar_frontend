import axios from 'axios'
import { CellarDTO } from '../types/CellarDTO'

const BASE_URL = 'http://localhost:3001/cellars'

export const getMyCellars = async (): Promise<CellarDTO[]> => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${BASE_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export interface CellarPayload {
  name: string
  description?: string
}

export const createCellar = async (
  payload: CellarPayload
): Promise<CellarDTO> => {
  const token = localStorage.getItem('token')
  const response = await axios.post(`${BASE_URL}/me`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}
