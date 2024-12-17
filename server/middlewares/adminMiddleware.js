// middlewares/adminMiddleware.js

// Middleware kiểm tra quyền quản trị viên
exports.verifyAdmin = (req, res, next) => {
  if (req.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Chỉ quản trị viên mới có quyền này." });
  }
  next();
};
