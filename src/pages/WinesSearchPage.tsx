// SearchWinesPage.tsx
import { useEffect, useState } from 'react'
import { Container, Form, Row, Col, Spinner } from 'react-bootstrap'
import { searchWines } from '../services/wineService'
import { WineDTO } from '../types/WineDTO'
import WineCard from '../components/WineCard'
import logo_eCellar from '../assets/logo_eCellar.png'

const WinesSearchPage = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<WineDTO[]>([])
  const [loading, setLoading] = useState(false)

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
    }, 300) // debounce time

    return () => clearTimeout(timeout)
  }, [query])

  return (
    <Container className="pt-5 mt-5">
      <h2 className="mb-3" style={{ color: 'darkred' }}>
        Search Wines
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
          {results.map((wine) => (
            <Col key={wine.wineId} md={4} className="mb-4">
              <WineCard wine={wine} />
            </Col>
          ))}
        </Row>
      )}

      {!loading && query && results.length === 0 && (
        <p className="mt-4 text-muted">No wines found.</p>
      )}
    </Container>
  )
}

export default WinesSearchPage
