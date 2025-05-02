import { useState } from 'react'
import { Modal, Button, Form, Alert } from 'react-bootstrap'
import { login } from '../services/authService'
import { LoginRequest } from '../types/AuthTypes'

interface LoginModalProps {
  show: boolean
  handleClose: () => void
}

function LoginModal({ show, handleClose }: LoginModalProps) {
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await login(formData)

      localStorage.setItem('token', response.token)
      localStorage.setItem('username', response.username)
      localStorage.setItem('name', response.name)
      localStorage.setItem('userId', response.userId.toString())
      localStorage.setItem('profilePicture', response.profilePicture)

      setError('')
      handleClose()
    } catch (err) {
      setError('Invalid email or password')
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="password" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
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
