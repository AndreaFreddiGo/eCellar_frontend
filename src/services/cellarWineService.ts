// src/services/cellarWinesService.ts
import axios from 'axios'
import { CellarWinePayload } from '../types/CellarWinePayload'
import { CellarWineDTO } from '../types/CellarWineDTO'

// Base API URL for cellar wines
const BASE_URL = 'http://localhost:3001/cellarWines'

// This function creates a new cellar wine for the current authenticated user
// It sends the payload to POST /cellarWines/me and returns the created CellarWineDTO
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
