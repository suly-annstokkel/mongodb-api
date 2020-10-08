const express = require("express");
const router = express.Router();

// Load our model
const Movie = require("../../models/Movie");

// Handle API routes
router.get("/", (req, res) => {
  Movie.find().then((results) => res.json(results));
});

// Retrieve movie by id
router.get("/:id", (req, res) => {
  Movie.findById(req.params.id).then((result) => res.json(result));
});

// Add movie
router.post("/", (req, res) => {
  let movie = new Movie({
    ...req.body,
  });

  movie
    .save()
    .then((newMovie) =>
      res.json({ status: "success", movie: newMovie })
    );
});

// Delete movie by id
router.delete("/:id", (req, res) => {
  Movie.findByIdAndRemove(req.params.id).then((result) =>
    res.json(result)
  );
});

module.exports = router;
