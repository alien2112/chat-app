const jwt = require("jsonwebtoken");
const User = require("../models/User");
const getUserDetailsFromToken = async (token) => {
  
  if (!token) {
    return {
      message: "Session out",
      logout: true,
    };
  }
  const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(decode.id).select("-password");

  return user;
};

module.exports = getUserDetailsFromToken;
