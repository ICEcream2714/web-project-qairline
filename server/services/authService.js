// services/authService.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Customer } = require("../models");

exports.registerUser = async (
  email,
  password,
  phone,
  first_name,
  last_name,
  middle_name,
  date_of_birth,
  address,
  country_name,
  country_code,
  gender
) => {
  // Mã hóa mật khẩu trước khi lưu vào DB
  const hashedPassword = await bcrypt.hash(password, 10);

  // Tạo user mới
  const user = await User.create({
    email,
    password: hashedPassword,
    role: "customer",
    phone,
  });

  // Tạo bản ghi trong bảng Customer liên kết với user vừa tạo
  const newCustomer = await Customer.create({
    user_id: newUser.id, // Liên kết với User qua user_id
    first_name,
    middle_name,
    last_name,
    date_of_birth,
    address,
    country_name,
    country_code,
    gender,
  });

  // Tạo JWT token
  const token = jwt.sign(
    { id: newUser.id, role: newUser.role },
    process.env.JWT_SECRET,
    { expiresIn: "12h" }
  );

  return user;
};

exports.loginUser = async (email, password) => {
  // Tìm user theo email
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Người dùng không tồn tại.");

  // Kiểm tra mật khẩu
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Mật khẩu sai.");

  // Tạo token JWT
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "12h",
    }
  );

  return token;
};
