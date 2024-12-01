const express = require("express");
const Plant = require("../models/plant");
const Manufacturer = require("../models/manufacturer");
const router = express.Router();

// Route to get all plants
router.get("/", async (req, res) => {
  try {
    const plants = await Plant.find();
    res.status(200).send(plants);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to create a new plant
router.post("/", async (req, res) => {
  try {
    const plant = new Plant(req.body);
    await plant.save();
    res.status(201).send(plant);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route to find plants by manufacturer's name
router.get("/by-manufacturer", async (req, res) => {
  try {
    const manufacturerName = req.query.name;
    const manufacturer = await Manufacturer.findOne({ name: manufacturerName });

    if (!manufacturer) {
      return res.status(404).send({ message: "Manufacturer not found" });
    }

    const plants = await Plant.find({ manufacturer: manufacturer._id });
    res.status(200).send(plants);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
