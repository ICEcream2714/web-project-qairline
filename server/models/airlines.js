// models/airlines.js
module.exports = (sequelize, DataTypes) => {
  const Airline = sequelize.define("Airline", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country_code: {
      type: DataTypes.CHAR(3),
      allowNull: true, // Chưa bắt buộc nếu không có thông tin về mã quốc gia
    },
    motto: {
      type: DataTypes.TEXT,
      allowNull: true, // Không bắt buộc nếu không có thông tin về khẩu hiệu
    },
    establish_date: {
      type: DataTypes.DATE,
      allowNull: true, // Chưa bắt buộc nếu không có thông tin về ngày thành lập
    },
  });

  Airline.associate = function (models) {
    // Mối quan hệ với bảng Airplane
    Airline.hasMany(models.Airplane, { foreignKey: "airline_id" }); // Liên kết với bảng Airplane
  };

  return Airline;
};
