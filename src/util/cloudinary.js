const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dantranne",
  api_key: "677947742256739",
  api_secret: "G4gcySqcK0FGkmv1UJ1WNfXvh5E",
});

module.exports = { cloudinary };
