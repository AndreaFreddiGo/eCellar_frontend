// This file defines the AuthUser type used in the application.
// It represents the structure of the authenticated user object.
export interface AuthUser {
  userId: string // UUID as string
  name: string
  username: string
  profilePicture?: string
}
