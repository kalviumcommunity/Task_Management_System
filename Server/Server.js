const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const router = require('./routes/routes');

const app = express();
const PORT = process.env.PORT || 3000;
const CLUSTER_LINK = process.env.CLUSTER_LINK;

app.use(express.json()); // Middleware to parse JSON bodies

console.log('PORT:', PORT);
console.log('CLUSTER_LINK:', CLUSTER_LINK);

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use('/auth', router);

mongoose
  .connect(CLUSTER_LINK)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
