require("dotenv").config();
const jwt = require("jsonwebtoken");

const genToken = (email) => {
  const payload = {
    email,
  };

  const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "12h" });
  return token;
};

module.exports = genToken;
