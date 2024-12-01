const express = require("express");
const Manufacturer = require("../models/manufacturer");
const router = express.Router();

// Route to get all manufacturers
router.get("/", async (req, res) => {
  try {
    const manufacturers = await Manufacturer.find();
    res.status(200).send(manufacturers);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to create a new manufacturer
router.post("/", async (req, res) => {
  try {
    const manufacturer = new Manufacturer(req.body);
    await manufacturer.save();
    res.status(201).send(manufacturer);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const manufacturer = await Manufacturer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!manufacturer) {
      return res.status(404).send();
    }
    res.send(manufacturer);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
