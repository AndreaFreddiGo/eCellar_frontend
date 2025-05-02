export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  username: string
  name: string
  userId: string
  profilePicture: string
}
