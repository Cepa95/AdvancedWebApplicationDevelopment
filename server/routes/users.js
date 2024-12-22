const express = require("express");
const User = require("../models/user");
const { verifyToken, isAdmin } = require("../middleware/auth");
const router = express.Router();

// Route to get all users with pagination
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10; // Default limit is 10
  const skip = (page - 1) * limit;

  try {
    const users = await User.find().skip(skip).limit(limit);
    const totalUsers = await User.countDocuments();
    res.status(200).send({ users, totalUsers });
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

// Route to update a user by ID, excluding the password
router.put("/:id", verifyToken, isAdmin, async (req, res) => {
  const allowedUpdates = ["name", "email", "isAdmin"];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route to delete a user by ID
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
