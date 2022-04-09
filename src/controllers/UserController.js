const Image = require("../app/models/Image");
const User = require("../app/models/User");
const { cloudinary } = require("../util/cloudinary");

class UserController {
  async updateFavorite(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.body.id, {
        favorite: req.body.favorite,
      });
      return res.status(200).json(req.body.favorite);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async getCurrentUser(req, res) {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      return res.status(200).json(others);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async changeUserInfo(req, res) {
    try {
      const fileStr = req.body.avatar;
      let data;
      if (!fileStr.includes("res.cloudinary.com")) {
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
          upload_preset: "ml_default",
        });
        data = { ...req.body, avatar: uploadedResponse.url };
      } else {
        data = req.body;
      }
      await Image.updateMany(
        { uploader_id: req.params.id },
        {
          uploader_name: data.name,
          uploader_id: data.id,
          uploader_avatar: data.avatar,
        }
      );
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: data,
        },
        { new: true }
      );
      return res.status(200).json(updatedUser);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

module.exports = new UserController();
