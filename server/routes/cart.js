const express = require("express");
const Joi = require("joi");
const validationMiddleware = require("../middleware/validate");
const { verifyToken } = require("../middleware/auth");
const cartController = require("../controllers/cartController");
const router = express.Router();

// Route to add a product to the cart
router.post(
  "/add-to-cart",
  verifyToken,
  validationMiddleware.body({
    plantId: Joi.string().trim().required(),
  }),
  cartController.addToCart
);

// Route to get cart items
router.get("/", verifyToken, cartController.getCart);

// Route to remove a product from the cart
router.delete(
  "/remove-from-cart/:plantId",
  verifyToken,
  cartController.removeCart
);

// Route to remove all items from the cart
router.delete("/clear-cart", verifyToken, cartController.clearCart);

module.exports = router;
