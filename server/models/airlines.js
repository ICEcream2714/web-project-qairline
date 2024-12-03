// models/airlines.js
module.exports = (sequelize, DataTypes) => {
  const Airline = sequelize.define("Airline", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country_code: DataTypes.CHAR(3),
    motto: DataTypes.TEXT,
    establish_date: DataTypes.DATE,
  });

  Airline.associate = function (models) {
    Airline.hasMany(models.Airplane, { foreignKey: "airline_id" });
  };

  return Airline;
};
