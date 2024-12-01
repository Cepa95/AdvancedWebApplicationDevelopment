const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const plantRoutes = require('./routes/plants');
const manufacturerRoutes = require('./routes/manufacturers');

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/PlantStore', {
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Create a base router for /api
const apiRouter = express.Router();
app.use('/api', apiRouter);

// Use the routes
apiRouter.use('/users', userRoutes);
apiRouter.use('/plants', plantRoutes);
apiRouter.use('/manufacturers', manufacturerRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});