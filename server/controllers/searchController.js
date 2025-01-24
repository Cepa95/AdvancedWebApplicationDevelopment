const Plant = require("../models/plant");

exports.getPlantsByFiltering = async (req, res) => {
  try {
    const name = req.query.name || "";
    const sortField = req.query.sortField || "name";
    const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;

    const plants = await Plant.find({ name: new RegExp(name, "i") })
      .populate("manufacturer", "name")
      .sort({ [sortField]: sortOrder });

    res.status(200).send(plants);
  } catch (error) {
    res.status(500).send(error);
  }
};
