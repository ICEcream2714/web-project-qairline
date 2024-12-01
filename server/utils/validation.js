const { User } = require("../models");
const { body, validationResult } = require("express-validator");

exports.validateRegister = [
  // Kiểm tra email hợp lệ
  body("email")
    .isEmail()
    .withMessage("Email không hợp lệ.")
    .normalizeEmail() // Kiểm tra email đã tồn tại chưa
    .custom(async (value) => {
      const user = await User.findOne({ where: { email: value } });
      if (user) {
        throw new Error("Email này đã được đăng ký trước đó.");
      }
    }),

  // Kiểm tra mật khẩu
  body("password")
    .isLength({ min: 6 })
    .withMessage("Mật khẩu phải có ít nhất 6 ký tự."),

  // Các trường của customer
  body("first_name").notEmpty().withMessage("Họ không được bỏ trống."),
  body("last_name").notEmpty().withMessage("Tên không được bỏ trống."),
  body("date_of_birth").isDate().withMessage("Ngày sinh không hợp lệ."),
  body("country_name")
    .notEmpty()
    .withMessage("Tên quốc gia không được bỏ trống."),
  body("country_code")
    .isLength({ min: 2, max: 3 })
    .withMessage("Mã quốc gia phải từ 2-3 ký tự."),

  // Xử lý các lỗi trên và trả về thông báo lỗi nếu có
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateLogin = [
  body("email").isEmail().withMessage("Email không hợp lệ.").normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Mật khẩu phải có ít nhất 6 ký tự."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
