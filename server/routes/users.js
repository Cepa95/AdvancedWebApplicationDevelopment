const express = require("express");
const Joi = require("joi");
const validationMiddleware = require("../middleware/validate");
const { verifyToken, isAdmin } = require("../middleware/auth");
const userController = require("../controllers/userController");
const router = express.Router();

// Route to get user profile
router.get("/profile", verifyToken, userController.getProfile);

// New route to get the count of admin and non-admin users
router.get("/stats", verifyToken, isAdmin, userController.getStats);

// Route to get all admin users
router.get("/admins", verifyToken, isAdmin, userController.getAdmins);

// Route to get all non-admin users
router.get("/non-admins", verifyToken, isAdmin, userController.getNonAdmins);

// Route to get all users with pagination
router.get("/", verifyToken, isAdmin, userController.getPaginatedUsers);

// Route to create a new user
router.post(
  "/",
  verifyToken,
  isAdmin,
  validationMiddleware.body({
    name: Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required(),
    isAdmin: Joi.boolean().required(),
  }),
  userController.createUser
);

// Route to get user info by ID
router.get(
  "/:id",
  verifyToken,
  isAdmin,
  validationMiddleware.params({
    id: Joi.string().trim().required(),
  }),
  userController.getUserById
);

// Route to update a user by ID, excluding the password
router.put("/:id", verifyToken, isAdmin, userController.updateUser);

// Route to delete a user by ID
router.delete(
  "/:id",
  validationMiddleware.params({
    id: Joi.string().trim().required(),
  }),
  verifyToken,
  isAdmin,
  userController.deleteUser
);

module.exports = router;
