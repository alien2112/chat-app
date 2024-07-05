const express = require("express");
const registerUser = require("../controllers/rergisterUser");
const checkEmail = require("../controllers/checkEmail");
const checkPassword = require("../controllers/checkPassword");
const userDetails = require("../controllers/userDetails");
const logout = require("../controllers/logout");
const updateUserDetails = require("../controllers/updateUserDetails");
const searchUser = require("../controllers/searchUser");
const router = express.Router();


//creating userapi

router.post("/register", registerUser);
//check userEmail
router.post("/email", checkEmail);
//login
router.post("/login", checkPassword);
//login userDetails
router.get("/user-details", userDetails);
//logout
router.get("/logout", logout);
//update userDetails
router.post("/update-user", updateUserDetails);
//search users
router.post("/search-user", searchUser)
router.get("/hello",(req,res)=>{
  res.send('express on vercel')
})
module.exports = router;
