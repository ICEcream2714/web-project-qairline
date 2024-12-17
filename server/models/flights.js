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
    duration: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Scheduled", "Delayed", "Cancelled"),
      allowNull: true,
    },
  });

  Flight.associate = function (models) {
    // Mối quan hệ (associations)
    Flight.belongsTo(models.Airplane, { foreignKey: "airplane_id" }); // Liên kết với bảng Airplane
    Flight.hasMany(models.Booking, { foreignKey: "flight_id" }); // Một flight có nhiều booking
    Flight.hasMany(models.Seat, { foreignKey: "flight_id" }); // Một flight có nhiều seat
  };

  return Flight;
};
