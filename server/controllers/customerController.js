const { Op } = require("sequelize");
const {
  Flight,
  Seat,
  Booking,
  Passenger,
  Airplane,
  User,
  Customer,
} = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

// controllers/customerController.js
const customerService = require("../services/customerService");

// Xem thông tin khách hàng
exports.viewProfile = async (req, res) => {
  try {
    const customer = await customerService.getCustomerByUserId(req.userId);
    if (!customer)
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin khách hàng." });
    res.status(200).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// Tìm chuyến bay
exports.searchFlights = async (req, res) => {
  try {
    // Lấy các thông số tìm kiếm từ query params
    const { origin, destination, departure_date, return_date, seat_type } =
      req.query;

    // Điều kiện tìm kiếm
    const whereConditions = {};

    // Tìm kiếm theo địa điểm khởi hành và đích đến
    if (origin) {
      whereConditions.origin = origin;
    }
    if (destination) {
      whereConditions.destination = destination;
    }

    // Tìm kiếm theo ngày khởi hành (Chuyến đi)
    if (departure_date) {
      whereConditions.departure_time = {
        [Op.gte]: new Date(departure_date), // Ngày khởi hành lớn hơn hoặc bằng ngày nhập
      };
    }

    // Tìm kiếm chuyến bay khứ hồi (nếu có)
    let returnFlightsWhere = {};
    if (return_date) {
      // Điều kiện cho chuyến bay khứ hồi: Ngày khởi hành của chuyến bay khứ hồi phải lớn hơn hoặc bằng ngày khởi hành chuyến đi
      returnFlightsWhere = {
        departure_time: {
          [Op.gte]: new Date(return_date), // Ngày khởi hành khứ hồi phải >= ngày khởi hành chuyến đi
        },
        origin: destination, // Địa điểm khởi hành của chuyến bay khứ hồi là điểm đến của chuyến đi
        destination: origin, // Địa điểm đến của chuyến bay khứ hồi là điểm xuất phát của chuyến đi
      };
    }

    // Tìm kiếm theo loại ghế
    if (seat_type) {
      // Kiểm tra trong bảng Seats xem loại ghế có tồn tại
      const seats = await Seat.findAll({
        where: { seat_type },
      });

      const availableFlightIds = seats.map((seat) => seat.flight_id);

      // Cập nhật điều kiện tìm kiếm theo các chuyến bay có loại ghế yêu cầu
      whereConditions.id = { [Op.in]: availableFlightIds };
    }

    // Tìm kiếm các chuyến bay đi thỏa mãn điều kiện
    const flights = await Flight.findAll({
      where: whereConditions,
      include: [
        {
          model: Seat,
          attributes: [
            "id",
            "seat_type",
            "seat_number",
            "is_available",
            "price",
          ],
        },
        {
          model: Airplane,
          attributes: ["model", "manufacturer"],
        },
      ],
    });

    // Tìm kiếm các chuyến bay khứ hồi thỏa mãn điều kiện
    const returnFlights = await Flight.findAll({
      where: returnFlightsWhere,
      include: [
        {
          model: Seat,
          attributes: [
            "id",
            "seat_type",
            "seat_number",
            "is_available",
            "price",
          ],
        },
        {
          model: Airplane,
          attributes: ["model", "manufacturer"],
        },
      ],
    });

    if (flights.length === 0 && returnFlights.length === 0) {
      return res.status(404).json({
        message: "No flights found",
      });
    } else {
      // Lọc ra các chuyến bay có ghế trống
      flights.forEach((flight) => {
        flight.Seats = flight.Seats.filter((seat) => seat.is_available);
        flight.type = "outgoing"; // Đánh dấu chuyến bay đi
      });

      returnFlights.forEach((flight) => {
        flight.Seats = flight.Seats.filter((seat) => seat.is_available);
        flight.type = "return"; // Đánh dấu chuyến bay khứ hồi
      });
    }

    // Trả về kết quả tìm kiếm (bao gồm cả chuyến đi và khứ hồi)
    res.status(200).json({
      message: "Flights found",
      flights: return_date
        ? { outgoing: flights, return: returnFlights }
        : flights,
    });
  } catch (error) {
    console.error("Error searching flights:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Đặt vé
exports.bookFlight = async (req, res) => {
  const {
    totalPrice,
    outboundFlight,
    returnFlight,
    passengerDetails,
    paymentDetails,
  } = req.body;
  const userId = req.userId; // Changed from customerId to userId for clarity

  console.log("User ID:", userId);

  // Validate inputs
  if (!totalPrice || !outboundFlight || !passengerDetails || !paymentDetails) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Changed from findByPk to findOne with where clause
    const customer = await Customer.findOne({
      where: { user_id: userId },
    });
    console.log("Customer:", customer);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Verify that the outbound flight exists
    const outboundFlightRecord = await Flight.findByPk(outboundFlight.id);
    if (!outboundFlightRecord) {
      return res.status(404).json({ message: "Outbound flight not found" });
    }

    // Verify that the return flight exists (if provided)
    let returnFlightRecord = null;
    if (returnFlight) {
      returnFlightRecord = await Flight.findByPk(returnFlight.id);
      if (!returnFlightRecord) {
        return res.status(404).json({ message: "Return flight not found" });
      }
    }

    const booking = await Booking.create({
      customer_id: customer.id, // Changed from userId to customer.id
      outbound_flight_id: outboundFlight.id,
      return_flight_id: returnFlight ? returnFlight.id : null,
      departure_time: outboundFlight.departure_time,
      return_time: returnFlight ? returnFlight.departure_time : null,
      booking_date: new Date(),
      status: "Confirmed",
      passengers: 1, // Assuming 1 passenger for simplicity
      total_price: totalPrice,
      payment_status: "Paid",
      payment_method: paymentDetails.paymentMethod,
      cardholder_name: paymentDetails.cardholderName,
      card_number: paymentDetails.cardNumber,
      expiry_date: paymentDetails.expiryDate,
      cvv: paymentDetails.cvv,
      outbound_seat_id: outboundFlight.seat_id,
      return_seat_id: returnFlight ? returnFlight.seat_id : null,
    });

    await Passenger.create({
      booking_id: booking.id,
      first_name: passengerDetails.firstName,
      last_name: passengerDetails.lastName,
      email: passengerDetails.email,
      phone: passengerDetails.phone,
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
};

// Hủy vé
exports.cancelBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const cancelResult = await customerService.cancelBooking(bookingId);
    if (!cancelResult)
      return res.status(400).json({ message: "Không thể hủy vé" });
    res.status(200).json({ message: "Hủy vé thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// Theo dõi thông tin đặt vé
exports.trackBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await customerService.trackBooking(bookingId);
    if (!booking)
      return res.status(404).json({ message: "Không tìm thấy thông tin vé" });
    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// Lấy thông tin đặt vé
exports.getBookingDetails = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findOne({
      where: { id: bookingId },
      include: [
        {
          model: Passenger,
          attributes: ["first_name", "last_name", "email", "phone"],
        },
        {
          model: Flight,
          as: "outboundFlight",
          attributes: [
            "origin",
            "destination",
            "departure_time",
            "arrival_time",
            "status",
          ],
        },
        {
          model: Flight,
          as: "returnFlight",
          attributes: [
            "origin",
            "destination",
            "departure_time",
            "arrival_time",
            "status",
          ],
        },
        {
          model: Seat,
          as: "outboundSeat",
          attributes: ["seat_number", "seat_type"],
        },
        {
          model: Seat,
          as: "returnSeat",
          attributes: ["seat_number", "seat_type"],
        },
      ],
    });

    if (!booking) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin đặt vé" });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error("Error fetching booking details:", error);
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
};

// Lấy tất cả thông tin đặt vé
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        {
          model: Passenger,
          attributes: ["first_name", "last_name", "email", "phone"],
        },
        {
          model: Flight,
          as: "outboundFlight",
          attributes: [
            "origin",
            "destination",
            "departure_time",
            "arrival_time",
            "status",
          ],
        },
        {
          model: Flight,
          as: "returnFlight",
          attributes: [
            "origin",
            "destination",
            "departure_time",
            "arrival_time",
            "status",
          ],
        },
        {
          model: Seat,
          as: "outboundSeat",
          attributes: ["seat_number", "seat_type"],
        },
        {
          model: Seat,
          as: "returnSeat",
          attributes: ["seat_number", "seat_type"],
        },
      ],
    });

    if (!bookings.length) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin đặt vé" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching all booking details:", error);
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
};

// Lấy tất cả thông tin đặt vé của người dùng
exports.getUserBookings = async (req, res) => {
  try {
    // First, find the customer using user_id
    const customer = await Customer.findOne({
      where: { user_id: req.userId },
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Then find bookings using customer_id
    const bookings = await Booking.findAll({
      where: { customer_id: customer.id }, // Use customer.id instead of req.userId
      include: [
        {
          model: Passenger,
          attributes: ["first_name", "last_name", "email", "phone"],
        },
        {
          model: Flight,
          as: "outboundFlight",
          attributes: [
            "origin",
            "destination",
            "departure_time",
            "arrival_time",
            "status",
            "duration",
          ],
        },
        {
          model: Flight,
          as: "returnFlight",
          attributes: [
            "origin",
            "destination",
            "departure_time",
            "arrival_time",
            "status",
            "duration",
          ],
        },
        {
          model: Seat,
          as: "outboundSeat",
          attributes: ["seat_number", "seat_type"],
        },
        {
          model: Seat,
          as: "returnSeat",
          attributes: ["seat_number", "seat_type"],
        },
      ],
    });

    // Even if no bookings are found, return an empty array instead of 404
    return res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
};

// Lấy tất cả thông tin của khách hàng đã đăng nhập
exports.getLoggedInCustomerInfo = async (req, res) => {
  try {
    const customer = await customerService.getCustomerByUserId(req.userId);
    if (!customer) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin khách hàng." });
    }
    res.status(200).json(customer);
  } catch (error) {
    console.error("Error fetching logged-in customer info:", error);
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
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

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Cập nhật thông tin khách hàng
exports.updateProfile = async (req, res) => {
  const {
    email,
    phone,
    profilePicture,
    address,
    country_name,
    title,
    country_code,
    first_name,
    middle_name,
    last_name,
    date_of_birth,
    gender,
    promo_code,
  } = req.body;
  const userId = req.userId;

  try {
    // Cập nhật thông tin User
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.email = email || user.email;
    user.phone = phone || user.phone;

    if (profilePicture) {
      // Xóa ảnh cũ nếu có
      if (user.profilePicture) {
        fs.unlink(
          path.join(__dirname, "..", "avatars", user.profilePicture),
          (err) => {
            if (err) {
              console.error("Error deleting old avatar:", err);
            }
          }
        );
      }

      // Lưu ảnh mới
      user.profilePicture = profilePicture;
    }

    await user.save();

    // Cập nhật thông tin Customer
    const customer = await Customer.findOne({ where: { user_id: userId } });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    customer.address = address || customer.address;
    customer.country_name = country_name || customer.country_name;
    customer.title = title || customer.title;
    customer.country_code = country_code || customer.country_code;
    customer.first_name = first_name || customer.first_name;
    customer.middle_name = middle_name || customer.middle_name;
    customer.last_name = last_name || customer.last_name;
    customer.date_of_birth = date_of_birth || customer.date_of_birth;
    customer.gender = gender || customer.gender;
    customer.promo_code = promo_code || customer.promo_code;
    await customer.save();

    res.status(200).json({
      message: "Profile updated successfully",
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
