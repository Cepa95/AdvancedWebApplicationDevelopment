const express = require("express");
const User = require("../models/user");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();

// Route to add a product to the cart
router.post("/add-to-cart", verifyToken, async (req, res) => {
  try {
    const { plantId } = req.body;
    const userId = req.userId; // Get userId from the token

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const cartItem = user.cart.find(
      (item) => item.plantId.toString() === plantId
    );

    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      user.cart.push({ plantId, quantity: 1 });
    }

    await user.save();
    res.status(200).send(user.cart);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to get cart items
router.get("/", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate("cart.plantId");

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(user.cart);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to remove a product from the cart
router.delete("/remove-from-cart/:plantId", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const { plantId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    user.cart = user.cart.filter((item) => item.plantId.toString() !== plantId);

    await user.save();
    res.status(200).send(user.cart);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
