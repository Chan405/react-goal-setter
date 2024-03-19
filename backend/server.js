const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const cors = require("cors");

const router = require("./routes/goalRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const connectDb = require("./config/database");
const userRouter = require("./routes/userRoutes");

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

app.use(errorHandler);

app.listen(1500, () => {
  console.log("server start");
});
