import axios from 'axios'
import { CellarDTO } from '../types/CellarDTO'

export interface CellarPayload {
  cellarId?: string
  name: string
  description?: string
}

const BASE_URL = 'http://localhost:3001/cellars'

const authHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

// GET all cellars for current user
export const getMyCellars = async (): Promise<CellarDTO[]> => {
  const response = await axios.get(`${BASE_URL}/me`, authHeaders())
  return response.data
}

// POST - create a new cellar
export const createCellar = async (
  payload: CellarPayload
): Promise<CellarDTO> => {
  const response = await axios.post(`${BASE_URL}/me`, payload, authHeaders())
  return response.data
}

// PUT - update existing cellar
export const updateCellar = async (
  cellarId: string,
  payload: CellarPayload
): Promise<CellarDTO> => {
  const response = await axios.put(
    `${BASE_URL}/me/${cellarId}`,
    payload,
    authHeaders()
  )
  return response.data
}

// DELETE - delete cellar by ID
export const deleteCellar = async (cellarId: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/me/${cellarId}`, authHeaders())
}
