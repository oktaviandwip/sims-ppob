const controllers = {};
const models = require("../models/user");
const response = require("../utils/response");
const hashing = require("../utils/auth");

// Get Profile
controllers.getProfile = async (req, res) => {
  try {
    const result = await models.getProfile(req.token.email);
    return response(res, 0, "Sukses", result);
  } catch (err) {
    return response(res, 103, err.message);
  }
};

// Update Profile
controllers.updateProfile = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = await hashing(req.body.password);
    }
    const result = await models.updateProfile(req.body, req.token.email);
    return response(res, 0, "Update Pofile berhasil", result);
  } catch (err) {
    return response(res, 103, err.message);
  }
};

module.exports = controllers;
