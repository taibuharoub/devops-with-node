const bcrypt = require("bcryptjs");

const User = require("../models/User");

exports.signUp = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      password: hashPassword,
    });
    req.session.user = newUser //to automatically log in the user after sign up
    res.status(201).json({ status: true, userId: newUser._id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      const error = new Error("A user with this username could not be found.");
      error.statusCode = 401;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      throw error;
    }
    req.session.user = user;
    res.status(200).json({ status: true, userId: user._id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
