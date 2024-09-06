const controllers = {};
const models = require("../models/transaction");
const response = require("../utils/response");

// Get Balance
controllers.getBalance = async (req, res) => {
  try {
    const result = await models.getBalance(req.token.email);
    return response(res, 0, "Get Balance Berhasil", { balance: result });
  } catch (err) {
    return response(res, 103, err.message);
  }
};

// Top Up
controllers.topUp = async (req, res) => {
  try {
    const result = await models.topUp(req.token.email, req.body.top_up_amount);
    return response(res, 0, "Top Up Balance berhasil", { balance: result });
  } catch (err) {
    return response(res, 103, err.message);
  }
};

// New Transaction
controllers.newTransaction = async (req, res) => {
  try {
    const result = await models.newTransaction(
      req.token.email,
      req.body.service_code
    );
    return response(res, 0, "Transaksi berhasil", result);
  } catch (err) {
    return response(res, 103, err.message);
  }
};

// Get Transaction
controllers.getTransaction = async (req, res) => {
  try {
    const { page, limit } = req.query;

    let offset = 0;
    if (limit) {
      offset = (page - 1) * limit;
    }

    const result = await models.getTransaction(req.token.email, offset, limit);
    return response(res, 0, "Get History Berhasil", result);
  } catch (err) {
    return response(res, 103, err.message);
  }
};

module.exports = controllers;
