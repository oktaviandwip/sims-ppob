const express = require("express");
const routers = express.Router();
const information = require("../controllers/information");
const transaction = require("../controllers/transaction");
const auth = require("../controllers/auth");
const user = require("../controllers/user");
const validation = require("../middleware/validation");
const upload = require("../middleware/upload");

// Auth
routers.post("/registration", validation.emailPassword, auth.registration);
routers.post("/login", auth.login);

// Profile
routers.get("/profile", validation.login, user.getProfile);
routers.put("/profile/update", validation.login, user.updateProfile);
routers.put(
  "/profile/image",
  upload.multer,
  upload.cloudinary,
  validation.login,
  user.updateProfile
);

// Information
routers.get("/banner", information.getBanner);
routers.get("/services", information.getServices);

// Transaction
routers.get("/balance", validation.login, transaction.getBalance);
routers.post("/topup", validation.login, validation.topup, transaction.topup);
routers.post("/transaction", validation.login, transaction.newTransaction);
routers.get(
  "/transaction/history",
  validation.login,
  transaction.getTransaction
);

module.exports = routers;
