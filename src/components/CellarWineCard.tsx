import { Card, Badge } from 'react-bootstrap'
import { CellarWineDTO } from '../types/CellarWineDTO'
import userPlaceholder from '../assets/user_placeholder.png'

interface Props {
  bottle: CellarWineDTO
}

const CellarWineCard = ({ bottle }: Props) => {
  const {
    wineName,
    wineProducer,
    wineVintage,
    size,
    askingPrice,
    username,
    personalNotes,
  } = bottle

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <Card.Title className="fw-bold">
          {wineName} – {wineProducer}{' '}
          {wineVintage && <span>({wineVintage})</span>}
        </Card.Title>

        <Card.Subtitle className="mb-2 text-muted">
          Size:{' '}
          <Badge bg="light" text="dark">
            {size}
          </Badge>
        </Card.Subtitle>

        {askingPrice && (
          <div className="mb-2">
            <strong>Price:</strong>{' '}
            <span style={{ color: 'darkred' }}>€{askingPrice.toFixed(2)}</span>
          </div>
        )}

        {personalNotes && (
          <Card.Text className="fst-italic small mb-2">
            “
            {personalNotes.length > 100
              ? personalNotes.substring(0, 97) + '...'
              : personalNotes}
            ”
          </Card.Text>
        )}

        <div className="d-flex align-items-center mt-3">
          <img
            src={userPlaceholder}
            alt="owner"
            className="rounded-circle me-2"
            style={{ width: '30px', height: '30px', objectFit: 'cover' }}
          />
          <span className="text-muted small">@{username}</span>
        </div>
      </Card.Body>
    </Card>
  )
}

export default CellarWineCard
