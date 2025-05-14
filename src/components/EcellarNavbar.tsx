// EcellaNavbar.tsx
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Image,
  Form,
} from 'react-bootstrap'
import userPlaceholder from '../assets/user_placeholder.png'
import { useState } from 'react'
import { AuthUser } from '../types/AuthUser'

interface EcellaNavbarProps {
  user: AuthUser | null
  onLoginClick: () => void
  onLogout: () => void
  currentTheme: 'light' | 'dark' // Specifica i valori possibili
  onThemeChange: (theme: 'light' | 'dark') => void // Tipo della funzione
}

const EcellaNavbar = (props: EcellaNavbarProps) => {
  // Language switch state
  const [language, setLanguage] = useState<'ENG' | 'ITA'>('ENG')

  // Handle switch between ENG and ITA
  const toggleLanguage = (lang: 'ENG' | 'ITA') => {
    setLanguage(lang)
  }

  return (
    <Navbar
      bg={props.currentTheme === 'dark' ? undefined : 'light'}
      className={`shadow-lg z-3 py-2 ${
        props.currentTheme === 'dark' ? 'navbar-dark bg-darkgray' : ''
      }`}
      fixed="top"
    >
      <Container>
        <Navbar.Brand href="/">
          <span className="brand-e">e</span>Cellar
        </Navbar.Brand>

        <Nav className="ms-auto align-items-center">
          {props.user ? (
            <>
              {/* User avatar and dropdown */}
              <Nav.Link href="/me">
                Hi, {props.user.name.split(' ')[0]}
              </Nav.Link>
              <NavDropdown
                id="user-nav-dropdown"
                align="end"
                className="m-0 pe-2 no-caret"
                title={
                  <span className="d-inline-flex align-items-center p-0 m-0">
                    <Image
                      src={
                        props.user?.profilePicture?.trim()
                          ? props.user.profilePicture
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
                    <i
                      className="bi bi-caret-down-fill ms-1"
                      style={{ fontSize: '0.6rem' }}
                    ></i>
                  </span>
                }
              >
                <NavDropdown.Item href="/me">Profile</NavDropdown.Item>

                <NavDropdown.ItemText className="px-3 py-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="small">Dark Mode</span>
                    <Form.Check
                      type="switch"
                      id="theme-switch"
                      checked={props.currentTheme === 'dark'}
                      onChange={(e) =>
                        props.onThemeChange(e.target.checked ? 'dark' : 'light')
                      }
                      label=""
                    />
                  </div>
                </NavDropdown.ItemText>

                <NavDropdown.Divider />
                <NavDropdown.Item onClick={props.onLogout}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>

              {/* Navigation links visible only when logged in */}
              <Nav.Link href="/cellars" className="nav-separator ms-2">
                your cellars
              </Nav.Link>
              <Nav.Link href="/wines" className="nav-separator m-0">
                search wine
              </Nav.Link>
            </>
          ) : (
            // Login link visible when not logged in
            <Nav.Link onClick={props.onLoginClick}>Log in</Nav.Link>
          )}
          {/* Language switch visible for all users */}
          <div className="language-switch ms-5 text-uppercase fw-medium">
            <span
              onClick={() => toggleLanguage('ENG')}
              className={
                language === 'ENG' ? 'fw-bold text-dark' : 'text-muted'
              }
            >
              ENG
            </span>
            <span className="mx-1 text-muted">/</span>
            <span
              onClick={() => toggleLanguage('ITA')}
              className={
                language === 'ITA' ? 'fw-bold text-dark' : 'text-muted'
              }
            >
              ITA
            </span>
          </div>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default EcellaNavbar
