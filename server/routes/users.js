const express = require("express");
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
router.post("/", userController.createUser);

// Route to get user info by ID
router.get("/:id", verifyToken, isAdmin, userController.getUserById);

// Route to update a user by ID, excluding the password
router.put("/:id", verifyToken, isAdmin, userController.updateUser);

// Route to delete a user by ID
router.delete("/:id", verifyToken, isAdmin, userController.deleteUser);

module.exports = router;
