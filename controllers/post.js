const { NativeError } = require("mongoose");
const Post = require("../models/Post");

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();

    res.status(200).json({
      status: true,
      results: posts.length,
      data: posts,
    });
  } catch (err) {
    /* res.status(500).json({
            status: false
        }) */
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getOnePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      const error = new Error("Could not find post.");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      status: true,
      data: post,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    res.status(200).json({
      status: true,
      data: post,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: true,
      data: post,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: true,
      message: "Post deleted successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
