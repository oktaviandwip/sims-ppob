const upload = {};
const { multer, storage, fileFilter } = require("../configs/multer");
const cloudinary = require("../configs/cloudinary");

// Multer
upload.multer = multer({
  storage,
  fileFilter,
  limits: { fieldSize: 100 * 1024 * 1024 },
}).single("profile_image");

// Cloudinary
upload.cloudinary = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
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
