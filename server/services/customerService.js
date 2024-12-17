// services/customerService.js
const { Op } = require("sequelize");
const { Flight, Booking, Seat, Customer } = require("../models");

// Lấy thông tin khách hàng từ userId
exports.getCustomerByUserId = async (userId) => {
  return await Customer.findOne({
    where: { userId },
    attributes: { exclude: ["password"] },
  });
};

// Tìm chuyến bay
// exports.searchFlights = async (origin, destination, date) => {
//   return await Flight.findAll({
//     where: {
//       origin,
//       destination,
//       departureTime: {
//         [Op.gte]: date, // Tìm chuyến bay khởi hành từ ngày date trở đi bằng Op.gte (greater than or equal)
//       },
//     },
//     include: [Seat], // Bao gồm thông tin về ghế
//   });
// };

// Đặt vé
// exports.bookFlight = async (customerId, flightId, seatId) => {
//   // Kiểm tra xem ghế có còn trống không
//   const seat = await Seat.findByPk(seatId);
//   if (!seat || !seat.isAvailable) throw new Error("Ghế không còn trống.");

//   // Tạo đặt vé
//   const booking = await Booking.create({
//     customerId,
//     flightId,
//     seatId,
//     status: "Confirmed",
//     bookingDate: new Date(),
//   });

//   // Đánh dấu ghế đã được đặt
//   seat.isAvailable = false;
//   await seat.save();

//   return booking;
// };

// Hủy vé
exports.cancelBooking = async (bookingId) => {
  try {
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      return false;
    }
    booking.status = "Cancelled";
    await booking.save();
    return true;
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return false;
  }
};

// Theo dõi thông tin vé đã đặt
exports.trackBooking = async (bookingId) => {
  return await Booking.findByPk(bookingId, { include: [Flight, Seat] });
};
