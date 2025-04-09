import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

export default function Dashboard() {
  const [stats, setStats] = useState({ yarns: 0, sales: 0 });
  const [salesData, setSalesData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const yarnsRes = await axios.get('/api/yarns');
        const salesRes = await axios.get('/api/sales');
        
        setStats({
          yarns: yarnsRes.data.length,
          sales: salesRes.data.length
        });

        // Esempio dati per grafico
        setSalesData({
          labels: ['Gen', 'Feb', 'Mar'],
          datasets: [{
            label: 'Vendite Mensili',
            data: [12, 19, 3],
            backgroundColor: 'rgba(75,192,192,0.6)'
          }]
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mb-5">
      <h3>Dashboard</h3>
      <Row className="g-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Gomitoli in Stock</Card.Title>
              <Card.Text className="display-4">{stats.yarns}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Vendite Totali</Card.Title>
              <Card.Text className="display-4">{stats.sales}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>Andamento Vendite</Card.Title>
              <Bar data={salesData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}