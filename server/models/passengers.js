module.exports = (sequelize, DataTypes) => {
  const Passenger = sequelize.define("Passenger", {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Passenger.associate = function (models) {
    // Các mối quan hệ (associations)
    Passenger.belongsTo(models.Booking, { foreignKey: "booking_id" });
  };

  return Passenger;
};
