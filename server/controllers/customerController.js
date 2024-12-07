const { Op } = require("sequelize");
const { Flight, Seat, Booking, Airplane } = require("../models");

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

// // Tìm chuyến bay
// exports.searchFlights = async (req, res) => {
//   try {
//     // Lấy các thông số tìm kiếm từ query params
//     const { origin, destination, departure_date, return_date, seat_type } =
//       req.query;

//     const whereConditions = {};

//     // Tìm kiếm theo địa điểm khởi hành và đích đến
//     if (origin) {
//       whereConditions.origin = origin;
//     }
//     if (destination) {
//       whereConditions.destination = destination;
//     }

//     // Tìm kiếm theo ngày khởi hành
//     if (departure_date) {
//       whereConditions.departure_time = {
//         [Op.gte]: new Date(departure_date), // Lớn hơn hoặc bằng ngày khởi hành
//       };
//     }

//     // Tìm kiếm theo ngày khứ hồi
//     if (return_date) {
//       whereConditions.arrival_time = {
//         [Op.lte]: new Date(return_date), // Nhỏ hơn hoặc bằng ngày khứ hồi
//       };
//     }

//     // Tìm kiếm theo loại ghế
//     if (seat_type) {
//       // Kiểm tra trong bảng Seats xem loại ghế có tồn tại
//       const seats = await Seat.findAll({
//         where: { seat_type },
//       });

//       const availableFlightIds = seats.map((seat) => seat.flight_id);

//       // Cập nhật điều kiện tìm kiếm theo các chuyến bay có loại ghế yêu cầu
//       whereConditions.id = { [Op.in]: availableFlightIds };
//     }

//     // Tìm kiếm các chuyến bay thỏa mãn điều kiện
//     const flights = await Flight.findAll({
//       where: whereConditions,
//       include: [
//         {
//           model: Seat,
//           attributes: ["seat_type", "seat_number", "is_available"],
//         },
//         {
//           model: Airplane,
//           attributes: ["model", "manufacturer"],
//         },
//       ],
//     });

//     if (flights.length === 0) {
//       return res.status(404).json({
//         message: "No flights found",
//       });
//     } else {
//       // Lọc ra các chuyến bay có ghế trống
//       flights.forEach((flight) => {
//         flight.Seats = flight.Seats.filter((seat) => seat.is_available);
//       });
//     }

//     // Trả về kết quả tìm kiếm
//     res.status(200).json({
//       message: "Flights found",
//       flights,
//     });
//   } catch (error) {
//     console.error("Error searching flights:", error);
//     res.status(500).json({
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };

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
          attributes: ["seat_type", "seat_number", "is_available", "price"],
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
          attributes: ["seat_type", "seat_number", "is_available", "price"],
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
