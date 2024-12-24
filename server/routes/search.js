const express = require("express");
const Plant = require("../models/plant");
const router = express.Router();

// Route to search plants by name
router.get("/", async (req, res) => {
  try {
    const name = req.query.name;
    const plants = await Plant.find({ name: new RegExp(name, "i") }).populate(
      "manufacturer",
      "name"
    );
    res.status(200).send(plants);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
