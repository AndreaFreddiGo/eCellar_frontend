import { useEffect, useState } from 'react'
import {
  Container,
  Row,
  Col,
  Image,
  Card,
  Spinner,
  Button,
} from 'react-bootstrap'
import { UserInfo } from '../types/UserInfo'
import userPlaceholder from '../assets/user_placeholder.png'
import { getCurrentUser } from '../services/userService'
import UpdateProfileModal from '../components/UpdateProfileModal'

function UserProfile() {
  const [user, setUser] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [showUpdateModal, setShowUpdateModal] = useState(false)

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

      <Row className="justify-content-between">
        {/* Left Column - Avatar and Basic Info */}
        <Col md={4} className="pe-md-4 mb-4 mb-md-0">
          <div className="d-flex flex-column align-items-center align-items-md-center">
            <Image
              src={user.profilePicture?.trim() || userPlaceholder}
              roundedCircle
              className="profile-avatar mb-3"
            />
            <div className="text-center text-md-start">
              <h1 className="profile-name mb-1">
                {user.name} {user.surname}
              </h1>
              {user.username && (
                <p className="profile-username mb-3">@{user.username}</p>
              )}
            </div>
          </div>
        </Col>

        {/* Right Column - Profile Details */}
        <Col md={8}>
          <Card className="profile-card h-100">
            <Card.Body>
              <h4 className="profile-section-title mb-4">Profile Details</h4>
              <Row>
                <Col md={6}>
                  <ProfileField
                    label="Name"
                    value={user.name}
                    fallback="Not provided"
                  />
                  <ProfileField
                    label="Surname"
                    value={user.surname}
                    fallback="Not provided"
                  />
                  <ProfileField
                    label="Username"
                    value={`@${user.username}`}
                    fallback="Not provided"
                  />
                  <ProfileField
                    label="Email"
                    value={user.email}
                    fallback="Not provided"
                  />
                </Col>
                <Col md={6}>
                  <ProfileField
                    label="Phone"
                    value={user.phone}
                    fallback="Not provided"
                  />
                  <ProfileField
                    label="Birthdate"
                    value={user.birthDate}
                    fallback="Not provided"
                  />
                  <ProfileField
                    label="Biography"
                    value={user.biography}
                    fallback="No bio available"
                  />
                  <div className="d-flex justify-content-start mt-4">
                    <Button
                      variant="dark"
                      className="rounded-5 px-4 py-2"
                      onClick={() => setShowUpdateModal(true)}
                    >
                      Update Profile
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <UpdateProfileModal
        show={showUpdateModal}
        handleClose={() => setShowUpdateModal(false)}
        currentUser={user}
        onUpdate={(updatedUser) => setUser(updatedUser)}
      />
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
    <div className="profile-field mb-3">
      <h6 className="profile-field-label mb-1">{label}</h6>
      <p className="profile-field-value">
        {value || <span className="profile-field-empty">{fallback}</span>}
      </p>
    </div>
  )
}

export default UserProfile
