const express = require('express');
const Plant = require('../models/plant');
const router = express.Router();

// Route to create a new plant
router.post('/', async (req, res) => {
  try {
    const plant = new Plant(req.body);
    await plant.save();
    res.status(201).send(plant);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;