const { Airplane } = require("../models");

exports.getAllAirplaneModels = async (req, res) => {
  try {
    const airplanes = await Airplane.findAll({
      attributes: ["model"],
    });
    res.status(200).json(airplanes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi hệ thống");
  }
};

exports.getAllAirplanes = async (req, res) => {
  try {
    const airplanes = await Airplane.findAll({
      attributes: ["id", "model", "manufacturer", "seat_count"],
    });
    res.status(200).json(airplanes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi hệ thống");
  }
};

exports.updateAirplane = async (req, res) => {
  try {
    const { id } = req.params;
    const { model, manufacturer, seat_count } = req.body;

    const airplane = await Airplane.findByPk(id);
    if (!airplane) {
      return res.status(404).send("Airplane not found");
    }

    airplane.model = model;
    airplane.manufacturer = manufacturer;
    airplane.seat_count = seat_count;

    await airplane.save();
    res.status(200).json(airplane);
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi hệ thống");
  }
};

exports.deleteAirplane = async (req, res) => {
  try {
    const { id } = req.params;
    const airplane = await Airplane.findByPk(id);
    if (!airplane) {
      return res.status(404).send("Airplane not found");
    }

    await airplane.destroy();
    res.status(200).send("Airplane deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi hệ thống");
  }
};

exports.addAirplane = async (req, res) => {
  try {
    const { model, manufacturer, seat_count } = req.body;

    const newAirplane = await Airplane.create({
      model,
      manufacturer,
      seat_count,
    });

    res.status(201).json(newAirplane);
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi hệ thống");
  }
};
