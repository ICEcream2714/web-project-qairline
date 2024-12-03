// config/database.js
const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./qairline.sqlite", // Đường dẫn tới file SQLite
  logging: false, // Tắt log query trong console (tùy chọn)
});

module.exports = sequelize;
