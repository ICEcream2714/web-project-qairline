const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const PORT = process.env.PORT || 5001;

// Middleware to parse JSON requests
app.use(express.json());

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello from QAirline Backend");
});

// Test API link to fetch posts
app.get("/api/test/posts", async (req, res) => {
  try {
    const posts = await require("./models").Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi hệ thống");
  }
});

// Import các route
const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const postRoutes = require("./routes/postRoutes"); // Import postRoutes

// Middleware
app.use(cors()); // CORS middleware cho phép kết nối từ các nguồn khác
app.use(bodyParser.json()); // Phân tích dữ liệu JSON từ request body

// Các route
app.use("/api/auth", authRoutes); // Đăng nhập, đăng ký
app.use("/api/customer", customerRoutes); // Các chức năng của khách hàng
app.use("/api/admin", adminRoutes); // Các chức năng của quản trị viên
app.use("/api/posts", postRoutes); // Route for posts

sequelize.sync({ force: true }).then(() => {
  console.log("Database synced");
});

//

// Start the server
app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);
  try {
    await sequelize.authenticate();
    console.log("Connection to SQLite has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
