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

module.exports = router;
