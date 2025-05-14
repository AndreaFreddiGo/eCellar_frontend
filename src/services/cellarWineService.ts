// src/services/cellarWinesService.ts

import axios from 'axios'
import { CellarWineDTO } from '../types/CellarWineDTO'
import { CellarWinePayload } from '../types/CellarWinePayload'

const BASE_URL = 'http://localhost:3001/cellarWines'

// Retrieves all cellar wines for a specific cellar (owned by the authenticated user)
export const getCellarWinesByCellarId = async (
  cellarId: string
): Promise<CellarWineDTO[]> => {
  const token = localStorage.getItem('token')

  const response = await axios.get(`${BASE_URL}/me/byCellar/${cellarId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

// Creates a new cellar wine entry for the authenticated user
export const createCellarWine = async (
  payload: CellarWinePayload
): Promise<CellarWineDTO> => {
  const token = localStorage.getItem('token')

  const response = await axios.post(`${BASE_URL}/me`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}
