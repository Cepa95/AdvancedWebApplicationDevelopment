const express = require("express");
const Joi = require("joi");
const validationMiddleware = require("../middleware/validate");
const { verifyToken } = require("../middleware/auth");
const wishlistController = require("../controllers/wishlistController");
const router = express.Router();

// Route to get the wishlist
router.get("/", verifyToken, wishlistController.getWishlist);

// Route to add a product to the wishlist
router.post(
  "/",
  verifyToken,
  validationMiddleware.body({
    plantId: Joi.string().trim().required(),
  }),
  wishlistController.addProduct
);

// Route to remove a product from the wishlist
router.delete(
  "/:plantId",
  verifyToken,
  validationMiddleware.params({
    plantId: Joi.string().trim().required(),
  }),
  wishlistController.deleteProduct
);

module.exports = router;
