import { useEffect, useState } from 'react'
import { Modal, Button, Form, Alert } from 'react-bootstrap'
import {
  createCellar,
  updateCellar,
  CellarPayload,
} from '../services/cellarService'
import { AxiosError } from 'axios'
import { CellarDTO } from '../types/CellarDTO'

interface Props {
  show: boolean
  handleClose: () => void
  onCreated: (newCellar: CellarDTO) => void
  cellarToEdit?: CellarDTO | null
}

const CreateCellarModal = ({
  show,
  handleClose,
  onCreated,
  cellarToEdit,
}: Props) => {
  const [formData, setFormData] = useState<CellarPayload>({
    name: '',
    description: '',
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [globalError, setGlobalError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (cellarToEdit) {
      setFormData({
        cellarId: cellarToEdit.id,
        name: cellarToEdit.name,
        description: cellarToEdit.description,
      })
    } else {
      setFormData({ name: '', description: '' })
    }

    if (!show) {
      setErrors({})
      setGlobalError(null)
      setIsSubmitting(false)
    }
  }, [show, cellarToEdit])

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
      let result: CellarDTO
      if (formData.cellarId) {
        result = await updateCellar(formData.cellarId, formData)
      } else {
        result = await createCellar(formData)
      }
      onCreated(result)
      handleClose()
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
          {formData.cellarId ? 'Edit' : 'Create'}{' '}
          <span style={{ color: 'darkred' }}>cellar</span>
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
              {isSubmitting
                ? formData.cellarId
                  ? 'Updating...'
                  : 'Creating...'
                : formData.cellarId
                ? 'Update Cellar'
                : 'Create Cellar'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default CreateCellarModal
