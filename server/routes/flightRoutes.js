const express = require("express");
const router = express.Router();
const flightController = require("../controllers/flightController");
const { verifyToken } = require("../middlewares/authMiddleware");
const { verifyAdmin } = require("../middlewares/adminMiddleware");

// Route to edit flight information
router.put("/:flightId", flightController.editFlight);
// http://localhost:5000/api/flights/{flightId}

// Route to get all flights information
router.get("/", flightController.getAllFlights);
//http://localhost:5000/api/flights/

// Route to delete a flight
router.delete("/:flightId", flightController.deleteFlight);
// http://localhost:5000/api/{flightId}

// Route to add a new flight
router.post("/", flightController.addFlight);

module.exports = router;
