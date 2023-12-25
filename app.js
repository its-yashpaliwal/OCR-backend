// app.js
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const cors = require('cors');
const Tesseract = require('tesseract.js');

const app = express();
app.use(cors());
const connectToMongo = require('./db');
const routes = require('./routes');


// const User = require('./models/userSchema');

// Middlewares
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB
connectToMongo();

// Routes
app.use('/', routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
