const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const uploadRoute = require("./routes/cloudinary");
const userRoute = require("./routes/user");
const imageRoute = require("./routes/image");

const cors = require("cors");

dotenv.config();
// app.use(express.limit(100000000));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
// app.use(
//   express.urlencoded({
//     //bodyparser lib
//     extended: true,
//   })
// );
// app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connection successfully");
  })
  .catch((err) => {
    console.log(err);
  });
app.use("/api/image", imageRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
