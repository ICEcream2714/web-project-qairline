// services/adminService.js
const { Post, Airplane, Flight, Booking } = require("../models");

// Tạo bài đăng (Giới thiệu, khuyến mãi, thông báo, tin tức)
exports.createPost = async (
  image,
  title,
  content,
  cta,
  postType,
  startDate,
  endDate,
  adminId
) => {
  return await Post.create({
    image,
    title,
    content,
    cta,
    postType,
    startDate: startDate || null,
    endDate: endDate || null,
    adminId,
  });
};

// Thêm thông tin máy bay
exports.addAirplane = async (model, manufacturer, seatCount, airlineId) => {
  return await Airplane.create({
    model,
    manufacturer,
    seatCount,
    airlineId,
  });
};

// Thêm chuyến bay
exports.addFlight = async (
  flightNumber,
  airplaneId,
  origin,
  destination,
  departureTime,
  arrivalTime
) => {
  return await Flight.create({
    flightNumber,
    airplaneId,
    origin,
    destination,
    departureTime,
    arrivalTime,
    status: "Scheduled",
  });
};

// Xem và thống kê các đặt vé của khách hàng
exports.viewBookings = async () => {
  return await Booking.findAll({
    include: [Customer, Flight, Seat],
  });
};

// Cập nhật trạng thái chuyến bay (thay đổi giờ khởi hành)
exports.updateFlightStatus = async (flightId, newStatus) => {
  const flight = await Flight.findByPk(flightId);
  if (!flight) throw new Error("Chuyến bay không tồn tại.");

  flight.status = newStatus;
  await flight.save();
  return flight;
};

// Lấy danh sách các bài đăng
exports.getPosts = async () => {
  try {
    const posts = await Post.findAll();
    return posts;
  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách các bài đăng");
  }
};

exports.updateSeatCount = async (airplaneId, seatCount) => {
  try {
    const airplane = await Airplane.findByPk(airplaneId);
    if (!airplane) {
      return null;
    }

    airplane.seat_count = seatCount;
    await airplane.save();
    return airplane;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Delete a post
exports.deletePost = async (id) => {
  const post = await Post.findByPk(id);
  if (!post) {
    throw new Error("Post not found");
  }
  await post.destroy();
};

// Edit a post
exports.editPost = async (id, title, image, cta) => {
  const post = await Post.findByPk(id);
  if (!post) {
    throw new Error("Post not found");
  }

  post.title = title;
  post.image = image;
  post.cta = cta;

  await post.save();
  return post;
};
