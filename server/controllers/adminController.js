// controllers/adminController.js
const adminService = require("../services/adminService");

// Đăng thông tin (Giới thiệu, khuyến mại, thông báo, tin tức, ...)
exports.createPost = async (req, res) => {
  const { title, content, postType, startDate, endDate } = req.body;
  const adminId = req.userId;

  try {
    const post = await adminService.createPost(
      title,
      content,
      postType,
      startDate,
      endDate,
      adminId
    );
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi hệ thống");
  }
};

// Nhập dữ liệu về máy bay
exports.addAirplane = async (req, res) => {
  const { model, manufacturer, seatCount, airlineId } = req.body;

  try {
    const airplane = await adminService.addAirplane(
      model,
      manufacturer,
      seatCount,
      airlineId
    );
    res.status(201).json(airplane);
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi hệ thống");
  }
};

// Nhập dữ liệu về chuyến bay
exports.addFlight = async (req, res) => {
  const {
    flightNumber,
    airplaneId,
    origin,
    destination,
    departureTime,
    arrivalTime,
  } = req.body;

  try {
    const flight = await adminService.addFlight(
      flightNumber,
      airplaneId,
      origin,
      destination,
      departureTime,
      arrivalTime
    );
    res.status(201).json(flight);
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi hệ thống");
  }
};

// Xem và thống kê đặt vé của khách hàng
exports.viewBookings = async (req, res) => {
  try {
    const bookings = await adminService.viewBookings();
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi hệ thống");
  }
};

// Thay đổi giờ khởi hành (delay) chuyến bay
exports.updateFlightStatus = async (req, res) => {
  const { flightId, newStatus } = req.body;

  try {
    const result = await adminService.updateFlightStatus(flightId, newStatus);
    if (!result)
      return res.status(400).send("Không thể cập nhật trạng thái chuyến bay.");
    res.status(200).send("Cập nhật trạng thái chuyến bay thành công.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi hệ thống");
  }
};
