// models/airplanes.js
module.exports = (sequelize, DataTypes) => {
  const Airplane = sequelize.define("Airplane", {
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: true, // manufacturer có thể null nếu không có thông tin
    },
    seat_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Airplane.associate = function (models) {
    // Mối quan hệ với bảng Airline
    Airplane.belongsTo(models.Airline, {
      foreignKey: "airline_id",
      allowNull: false,
    }); // Liên kết với bảng Airline

    // Mối quan hệ với bảng Flight
    Airplane.hasMany(models.Flight, { foreignKey: "airplane_id" }); // Liên kết với bảng Flight
  };

  return Airplane;
};
