const protect = (req, res, next) => {
  const { user } = req.session;

  if (!user) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }
  next();
};

module.exports = protect;