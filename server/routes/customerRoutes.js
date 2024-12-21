// routes/customerRoutes.js
const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const { verifyToken } = require("../middlewares/authMiddleware");

// Xem thông tin khách hàng
router.get("/profile", verifyToken, customerController.viewProfile);

// Tìm chuyến bay
router.get("/search-flights", customerController.searchFlights);

// Đặt vé
router.post("/book", verifyToken, customerController.bookFlight);

// Hủy vé
router.put("/cancel/:bookingId", verifyToken, customerController.cancelBooking);

// Theo dõi thông tin vé đã đặt
router.get("/booking/:bookingId", verifyToken, customerController.trackBooking);

// Lấy thông tin đặt vé
router.get(
  "/booking-details/:bookingId",
  verifyToken,
  customerController.getBookingDetails
);

// Lấy tất cả thông tin đặt vé
router.get("/bookings", customerController.getAllBookings);

// Lấy tất cả thông tin của khách hàng đã đăng nhập
router.get("/my-info", verifyToken, customerController.getLoggedInCustomerInfo);

// Cập nhật thông tin khách hàng
router.put("/update-profile", verifyToken, customerController.updateProfile);

// Lấy tất cả thông tin đặt vé của người dùng
router.get("/my-bookings", verifyToken, customerController.getUserBookings);

module.exports = router;
