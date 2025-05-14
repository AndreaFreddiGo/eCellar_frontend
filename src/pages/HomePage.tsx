import { Container, Row, Col, Button } from 'react-bootstrap'
import eCellar from '../assets/eCellar.png'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { AuthUser } from '../types/AuthUser'

interface HomePageProps {
  user: AuthUser | null
  onLoginClick: () => void
  isDark: boolean
}

const HomePage = ({ user, onLoginClick, isDark }: HomePageProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (user) {
      navigate('/cellars')
    } else {
      onLoginClick()
    }
  }

  return (
    <Container
      fluid
      className={`homepage-container d-flex flex-column justify-content-center align-items-center text-center ${
        isDark ? 'dark-mode' : ''
      }`}
    >
      <motion.img
        src={eCellar}
        alt="eCellar"
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        className="mb-4 logo-img"
      />

      <h1 className="fw-bold mb-3 px-3 homepage-heading">
        From cellar to marketplace. <br />
        One platform, endless possibilities.
      </h1>

      <p className="lead mb-4 px-4 homepage-subtext">
        Manage your bottles, connect with others, and find your next favorite
        wine. eCellar is the digital platform where your passion meets
        simplicity and connection.
      </p>

      <Row className="justify-content-center">
        <Col xs="auto">
          <Button
            className="btn btn-dark rounded-5 shadow-lg"
            size="lg"
            onClick={handleClick}
          >
            Start Your Cellar
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default HomePage
