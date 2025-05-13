import { BottleSize } from './BottleSize'

export interface CellarWinePayload {
  wineId: string
  cellarId: string
  quantity: number
  size: BottleSize
  isPublic: boolean
  personalNotes?: string
  purchaseDate?: number
  purchasePrice?: number
  askingPrice?: number
  myScore?: number
}
