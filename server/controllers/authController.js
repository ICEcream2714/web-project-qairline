// controllers/authController.js
const authService = require("../services/authService");
const { User, Customer } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  // Lấy tất cả các thông tin cần thiết từ body của yêu cầu
  const {
    email,
    title,
    password,
    phone,
    first_name,
    middle_name,
    last_name,
    date_of_birth,
    address,
    country_name,
    country_code,
    gender,
    promo_code,
  } = req.body;

  try {
    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email này đã được đăng ký." });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới trong bảng User
    const newUser = await User.create({
      email,
      password: hashedPassword,
      phone,
      role: "customer", // Tự động gán vai trò là customer
    });

    // Tạo bản ghi trong bảng Customer liên kết với user vừa tạo
    const newCustomer = await Customer.create({
      user_id: newUser.id, // Liên kết với User qua user_id
      title,
      first_name,
      middle_name,
      last_name,
      date_of_birth,
      address,
      country_name,
      country_code,
      gender,
      promo_code,
    });

    // Tạo JWT token
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Trả về phản hồi đăng ký thành công
    res.status(201).json({
      message: "Đăng ký thành công",
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
      customer: {
        id: newCustomer.id,
        first_name: newCustomer.first_name,
        last_name: newCustomer.last_name,
        address: newCustomer.address,
        country_name: newCustomer.country_name,
        title: newCustomer.title,
        country_code: newCustomer.country_code,
        date_of_birth: newCustomer.date_of_birth,
      },
    });
  } catch (error) {
    console.error("Lỗi đăng ký:", error.message);
    res.status(500).json({ message: `Lỗi: ${error.message}` });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Gọi service để đăng nhập người dùng
    const token = await authService.loginUser(email, password);

    res.status(200).json({
      message: "Đăng nhập thành công",
      token: token,
    });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error.message);
    res.status(401).json({ message: error.message });
  }
};
