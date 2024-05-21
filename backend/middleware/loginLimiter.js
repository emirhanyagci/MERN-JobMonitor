const { rateLimit } = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: true,
  handler: (req, res, next, options) =>
    res.status(options.statusCode).send(options.message),
});

module.exports = limiter;
