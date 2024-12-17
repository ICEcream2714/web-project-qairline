const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { verifyToken } = require("../middlewares/authMiddleware");
const { verifyAdmin } = require("../middlewares/adminMiddleware");

// Route to add a new post
router.post("/", postController.createPost);

// Route to get list of posts
router.get("/", postController.getPosts);

module.exports = router;
