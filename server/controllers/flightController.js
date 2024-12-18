const flightService = require("../services/flightService");

// Edit flight information
exports.editFlight = async (req, res) => {
  const { flightId } = req.params;
  const {
    flightNumber,
    origin,
    destination,
    departureTime,
    arrivalTime,
    status,
    airplaneId,
  } = req.body;

  try {
    const updatedFlight = await flightService.editFlight(
      flightId,
      flightNumber,
      origin,
      destination,
      departureTime,
      arrivalTime,
      status,
      airplaneId
    );
    if (!updatedFlight) {
      return res.status(404).send("Flight not found.");
    }
    res.status(200).json(updatedFlight);
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi hệ thống");
  }
};

// Get all flights information
exports.getAllFlights = async (req, res) => {
  try {
    const flights = await flightService.getAllFlights();
    res.status(200).json(flights);
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi hệ thống");
  }
};

// Delete a flight
exports.deleteFlight = async (req, res) => {
  const { flightId } = req.params;

  try {
    const result = await flightService.deleteFlight(flightId);
    if (!result) {
      return res.status(404).send("Flight not found.");
    }
    res.status(200).send("Flight deleted successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi hệ thống");
  }
};

// Add a new flight
exports.addFlight = async (req, res) => {
  const {
    flightNumber,
    origin,
    destination,
    departureTime,
    arrivalTime,
    duration,
    status,
    airplaneId,
  } = req.body;

  try {
    const newFlight = await flightService.addFlight(
      flightNumber,
      origin,
      destination,
      departureTime,
      arrivalTime,
      duration,
      status,
      airplaneId
    );
    res.status(201).json(newFlight);
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi hệ thống");
  }
};
