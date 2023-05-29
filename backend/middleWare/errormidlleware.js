const errmiddleware = (err, req, res, next) => {
  const status = res.statusCode ? res.statusCode : 500;
  res.status(status);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};
module.exports = errmiddleware;
