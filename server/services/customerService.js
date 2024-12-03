// services/customerService.js
const { Flight, Booking, Seat, Customer } = require("../models");

// Lấy thông tin khách hàng từ userId
exports.getCustomerByUserId = async (userId) => {
  return await Customer.findOne({
    where: { userId },
    attributes: { exclude: ["password"] },
  });
};

// Tìm chuyến bay
exports.searchFlights = async (origin, destination, date) => {
  return await Flight.findAll({
    where: {
      origin,
      destination,
      departureTime: {
        [Op.gte]: date, // Tìm chuyến bay khởi hành từ ngày hiện tại trở đi
      },
    },
    include: [Seat], // Bao gồm thông tin về ghế
  });
};

// Đặt vé
exports.bookFlight = async (customerId, flightId, seatId) => {
  // Kiểm tra xem ghế có còn trống không
  const seat = await Seat.findByPk(seatId);
  if (!seat || !seat.isAvailable) throw new Error("Ghế không còn trống.");

  // Tạo đặt vé
  const booking = await Booking.create({
    customerId,
    flightId,
    seatId,
    status: "Confirmed",
    bookingDate: new Date(),
  });

  // Đánh dấu ghế đã được đặt
  seat.isAvailable = false;
  await seat.save();

  return booking;
};

// Hủy vé
exports.cancelBooking = async (bookingId) => {
  const booking = await Booking.findByPk(bookingId);
  if (!booking) throw new Error("Không tìm thấy vé để hủy.");

  // Chỉ cho phép hủy nếu vé còn trong trạng thái 'Confirmed'
  if (booking.status !== "Confirmed") throw new Error("Vé không thể hủy.");

  booking.status = "Cancelled";
  await booking.save();

  // Đánh dấu ghế là có sẵn lại
  const seat = await Seat.findByPk(booking.seatId);
  seat.isAvailable = true;
  await seat.save();

  return booking;
};

// Theo dõi thông tin vé đã đặt
exports.trackBooking = async (bookingId) => {
  return await Booking.findByPk(bookingId, { include: [Flight, Seat] });
};
