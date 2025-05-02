import axios from 'axios'
import { LoginRequest, LoginResponse } from '../types/AuthTypes'

const API_BASE_URL = 'http://localhost:3001/auth'

export const login = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    `${API_BASE_URL}/login`,
    credentials
  )
  return response.data
}
