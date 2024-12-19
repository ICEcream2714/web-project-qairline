const express = require("express");
const router = express.Router();
const airplaneController = require("../controllers/airplaneController");

// Route to get all airplane models
router.get("/models", airplaneController.getAllAirplaneModels);

// Route to get all airplane information
router.get("/", airplaneController.getAllAirplanes);

// Route to add a new airplane
router.post("/", airplaneController.addAirplane);

// Route to update airplane information
router.put("/:id", airplaneController.updateAirplane);

// Route to delete an airplane
router.delete("/:id", airplaneController.deleteAirplane);

module.exports = router;
