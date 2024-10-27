const express = require("express");
const { Sequelize } = require("sequelize");

const app = express();
const port = 5000;

// Initialize SQLite connection via Sequelize
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

// Middleware to parse JSON requests
app.use(express.json());

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello from QAirline Backend");
});

// Start the server
app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);
  try {
    await sequelize.authenticate();
    console.log("Connection to SQLite has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
