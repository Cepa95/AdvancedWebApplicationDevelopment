const User = require("../models/user");

exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate({
      path: "wishlist.plantId",
      populate: {
        path: "manufacturer",
        model: "Manufacturer",
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(user.wishlist);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { plantId } = req.body;
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.wishlist.some((item) => item.plantId.toString() === plantId)) {
      return res.status(400).send({ message: "Product already in wishlist" });
    }

    user.wishlist.push({ plantId });
    await user.save();
    res.status(200).send(user.wishlist);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { plantId } = req.params;
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    user.wishlist = user.wishlist.filter(
      (item) => item.plantId.toString() !== plantId
    );
    await user.save();
    res.status(200).send(user.wishlist);
  } catch (error) {
    res.status(500).send(error);
  }
};
