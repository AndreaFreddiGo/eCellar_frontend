import { useEffect, useState } from 'react'
import { Modal, Button, Form, Alert } from 'react-bootstrap'
import { updateCellar } from '../services/cellarService'
import { CellarDTO } from '../types/CellarDTO'
import { AxiosError } from 'axios'

interface Props {
  show: boolean
  handleClose: () => void
  initialData: {
    cellarId: string
    name: string
    description?: string
  }
  onUpdated: (updatedCellar: CellarDTO) => void
}

const UpdateCellarModal = ({
  show,
  handleClose,
  initialData,
  onUpdated,
}: Props) => {
  const [formData, setFormData] = useState({
    cellarId: '',
    name: '',
    description: '',
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [globalError, setGlobalError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (show) {
      setFormData({
        cellarId: initialData.cellarId,
        name: initialData.name,
        description: initialData.description || '',
      })
    }
  }, [show, initialData])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setGlobalError(null)

    if (!formData.name.trim()) {
      setErrors({ name: 'Name is required' })
      return
    }

    try {
      setIsSubmitting(true)
      const updated = await updateCellar(formData.cellarId, {
        name: formData.name,
        description: formData.description,
      })
      onUpdated(updated)
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>
      setGlobalError(
        axiosError.response?.data?.message || 'Unexpected error occurred'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <h4 className="mb-0 ms-2">
          Edit <span style={{ color: 'darkred' }}>cellar</span>
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
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default UpdateCellarModal
