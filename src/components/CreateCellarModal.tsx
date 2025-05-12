import { useEffect, useState } from 'react'
import { Modal, Button, Form, Alert } from 'react-bootstrap'
import { createCellar, CellarPayload } from '../services/cellarService'
import { AxiosError } from 'axios'
import { CellarDTO } from '../types/CellarDTO'

interface Props {
  show: boolean
  handleClose: () => void
  onCreated: (newCellar: CellarDTO) => void
}

const CreateCellarModal = ({ show, handleClose, onCreated }: Props) => {
  const [formData, setFormData] = useState<CellarPayload>({ name: '' })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [globalError, setGlobalError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setGlobalError(null)

    const newErrors: { [key: string]: string } = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required.'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    try {
      const newCellar = await createCellar(formData)
      onCreated(newCellar)
      handleClose()
      setFormData({ name: '', description: '' })
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>
      setGlobalError(
        axiosError.response?.data?.message || 'Unexpected error occurred'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (!show) {
      // reset everything when modal is closed
      setFormData({ name: '', description: '' })
      setErrors({})
      setGlobalError(null)
      setIsSubmitting(false)
    }
  }, [show])

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <h4 className="mb-0 ms-2">
          Create <span style={{ color: 'darkred' }}>new cellar</span>
        </h4>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {globalError && <Alert variant="danger">{globalError}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>Name *</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter cellar name"
              value={formData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              placeholder="Optional description"
              value={formData.description || ''}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button
              type="submit"
              style={{
                backgroundColor: 'darkred',
                border: 'none',
                color: 'white',
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Cellar'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default CreateCellarModal
