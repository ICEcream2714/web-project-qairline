// models/bookings.js
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define("Booking", {
    departure_time: DataTypes.DATE,
    return_time: DataTypes.DATE,
    booking_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Confirmed", "Cancelled", "Pending"),
      allowNull: false,
    },
  });

  Booking.associate = function (models) {
    Booking.belongsTo(models.Customer, { foreignKey: "customer_id" });
    Booking.belongsTo(models.Flight, { foreignKey: "flight_id" });
    Booking.belongsTo(models.Seat, { foreignKey: "seat_id" });
  };

  return Booking;
};
