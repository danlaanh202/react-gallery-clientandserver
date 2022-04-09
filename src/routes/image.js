const ImageController = require("../controllers/ImageController");
const router = require("express").Router();
router.post("/getfavoriteimage", ImageController.getFavoriteImage);
router.get("/getimage", ImageController.getImageWithLimit);
router.get("/:id", ImageController.getUserImage);

module.exports = router;
