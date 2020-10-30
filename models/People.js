const mongoose = require("mongoose");

// Create database Schemas
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: String,
  lastname: String,
  age: Number,
  hometown: String,
  //street: String,
  gender: String,
  movies: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
});

// Initialize and export the model
module.exports = Person = mongoose.model("Person", personSchema);
