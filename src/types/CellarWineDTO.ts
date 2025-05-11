export interface CellarWineDTO {
  cellarWineId: string
  quantity: number
  size: string
  isPublic: boolean
  personalNotes: string
  purchaseDate?: number
  purchasePrice?: number
  askingPrice?: number
  myScore?: number
  userId: string
  cellarId: string
  wineId: string
}
