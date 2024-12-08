// models/index.js
const sequelize = require("../config/database");
const User = require("./users")(sequelize, require("sequelize").DataTypes);
const Customer = require("./customers")(
  sequelize,
  require("sequelize").DataTypes
);
const Admin = require("./admins")(sequelize, require("sequelize").DataTypes);
const Post = require("./posts")(sequelize, require("sequelize").DataTypes);
const Flight = require("./flights")(sequelize, require("sequelize").DataTypes);
const Booking = require("./bookings")(
  sequelize,
  require("sequelize").DataTypes
);
const Seat = require("./seats")(sequelize, require("sequelize").DataTypes);
const Airplane = require("./airplanes")(
  sequelize,
  require("sequelize").DataTypes
);
const Airline = require("./airlines")(
  sequelize,
  require("sequelize").DataTypes
);
const Passenger = require("./passengers")(
  sequelize,
  require("sequelize").DataTypes
);

// Định nghĩa mối quan hệ
User.associate({ Customer, Admin });
Customer.associate({ User, Booking });
Admin.associate({ User, Post });
Post.associate({ Admin });
Flight.associate({ Airplane, Booking, Seat });
Booking.associate({ Customer, Flight, Seat, Passenger });
Seat.associate({ Flight, Booking });
Airplane.associate({ Airline, Flight });
Airline.associate({ Airplane });
Passenger.associate({ Booking });

module.exports = {
  User,
  Customer,
  Admin,
  Post,
  Flight,
  Booking,
  Seat,
  Airplane,
  Airline,
  Passenger,
  sequelize,
};
