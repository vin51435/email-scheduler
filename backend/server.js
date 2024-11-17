const express = require('express');
require("dotenv").config();
// const mongoose = require('mongoose');
const app = require('./src/app');
const agenda = require('./src/services/agenda');

// mongoose.connect(process.env.MONGODB_URI, {})
//   .then(() => {
//     console.log('Connected to MongoDB');
//   }).catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
//   });


const PORT = process.env.PORT || 3002;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await agenda.start();
});
