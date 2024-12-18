const { Flight, Airplane } = require("../models");

exports.editFlight = async (
  flightId,
  flightNumber,
  origin,
  destination,
  departureTime,
  arrivalTime,
  status,
  airplaneId
) => {
  try {
    const flight = await Flight.findByPk(flightId);
    if (!flight) {
      return null;
    }

    flight.flight_number = flightNumber;
    flight.origin = origin;
    flight.destination = destination;
    flight.departure_time = departureTime;
    flight.arrival_time = arrivalTime;
    flight.status = status;

    if (airplaneId) {
      const airplane = await Airplane.findByPk(airplaneId);
      if (!airplane) {
        throw new Error("Airplane not found");
      }
      flight.airplane_id = airplaneId;
    }

    await flight.save();
    return flight;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.getAllFlights = async () => {
  try {
    const flights = await Flight.findAll({
      include: [
        {
          model: Airplane,
          attributes: ["model", "manufacturer"],
        },
      ],
      attributes: [
        "flight_number",
        "origin",
        "destination",
        "departure_time",
        "arrival_time",
        "status",
      ],
    });
    return flights;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.deleteFlight = async (flightId) => {
  try {
    const flight = await Flight.findByPk(flightId);
    if (!flight) {
      return null;
    }

    await flight.destroy();
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.addFlight = async (
  flightNumber,
  origin,
  destination,
  departureTime,
  arrivalTime,
  duration,
  status,
  airplaneId
) => {
  try {
    const airplane = await Airplane.findByPk(airplaneId);
    if (!airplane) {
      throw new Error("Airplane not found");
    }

    const newFlight = await Flight.create({
      flight_number: flightNumber,
      origin,
      destination,
      departure_time: departureTime,
      arrival_time: arrivalTime,
      duration,
      status,
      airplane_id: airplaneId,
    });

    return newFlight;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
