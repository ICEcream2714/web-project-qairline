// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");

// Middleware xác thực token JWT
exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return res.status(403).json({ message: "Không có token." });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token không hợp lệ." });

    req.userId = decoded.id;
    req.role = decoded.role; // Lưu role vào req để kiểm tra trong các middleware khác
    next();
  });
};
