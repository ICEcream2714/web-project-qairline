// controllers/customerController.js
const customerService = require("../services/customerService");

// Xem thông tin khách hàng
exports.viewProfile = async (req, res) => {
  try {
    const customer = await customerService.getCustomerByUserId(req.userId);
    if (!customer)
      return res.status(404).send("Không tìm thấy thông tin khách hàng.");
    res.status(200).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi hệ thống");
  }
};

// Tìm chuyến bay
exports.searchFlights = async (req, res) => {
  const { origin, destination, date } = req.query;

  try {
    const flights = await customerService.searchFlights(
      origin,
      destination,
      date
    );
    if (flights.length === 0)
      return res.status(404).send("Không tìm thấy chuyến bay phù hợp.");
    res.status(200).json(flights);
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi hệ thống");
  }
};

// Đặt vé
exports.bookFlight = async (req, res) => {
  const { flightId, seatId } = req.body;
  const customerId = req.userId; // Lấy customerId từ user đã đăng nhập

  try {
    const booking = await customerService.bookFlight(
      customerId,
      flightId,
      seatId
    );
    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi hệ thống");
  }
};

// Hủy vé
exports.cancelBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const cancelResult = await customerService.cancelBooking(bookingId);
    if (!cancelResult) return res.status(400).send("Không thể hủy vé");
    res.status(200).send("Hủy vé thành công");
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi hệ thống");
  }
};

// Theo dõi thông tin đặt vé
exports.trackBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await customerService.trackBooking(bookingId);
    if (!booking) return res.status(404).send("Không tìm thấy thông tin vé");
    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi hệ thống");
  }
};
