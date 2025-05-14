import { Modal, Button } from 'react-bootstrap'
import { CellarWineDTO } from '../types/CellarWineDTO'
import {
  PurchaseProposalDTO,
  ProposalStatus,
} from '../types/purchaseProposalDTO'
import {
  acceptProposal,
  rejectProposal,
} from '../services/purchaseProposalService'
import { useEffect, useState } from 'react'

interface Props {
  show: boolean
  handleClose: () => void
  wine: CellarWineDTO
  proposal: PurchaseProposalDTO
  onStatusChange: (newStatus: ProposalStatus) => void
}

const ProposalModal = ({
  show,
  handleClose,
  wine,
  proposal,
  onStatusChange,
}: Props) => {
  const [currentStatus, setCurrentStatus] = useState<ProposalStatus>(
    proposal.status
  )
  const isFinal = currentStatus !== 'PENDING'

  useEffect(() => {
    setCurrentStatus(proposal.status)
  }, [proposal])

  const handleAccept = async () => {
    try {
      const updated = await acceptProposal(proposal.id)
      setCurrentStatus(updated.status)
      onStatusChange(updated.status) // notifica UserCellars
      handleClose() // chiudi modale
    } catch (err) {
      alert('Failed to accept proposal.')
    }
  }

  const handleReject = async () => {
    try {
      const updated = await rejectProposal(proposal.id)
      setCurrentStatus(updated.status)
      onStatusChange(updated.status) // notifica UserCellars
      handleClose()
    } catch (err) {
      alert('Failed to reject proposal.')
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-darkred">Purchase Proposal</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <h6 className="text-darkred fw-semibold mb-1">
            {wine.wineName} – {wine.wineProducer} ({wine.wineVintage})
          </h6>
          <ul className="list-unstyled text-muted small mb-0">
            <li>
              <strong>Size:</strong> {wine.size}
            </li>
            {wine.personalNotes && (
              <li>
                <strong>Notes:</strong> {wine.personalNotes}
              </li>
            )}
            {wine.purchaseDate && (
              <li>
                <strong>Purchased:</strong> {wine.purchaseDate}
              </li>
            )}
            {wine.purchasePrice && (
              <li>
                <strong>Purchase Price:</strong> €
                {wine.purchasePrice.toFixed(2)}
              </li>
            )}
            {wine.askingPrice && (
              <li>
                <strong>Asking Price:</strong> €{wine.askingPrice.toFixed(2)}
              </li>
            )}
            {wine.myScore && (
              <li>
                <strong>Score:</strong> {wine.myScore}/100
              </li>
            )}
          </ul>
        </div>

        <hr className="my-3" />

        <div className="text-dark small">
          <p className="mb-1">
            <strong>Proposal Amount:</strong> €
            {proposal.proposingPrice.toFixed(2)}
          </p>
          <p className="mb-1">
            <strong>From:</strong> {proposal.proposingUsername}
          </p>
          <p className="mb-0">
            <strong>Status:</strong>{' '}
            <span
              className={
                currentStatus === 'ACCEPTED'
                  ? 'text-success fw-bold'
                  : currentStatus === 'REJECTED'
                  ? 'text-danger fw-bold'
                  : 'text-warning fw-bold'
              }
            >
              {currentStatus}
            </span>
          </p>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="outline-success"
          onClick={handleAccept}
          disabled={isFinal}
        >
          Accept
        </Button>
        <Button
          variant="outline-danger"
          onClick={handleReject}
          disabled={isFinal}
        >
          Reject
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ProposalModal
