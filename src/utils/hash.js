const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  } catch (err) {
    throw err;
  }
};

module.exports = hashPassword;
