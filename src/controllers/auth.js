const controllers = {};
const models = require("../models/user");
const bcrypt = require("bcrypt");
const hashing = require("../utils/hash");
const response = require("../utils/response");
const token = require("../utils/token");

// Registration
controllers.registration = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = await hashing(req.body.password);
    }
    const result = await models.registration(req.body);
    if (result.rowCount === 1) {
      return response(res, 0, "Registrasi berhasil silahkan login");
    }
  } catch (err) {
    if (err.message.includes("duplicate key")) {
      return response(res, 102, "Email sudah digunakan");
    }
    return response(res, 102, err.message);
  }
};

// Login
controllers.login = async (req, res) => {
  try {
    const result = await models.getPassByEmail(req.body.email);
    if (result.rowCount === 0) {
      return response(res, 102, "Email tidak ditemukan");
    }

    const { role, email } = result.rows[0];
    const password = result.rows[0].password;
    const passwordUser = req.body.password;
    const check = await bcrypt.compare(passwordUser, password);

    if (check) {
      const tokenJwt = token(role, email);
      return response(res, 0, "Login Sukses", { token: tokenJwt });
    } else {
      return response(res, 102, "Password salah");
    }
  } catch (error) {
    return response(res, 102, error.message);
  }
};

module.exports = controllers;
