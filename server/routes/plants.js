const express = require("express");
const { verifyToken, isAdmin } = require("../middleware/auth");
const plantController = require("../controllers/plantController");
const router = express.Router();

// Route to get all plants
router.get("/", plantController.getPlants);

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
router.post("/", verifyToken, isAdmin, plantController.createPlant);

// http://localhost:4000/api/plants/by-manufacturer?name=Green Thumb Co.
// Route to find plants by manufacturer's name
router.get("/by-manufacturer", verifyToken, plantController.getByManufacturer);

// Route to get all plants sorted alphabetically by manufacturer
router.get("/sorted-by-manufacturer", plantController.getSortedByManufacturer);

// Route to get a plant by ID
router.get("/:id", plantController.getPlantById);

// Route to update a plant by ID
router.put("/:id", verifyToken, isAdmin, plantController.updatePlant);

// Route to delete a plant by ID
router.delete("/:id", verifyToken, isAdmin, plantController.deletePlant);

module.exports = router;
