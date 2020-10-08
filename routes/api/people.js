const express = require("express");
const router = express.Router();

// Load our model
const Person = require("../../models/People");

// Handle API routes
router.get("/", (req, res) => {
  Person.find()
    .populate("movies")
    .then((results) => res.json(results));
});

// Retrieve person by id
router.get("/:id", (req, res) => {
  Person.findById(req.params.id)
    .populate("movies")
    .then((result) => res.json(result));
});

// Add person
router.post("/", (req, res) => {
  let person = new Person({
    ...req.body,
  });

  person
    .save()
    .then((newPerson) =>
      res.json({ status: "success", person: newPerson })
    );
});

router.put("/:id", (req, res) => {
  Person.findByIdAndUpdate(req.params.id, {
    ...req.body,
  }).then((result) => res.json(result));
});

// Delete person by id
router.delete("/:id", (req, res) => {
  Person.findByIdAndRemove(req.params.id).then((result) =>
    res.json(result)
  );
});

module.exports = router;
