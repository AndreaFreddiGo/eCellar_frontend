import { useState } from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap'
import { BottleSize } from '../types/BottleSize'
import { bottleSizeLabels } from '../types/BottleSize'
import { createCellarWine } from '../services/cellarWineService'

interface AddBottleModalProps {
  show: boolean
  onHide: () => void
  wineId: string
  cellarId: string
  onCreated: () => void
}

const AddBottleModal = ({
  show,
  onHide,
  wineId,
  cellarId,
  onCreated,
}: AddBottleModalProps) => {
  const [formData, setFormData] = useState({
    quantity: 1,
    size: '' as BottleSize,
    isPublic: false,
    personalNotes: '',
    purchaseDate: new Date().getFullYear(),
    purchasePrice: '',
    askingPrice: '',
    myScore: '',
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target
    const isCheckbox = type === 'checkbox'

    setFormData((prev) => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async () => {
    const payload = {
      quantity: formData.quantity,
      size: formData.size,
      isPublic: formData.isPublic,
      personalNotes: formData.personalNotes,
      purchaseDate: formData.purchaseDate,
      purchasePrice: parseFloat(formData.purchasePrice),
      askingPrice: parseFloat(formData.askingPrice),
      myScore: parseInt(formData.myScore),
      wineId,
      cellarId,
    }

    try {
      await createCellarWine(payload)
      onCreated()
      onHide()
    } catch (err) {
      console.error('Error adding bottle:', err)
      alert('Failed to add bottle')
    }
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Bottle to Cellar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                min={1}
                value={formData.quantity}
                onChange={handleChange}
              />
            </Col>
            <Col md={6}>
              <Form.Label>Bottle Size</Form.Label>
              <Form.Select
                name="size"
                value={formData.size}
                onChange={handleChange}
                required
              >
                <option value="">Select size</option>
                {Object.entries(bottleSizeLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="formIsPublic">
            <Form.Check
              type="checkbox"
              label="Make bottle public"
              checked={formData.isPublic}
              onChange={(e) =>
                setFormData({ ...formData, isPublic: e.target.checked })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Personal Notes</Form.Label>
            <Form.Control
              as="textarea"
              name="personalNotes"
              rows={3}
              maxLength={1000}
              value={formData.personalNotes}
              onChange={handleChange}
            />
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Purchase Year</Form.Label>
              <Form.Control
                type="number"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleChange}
              />
            </Col>
            <Col md={6}>
              <Form.Label>My Score (1–100)</Form.Label>
              <Form.Control
                type="number"
                name="myScore"
                value={formData.myScore}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Purchase Price (€)</Form.Label>
              <Form.Control
                type="number"
                name="purchasePrice"
                value={formData.purchasePrice}
                onChange={handleChange}
              />
            </Col>
            <Col md={6}>
              <Form.Label>Asking Price (€)</Form.Label>
              <Form.Control
                type="number"
                name="askingPrice"
                value={formData.askingPrice}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="dark" onClick={handleSubmit}>
          Add Bottle
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddBottleModal
