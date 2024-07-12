const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const User = require("../models/User");

async function addFavorite(req, res) {
  try {
    const token = req.cookies.token || "";
    const user = await getUserDetailsFromToken(token);
    const { favoriteUsername } = req.body;

    if (!favoriteUsername) {
      return res.status(400).json({
        message: "Favorite username is required",
        error: true,
      });
    }

    const favoriteUser = await User.findOne({ name: favoriteUsername });

    if (!favoriteUser) {
      return res.status(404).json({
        message: "Favorite user not found",
        error: true,
      });
    }

    await User.updateOne(
      { _id: user._id },
      { $addToSet: { favorite_list: favoriteUser._id } }
    );

    return res.status(200).json({
      message: "User added to favorites successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

async function getFavorites(req, res) {
  try {
    const token = req.cookies.token || "";
    const user = await getUserDetailsFromToken(token);

    const userWithFavorites = await User.findById(user._id).populate(
      "favorite_list",
      "name email profile_pic"
    );

    return res.status(200).json({
      message: "Favorites retrieved successfully",
      data: userWithFavorites.favorite_list,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = { addFavorite, getFavorites };
