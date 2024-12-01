// models/airplanes.js
module.exports = (sequelize, DataTypes) => {
  const Airplane = sequelize.define("Airplane", {
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    manufacturer: DataTypes.STRING,
    seat_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Airplane.associate = function (models) {
    Airplane.belongsTo(models.Airline, { foreignKey: "airline_id" });
    Airplane.hasMany(models.Flight, { foreignKey: "airplane_id" });
  };

  return Airplane;
};
