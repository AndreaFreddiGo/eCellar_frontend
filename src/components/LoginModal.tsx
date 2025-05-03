import { FormEvent, useState } from 'react'
import { Modal, Button, Form, Alert } from 'react-bootstrap'
import { login } from '../services/authService'
import { LoginRequest } from '../types/AuthTypes'
import ErrorAlert from './ErrorAlert'
import axios from 'axios'

interface LoginModalProps {
  showLoginModal: boolean
  handleClose: () => void
}

const LoginModal = (props: LoginModalProps) => {
  // This is the state for the form data
  // It uses the LoginRequest interface to define the structure of the data
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
  })

  // Error message
  const [error, setError] = useState('')

  // This function handles the form submission
  // It prevents the default form submission behavior and calls the login function
  // It is a promise-based function that handles the login process
  // If the login is successful, it saves the token and user info to localStorage
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const response = await login(formData)

      // It saves login info to localStorage
      localStorage.setItem('token', response.token)
      localStorage.setItem('username', response.username)
      localStorage.setItem('name', response.name)
      localStorage.setItem('userId', response.userId)
      localStorage.setItem('profilePicture', response.profilePicture)

      setError('')
      props.handleClose()
    } catch (err) {
      if (typeof err === 'object' && err !== null && 'message' in err) {
        setError((err as { message: string }).message)
      } else {
        setError('An unexpected error occurred')
      }
    }
  }

  return (
    <Modal show={props.showLoginModal} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <ErrorAlert message={error} />}
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group controlId="password" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default LoginModal
