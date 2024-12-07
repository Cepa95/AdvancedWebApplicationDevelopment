const express = require("express");
const Plant = require("../models/plant");
const Manufacturer = require("../models/manufacturer");
const { verifyToken, isAdmin } = require("../middleware/auth");
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

// http://localhost:4000/api/plants
// {
//   "name": "Rose",
//   "type": "Flower",
//   "image": "http://rose.com/rose.jpg",
//   "description": "A beautiful red rose",
//   "price": 10,
//   "manufacturer": "674cbe31c2747438e89f4668"
// }
// Route to create a new plant
router.post("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const plant = new Plant(req.body);
    await plant.save();
    res.status(201).send(plant);
  } catch (error) {
    res.status(400).send(error);
  }
});

// http://localhost:4000/api/plants/by-manufacturer?name=Green Thumb Co.
// Route to find plants by manufacturer's name
router.get("/by-manufacturer", verifyToken, async (req, res) => {
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
