const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { verifyToken, isAdmin } = require("../middleware/auth");
const router = express.Router();

// Route to change password
router.put("/change-password", verifyToken, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Old password is incorrect" });
    }

    // user.password = await bcrypt.hash(newPassword, 10); // radin salt vec u schemi
    user.password = newPassword;
    await user.save();

    res.send({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to update user information
router.put("/update-profile", verifyToken, async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== req.userId) {
      return res.status(400).send({ message: "Email is already in use" });
    }

    user.name = name;
    user.email = email;
    await user.save();

    res.status(200).send({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).send({ message: "Error updating profile", error });
  }
});

// Route to change any user's password by admin
router.put(
  "/admin/change-password/:id",
  verifyToken,
  isAdmin,
  async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).send({ message: "Old password is incorrect" });
      }

      user.password = newPassword;
      await user.save();

      res.send({ message: "Password changed successfully" });
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

module.exports = router;
