const Plant = require("../models/plant");
const User = require("../models/user");
const Manufacturer = require("../models/manufacturer");

exports.getPlants = async (req, res) => {
  try {
    const plants = await Plant.find();
    res.status(200).send(plants);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createPlant = async (req, res) => {
  try {
    const plant = new Plant(req.body);
    await plant.save();
    res.status(201).send(plant);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getByManufacturer = async (req, res) => {
  try {
    const manufacturerName = req.query.name;
    const manufacturer = await Manufacturer.findOne({ name: manufacturerName });

    if (!manufacturer) {
      return res.status(404).send({ message: "Manufacturer not found" });
    }

    const plants = await Plant.find({ manufacturer: manufacturer._id });
    res.status(200).send(plants);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getSortedByManufacturer = async (req, res) => {
  try {
    const plants = await Plant.find().populate("manufacturer");
    plants.sort((a, b) =>
      a.manufacturer.name.localeCompare(b.manufacturer.name)
    );
    res.status(200).send(plants);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getPlantById = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id).populate("manufacturer");
    if (!plant) {
      return res.status(404).send({ message: "Plant not found" });
    }
    res.status(200).send(plant);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.updatePlant = async (req, res) => {
  try {
    const plant = await Plant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!plant) {
      return res.status(404).send({ message: "Plant not found" });
    }
    res.status(200).send(plant);
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.deletePlant = async (req, res) => {
  try {
    const plant = await Plant.findByIdAndDelete(req.params.id);
    if (!plant) {
      return res.status(404).send({ message: "Plant not found" });
    }
    res.status(200).send({ message: "Plant deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
