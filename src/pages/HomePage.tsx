import { Container, Row, Col, Button } from 'react-bootstrap'
import eCellar from '../assets/eCellar.png'

const HomePage = () => {
  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center text-center pt-5"
      style={{ minHeight: '100vh' }}
    >
      <img
        src={eCellar}
        alt="eCellar"
        style={{ width: '50vw', maxWidth: '500px' }}
        className="mb-4"
      />

      <h1
        className="fw-bold mb-3 px-3"
        style={{
          fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
        }}
      >
        From cellar to marketplace. <br />
        One platform, endless possibilities.
      </h1>
      <p
        className="lead text-muted mb-4 px-4"
        style={{
          maxWidth: '700px',
          fontSize: 'clamp(1rem, 4vw, 1.25rem)',
        }}
      >
        Manage your bottles, connect with others, and find your next favorite
        wine. eCellar is the digital platform where your passion meets
        simplicity and connection.
      </p>

      <Row className="justify-content-center">
        <Col xs="auto">
          <Button variant="dark" size="lg">
            Start Your Cellar
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default HomePage
