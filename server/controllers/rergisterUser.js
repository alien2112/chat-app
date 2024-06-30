const User = require("../models/User");
const bcryptjs = require('bcryptjs');
async function registerUser(req,res) {
    try{
      const { name, email, password, profile_pic } = req.body;
      const checkEmail = await User.findOne({email});

      if (checkEmail) {
        return res.status(400).json({
          message: "Email already registered",
          error: true,
        });
      }
      //hasing password
      const salt = await bcryptjs.genSalt(10);
      const hashpassword = await bcryptjs.hash(password, salt);

      const payload = {
        name,email,profile_pic,password:hashpassword
      }
      const user = new User(payload);
      const userSave = await user.save(user);
      return res.status(200).json({
        message: "user have been registered successfully",
        data: userSave,
        success: true,
      });
    }

    catch(error){
        return res.status(500).json({
          message: error.message || error,
          error: true,
        });
    }
}


module.exports = registerUser;