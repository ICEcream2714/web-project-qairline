// models/admins.js
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define("Admin", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false, // Khóa ngoại không được null
    },
    permissions: DataTypes.TEXT,
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Admin.associate = function (models) {
    // Admin liên kết với User thông qua user_id
    Admin.belongsTo(models.User, { foreignKey: "user_id" });
    Admin.hasMany(models.Post, { foreignKey: "admin_id" });
  };

  return Admin;
};
