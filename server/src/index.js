const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const port = 5000;

// Middleware to handle JSON requests
app.use(express.json());

// Connect to SQLite database
let db = new sqlite3.Database("./qairline.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the SQLite database.");
});

// Basic endpoint
app.get("/", (req, res) => {
  res.send("Welcome to QAirline Backend");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
