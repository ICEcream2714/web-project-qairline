"use strict"; // Sử dụng chế độ strict mode để giúp kiểm soát lỗi hơn trong quá trình phát triển
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Tạo 5 users
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "customer1@example.com",
          password: await bcrypt.hash("Pass123@", 10),
          phone: "123456789",
          role: "customer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "customer2@example.com",
          password: await bcrypt.hash("Pass123@", 10),
          phone: "123456790",
          role: "customer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "customer3@example.com",
          password: await bcrypt.hash("Pass123@", 10),
          phone: "123456791",
          role: "customer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "customer4@example.com",
          password: await bcrypt.hash("Pass123@", 10),
          phone: "123456792",
          role: "customer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "customer5@example.com",
          password: await bcrypt.hash("Pass123@", 10),
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
        address: "123 Main St, Ha Noi",
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

    // Thêm dữ liệu vào bảng Airlines
    await queryInterface.bulkInsert("Airlines", [
      {
        name: "Vietnam Airlines",
        country_code: "VNM",
        motto: "Fly with us to explore the world",
        establish_date: new Date("1956-01-01"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "VietJet Air",
        country_code: "VIE",
        motto: "Make your dreams come true",
        establish_date: new Date("2007-12-30"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bamboo Airways",
        country_code: "BAM",
        motto: "Bamboo, your friendly airline",
        establish_date: new Date("2018-11-29"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Thêm dữ liệu vào bảng Airplanes
    await queryInterface.bulkInsert("Airplanes", [
      {
        model: "Boeing 787",
        manufacturer: "Boeing",
        seat_count: 300,
        airline_id: 1, // Vietnam Airlines
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        model: "Airbus A320",
        manufacturer: "Airbus",
        seat_count: 180,
        airline_id: 2, // VietJet Air
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        model: "Airbus A321",
        manufacturer: "Airbus",
        seat_count: 200,
        airline_id: 3, // Bamboo Airways
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        model: "Boeing 737",
        manufacturer: "Boeing",
        seat_count: 250,
        airline_id: 1, // Vietnam Airlines
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        model: "Embraer E195",
        manufacturer: "Embraer",
        seat_count: 120,
        airline_id: 2, // VietJet Air
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Thêm dữ liệu vào bảng Flights
    await queryInterface.bulkInsert("Flights", [
      {
        flight_number: "VN123",
        origin: "Ha Noi",
        destination: "Ho Chi Minh",
        departure_time: new Date("2024-12-10T10:00:00"),
        arrival_time: new Date("2024-12-10T12:00:00"),
        duration: "02:00:00",
        airplane_id: 1, // Boeing 787
        status: "Scheduled",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        flight_number: "VJ456",
        origin: "Ha Noi",
        destination: "Da Nang",
        departure_time: new Date("2024-12-10T14:00:00"),
        arrival_time: new Date("2024-12-10T15:30:00"),
        duration: "01:30:00",
        airplane_id: 2, // Airbus A320
        status: "Scheduled",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        flight_number: "BB789",
        origin: "Ho Chi Minh",
        destination: "Da Nang",
        departure_time: new Date("2024-12-11T09:00:00"),
        arrival_time: new Date("2024-12-11T10:30:00"),
        duration: "01:30:00",
        airplane_id: 3, // Airbus A321
        status: "Scheduled",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        flight_number: "VN987",
        origin: "Ha Noi",
        destination: "Ho Chi Minh",
        departure_time: new Date("2024-12-12T16:00:00"),
        arrival_time: new Date("2024-12-12T18:00:00"),
        duration: "02:00:00",
        airplane_id: 4, // Boeing 737
        status: "Scheduled",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        flight_number: "VJ654",
        origin: "Da Nang",
        destination: "Ha Noi",
        departure_time: new Date("2024-12-12T08:00:00"),
        arrival_time: new Date("2024-12-12T09:30:00"),
        duration: "01:30:00",
        airplane_id: 5, // Embraer E195
        status: "Scheduled",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        flight_number: "BB123",
        origin: "Ho Chi Minh",
        destination: "Ha Noi",
        departure_time: new Date("2024-12-16T10:00:00"),
        arrival_time: new Date("2024-12-16T12:00:00"),
        duration: "02:00:00",
        airplane_id: 1, // Boeing 787
        status: "Scheduled",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        flight_number: "VN124",
        origin: "Ha Noi",
        destination: "Ho Chi Minh",
        departure_time: new Date("2024-12-10T12:00:00"),
        arrival_time: new Date("2024-12-10T14:00:00"),
        duration: "02:00:00",
        airplane_id: 1, // Boeing 787
        status: "Scheduled",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Thêm dữ liệu vào bảng Seats
    await queryInterface.bulkInsert("Seats", [
      {
        seat_type: "economy",
        seat_number: "1A",
        flight_id: 1, // VN123
        is_available: true,
        price: 1000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seat_type: "economy",
        seat_number: "1B",
        flight_id: 1, // VN123
        is_available: true,
        price: 1000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seat_type: "economy",
        seat_number: "1C",
        flight_id: 2, // VJ456
        is_available: true,
        price: 1000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seat_type: "premium",
        seat_number: "1A",
        flight_id: 7, // VN123
        is_available: true,
        price: 2000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seat_type: "premium",
        seat_number: "1B",
        flight_id: 1, // VN123
        is_available: true,
        price: 2000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seat_type: "premium",
        seat_number: "1C",
        flight_id: 2, // VJ456
        is_available: true,
        price: 3000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seat_type: "economy",
        seat_number: "2A",
        flight_id: 3, // BB789
        is_available: true,
        price: 1500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seat_type: "economy",
        seat_number: "2B",
        flight_id: 7, // BB789
        is_available: true,
        price: 1500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seat_type: "economy",
        seat_number: "2C",
        flight_id: 3, // BB789
        is_available: true,
        price: 1500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seat_type: "economy",
        seat_number: "2D",
        flight_id: 3, // BB789
        is_available: true,
        price: 1500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seat_type: "premium",
        seat_number: "2B",
        flight_id: 7, // VN987
        is_available: false,
        price: 2500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seat_type: "premium",
        seat_number: "2D",
        flight_id: 4, // VN987
        is_available: true,
        price: 2500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seat_type: "premium",
        seat_number: "2E",
        flight_id: 4, // VN987
        is_available: true,
        price: 2500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seat_type: "premium",
        seat_number: "2F",
        flight_id: 4, // VN987
        is_available: true,
        price: 2500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seat_type: "premium",
        seat_number: "2C",
        flight_id: 5, // VJ654
        is_available: true,
        price: 3500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seat_type: "economy",
        seat_number: "3A",
        flight_id: 5, // VJ654
        is_available: true,
        price: 3500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seat_type: "economy",
        seat_number: "3B",
        flight_id: 5, // VJ654
        is_available: true,
        price: 3500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seat_type: "economy",
        seat_number: "3C",
        flight_id: 5, // VJ654
        is_available: true,
        price: 3500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seat_type: "economy",
        seat_number: "3D",
        flight_id: 5, // VJ654
        is_available: true,
        price: 3500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seat_type: "economy",
        seat_number: "4A",
        flight_id: 6, // Flight ID 6
        is_available: true,
        price: 4000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seat_type: "economy",
        seat_number: "4B",
        flight_id: 6, // Flight ID 6
        is_available: true,
        price: 4000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seat_type: "economy",
        seat_number: "4C",
        flight_id: 7,
        is_available: true,
        price: 4000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seat_type: "premium",
        seat_number: "1A",
        flight_id: 6, // Flight ID 6
        is_available: true,
        price: 6000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seat_type: "premium",
        seat_number: "1B",
        flight_id: 6, // Flight ID 6
        is_available: true,
        price: 6000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Thêm dữ liệu vào bảng Bookings
    await queryInterface.bulkInsert("Bookings", [
      {
        customer_id: 1,
        outbound_flight_id: 1,
        return_flight_id: 2,
        departure_time: new Date("2024-12-10T10:00:00Z"),
        return_time: new Date("2024-12-20T10:00:00Z"),
        booking_date: new Date(),
        status: "Confirmed",
        passengers: 1,
        total_price: 5000,
        payment_status: "Paid",
        payment_method: "Credit Card",
        cardholder_name: "John Doe",
        card_number: "4111111111111111",
        expiry_date: "12/25",
        cvv: "123",
        outbound_seat_id: 1,
        return_seat_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Xóa Customer và User
    await queryInterface.bulkDelete("Customers", null, {});
    await queryInterface.bulkDelete("Users", null, {});

    // Xóa dữ liệu trong bảng Seats
    await queryInterface.bulkDelete("Seats", null, {});

    // Xóa dữ liệu trong bảng Flights
    await queryInterface.bulkDelete("Flights", null, {});

    // Xóa dữ liệu trong bảng Airplanes
    await queryInterface.bulkDelete("Airplanes", null, {});

    // Xóa dữ liệu trong bảng Airlines
    await queryInterface.bulkDelete("Airlines", null, {});

    // Xóa dữ liệu trong bảng Bookings
    await queryInterface.bulkDelete("Bookings", null, {});
  },
};
