// CellarWineCard.tsx
import { useState } from 'react'
import { Card, Button, Form } from 'react-bootstrap'
import { CellarWineDTO } from '../types/CellarWineDTO'
import { createProposal } from '../services/purchaseProposalService'

interface Props {
  bottle: CellarWineDTO
}

const CellarWineCard = ({ bottle }: Props) => {
  const [offer, setOffer] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleOfferSubmit = async () => {
    const numericOffer = parseFloat(offer)

    if (!offer.trim() || isNaN(numericOffer) || numericOffer <= 0) {
      alert('Please enter a valid offer price greater than zero')
      return
    }

    setIsSubmitting(true)

    try {
      const payload = {
        cellarWineId: bottle.id,
        proposingPrice: numericOffer,
        message: '', // oppure puoi permettere un campo libero in UI
      }

      const proposal = await createProposal(payload)
      console.log('Proposta creata:', proposal)

      setSubmitted(true)
    } catch (err) {
      console.error('Errore durante la proposta:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="text-darkred fw-bold">
          {bottle.wineName} – {bottle.wineProducer} ({bottle.wineVintage})
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {bottle.size} • Owner: {bottle.username}
        </Card.Subtitle>

        {bottle.askingPrice && (
          <p className="mb-2">
            Asking Price: <strong>€{bottle.askingPrice.toFixed(2)}</strong>
          </p>
        )}

        <Form className="d-flex align-items-center gap-2 mt-3">
          <Form.Control
            type="number"
            placeholder="Enter offer €"
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
            disabled={isSubmitting || submitted}
            style={{ maxWidth: '150px' }}
            className="me-2 py-2"
          />
          <Button
            variant="outline-dark"
            onClick={handleOfferSubmit}
            disabled={isSubmitting || submitted}
            className="py-2"
          >
            {submitted ? 'Submitted' : 'Make Offer'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default CellarWineCard
