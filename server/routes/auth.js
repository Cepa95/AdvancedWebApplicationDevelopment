const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../middleware/auth");
const router = express.Router();

// http://localhost:4000/api/auth/register
// {
//     "name": "josip",
//     "email": "ceprnic.josip@gmail.com",
//     "password": "password123",
//     "isAdmin": false
// }
// Route to register a new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send({ message: "Email already exists" });
    }
    const user = new User({
        name,
        email,
        password,
        isAdmin: false // u slucaju da pokusaju priko postmana ili slicno
    });
    await user.save();
    const token = generateToken(user);
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});


http://localhost:4000/api/auth/login
// {
//     "email": "ceprnic.josip@gmail.com",
//     "password": "password123"
// }
// Route to login a user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid password" });
    }

    const token = generateToken(user);
    res.send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
