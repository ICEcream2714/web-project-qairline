const express = require("express");
const router = express.Router();
const airplaneController = require("../controllers/airplaneController");

// Route to get all airplane models
router.get("/models", airplaneController.getAllAirplaneModels);

module.exports = router;
