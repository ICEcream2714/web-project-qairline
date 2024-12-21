const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { verifyToken } = require("../middlewares/authMiddleware");
const { verifyAdmin } = require("../middlewares/adminMiddleware");

// Route to add a new post
router.post("/", postController.createPost);
// http://localhost:5000/api/posts/

// Route to get list of posts
router.get("/", postController.getPosts);

// Route to delete a post
router.delete("/:id", postController.deletePost);

// Route to edit a post
router.put("/:id", postController.editPost);

module.exports = router;
