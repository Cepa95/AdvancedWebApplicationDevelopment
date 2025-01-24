const express = require("express");
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
  manufacturerController.createManufacturer
);

router.put(
  "/:id",
  verifyToken,
  isAdmin,
  manufacturerController.updateManufacturer
);

// Route to get a manufacturer by ID
router.get("/:id", manufacturerController.getManufacturersById);

// Route to delete a manufacturer by ID
router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  manufacturerController.deleteManufacturer
);

module.exports = router;
