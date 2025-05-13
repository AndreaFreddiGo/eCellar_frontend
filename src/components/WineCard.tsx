// components/WineCard.tsx
import { Card, Button } from 'react-bootstrap'
import { WineDTO } from '../types/WineDTO'
import redBottle from '../assets/red_wine_bottle.png'
import whiteBottle from '../assets/white_wine_bottle.png'
import roseBottle from '../assets/rose_wine_bottle.png'

interface WineCardProps {
  wine: WineDTO
  onAddBottleClick?: (wineId: string) => void
}

const getBottleImage = (color: string) => {
  switch (color.toUpperCase()) {
    case 'RED':
      return redBottle
    case 'WHITE':
      return whiteBottle
    case 'ROSE':
    case 'ROSÉ':
      return roseBottle
    default:
      return ''
  }
}

const WineCard = ({ wine, onAddBottleClick }: WineCardProps) => {
  return (
    <Card className="wine-card h-100 position-relative overflow-visible">
      {wine.imageUrl && (
        <Card.Img
          variant="top"
          src={wine.imageUrl}
          alt={wine.name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
      )}
      <Card.Body className="d-flex align-items-center flex-column pt-4 pb-3">
        {/* Bottle image + text row */}
        <div className="d-flex w-100 align-items-center position-relative mb-3">
          {/* Bottle image */}
          <div className="wine-bottle-container">
            <img
              src={getBottleImage(wine.color)}
              alt={`${wine.color} wine bottle`}
              className="wine-bottle-img"
            />
          </div>

          {/* Text content */}
          <div className="flex-grow-1 ms-5">
            <Card.Title style={{ color: 'darkred' }}>{wine.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {wine.producer} – {wine.vintage}
            </Card.Subtitle>
            <Card.Text className="mb-1">
              <strong>Country:</strong> {wine.country}
            </Card.Text>
            <Card.Text className="mb-1">
              <strong>Color:</strong> {wine.color.toLowerCase()}
            </Card.Text>
            {wine.grapeVarieties?.length > 0 && (
              <Card.Text className="mb-1">
                <strong>Grapes:</strong> {wine.grapeVarieties.join(', ')}
              </Card.Text>
            )}
          </div>
        </div>

        {/* Add Bottle Button */}
        {onAddBottleClick && (
          <Button
            variant="outline-danger"
            size="sm"
            className="align-self-end mt-auto"
            onClick={() => onAddBottleClick(wine.id)}
          >
            Add bottle
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}

export default WineCard
