import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

export default function AddYarn() {
  const [formData, setFormData] = useState({
    name: '',
    color: '#ffffff',
    quantity: 0,
    costPerUnit: 0
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/yarns', formData);
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.error || 'Errore sconosciuto');
    }
  };

  return (
    <div className="mb-5">
      <h3>Aggiungi Gomitolo</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            required
            type="text"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Colore</Form.Label>
          <Form.Control
            type="color"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
          />
        </Form.Group>

        <Button variant="primary" type="submit">Salva</Button>
      </Form>
    </div>
  );
}