const { ClientError, ConflictError } = require("../exceptions");

const errorHandler = (err, req, res, next) => {
  if (err instanceof ConflictError) {
    return res.status(err.statusCode).json({
      status: "success",
      message: err.message,
    });
  }

  if (err instanceof ClientError) {
    return res.status(err.statusCode).json({
      status: "failed",
      message: err.message,
    });
  }

  console.error(err);

  res.status(500).json({
    status: "failed",
    message: "Internal server error",
  });
};

module.exports = errorHandler;
