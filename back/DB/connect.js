require("dotenv").config();
const mongoose = require("mongoose");
const CONNECT_URI = process.env.MONGO_URI;
const connectDB = mongoose.connect(CONNECT_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connectDB;
