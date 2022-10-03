const notFoundError = (req, res, next) => {
  console.log(req);
  const error = new Error(`Not Found  Page`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    msg: err.message,
  });
};

module.exports = { notFoundError, errorHandler };
