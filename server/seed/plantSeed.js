const mongoose = require("mongoose");
const Plant = require("../models/plant");

mongoose
  .connect("mongodb://localhost:27017/PlantStore", {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

const plants = [
  {
    name: "Blue Flower 1",
    type: "Flower",
    image:
      "https://img.freepik.com/premium-photo/free-hd-pictures-blue-flowers_961875-356379.jpg",
    description: "A beautiful blue flower.",
    price: 10.99,
    manufacturer: "677fe2430fab97ed25d9fed6",
  },
  {
    name: "Blue Flower 2",
    type: "Flower",
    image:
      "https://img.freepik.com/premium-photo/free-hd-pictures-blue-flowers_961875-356379.jpg",
    description: "A beautiful blue flower.",
    price: 12.99,
    manufacturer: "677fe2430fab97ed25d9fed6",
  },
  {
    name: "Blue Flower 3",
    type: "Flower",
    image:
      "https://img.freepik.com/premium-photo/free-hd-pictures-blue-flowers_961875-356379.jpg",
    description: "A beautiful blue flower.",
    price: 14.99,
    manufacturer: "677fe2430fab97ed25d9fed6",
  },
  {
    name: "Blue Flower 4",
    type: "Flower",
    image:
      "https://img.freepik.com/premium-photo/free-hd-pictures-blue-flowers_961875-356379.jpg",
    description: "A beautiful blue flower.",
    price: 16.99,
    manufacturer: "677fe2430fab97ed25d9fed6",
  },
  {
    name: "Blue Flower 5",
    type: "Flower",
    image:
      "https://img.freepik.com/premium-photo/free-hd-pictures-blue-flowers_961875-356379.jpg",
    description: "A beautiful blue flower.",
    price: 18.99,
    manufacturer: "677fe2430fab97ed25d9fed6",
  },
  {
    name: "Blue Flower 6",
    type: "Flower",
    image:
      "https://img.freepik.com/premium-photo/free-hd-pictures-blue-flowers_961875-356379.jpg",
    description: "A beautiful blue flower.",
    price: 20.99,
    manufacturer: "677fe2430fab97ed25d9fed6",
  },
  {
    name: "Blue Flower 7",
    type: "Flower",
    image:
      "https://img.freepik.com/premium-photo/free-hd-pictures-blue-flowers_961875-356379.jpg",
    description: "A beautiful blue flower.",
    price: 22.99,
    manufacturer: "677fe2430fab97ed25d9fed6",
  },
  {
    name: "Blue Flower 8",
    type: "Flower",
    image:
      "https://img.freepik.com/premium-photo/free-hd-pictures-blue-flowers_961875-356379.jpg",
    description: "A beautiful blue flower.",
    price: 24.99,
    manufacturer: "677fe2430fab97ed25d9fed6",
  },
  {
    name: "Blue Flower 9",
    type: "Flower",
    image:
      "https://img.freepik.com/premium-photo/free-hd-pictures-blue-flowers_961875-356379.jpg",
    description: "A beautiful blue flower.",
    price: 26.99,
    manufacturer: "677fe2430fab97ed25d9fed6",
  },
  {
    name: "Blue Flower 10",
    type: "Flower",
    image:
      "https://img.freepik.com/premium-photo/free-hd-pictures-blue-flowers_961875-356379.jpg",
    description: "A beautiful blue flower.",
    price: 28.99,
    manufacturer: "677fe2430fab97ed25d9fed6",
  },
];

const seedPlants = async () => {
  try {
    await Plant.deleteMany();
    await Plant.insertMany(plants);
    console.log("Plants seeded successfully");
  } catch (error) {
    console.error("Error seeding plants:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedPlants();
