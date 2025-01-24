const express = require("express");
const settingsController = require("../controllers/settingsController");
const { verifyToken, isAdmin } = require("../middleware/auth");
const router = express.Router();

// Route to change password
router.put("/change-password", verifyToken, settingsController.changePassword);

// Route to update user information
router.put("/update-profile", verifyToken, settingsController.updateProfile);

// Route to change any user's password by admin
router.put(
  "/admin/change-password/:id",
  verifyToken,
  isAdmin,
  settingsController.changePasswordByAdmin
);

module.exports = router;
