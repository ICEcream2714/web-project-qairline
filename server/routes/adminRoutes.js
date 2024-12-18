// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { verifyToken } = require("../middlewares/authMiddleware");
const { verifyAdmin } = require("../middlewares/adminMiddleware");

// Đăng thông tin (Giới thiệu, khuyến mãi, thông báo, tin tức,...)
router.post("/post", verifyToken, verifyAdmin, adminController.createPost);

// Thêm máy bay
router.post("/airplane", verifyToken, verifyAdmin, adminController.addAirplane);

// Thêm chuyến bay
router.post("/flight", adminController.addFlight);

// Xem và thống kê các đặt vé
router.get("/bookings", verifyToken, verifyAdmin, adminController.viewBookings);

// Cập nhật trạng thái chuyến bay (delay)
router.put(
  "/flight/:flightId/status",
  verifyToken,
  verifyAdmin,
  adminController.updateFlightStatus
);

// Update seat count of an airplane
router.put(
  "/airplane/seatCount",
  verifyToken,
  verifyAdmin,
  adminController.updateSeatCount
);

module.exports = router;
