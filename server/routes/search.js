const express = require("express");
const searchController = require("../controllers/searchController");
const router = express.Router();

// Route to search plants by name and filter by price, manufacturer, and name
router.get("/", searchController.getPlantsByFiltering);

module.exports = router;
