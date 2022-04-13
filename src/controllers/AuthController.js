const User = require("../app/models/User");

const CryptoJS = require("crypto-js"); //Encrypt, decrypt password

const jwt = require("jsonwebtoken"); // Token to sign in or doing something

//Register
class AuthController {
  async register(req, res) {
    try {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
          req.body.password,
          process.env.PASS_SEC
        ).toString(),
      });

      const { password, ...savedUser } = await newUser.save();

      return res.status(201).json(savedUser);
    } catch (err) {
      if (err.username === "MongoError" && err.code === 11000) {
        return res.status(500).json({ message: "username already exist!" });
      } else if (err.email === "MongoError" && err.code === 11000) {
        return res.status(500).json({ message: "email already exist!" });
      } else {
        return res.status(500).json(err);
      }
    }
  }
  async login(req, res) {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(404).json("USER NOT FOUND");
      }
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
      );
      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      if (originalPassword !== req.body.password) {
        return res.status(401).json("Wrong password");
      }
      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
        { expiresIn: "30d" }
      );
      const { password, ...others } = user._doc;
      return res.status(200).json({ ...others, accessToken });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

module.exports = new AuthController();
