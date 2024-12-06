"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    // Tạo 5 users
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "customer1@example.com",
          password: await bcrypt.hash("password123", 10),
          phone: "123456789",
          role: "customer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "customer2@example.com",
          password: await bcrypt.hash("password123", 10),
          phone: "123456790",
          role: "customer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "customer3@example.com",
          password: await bcrypt.hash("password123", 10),
          phone: "123456791",
          role: "customer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "customer4@example.com",
          password: await bcrypt.hash("password123", 10),
          phone: "123456792",
          role: "customer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "customer5@example.com",
          password: await bcrypt.hash("password123", 10),
          phone: "123456793",
          role: "customer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    // Query the inserted users to get their IDs
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM Users WHERE email IN ('customer1@example.com', 'customer2@example.com', 'customer3@example.com', 'customer4@example.com', 'customer5@example.com');`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Tạo 5 bản ghi Customer tương ứng với 5 user_id
    await queryInterface.bulkInsert("Customers", [
      {
        user_id: users[0].id, // Liên kết với user_id của User 1
        first_name: "John",
        middle_name: "A.",
        last_name: "Doe",
        date_of_birth: "1990-01-01",
        address: "123 Main St, Hanoi",
        country_name: "Vietnam",
        country_code: 84,
        title: "Mr.",
        gender: "male",
        promo_code: "PROMO123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: users[1].id, // Liên kết với user_id của User 2
        first_name: "Jane",
        middle_name: "B.",
        last_name: "Smith",
        date_of_birth: "1989-02-15",
        address: "456 Main St, Ho Chi Minh City",
        country_name: "Vietnam",
        country_code: 84,
        title: "Ms.",
        gender: "female",
        promo_code: "PROMO456",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: users[2].id, // Liên kết với user_id của User 3
        first_name: "Alice",
        middle_name: "C.",
        last_name: "Johnson",
        date_of_birth: "1992-03-20",
        address: "789 Main St, Da Nang",
        country_name: "Vietnam",
        country_code: 84,
        title: "Mrs.",
        gender: "female",
        promo_code: "PROMO789",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: users[3].id, // Liên kết với user_id của User 4
        first_name: "Bob",
        middle_name: "D.",
        last_name: "Brown",
        date_of_birth: "1985-11-05",
        address: "101 Main St, Hue",
        country_name: "Vietnam",
        country_code: 84,
        title: "Mr.",
        gender: "male",
        promo_code: "PROMO101",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: users[4].id, // Liên kết với user_id của User 5
        first_name: "Charlie",
        middle_name: "E.",
        last_name: "Davis",
        date_of_birth: "1995-07-25",
        address: "202 Main St, Hai Phong",
        country_name: "Vietnam",
        country_code: 84,
        title: "Mr.",
        gender: "male",
        promo_code: "PROMO202",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Xóa Customer và User
    await queryInterface.bulkDelete("Customers", null, {});
    await queryInterface.bulkDelete("Users", null, {});
  },
};
