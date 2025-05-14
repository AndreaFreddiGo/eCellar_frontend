import { CellarWineDTO } from './CellarWineDTO'

export enum ProposalStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export interface PurchaseProposalDTO {
  id: string
  cellarWineId: string
  proposingUserId: string
  proposingUsername: string
  proposingPrice: number
  status: ProposalStatus
  proposalDate: string
  cellarWine: CellarWineDTO
}
