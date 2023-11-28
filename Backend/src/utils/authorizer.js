const { expressjwt } = require("express-jwt");

const authorizer = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

module.exports = {
  authorizer,
};
