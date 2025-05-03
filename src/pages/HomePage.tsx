import { useState } from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap'
import LoginModal from '../components/LoginModal'

// Homepage component
const HomePage = () => {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <Container fluid>
      <Row className="justify-content-center mt-2 mt-lg-5">
        <Col xs={12} md={8} lg={6} className="text-center mb-4">
          <h1 className="mb-4">Welcome to eCellar</h1>
          <Button variant="warning" onClick={() => setShowLogin(true)}>
            Login
          </Button>
        </Col>
      </Row>

      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />
    </Container>
  )
}

export default HomePage
