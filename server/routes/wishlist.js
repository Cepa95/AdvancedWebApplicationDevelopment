const express = require("express");
const User = require("../models/user");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();



// Route to get the wishlist
router.get("/", verifyToken, async (req, res) => {
    try {
      const userId = req.userId;
      const user = await User.findById(userId).populate("wishlist.plantId");
  
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
  
      res.status(200).send(user.wishlist);
    } catch (error) {
      res.status(500).send(error);
    }
  });

// Route to add a product to the wishlist
router.post("/", verifyToken, async (req, res) => {
  try {
    const { plantId } = req.body;
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.wishlist.some(item => item.plantId.toString() === plantId)) {
      return res.status(400).send({ message: "Product already in wishlist" });
    }

    user.wishlist.push({ plantId });
    await user.save();
    res.status(200).send(user.wishlist);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to remove a product from the wishlist
router.delete("/:plantId", verifyToken, async (req, res) => {
  try {
    const { plantId } = req.params;
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    user.wishlist = user.wishlist.filter(item => item.plantId.toString() !== plantId);
    await user.save();
    res.status(200).send(user.wishlist);
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;