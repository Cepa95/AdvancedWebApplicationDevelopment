const express = require("express");
const Manufacturer = require("../models/manufacturer");
const Plant = require("../models/plant");
const { verifyToken, isAdmin } = require("../middleware/auth");
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
router.post("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const manufacturer = new Manufacturer(req.body);
    await manufacturer.save();
    res.status(201).send(manufacturer);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/:id",verifyToken, isAdmin, async (req, res) => {
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

// Route to get a manufacturer by ID
router.get("/:id", async (req, res) => {
  try {
    const manufacturer = await Manufacturer.findById(req.params.id);
    if (!manufacturer) {
      return res.status(404).send({ message: "Manufacturer not found" });
    }
    res.status(200).send(manufacturer);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to delete a manufacturer by ID
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const products = await Plant.find({ manufacturer: req.params.id });
    if (products.length > 0) {
      return res.status(400).send({ message: "Cannot delete this manufacturer as it is referenced by one or more products" });
    }

    const manufacturer = await Manufacturer.findByIdAndDelete(req.params.id);
    if (!manufacturer) {
      return res.status(404).send({ message: "Manufacturer not found" });
    }
    res.status(200).send({ message: "Manufacturer deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
