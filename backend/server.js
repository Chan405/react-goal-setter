const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const cors = require("cors");
const multer = require("multer");

const router = require("./routes/goalRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const connectDb = require("./config/database");
const userRouter = require("./routes/userRoutes");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

connectDb();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/goals", router);
app.use("/api/v1/users", userRouter);

app.get("*", (request, response) => {
  response.json({ message: "No route found" });
});

app.post("/api/upload", upload.single("file"), (request, response) => {
  response.json({ message: "Uploaded successfully" });
});
app.use(errorHandler);

app.listen(1500, () => {
  console.log("server start");
});
