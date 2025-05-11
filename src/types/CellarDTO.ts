import { CellarWineDTO } from './CellarWineDTO'

export interface CellarDTO {
  cellarId: string
  name: string
  description: string
  userId: string
  cellarWines: CellarWineDTO[]
}
