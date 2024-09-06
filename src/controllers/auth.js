const controllers = {};
const bcrypt = require("bcrypt");
const auth = require("../utils/auth");
const models = require("../models/user");
const response = require("../utils/response");

// Registration
controllers.registration = async (req, res) => {
  try {
    req.body.password = await auth.hashPassword(req.body.password);
    const result = await models.registration(req.body);
    if (result.rowCount === 1) {
      return response(res, 0, "Registrasi berhasil silahkan login");
    }
  } catch (err) {
    if (err.message.includes("duplicate key")) {
      return response(res, 103, "Email sudah digunakan");
    }
    return response(res, 103, err.message);
  }
};

// Login
controllers.login = async (req, res) => {
  try {
    const result = await models.getPassByEmail(req.body.email);
    if (result.rowCount === 0) {
      return response(res, 103, "Email atau password salah");
    }

    const { email } = result.rows[0];
    const password = result.rows[0].password;
    const passwordUser = req.body.password;
    const check = await bcrypt.compare(passwordUser, password);

    if (check) {
      const tokenJwt = auth.genToken(email);
      return response(res, 0, "Login Sukses", { token: tokenJwt });
    } else {
      return response(res, 103, "Email atau password salah");
    }
  } catch (error) {
    return response(res, 103, error.message);
  }
};

module.exports = controllers;
