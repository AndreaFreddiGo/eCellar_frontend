import { FormEvent, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { login } from '../services/authService'
import { LoginRequest } from '../types/AuthTypes'
import ErrorAlert from './ErrorAlert'
import eCellar_logo from '../assets/logo_eCellar.png'
import wine_modal_image from '../assets/wine_modal_image.png'
import { UserInfo } from '../types/UserInfo'

interface LoginModalProps {
  showLoginModal: boolean
  handleClose: () => void
  onSignUpClick: () => void
  setUser: (user: UserInfo) => void
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
      localStorage.setItem('profilePicture', response.profilePicture || '')

      // This updates the global user state
      props.setUser({
        name: response.name,
        username: response.username,
        userId: response.userId,
        profilePicture: response.profilePicture,
      })

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
    <Modal
      show={props.showLoginModal}
      onHide={props.handleClose}
      centered
      size="xl"
      dialogClassName="eCellar-modal"
    >
      <Modal.Header className="border-0 pb-0 d-flex justify-content-between align-items-center">
        {/* Logo on the left */}
        <img src={eCellar_logo} alt="eCellar logo" style={{ height: '40px' }} />

        {/* Close button on the right */}
        <Button
          variant="close"
          onClick={props.handleClose}
          aria-label="Close"
          className="p-0 m-0 mb-auto"
        ></Button>
      </Modal.Header>
      <Modal.Body className="p-5 d-flex position-relative">
        {/* Left side - Login form */}
        <div className="w-100 pe-5" style={{ maxWidth: '60%' }}>
          <div className="mb-4">
            <h4 className="mb-3">
              Log into <span style={{ color: 'darkred' }}>e</span>Cellar
            </h4>
          </div>

          {/* Social Buttons */}
          <div className="d-flex flex-column gap-3 mb-4">
            <Button className="google-btn d-flex align-items-center justify-content-center py-2">
              <span className="google-icon d-flex align-items-center">
                <svg width="18" height="18" viewBox="0 0 48 48">
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.9 0 6.6 1.7 8.1 3.1l6-6C34.9 3 29.9 1 24 1 14.8 1 6.8 6.7 3.2 14.3l7.6 5.9C12.6 14.1 17.8 9.5 24 9.5z"
                  />
                  <path
                    fill="#34A853"
                    d="M46.1 24.5c0-1.7-.1-2.9-.4-4.2H24v8h12.5c-.3 2-1.9 4.9-5.5 6.9l8.5 6.5c5-4.6 6.6-11.4 6.6-17.2z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.8 28.6c-.5-1.4-.8-2.8-.8-4.6s.3-3.2.8-4.6l-7.6-5.9C1.1 17.2 0 20.4 0 24s1.1 6.8 3.2 9.5l7.6-5.9z"
                  />
                  <path
                    fill="#4285F4"
                    d="M24 48c6.5 0 12-2.1 16-5.7l-8.5-6.5c-2.3 1.6-5.3 2.5-7.5 2.5-6.2 0-11.4-4.6-13.3-10.8l-7.6 5.9C6.8 41.3 14.8 48 24 48z"
                  />
                </svg>
              </span>
              <span className="ms-2">Continue with Google</span>
            </Button>

            <Button className="facebook-btn d-flex align-items-center justify-content-center py-2 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 216 216"
                fill="#FFFFFF"
              >
                <path d="M204.1 0H11.9C5.3 0 0 5.3 0 11.9v192.3c0 6.6 5.3 11.9 11.9 11.9H116V132h-30v-33h30V75.5c0-29.7 18.1-45.9 44.5-45.9 12.7 0 23.6.9 26.8 1.3v31h-18.4c-14.4 0-17.2 6.9-17.2 17v22.3h34.4l-4.5 33h-29.9v84.1h58.7c6.6 0 11.9-5.3 11.9-11.9V11.9c0-6.6-5.3-11.9-11.9-11.9z" />
              </svg>
              <span className="ms-2">Continue with Facebook</span>
            </Button>
          </div>

          {/* Divider */}
          <div className="d-flex align-items-center my-4">
            <div className="flex-grow-1 border-line" />
            <span className="px-3 fw-medium">or</span>
            <div className="flex-grow-1 border-line" />
          </div>

          {/* Error and form */}
          {error && <ErrorAlert message={error} />}

          <Form className="login-form" onSubmit={handleSubmit}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label className="mb-1 opacity-50">Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="login-form-label py-2 opacity-75"
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-4">
              <Form.Label className="mb-1 opacity-50">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                className="login-form-label py-2 opacity-75"
              />
            </Form.Group>

            <div className="d-grid mb-3">
              <Button className="login-button py-2" type="submit">
                Log in
              </Button>
            </div>
          </Form>

          {/* Sign up link */}
          <div className="login-reg-link mt-4">
            Don't have an account?{' '}
            <button
              onClick={props.onSignUpClick}
              className="bg-transparent border-0 p-0"
              style={{ color: 'darkred', cursor: 'pointer' }}
            >
              Sign up
            </button>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="d-none d-lg-flex w-100" style={{ maxWidth: '40%' }}>
          <div className="h-100 w-100 rounded-end d-flex align-items-center justify-content-center">
            <img
              src={wine_modal_image}
              alt="wine modal image"
              style={{ height: '500px' }}
              className="wine_modal_image m-4"
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default LoginModal
