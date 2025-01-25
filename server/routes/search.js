const express = require("express");
const Joi = require("joi");
const validationMiddleware = require("../middleware/validate");
const searchController = require("../controllers/searchController");
const router = express.Router();

// Route to search plants by name and filter by price, manufacturer, and name
router.get(
  "/",
  validationMiddleware.params({
    name: Joi.string().trim().optional(),
    sortField: Joi.string().valid("name", "price", "manufacturer").optional(),
    sortOrder: Joi.string().valid("asc", "desc").optional(),
  }),

  searchController.getPlantsByFiltering
);

module.exports = router;
