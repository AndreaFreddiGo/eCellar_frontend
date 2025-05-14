// CellarWineCard.tsx
import { useState } from 'react'
import { Card, Button, Form } from 'react-bootstrap'
import { CellarWineDTO } from '../types/CellarWineDTO'

interface Props {
  bottle: CellarWineDTO
}

const CellarWineCard = ({ bottle }: Props) => {
  const [offer, setOffer] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleOfferSubmit = async () => {
    if (!offer.trim()) return
    setIsSubmitting(true)

    try {
      // TODO: Chiamata API per inviare proposta
      console.log(`Proposta di €${offer} per la bottiglia ${bottle.id}`)
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
            style={{ maxWidth: '100px' }}
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
