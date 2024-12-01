// models/customers.js
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define("Customer", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false, // Khóa ngoại không được null
      // references: {
      //   model: "Users", // Tên bảng 'Users' trong DB
      //   key: "id",
      // },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middle_name: DataTypes.STRING,
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("male", "female", "other"),
    },
    promo_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Customer.associate = function (models) {
    // Customer liên kết với User thông qua user_id
    Customer.belongsTo(models.User, { foreignKey: "user_id", targetKey: "id" });
    Customer.hasMany(models.Booking, { foreignKey: "customer_id" });
  };

  return Customer;
};
