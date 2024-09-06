const upload = {};
const response = require("../utils/response");
const cloudinary = require("../configs/cloudinary");
const { multer, storage, fileFilter } = require("../configs/multer");

// Multer
upload.multer = (req, res, next) => {
  multer({
    storage,
    fileFilter,
    limits: { fieldSize: 100 * 1024 * 1024 },
  }).single("profile_image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return response(res, 103, err.message);
    } else if (err) {
      return response(res, 102, err.message);
    }
    next();
  });
};

// Cloudinary
upload.cloudinary = async (req, res, next) => {
  if (!req.file) {
    return res.status(102).send("Tidak ada file yang diupload");
  }

  try {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (error) {
          return next(error);
        }
        req.body.profile_image = result.secure_url;
        next();
      }
    );
    stream.end(req.file.buffer);
  } catch (error) {
    next(error);
  }
};

module.exports = upload;
