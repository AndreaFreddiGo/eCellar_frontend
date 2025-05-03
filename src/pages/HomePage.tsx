import { useState } from 'react'
import { Container, Button } from 'react-bootstrap'
import LoginModal from '../components/LoginModal'

const HomePage = () => {
  const [showLogin, setShowLogin] = useState(false)

  const handleClose = () => setShowLogin(false)
  const handleShow = () => setShowLogin(true)

  return (
    <Container className="text-center mt-5">
      <h1>
        Welcome to <span style={{ color: 'darkred' }}>e</span>Cellar
      </h1>
      <Button variant="warning" onClick={handleShow}>
        Login
      </Button>

      <LoginModal show={showLogin} handleClose={handleClose} />
    </Container>
  )
}

export default HomePage
