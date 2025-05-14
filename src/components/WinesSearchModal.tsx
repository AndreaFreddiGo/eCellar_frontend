// src/components/WinesSearchModal.tsx
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { searchWines } from '../services/wineService'
import { getCellarWinesByWineIds } from '../services/cellarWineService'
import { CellarWineDTO } from '../types/CellarWineDTO'
import CellarWineCard from './CellarWineCard'
import logo_eCellar from '../assets/logo_eCellar.png'

interface Props {
  show: boolean
  onHide: () => void
  cellarId: string
  onBottleAdded: () => void
}

const WinesSearchModal = ({ show, onHide, cellarId, onBottleAdded }: Props) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<CellarWineDTO[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!show) return

    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([])
        return
      }
      setLoading(true)
      try {
        const wines = await searchWines(query)
        const wineIds = wines.map((wine) => wine.id)

        if (wineIds.length > 0) {
          const bottles = await getCellarWinesByWineIds(wineIds)
          setResults(bottles)
        } else {
          setResults([])
        }
      } catch (error) {
        console.error('Search failed', error)
        setResults([])
      } finally {
        setLoading(false)
      }
    }

    const timeout = setTimeout(fetchResults, 300)
    return () => clearTimeout(timeout)
  }, [query, show])

  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>Search and Add Bottles</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
              alt="Loading"
              className="spinner spinner-border border-0"
            />{' '}
            <span>Loading...</span>
          </div>
        )}

        {!loading && results.length > 0 && (
          <Row className="mt-4">
            {results.map((bottle) => (
              <Col key={bottle.id} md={4} className="mb-4">
                <CellarWineCard bottle={bottle} />
              </Col>
            ))}
          </Row>
        )}

        {!loading && query && results.length === 0 && (
          <p className="mt-4 text-muted">No bottles found.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default WinesSearchModal
