// EcellaNavbar.tsx
import { Container, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap'
import { UserInfo } from '../types/UserInfo'
import userPlaceholder from '../assets/user_placeholder.png'

interface EcellaNavbarProps {
  user: UserInfo | null
  onLoginClick: () => void
  onLogout: () => void
}

function EcellaNavbar({ user, onLoginClick, onLogout }: EcellaNavbarProps) {
  return (
    <Navbar bg="light" className="shadow-lg z-3 py-2" fixed="top">
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
                id="user-nav-dropdown"
                align="end"
                className="m-0 pe-2 no-caret"
                title={
                  <span className="d-inline-flex align-items-center p-0 m-0">
                    <Image
                      src={
                        user.profilePicture?.trim()
                          ? user.profilePicture
                          : userPlaceholder
                      }
                      roundedCircle
                      style={{
                        borderRadius: '50%',
                        border: '1px solid gray',
                        width: '30px',
                        height: '30px',
                        objectFit: 'cover',
                      }}
                      className="p-0 m-0"
                    />
                    {/* Custom caret centered manually */}
                    <i
                      className="bi bi-caret-down-fill ms-1"
                      style={{ fontSize: '0.6rem' }}
                    ></i>
                  </span>
                }
              >
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={onLogout}>Log out</NavDropdown.Item>
              </NavDropdown>

              {/* Navigation links visible only when logged in */}
              <Nav.Link href="/cellars" className="nav-separator ms-2">
                your cellars
              </Nav.Link>
              <Nav.Link href="/search" className="nav-separator m-0">
                search wine
              </Nav.Link>
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
