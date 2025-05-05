import { Container, Row, Col, Button } from 'react-bootstrap'
import eCellar from '../assets/eCellar.png'
import { motion } from 'framer-motion'
import { UserInfo } from '../types/UserInfo'
import { useNavigate } from 'react-router-dom'

interface HomePageProps {
  user: UserInfo | null
  onLoginClick: () => void
}

const HomePage = ({ user, onLoginClick }: HomePageProps) => {
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
      className="d-flex flex-column align-items-center text-center mt-5 "
      style={{ minHeight: '100vh', paddingTop: '150px' }}
    >
      <motion.img
        src={eCellar}
        alt="eCellar"
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        style={{ width: '50vw', maxWidth: '400px' }}
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
          <Button variant="dark" size="lg" onClick={handleClick}>
            Start Your Cellar
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default HomePage
