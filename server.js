const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
mongoose
  .connect(
    "mongodb+srv://dbSuly:mymongodb@cluster0.etfx4.azure.mongodb.net/dbSuly?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error(err));

// initialize express middleware for handling POST data
app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Load Routes
app.use("/api/people", require("./routes/api/people"));
app.use("/api/movies", require("./routes/api/movies"));

// Enable CORS (https://enable-cors.org/server.html)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from (* = anywhere, i.e. public API)
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Server static files
app.use(express.static("client"));

// Start the server
app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`)
);
