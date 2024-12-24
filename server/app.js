const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/users");
const plantRoutes = require("./routes/plants");
const manufacturerRoutes = require("./routes/manufacturers");
const authRoutes = require("./routes/auth");
const settingsRoutes = require("./routes/settings");
const cartRoutes = require("./routes/cart");
const wishlistRoutes = require("./routes/wishlist")
const searchRoutes = require("./routes/search")
require("dotenv").config();

const app = express();
const port = 4000;

// Middleware to parse JSON
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/PlantStore", {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Create a base router for /api
const apiRouter = express.Router();
app.use("/api", apiRouter);

// Use the routes
apiRouter.use("/users", userRoutes);
apiRouter.use("/plants", plantRoutes);
apiRouter.use("/manufacturers", manufacturerRoutes);
apiRouter.use("/auth", authRoutes);
apiRouter.use("/settings", settingsRoutes);
apiRouter.use("/cart", cartRoutes);
apiRouter.use("/wishlist", wishlistRoutes);
apiRouter.use("/search", searchRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
