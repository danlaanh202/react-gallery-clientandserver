const UploadController = require("../controllers/UploadController");

const router = require("express").Router();

router.post("/", UploadController.upload);
module.exports = router;
