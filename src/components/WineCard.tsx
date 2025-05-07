// components/WineCard.tsx
import { Card } from 'react-bootstrap'
import { WineDTO } from '../types/WineDTO'

interface WineCardProps {
  wine: WineDTO
}

const WineCard = (props: WineCardProps) => {
  return (
    <Card className="wine-card h-100">
      {props.wine.imageUrl && (
        <Card.Img
          variant="top"
          src={props.wine.imageUrl}
          alt={props.wine.name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
      )}
      <Card.Body>
        <Card.Title style={{ color: 'darkred' }}>{props.wine.name}</Card.Title>
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
      </Card.Body>
    </Card>
  )
}

export default WineCard
