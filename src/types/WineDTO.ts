// This file defines the WineDTO interface, which represents the structure of wine data in the application
export interface WineDTO {
  wineId: string
  name: string
  producer: string
  vintage: number
  country: string
  region?: string
  color: string
  grapeVarieties: string[]
  imageUrl?: string
}
