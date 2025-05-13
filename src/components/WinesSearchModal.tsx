// WinesSearchModal.tsx
import { useEffect, useState } from 'react'
import { Modal, Container, Form, Row, Col } from 'react-bootstrap'
import { searchWines } from '../services/wineService'
import { WineDTO } from '../types/WineDTO'
import WineCard from '../components/WineCard'
import logo_eCellar from '../assets/logo_eCellar.png'
import AddBottleModal from './AddBottleModal'

interface WinesSearchModalProps {
  show: boolean
  onHide: () => void
  cellarId: string
  onBottleAdded: () => void
}

const WinesSearchModal = ({
  show,
  onHide,
  cellarId,
  onBottleAdded,
}: WinesSearchModalProps) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<WineDTO[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedWineId, setSelectedWineId] = useState<string | null>(null)

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([])
        return
      }
      setLoading(true)
      try {
        const wines = await searchWines(query)
        setResults(wines)
      } catch (error) {
        console.error('Search failed', error)
        setResults([])
      } finally {
        setLoading(false)
      }
    }

    const timeout = setTimeout(() => {
      fetchResults()
    }, 300)

    return () => clearTimeout(timeout)
  }, [query])

  useEffect(() => {
    if (!show) {
      setQuery('')
      setResults([])
    }
  }, [show])

  return (
    <Modal show={show} onHide={onHide} fullscreen scrollable>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: 'darkred' }}>Search Wines</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-light">
        <Container className="pt-3">
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Control
              type="text"
              placeholder="Search by name, producer, grape..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Form>

          {loading && (
            <div className="text-center mt-4">
              <img
                src={logo_eCellar}
                alt="logo_eCellar"
                className="spinner spinner-border border-0"
              />{' '}
              <span>Loading...</span>
            </div>
          )}

          {!loading && results.length > 0 && (
            <Row className="mt-4">
              {results.map((wine) => (
                <Col key={wine.id} md={4} className="mb-4">
                  <WineCard
                    wine={wine}
                    onAddBottleClick={(wineId) => setSelectedWineId(wineId)}
                  />
                </Col>
              ))}
            </Row>
          )}
          {selectedWineId && (
            <AddBottleModal
              show={!!selectedWineId}
              onHide={() => setSelectedWineId(null)}
              wineId={selectedWineId}
              cellarId={cellarId}
              onCreated={onBottleAdded}
            />
          )}

          {!loading && query && results.length === 0 && (
            <p className="mt-4 text-muted">No wines found.</p>
          )}
        </Container>
      </Modal.Body>
    </Modal>
  )
}

export default WinesSearchModal
