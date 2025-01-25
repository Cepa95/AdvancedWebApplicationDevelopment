const express = require("express");
const Joi = require("joi");
const validationMiddleware = require("../middleware/validate");
const settingsController = require("../controllers/settingsController");
const { verifyToken, isAdmin } = require("../middleware/auth");
const router = express.Router();

// Route to change password
router.put(
  "/change-password",
  verifyToken,
  validationMiddleware.body({
    oldPassword: Joi.string().trim().required(),
    newPassword: Joi.string().trim().required(),
  }),
  settingsController.changePassword
);

// Route to update user information
router.put(
  "/update-profile",
  verifyToken,
  validationMiddleware.body({
    name: Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),
  }),
  settingsController.updateProfile
);

// Route to change any user's password by admin
router.put(
  "/admin/change-password/:id",
  verifyToken,
  isAdmin,
  validationMiddleware.body({
    oldPassword: Joi.string().trim().required(),
    newPassword: Joi.string().trim().required(),
  }),
  settingsController.changePasswordByAdmin
);

module.exports = router;
