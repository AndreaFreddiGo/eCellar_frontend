// Payload for login request
export interface LoginRequest {
  email: string
  password: string
}

// Expected structure for login response
export interface LoginResponse {
  token: string
  username: string
  name: string
  userId: string // UUID as string
  profilePicture: string
}

// Expected structure for user profile response
export interface ErrorResponse {
  message: string
}
