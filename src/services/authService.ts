import axios from 'axios'
import { LoginRequest, LoginResponse } from '../types/AuthTypes'
import { ErrorResponse } from 'react-router-dom'

// Base API URL for authentication
const API_BASE_URL = 'http://localhost:3001/auth'

// This function handles the login process
// It takes the login credentials as an argument and returns a promise with the login response
export const login = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      'http://localhost:3001/auth/login',
      credentials
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw error.response.data as ErrorResponse
    }
    throw new Error('Network or unknown error')
  }
}
