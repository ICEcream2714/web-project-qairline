// models/seats.js
module.exports = (sequelize, DataTypes) => {
  const Seat = sequelize.define("Seat", {
    seat_type: {
      type: DataTypes.ENUM("Economy", "Business", "First"),
    },
    seat_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  Seat.associate = function (models) {
    Seat.belongsTo(models.Flight, { foreignKey: "flight_id" });
    Seat.hasMany(models.Booking, { foreignKey: "seat_id" });
  };

  return Seat;
};
