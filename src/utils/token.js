require("dotenv").config();
const jwt = require("jsonwebtoken");

const token = (role, email) => {
  const payload = {
    role,
    email,
  };

  const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "12h" });
  return token;
};

module.exports = token;
