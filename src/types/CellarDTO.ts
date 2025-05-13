import { CellarWineDTO } from './CellarWineDTO'

export interface CellarDTO {
  id: string
  name: string
  description: string
  userId: string
  cellarWines: CellarWineDTO[]
}
