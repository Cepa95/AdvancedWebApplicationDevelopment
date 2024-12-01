const mongoose = require("mongoose");
const Manufacturer = require("../models/manufacturer");

mongoose
  .connect("mongodb://localhost:27017/PlantStore", {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

const manufacturers = [
  {
    name: "Plant Manufacturer Inc.",
    location: "New York",
    contactInfo: "contact@plantmanufacturer.com",
    establishedYear: 1990,
  },
  {
    name: "Green Thumb Co.",
    location: "San Francisco",
    contactInfo: "info@greenthumbco.com",
    establishedYear: 1985,
  },
  {
    name: "Nature's Best",
    location: "Chicago",
    contactInfo: "support@naturesbest.com",
    establishedYear: 2000,
  },
  {
    name: "Eco Plants Ltd.",
    location: "Austin",
    contactInfo: "contact@ecoplants.com",
    establishedYear: 2010,
  },
  {
    name: "Urban Jungle",
    location: "Seattle",
    contactInfo: "hello@urbanjungle.com",
    establishedYear: 1995,
  },
];

const seedManufacturers = async () => {
  try {
    await Manufacturer.deleteMany();
    await Manufacturer.insertMany(manufacturers);
    console.log("Manufacturers seeded successfully");
  } catch (error) {
    console.error("Error seeding manufacturers:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedManufacturers();
