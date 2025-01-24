const express = require("express");
const User = require("../models/user");
const authController = require("../controllers/authController");
const router = express.Router();

// http://localhost:4000/api/auth/register
// {
//     "name": "josip",
//     "email": "ceprnic.josip@gmail.com",
//     "password": "password123",
//     "isAdmin": false
// }
// Route to register a new user
router.post("/register", authController.register);


http://localhost:4000/api/auth/login
// {
//     "email": "ceprnic.josip@gmail.com",
//     "password": "password123"
// }
// Route to login a user
router.post("/login", authController.login);

module.exports = router;
