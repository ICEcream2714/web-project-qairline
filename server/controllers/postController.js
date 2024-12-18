const adminService = require("../services/adminService");

// Create a new post
exports.createPost = async (req, res) => {
  const { image, title, content, cta, postType, startDate, endDate } = req.body;
  const adminId = req.userId;

  try {
    const post = await adminService.createPost(
      image,
      title,
      content,
      cta,
      postType,
      startDate || null,
      endDate || null,
      adminId
    );
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi hệ thống");
  }
};

// Get list of posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await adminService.getPosts();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi hệ thống");
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    await adminService.deletePost(id);
    res.status(200).send("Post deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi hệ thống");
  }
};

// Edit a post
exports.editPost = async (req, res) => {
  const { id } = req.params;
  const { title, image, cta } = req.body;

  try {
    const updatedPost = await adminService.editPost(id, title, image, cta);
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi hệ thống");
  }
};
