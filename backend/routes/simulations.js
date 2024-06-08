// backend/routes/simulations.js

const express = require('express');
const router = express.Router();
const { Simulation } = require('../models');

router.post('/save', async (req, res) => {
  const { rut, monto_uf, meses, resultado } = req.body;
  console.log('Saving simulation:', { rut, monto_uf, meses, resultado });
  try {
    const simulation = await Simulation.create({ rut, monto_uf, meses, resultado });
    res.json(simulation);
  } catch (error) {
    console.error('Error saving simulation:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/:rut', async (req, res) => {
  const { rut } = req.params;
  console.log('Fetching simulations for RUT:', rut);
  try {
    const simulations = await Simulation.findAll({ where: { rut } });
    res.json(simulations);
  } catch (error) {
    console.error('Error fetching simulations:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
