const User = require("../models/User");

async function checkEmail(req,res){
    try{
        const {email} = req.body;
        const checkEmail = await User.findOne({email}).select('-password');

        if(!checkEmail){
            return res.status(400).json({
                message:"user not found",
                error:true
            })
        }
        return res.status(200).json({
            message:"email varified",
            success:true,
            data:checkEmail
        })
    }
    catch(error){
        return response.satatus(500).json({
            message:error.message || error,
            error:true
        })
    }
}

module.exports = checkEmail