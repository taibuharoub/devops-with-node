const express = require("express");

const postController = require("../controllers/post");
const protect = require("../middleware/is-auth");

const router = express.Router();

router
  .route("/")
  .get(postController.getAllPosts)
  .post(protect, postController.createPost);

router
  .route("/:id")
  .get(postController.getOnePost)
  .patch(protect, postController.updatePost)
  .delete(protect, postController.deletePost);

module.exports = router;
