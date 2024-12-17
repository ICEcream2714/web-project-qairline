const bcrypt = require("bcrypt");
const { User, Admin } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash("admin", 10);

    // Create a user with admin role
    const user = await User.create({
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Create an admin associated with the user
    await Admin.create({
      user_id: user.id,
      username: "admin",
      password: hashedPassword, // In a real application, store the hashed password
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await Admin.destroy({ where: { username: "admin" } });
    await User.destroy({ where: { email: "admin@example.com" } });
  },
};
