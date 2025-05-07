import { useEffect, useState } from 'react'
import { Container, Row, Col, Image, Card, Spinner } from 'react-bootstrap'
import { UserInfo } from '../types/UserInfo'
import userPlaceholder from '../assets/user_placeholder.png'
import { getCurrentUser } from '../services/userService'

function UserProfile() {
  const [user, setUser] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser()
        setUser(data)
      } catch (error) {
        console.error('Error fetching user profile:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading profile...</p>
      </Container>
    )
  }

  if (!user) {
    return (
      <Container className="profile-empty-state">
        <h5>Please log in to view your profile.</h5>
      </Container>
    )
  }

  return (
    <Container className="profile-container">
      <div className="profile-top-spacer"></div>
      <Row className="justify-content-center mb-5 align-items-center profile-header">
        <Col xs="auto">
          <Image
            src={user.profilePicture?.trim() || userPlaceholder}
            roundedCircle
            className="profile-avatar"
          />
        </Col>
        <Col xs="auto" className="profile-user-info">
          <h1 className="profile-name">
            {user.name} {user.surname}
          </h1>
          {user.username && (
            <p className="profile-username">@{user.username}</p>
          )}
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="profile-card">
            <Card.Body>
              <h4 className="profile-section-title">Profile Details</h4>
              <Row className="g-3">
                <Col md={6}>
                  <ProfileField
                    label="Phone"
                    value={user.phone}
                    fallback="Not provided"
                  />
                  <ProfileField
                    label="Location"
                    value={user.location}
                    fallback="Not specified"
                  />
                </Col>
                <Col md={6}>
                  <ProfileField
                    label="Bio"
                    value={user.bio}
                    fallback="No bio available"
                  />
                  <ProfileField
                    label="Shipping Address"
                    value={user.shippingAddress}
                    fallback="Not set"
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

function ProfileField({
  label,
  value,
  fallback,
}: {
  label: string
  value?: string
  fallback: string
}) {
  return (
    <div className="profile-field">
      <h6 className="profile-field-label">{label}</h6>
      <p className="profile-field-value">
        {value || <span className="profile-field-empty">{fallback}</span>}
      </p>
    </div>
  )
}

export default UserProfile
