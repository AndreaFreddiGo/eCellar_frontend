import { useEffect, useState, FormEvent } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { UserInfo } from '../types/UserInfo'
import { updateUserInfo } from '../services/userService'
import ErrorAlert from './ErrorAlert'
import { UserUpdatePayload } from '../types/UserUpdatePayload'

interface UpdateProfileModalProps {
  show: boolean
  handleClose: () => void
  currentUser: UserInfo
  onUpdate: (updatedUser: UserInfo) => void
}

const UpdateProfileModal = ({
  show,
  handleClose,
  currentUser,
  onUpdate,
}: UpdateProfileModalProps) => {
  const [formData, setFormData] = useState<UserInfo>(currentUser)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setFormData(currentUser)
  }, [currentUser])

  // Validate required and optional fields before submitting
  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (
      !formData.name ||
      formData.name.length < 2 ||
      formData.name.length > 20
    ) {
      newErrors.name = 'Name must be between 2 and 20 characters.'
    }
    if (
      !formData.surname ||
      formData.surname.length < 2 ||
      formData.surname.length > 20
    ) {
      newErrors.surname = 'Surname must be between 2 and 20 characters.'
    }
    if (
      !formData.username ||
      formData.username.length < 4 ||
      formData.username.length > 20
    ) {
      newErrors.username = 'Username must be between 4 and 20 characters.'
    }
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.'
    }
    if (formData.biography && formData.biography.length > 100) {
      newErrors.biography = 'Biography must be less than 100 characters.'
    }
    if (formData.phone && !/^[0-9+\s()-]{6,20}$/.test(formData.phone)) {
      newErrors.phone =
        'Phone must contain only valid characters (6–20 digits).'
    }
    if (formData.birthDate && new Date(formData.birthDate) >= new Date()) {
      newErrors.birthDate = 'Birthdate must be in the past.'
    }
    if (formData.profilePicture && formData.profilePicture.length > 300) {
      newErrors.profilePicture =
        'Profile picture URL must be under 300 characters.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Update local state on input change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target
    const isCheckbox = type === 'checkbox'
    setFormData({
      ...formData,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
    })
  }

  // Submit updated form to backend after validation and cleanup
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setServerError('')
    if (!validate()) return

    setLoading(true)
    try {
      const cleanedFormData: UserUpdatePayload = {
        name: formData.name.trim(),
        surname: formData.surname.trim(),
        email: formData.email.trim(),
        username: formData.username.trim(),
        biography: formData.biography?.trim() || null,
        phone: formData.phone?.trim() || null,
        birthDate: formData.birthDate || null,
        profilePicture: formData.profilePicture?.trim() || null,
        preferredLanguage: formData.preferredLanguage || 'ENG',
        publicProfile: formData.publicProfile,
      }

      const updatedUser = await updateUserInfo(currentUser.id, cleanedFormData)
      onUpdate(updatedUser)
      handleClose()
    } catch (err) {
      const axiosError = err as import('axios').AxiosError<{ message: string }>
      const backendMessage =
        axiosError.response?.data?.message || 'Failed to update profile.'
      setServerError(backendMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (show) {
      setServerError('')
      setErrors({})
    }
  }, [show])

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="xl"
      dialogClassName="eCellar-modal"
    >
      <Modal.Header className="border-0 pb-0 d-flex justify-content-between align-items-center">
        <h4 className="mb-0 ms-2">
          Update <span style={{ color: 'darkred' }}>Profile</span>
        </h4>
        <Button
          variant="close"
          onClick={handleClose}
          aria-label="Close"
          className="p-0 m-0 mb-auto"
        />
      </Modal.Header>
      <Modal.Body className="p-5">
        {serverError && <ErrorAlert message={serverError} />}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              {(
                ['name', 'surname', 'username', 'email'] as (keyof UserInfo)[]
              ).map((field) => (
                <Form.Group className="mb-3" key={field}>
                  <Form.Label>
                    {field.charAt(0).toUpperCase() + field.slice(1)} *
                  </Form.Label>
                  <Form.Control
                    name={field}
                    type={field === 'email' ? 'email' : 'text'}
                    value={(formData[field] as string) || ''}
                    onChange={handleChange}
                    placeholder={`Enter your ${field}`}
                    isInvalid={!!errors[field]}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors[field]}
                  </Form.Control.Feedback>
                </Form.Group>
              ))}
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  name="phone"
                  type="tel"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  placeholder="Optional phone number"
                  isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Birthdate</Form.Label>
                <Form.Control
                  name="birthDate"
                  type="date"
                  value={formData.birthDate || ''}
                  onChange={handleChange}
                  isInvalid={!!errors.birthDate}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.birthDate}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Biography</Form.Label>
                <Form.Control
                  name="biography"
                  as="textarea"
                  rows={3}
                  value={formData.biography || ''}
                  onChange={handleChange}
                  placeholder="Tell us something about yourself"
                  isInvalid={!!errors.biography}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.biography}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Preferred Language</Form.Label>
                <Form.Select
                  name="preferredLanguage"
                  value={formData.preferredLanguage || 'ENG'}
                  onChange={handleChange}
                >
                  <option value="ENG">English</option>
                  <option value="ITA">Italian</option>
                </Form.Select>
              </Form.Group>
              <Form.Check
                type="checkbox"
                label="Public Profile"
                name="publicProfile"
                checked={formData.publicProfile}
                onChange={handleChange}
                className="mb-3"
              />
              <p className="text-muted small">
                Registered on:{' '}
                <strong>
                  {new Date(formData.registrationDate).toLocaleDateString()}
                </strong>
              </p>
            </Col>
          </Row>
          <div className="d-flex justify-content-end">
            <Button
              type="submit"
              className="login-button px-4 py-2"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default UpdateProfileModal
