import axios from 'axios'
import { PurchaseProposalPayload } from '../types/purchaseProposalPayload'
import { PurchaseProposalDTO } from '../types/purchaseProposalDTO'

const BASE_URL = 'http://localhost:3001/purchaseProposals'

export const createProposal = async (
  payload: PurchaseProposalPayload
): Promise<PurchaseProposalDTO> => {
  const token = localStorage.getItem('token')
  const response = await axios.post(`${BASE_URL}/me`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const getProposalsForWine = async (
  cellarWineId: string
): Promise<PurchaseProposalDTO[]> => {
  const token = localStorage.getItem('token')
  const response = await axios.get(
    `${BASE_URL}/me/byCellarWine/${cellarWineId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  return response.data
}

export const acceptProposal = async (
  proposalId: string
): Promise<PurchaseProposalDTO> => {
  const token = localStorage.getItem('token')
  const response = await axios.post(
    `${BASE_URL}/${proposalId}/accept`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response.data
}

export const rejectProposal = async (
  proposalId: string
): Promise<PurchaseProposalDTO> => {
  const token = localStorage.getItem('token')
  const response = await axios.post(
    `${BASE_URL}/${proposalId}/reject`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response.data
}
