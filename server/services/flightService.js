const { Flight, Airplane } = require("../models");

const calculateDuration = (departureTime, arrivalTime) => {
  const departure = new Date(departureTime);
  const arrival = new Date(arrivalTime);
  const durationMs = Math.abs(arrival - departure);
  const hours = Math.floor(durationMs / 36e5);
  const minutes = Math.round((durationMs % 36e5) / 60000);
  return `${hours}h ${minutes}m`;
};

exports.editFlight = async (
  flightId,
  flightNumber,
  origin,
  destination,
  departureTime,
  arrivalTime,
  status,
  airplaneModel
) => {
  try {
    const flight = await Flight.findByPk(flightId, {
      include: [
        {
          model: Airplane,
          attributes: ["model"],
        },
      ],
    });
    if (!flight) {
      return null;
    }

    flight.flight_number = flightNumber;
    flight.origin = origin;
    flight.destination = destination;
    flight.departure_time = departureTime;
    flight.arrival_time = arrivalTime;
    flight.duration = calculateDuration(departureTime, arrivalTime);
    flight.status = status;

    if (airplaneModel) {
      const airplane = await Airplane.findOne({
        where: { model: airplaneModel },
      });
      if (!airplane) {
        throw new Error("Airplane not found");
      }
      flight.airplane_id = airplane.id;
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
        "id",
        "flight_number",
        "origin",
        "destination",
        "departure_time",
        "arrival_time",
        "duration",
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
  status,
  airplaneModel
) => {
  try {
    // console.log("airplaneModel:", airplaneModel); // Debug log

    const airplane = await Airplane.findOne({
      where: { model: airplaneModel },
    });
    if (!airplane) {
      throw new Error("Airplane not found");
    }

    const duration = calculateDuration(departureTime, arrivalTime);

    const newFlight = await Flight.create({
      flight_number: flightNumber,
      origin,
      destination,
      departure_time: departureTime,
      arrival_time: arrivalTime,
      duration,
      status,
      airplane_id: airplane.id,
    });

    return newFlight;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
