// config/config.js
require("dotenv").config();

module.exports = {
  development: {
    dialect: "sqlite",
    storage: "./qairline.sqlite",
    logging: false,
  },
  test: {
    dialect: "sqlite",
    // storage: ":memory:",
    logging: false,
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "sqlite",
    storage: "./qairline.sqlite",
    logging: false,
  },
};
