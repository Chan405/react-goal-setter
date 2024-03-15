const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (request, response, next) => {
  let token;

  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = request.headers.authorization.split(" ")[1];

      const decoded_token = jwt.decode(token, process.env.JWT_SECRET);

      request.user = await User.findById(decoded_token.id).select("-passowrd");

      next();
    } catch (e) {
      console.log(e);
      response.status(401).json({message: 'Not authorized'})
    }
  }

  if (!token) {
    response.status(401).json({message: 'Not authorized'})
  }
};

module.exports = protect;
