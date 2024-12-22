const express = require("express");
const User = require("../models/user");
const { verifyToken, isAdmin } = require("../middleware/auth");
const router = express.Router();

// Route to get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to create a new user
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route to get user info by ID
router.get("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("wishlist.plantId")
      .populate("cart.plantId");
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
