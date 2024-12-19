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
