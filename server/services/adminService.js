// services/adminService.js
const { Post, Airplane, Flight, Booking } = require("../models");

// Tạo bài đăng (Giới thiệu, khuyến mãi, thông báo, tin tức)
exports.createPost = async (
  title,
  content,
  postType,
  startDate,
  endDate,
  adminId
) => {
  return await Post.create({
    title,
    content,
    postType,
    startDate,
    endDate,
    adminId,
  });
};

// Thêm thông tin máy bay
exports.addAirplane = async (model, manufacturer, seatCount, airlineId) => {
  return await Airplane.create({
    model,
    manufacturer,
    seatCount,
    airlineId,
  });
};

// Thêm chuyến bay
exports.addFlight = async (
  flightNumber,
  airplaneId,
  origin,
  destination,
  departureTime,
  arrivalTime
) => {
  return await Flight.create({
    flightNumber,
    airplaneId,
    origin,
    destination,
    departureTime,
    arrivalTime,
    status: "Scheduled",
  });
};

// Xem và thống kê các đặt vé của khách hàng
exports.viewBookings = async () => {
  return await Booking.findAll({
    include: [Customer, Flight, Seat],
  });
};

// Cập nhật trạng thái chuyến bay (thay đổi giờ khởi hành)
exports.updateFlightStatus = async (flightId, newStatus) => {
  const flight = await Flight.findByPk(flightId);
  if (!flight) throw new Error("Chuyến bay không tồn tại.");

  flight.status = newStatus;
  await flight.save();
  return flight;
};
