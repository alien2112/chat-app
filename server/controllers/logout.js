async function logout(req, res) {
  try {
    const cookieOption = {
      http: true,
      secure: true,
    };
    return res.cookies("token", "", cookieOption).status(200).json({
      message: "Logged out",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error logging out",
      error: true,
    });
  }
}
module.exports = logout;