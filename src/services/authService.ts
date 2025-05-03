import axios from 'axios'
import { LoginRequest, LoginResponse } from '../types/AuthTypes'

// Base API URL for authentication
const API_BASE_URL = 'http://localhost:3001/auth'

// This function handles the login process
// It takes the login credentials as an argument and returns a promise with the login response
export const login = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    `${API_BASE_URL}/login`,
    credentials
  )
  return response.data
}
