const Manufacturer = require("../models/manufacturer");
const Plant = require("../models/plant");

exports.getManufacturers = async (req, res) => {
  try {
    const manufacturers = await Manufacturer.find();
    res.status(200).send(manufacturers);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateManufacturer = async (req, res) => {
  try {
    const manufacturer = await Manufacturer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!manufacturer) {
      return res.status(404).send();
    }
    res.send(manufacturer);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.createManufacturer = async (req, res) => {
  try {
    const manufacturer = new Manufacturer(req.body);
    await manufacturer.save();
    res.status(201).send(manufacturer);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getManufacturersById = async (req, res) => {
  try {
    const manufacturer = await Manufacturer.findById(req.params.id);
    if (!manufacturer) {
      return res.status(404).send({ message: "Manufacturer not found" });
    }
    res.status(200).send(manufacturer);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteManufacturer = async (req, res) => {
  try {
    const products = await Plant.find({ manufacturer: req.params.id });
    if (products.length > 0) {
      return res.status(400).send({
        message:
          "Cannot delete this manufacturer as it is referenced by one or more products",
      });
    }

    const manufacturer = await Manufacturer.findByIdAndDelete(req.params.id);
    if (!manufacturer) {
      return res.status(404).send({ message: "Manufacturer not found" });
    }
    res.status(200).send({ message: "Manufacturer deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.clearCart = async (req, res) => {};
