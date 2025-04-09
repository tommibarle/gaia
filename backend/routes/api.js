const express = require('express');
const router = express.Router();
const { Yarn, Product, Sale } = require('../models');

// Gestione Gomitoli
router.get('/yarns', async (req, res) => {
  try {
    const yarns = await Yarn.findAll();
    res.json(yarns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/yarns', async (req, res) => {
  try {
    const yarn = await Yarn.create(req.body);
    res.status(201).json(yarn);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Gestione Prodotti
router.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Gestione Vendite
router.post('/sales', async (req, res) => {
  try {
    const sale = await Sale.create(req.body);
    res.status(201).json(sale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;