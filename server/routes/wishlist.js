const express = require("express");
const { verifyToken } = require("../middleware/auth");
const wishlistController = require("../controllers/wishlistController");
const router = express.Router();

// Route to get the wishlist
router.get("/", verifyToken, wishlistController.getWishlist);

// Route to add a product to the wishlist
router.post("/", verifyToken, wishlistController.addProduct);

// Route to remove a product from the wishlist
router.delete("/:plantId", verifyToken, wishlistController.deleteProduct);

module.exports = router;
