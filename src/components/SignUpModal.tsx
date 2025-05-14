import { useState, useEffect } from 'react'
import { Modal, Form, Button, Alert } from 'react-bootstrap'
import { AxiosError } from 'axios'
import { registerUser } from '../services/authService'
import { login } from '../services/authService'
import { LoginResponse } from '../types/AuthTypes'

interface SignUpModalProps {
  show: boolean
  handleClose: () => void
  onRegistered: () => void
  onLoginSuccess: (data: LoginResponse) => void
}

const SignUpModal = ({
  show,
  handleClose,
  onRegistered,
  onLoginSuccess,
}: SignUpModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    username: '',
    password: '',
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [backendError, setBackendError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    setBackendError(null)

    if (!validateForm()) return

    try {
      await registerUser(formData)
      const loginData = await login({
        email: formData.email,
        password: formData.password,
      })
      onLoginSuccess(loginData)
      onRegistered()
      handleClose()
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>

      if (axiosError.response?.data) {
        const backendData = axiosError.response.data
        // Può essere ErrorResponse { message: "..." }, oppure una stringa pura
        const message =
          typeof backendData === 'string'
            ? backendData
            : backendData.message || 'Unknown backend error'

        setBackendError(message)
      } else {
        setBackendError('Registration failed. Please try again.')
      }
    }
  }

  useEffect(() => {
    if (!show) {
      setFormData({
        name: '',
        surname: '',
        email: '',
        username: '',
        password: '',
      })
      setErrors({})
      setBackendError(null)
    }
  }, [show])

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length < 2 || formData.name.length > 20) {
      newErrors.name = 'Name must be between 2 and 20 characters'
    }

    if (!formData.surname.trim()) {
      newErrors.surname = 'Surname is required'
    } else if (formData.surname.length < 2 || formData.surname.length > 20) {
      newErrors.surname = 'Surname must be between 2 and 20 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address'
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    } else if (formData.username.length < 4 || formData.username.length > 20) {
      newErrors.username = 'Username must be between 4 and 20 characters'
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        'Password must be at least 8 characters and include 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {backendError && <Alert variant="danger">{backendError}</Alert>}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
              required
              minLength={2}
              maxLength={20}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Surname</Form.Label>
            <Form.Control
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              isInvalid={!!errors.surname}
              required
              minLength={2}
              maxLength={20}
            />
            <Form.Control.Feedback type="invalid">
              {errors.surname}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              isInvalid={!!errors.username}
              required
              minLength={4}
              maxLength={20}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              required
              placeholder="At least 8 chars, 1 uppercase, 1 symbol"
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="dark" onClick={handleSubmit}>
          Register
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SignUpModal
