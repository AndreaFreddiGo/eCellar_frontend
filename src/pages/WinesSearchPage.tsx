// src/pages/WinesSearchPage.tsx

import { useEffect, useState } from 'react'
import { Container, Form, Row, Col } from 'react-bootstrap'
import logo_eCellar from '../assets/logo_eCellar.png'
import { searchWines } from '../services/wineService'
import { getCellarWinesByWineIds } from '../services/cellarWineService'
import { CellarWineDTO } from '../types/CellarWineDTO'
import { WineDTO } from '../types/WineDTO'
import CellarWineCard from '../components/CellarWineCard'

const WinesSearchPage = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<CellarWineDTO[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([])
        return
      }

      setLoading(true)

      try {
        const wines: WineDTO[] = await searchWines(query)
        const wineIds = wines.map((w) => w.id)

        if (wineIds.length === 0) {
          setResults([])
        } else {
          const cellarWines = await getCellarWinesByWineIds(wineIds)
          setResults(cellarWines)
        }
      } catch (error) {
        console.error('Search failed', error)
        setResults([])
      } finally {
        setLoading(false)
      }
    }

    const timeout = setTimeout(fetchResults, 300) // debounce
    return () => clearTimeout(timeout)
  }, [query])

  return (
    <Container className="pt-5 mt-5">
      <h2 className="mb-3" style={{ color: 'darkred' }}>
        Search Bottles
      </h2>
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
    </Container>
  )
}

export default WinesSearchPage
