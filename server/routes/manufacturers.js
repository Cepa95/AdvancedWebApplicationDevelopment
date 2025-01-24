const express = require("express");
const Joi = require("joi");
const validationMiddleware = require("../middleware/validate");
const { verifyToken, isAdmin } = require("../middleware/auth");
const manufacturerController = require("../controllers/manufacturerController");
const router = express.Router();

// Route to get all manufacturers
router.get("/", manufacturerController.getManufacturers);

// Route to create a new manufacturer
router.post(
  "/",
  verifyToken,
  isAdmin,
  validationMiddleware.body({
    name: Joi.string().trim().required(),
    location: Joi.string().trim().required(),
    contactInfo: Joi.string().trim().required(),
    establishedYear: Joi.number().integer().required(),
  }),
  manufacturerController.createManufacturer
);

router.put(
  "/:id",
  verifyToken,
  isAdmin,
  validationMiddleware.params({
    id: Joi.string().trim().required(),
  }),
  validationMiddleware.body({
    name: Joi.string().trim().optional(),
    location: Joi.string().trim().optional(),
    contactInfo: Joi.string().trim().optional(),
    establishedYear: Joi.number().integer().optional(),
  }),
  manufacturerController.updateManufacturer
);

// Route to get a manufacturer by ID
router.get(
  "/:id",
  validationMiddleware.params({
    id: Joi.string().trim().required(),
  }),
  manufacturerController.getManufacturersById
);

// Route to delete a manufacturer by ID
router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  manufacturerController.deleteManufacturer
);

module.exports = router;
