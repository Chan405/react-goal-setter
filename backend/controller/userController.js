const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const handleRegister = async (request, response) => {
  const { name, email, password } = request.body;

  if (!name || !email || !password) {
    response
      .status(400)
      .json({ message: "Please add all the required fields" });
  }
  try {
    // check if user already exists
    const userExists = await User.findOne({ email });
    if (!userExists) {
      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const user = await User.create({ name, email, password: hashPassword });

      if (user) {
        response
          .status(201)
          .json({ user: { name: user.name, email: user.email } });
      } else {
        response.status(400).json({ message: "Invalid User" });
      }
    } else {
      response.status(400).json({ message: "User already exists" });
    }
  } catch (e) {
    response.status(400).json({ message: "Invalid User" });
  }
};

const handleLogin = async (request, response) => {
  const { email, password } = request.body;

  if (email && password) {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      response.status(200).json({
        user: {
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        },
      });
    } else {
      response.status(400).json({ message: "Invalid user credentials" });
    }
  } else {
    response.status(400).json({ message: "Enter user credentials" });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const getMe = async (request, response) => {
  const { _id, name, email } = request.user;
  response.json({ _id, name, email });
};

module.exports = {
  getMe,
  handleLogin,
  handleRegister,
};
