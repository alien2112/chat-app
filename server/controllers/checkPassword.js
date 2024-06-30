const bcryptjs = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const checkEmail = require("./checkEmail");

async function checkPassword(req, res) {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ email: email });
    if(!user){
      return res.status(401).json({message:"There is no user with that email"})
    }

    const verifyPassword = await bcryptjs.compare(password, user.password);

    if (!verifyPassword) {
      res.status(400).json({
        message: "Invalid password please check your password",
        error: true,
      });
    }
    const tokenData = {
      id: user.id,
      email: user.email,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    const cookieOption = {
      http: true,
      secure: true,
    };
    return res
      .cookie("token", token, cookieOption)
      .status(200)
      .json({
        message: "login successfully",
        token: token,
        success: true,
      });
      
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true });
  }
}

module.exports = checkPassword