// This file defines the UserInfo interface, which represents the structure of user information in the application
export interface UserInfo {
  id: string
  name: string
  surname: string
  email: string
  username: string
  biography?: string
  phone?: string
  birthDate?: string
  profilePicture?: string
  preferredLanguage?: string
  publicProfile: boolean
  registrationDate: string
}
