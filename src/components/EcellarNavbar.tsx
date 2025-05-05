// EcellaNavbar.tsx
import { Container, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap'
import { UserInfo } from '../types/UserInfo'
import usePlaceholder from '../assets/User placeholder.png'

interface EcellaNavbarProps {
  user: UserInfo | null
  onLoginClick: () => void
  onLogout: () => void
}

function EcellaNavbar({ user, onLoginClick, onLogout }: EcellaNavbarProps) {
  return (
    <Navbar bg="light" className="shadow-lg">
      <Container>
        <Navbar.Brand href="/">
          <span style={{ color: 'darkred' }}>e</span>Cellar
        </Navbar.Brand>
        <Nav className="ms-auto align-items-center">
          {user ? (
            <>
              {/* User avatar and dropdown */}
              <Nav.Link href="/me">Hi, {user.name.split(' ')[0]}</Nav.Link>
              <NavDropdown
                title={
                  <span className="d-flex align-items-center">
                    <Image
                      src={user.profilePicture || usePlaceholder}
                      roundedCircle
                      style={{
                        width: '30px',
                        height: '30px',
                        objectFit: 'cover',
                        marginRight: '8px',
                      }}
                    />
                  </span>
                }
                id="user-nav-dropdown"
                align="end"
              >
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={onLogout}>Log out</NavDropdown.Item>
              </NavDropdown>
              {/* Navigation links visible only when logged in */}
              <Nav.Link href="/cellars">Your Cellars</Nav.Link>
              <Nav.Link href="/search">Search Wine</Nav.Link>
            </>
          ) : (
            // Login link visible when not logged in
            <Nav.Link onClick={onLoginClick}>Log in</Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default EcellaNavbar
