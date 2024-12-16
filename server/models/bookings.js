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
    cardholder_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    card_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    expiry_date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cvv: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    outbound_seat_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    return_seat_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  Booking.associate = function (models) {
    // Các mối quan hệ (associations)
    Booking.belongsTo(models.Customer, { foreignKey: "customer_id" });
    Booking.belongsTo(models.Flight, {
      foreignKey: "outbound_flight_id",
      as: "outboundFlight",
    });
    Booking.belongsTo(models.Flight, {
      foreignKey: "return_flight_id",
      as: "returnFlight",
      allowNull: true,
    });
    Booking.belongsTo(models.Seat, {
      foreignKey: "outbound_seat_id",
      as: "outboundSeat",
    });
    Booking.belongsTo(models.Seat, {
      foreignKey: "return_seat_id",
      as: "returnSeat",
    });
    Booking.hasMany(models.Passenger, { foreignKey: "booking_id" });
  };

  return Booking;
};
