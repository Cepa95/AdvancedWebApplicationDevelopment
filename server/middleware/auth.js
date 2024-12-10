const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const secret = process.env.SECRET;

// Function to generate a JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, name: user.name, isAdmin: user.isAdmin },
    secret,
    {
      expiresIn: "100d",
    }
  );
};

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).send({ message: "No token provided." });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7, authHeader.length)
    : authHeader;

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({ message: "Failed to authenticate token." });
    }
    req.userId = decoded.id;
    req.isAdmin = decoded.isAdmin;
    next();
  });
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  if (!req.isAdmin) {
    return res.status(403).send({ message: "Require Admin Role!" });
  }
  next();
};

module.exports = {
  generateToken,
  verifyToken,
  isAdmin,
};
