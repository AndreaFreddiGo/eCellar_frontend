import { Container, Nav, Navbar } from 'react-bootstrap'
import LoginModal from './LoginModal'
import { useState } from 'react'

function EcellaNavbar() {
  const [showLoginModal, setshowLoginModal] = useState(false)

  const handleClose = () => setshowLoginModal(false)
  const handleShow = () => setshowLoginModal(true)

  return (
    <>
      <Navbar bg="light" data-bs-theme="light" className="shadow-lg">
        <Container>
          <Navbar.Brand href="#home">
            {' '}
            <span style={{ color: 'darkred' }}>e</span>Cellar
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="#login" onClick={handleShow}>
              Login
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <LoginModal showLoginModal={showLoginModal} handleClose={handleClose} />
    </>
  )
}

export default EcellaNavbar
