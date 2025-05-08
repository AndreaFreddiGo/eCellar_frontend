export interface UserUpdatePayload {
  name: string
  surname: string
  email: string
  username: string
  biography?: string | null
  phone?: string | null
  birthDate?: string | null
  profilePicture?: string | null
  preferredLanguage?: string
  publicProfile: boolean
}
