const express = require('express');
const userRouter = express.Router();
const userController = require("../controller/userController");
const protect = require('../middleware/authMiddleware');

userRouter.post("/", userController.handleRegister)
userRouter.post("/login", userController.handleLogin)
userRouter.get("/me", protect, userController.getMe)



module.exports = userRouter;
