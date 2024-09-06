const controllers = {};
const models = require("../models/information");
const response = require("../utils/response");

// Get Banner
controllers.getBanner = async (req, res) => {
  try {
    const result = await models.getBanner();
    return response(res, 0, "Sukses", result);
  } catch (err) {
    return response(res, 500, err.message);
  }
};

// Get Services
controllers.getServices = async (req, res) => {
  try {
    const result = await models.getServices();
    return response(res, 0, "Sukses", result);
  } catch (err) {
    return response(res, 500, err.message);
  }
};

module.exports = controllers;
