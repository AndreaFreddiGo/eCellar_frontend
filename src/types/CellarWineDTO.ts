import { BottleSize } from './BottleSize'

export interface CellarWineDTO {
  id: string // UUID della cellarWine
  wineId: string
  cellarId: string
  userId: string
  quantity: number
  size: BottleSize
  isPublic: boolean
  personalNotes?: string
  purchaseDate?: number
  purchasePrice?: number
  askingPrice?: number
  myScore?: number

  wineName: string
  wineProducer: string
  wineVintage: number
  username: string
  hasPendingProposal?: boolean
}
