const Image = require("../app/models/Image");
const User = require("../app/models/User");
const { cloudinary } = require("../util/cloudinary");

class UploadController {
  async upload(req, res) {
    try {
      const fileStr = req.body.data;
      const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "ml_default",
      });
      const newImage = await new Image({
        url: uploadedResponse.url,
        uploader_id: req.body.uploader._id,
        title: req.body.title,
        uploader_name: req.body.uploader.name,
        uploader_avatar: req.body.uploader.avatar,
      });
      const savedImage = await newImage.save();
      return res.status(200).json(savedImage);
    } catch (err) {
      return res.status(500).json({ err: "something went wrong" });
    }
  }
}

module.exports = new UploadController();
