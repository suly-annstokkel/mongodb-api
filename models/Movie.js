const mongoose = require("mongoose");

// Create database Schemas
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: String,
  year: Number,
});

// Initialize and export the model
module.exports = Movie = mongoose.model("Movie", movieSchema);
