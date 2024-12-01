const mongoose = require("mongoose");
const User = require("../models/user");

mongoose
  .connect("mongodb://localhost:27017/PlantStore", {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

const users = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    password: "johndoe",
    isAdmin: false,
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    password: "janesmith",
    isAdmin: true,
  },
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    password: "alicejohnson",
    isAdmin: false,
  },
  {
    name: "Bob Brown",
    email: "bob.brown@example.com",
    password: "bobbrown",
    isAdmin: false,
  },
  {
    name: "Charlie Davis",
    email: "charlie.davis@example.com",
    password: "charliedavis",
    isAdmin: false,
  },
  {
    name: "Diana Evans",
    email: "diana.evans@example.com",
    password: "dianaevans",
    isAdmin: false,
  },
  {
    name: "Ethan Foster",
    email: "ethan.foster@example.com",
    password: "ethanfoster",
    isAdmin: false,
  },
  {
    name: "Fiona Green",
    email: "fiona.green@example.com",
    password: "fionagreen",
    isAdmin: true,
  },
  {
    name: "George Harris",
    email: "george.harris@example.com",
    password: "georgeharris",
    isAdmin: false,
  },
  {
    name: "Hannah White",
    email: "hannah.white@example.com",
    password: "hannahwhite",
    isAdmin: false,
  },
];

const seedUsers = async () => {
  try {
    await User.deleteMany();
    await User.insertMany(users);
    console.log("Users seeded successfully");
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedUsers();
