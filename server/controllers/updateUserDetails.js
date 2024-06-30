const getUserDetailsFromToken = require('../helpers/getUserDetailsFromToken')
const User = require('../models/User')
async function updateUserDetails(req, res) {
  try {
    const token = req.cookies.token || "";
    const user = await getUserDetailsFromToken(token);
    const { name, profile_pic } = req.body;

    const updateUser = await User.updateOne(
      { _id: user._id },
      {
        name,
        profile_pic,
      }
    );
    const userInformation = await User.findById(user._id);

    return res.status(200).json({
      message: "user updated successfully",
      data: userInformation,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = updateUserDetails;
