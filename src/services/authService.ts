import axios from 'axios'
import { LoginRequest, LoginResponse } from '../types/AuthTypes'
import { ErrorResponse } from 'react-router-dom'

// Base API URL for authentication
const BASE_URL = 'http://localhost:3001/auth'

// This function handles the login process
// It takes the login credentials as an argument and returns a promise with the login response
export const login = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      BASE_URL + '/login',
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

// This function handles the user registration process
// It takes the registration data and returns a promise (void or success message if needed)
export interface RegisterPayload {
  name: string
  surname: string
  email: string
  username: string
  password: string
}

export const registerUser = async (payload: RegisterPayload): Promise<void> => {
  try {
    await axios.post(BASE_URL + '/register', payload)
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw error.response.data as ErrorResponse
    }
    throw new Error('Network or unknown error')
  }
}
