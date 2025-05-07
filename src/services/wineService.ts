import axios from 'axios'
import { WineDTO } from '../types/WineDTO'

// Base API URL for authentication
const BASE_URL = 'http://localhost:3001/wines'

// This function handles the wine search process
// It takes the search query as an argument and returns a promise with the list of wines
export const searchWines = async (query: string): Promise<WineDTO[]> => {
  const token = localStorage.getItem('token')

  const response = await axios.get(`${BASE_URL}/search`, {
    params: { query },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}
