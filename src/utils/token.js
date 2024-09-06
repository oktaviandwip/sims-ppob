require("dotenv").config();
const jwt = require("jsonwebtoken");

const token = (role, email) => {
  const payload = {
    email,
  };

  const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1m" });
  return token;
};

module.exports = token;
