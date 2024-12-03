// models/flights.js
module.exports = (sequelize, DataTypes) => {
  const Flight = sequelize.define("Flight", {
    flight_number: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departure_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    arrival_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Scheduled", "Delayed", "Cancelled"),
      allowNull: true,
    },
  });

  Flight.associate = function (models) {
    Flight.belongsTo(models.Airplane, { foreignKey: "airplane_id" });
    Flight.hasMany(models.Booking, { foreignKey: "flight_id" });
    Flight.hasMany(models.Seat, { foreignKey: "flight_id" });
  };

  return Flight;
};
