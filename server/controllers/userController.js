const User = require("../models/user");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("name email");

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: "Error fetching user profile", error });
  }
};

exports.getStats = async (req, res) => {
  try {
    const adminCount = await User.countDocuments({ isAdmin: true });
    const nonAdminCount = await User.countDocuments({ isAdmin: false });

    res.status(200).send({ adminCount, nonAdminCount });
  } catch (error) {
    res.status(500).send({ message: "Error fetching admin stats", error });
  }
};

exports.getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ isAdmin: true }).select("name email");
    res.status(200).send(admins);
  } catch (error) {
    res.status(500).send({ message: "Error fetching admin users", error });
  }
};

exports.getNonAdmins = async (req, res) => {
  try {
    const nonAdmins = await User.find({ isAdmin: false }).select("name email");
    res.status(200).send(nonAdmins);
  } catch (error) {
    res.status(500).send({ message: "Error fetching non-admin users", error });
  }
};

exports.getPaginatedUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10; // Default limit is 10
  const skip = (page - 1) * limit;

  try {
    const users = await User.find().skip(skip).limit(limit);
    const totalUsers = await User.countDocuments();
    res.status(200).send({ users, totalUsers });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("wishlist.plantId")
      .populate("cart.plantId");
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateUser = async (req, res) => {
  const allowedUpdates = ["name", "email", "isAdmin"];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
