const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.addToCart = async (req, res) => {
  try {
    const { plantId } = req.body;
    const userId = req.userId; // Get userId from the token

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const cartItem = user.cart.find(
      (item) => item.plantId.toString() === plantId
    );

    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      user.cart.push({ plantId, quantity: 1 });
    }

    await user.save();
    res.status(200).send(user.cart);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.removeCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { plantId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    user.cart = user.cart.filter((item) => item.plantId.toString() !== plantId);

    await user.save();
    res.status(200).send(user.cart);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate("cart.plantId");

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(user.cart);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.clearCart = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    user.cart = [];
    await user.save();
    res.status(200).send(user.cart);
  } catch (error) {
    res.status(500).send(error);
  }
};
