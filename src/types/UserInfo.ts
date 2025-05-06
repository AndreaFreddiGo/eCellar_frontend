// This file defines the UserInfo interface, which represents the structure of user information in the application
export interface UserInfo {
  name: string
  username: string
  userId: string
  profilePicture?: string

  // Additional fields from UserUpdatePayload
  phone?: string
  bio?: string
  location?: string
  shippingAddress?: string
}
