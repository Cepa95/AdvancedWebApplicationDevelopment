const express = require("express");
const Joi = require("joi");
const User = require("../models/user");
const authController = require("../controllers/authController");
const validationMiddleware = require("../middleware/validate");
const router = express.Router();

// http://localhost:4000/api/auth/register
// {
//     "name": "josip",
//     "email": "ceprnic.josip@gmail.com",
//     "password": "password123",
//     "isAdmin": false
// }
// Route to register a new user
router.post(
  "/register",
  validationMiddleware.body({
    name: Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required(),
    isAdmin: Joi.boolean().optional(),
  }),
  authController.register
);

//localhost:4000/api/auth/login
// {
//     "email": "ceprnic.josip@gmail.com",
//     "password": "password123"
// }
// Route to login a user
router.post(
  "/login",
  validationMiddleware.body({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required(),
  }),
  authController.login
);

module.exports = router;
