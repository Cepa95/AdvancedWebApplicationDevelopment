const express = require('express');
const Manufacturer = require('../models/manufacturer');
const router = express.Router();

// Route to create a new manufacturer
router.post('/', async (req, res) => {
  try {
    const manufacturer = new Manufacturer(req.body);
    await manufacturer.save();
    res.status(201).send(manufacturer);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;