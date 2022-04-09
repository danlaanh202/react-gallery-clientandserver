const User = require("../app/models/User");
const CryptoJS = require("crypto-js"); // encrypt and decrypt password of user

const {
  verifyAdmin,
  verifyAndAuthorize,
  verifyToken,
} = require("../controllers/verifyToken");
const UserController = require("../controllers/UserController");

const router = require("express").Router();

// [UPDATE FAVORITE LIST]

router.put("/favorite", UserController.updateFavorite);

// [UPDATE current user]

router.put("/info/:id", UserController.changeUserInfo);

// [Get Current User]

router.get("/:id", UserController.getCurrentUser);

//[GET] get user stat

module.exports = router;
