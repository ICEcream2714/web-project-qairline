// models/bookings.js
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define("Booking", {
    departure_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    return_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    booking_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Confirmed", "Cancelled", "Pending"),
      allowNull: false,
    },
    passengers: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // passengers_type: {
    //   type: DataTypes.ENUM("Adult", "Child", "Infant"),
    //   allowNull: false,
    // },
    // class: {
    //   type: DataTypes.ENUM("Economy", "Premium"),
    //   allowNull: false,
    // },
    total_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.ENUM("Pending", "Paid", "Failed"),
      defaultValue: "Pending",
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.ENUM(
        "Credit Card",
        "Debit Card",
        "Bank Transfer",
        "PayPal",
        "Cash"
      ),
      allowNull: false,
    },
  });

  Booking.associate = function (models) {
    // Các mối quan hệ (associations)
    Booking.belongsTo(models.Customer, { foreignKey: "customer_id" });
    Booking.belongsTo(models.Flight, { foreignKey: "flight_id" });
    Booking.belongsTo(models.Seat, { foreignKey: "seat_id" });
  };

  return Booking;
};
