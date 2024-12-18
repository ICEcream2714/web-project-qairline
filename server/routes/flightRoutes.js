const express = require("express");
const router = express.Router();
const flightController = require("../controllers/flightController");
const { verifyToken } = require("../middlewares/authMiddleware");
const { verifyAdmin } = require("../middlewares/adminMiddleware");

// Route to edit flight information
router.put("edit/:flightId", flightController.editFlight);
// http://localhost:5000/api/flights/edit/{flightId}

// Route to get all flights information
router.get("get/", flightController.getAllFlights);
//http://localhost:5000/api/flights/get/

// Route to delete a flight
router.delete("delete/:flightId", flightController.deleteFlight);
// http://localhost:5000/api/flights/delete/{flightId}

// Route to add a new flight
router.post("add/", flightController.addFlight);

module.exports = router;
