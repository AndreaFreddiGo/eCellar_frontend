// UserProfile.tsx
import { Container, Row, Col, Image, Card } from 'react-bootstrap'
import { UserInfo } from '../types/UserInfo'
import userPlaceholder from '../assets/user_placeholder.png'

interface UserProfileProps {
  user: UserInfo | null
}

function UserProfile(props: UserProfileProps) {
  const { user } = props

  if (!user) {
    return (
      <Container className="pt-5 mt-5 text-center">
        <h5>Please log in to view your profile.</h5>
      </Container>
    )
  }

  return (
    <Container className="pt-5 mt-5">
      <Row className="justify-content-center mb-4">
        <Col xs="auto">
          <Image
            src={
              user.profilePicture?.trim()
                ? user.profilePicture
                : userPlaceholder
            }
            roundedCircle
            style={{
              width: '150px',
              height: '150px',
              objectFit: 'cover',
              border: '2px solid gray',
            }}
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow-sm">
            <h3 className="mb-4">User Profile</h3>
            <p>
              <strong>Full Name:</strong> {user.name}
            </p>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone || 'Not provided'}
            </p>
            <p>
              <strong>Bio:</strong> {user.bio || 'No bio available'}
            </p>
            <p>
              <strong>Location:</strong> {user.location || 'Not specified'}
            </p>
            <p>
              <strong>Shipping Address:</strong>{' '}
              {user.shippingAddress || 'Not set'}
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default UserProfile
