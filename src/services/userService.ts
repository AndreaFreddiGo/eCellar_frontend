// src/services/userService.ts
import axios from 'axios'
import { UserInfo } from '../types/UserInfo'
import { UserUpdatePayload } from '../types/UserUpdatePayload'

// Base API URL for authentication
const BASE_URL = 'http://localhost:3001/users'

// This function handles the user profile retrieval process
// It returns a promise with the user information
export const getCurrentUser = async (): Promise<UserInfo> => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${BASE_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const updateUserInfo = async (
  userId: string,
  userData: UserUpdatePayload
): Promise<UserInfo> => {
  const token = localStorage.getItem('token')
  const response = await axios.put(`${BASE_URL}/${userId}`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}
