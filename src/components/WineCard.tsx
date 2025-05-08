// components/WineCard.tsx
import { Card } from 'react-bootstrap'
import { WineDTO } from '../types/WineDTO'
import redBottle from '../assets/red_wine_bottle.png'
import whiteBottle from '../assets/white_wine_bottle.png'
import roseBottle from '../assets/rose_wine_bottle.png'

interface WineCardProps {
  wine: WineDTO
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

const WineCard = (props: WineCardProps) => {
  return (
    <Card className="wine-card h-100 position-relative overflow-visible">
      {props.wine.imageUrl && (
        <Card.Img
          variant="top"
          src={props.wine.imageUrl}
          alt={props.wine.name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
      )}
      <Card.Body className="d-flex align-items-center position-relative pt-4">
        {/* Bottle image */}
        <div className="wine-bottle-container">
          <img
            src={getBottleImage(props.wine.color)}
            alt={`${props.wine.color} wine bottle`}
            className="wine-bottle-img"
          />
        </div>

        {/* Text content */}
        <div className="flex-grow-1 ms-5">
          <Card.Title style={{ color: 'darkred' }}>
            {props.wine.name}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {props.wine.producer} – {props.wine.vintage}
          </Card.Subtitle>
          <Card.Text className="mb-1">
            <strong>Country:</strong> {props.wine.country}
          </Card.Text>
          <Card.Text className="mb-1">
            <strong>Color:</strong> {props.wine.color.toLowerCase()}
          </Card.Text>
          {props.wine.grapeVarieties?.length > 0 && (
            <Card.Text className="mb-1">
              <strong>Grapes:</strong> {props.wine.grapeVarieties.join(', ')}
            </Card.Text>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}

export default WineCard
