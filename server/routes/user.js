const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
//import controller functions
const { UserSignup, UserLogin, saveProperty } = require("../controllers/user");

// @route POST api/user
// @desc register user
// @access public
router.post("/", UserSignup);

// @route POST api/user/auth
// @desc Authenticate user
// @access public
router.post("/auth", UserLogin);

router.put("/save/:flag/:prop_id", auth, saveProperty);

// @route POST api/user/logout
// @desc Logout user
// @access private
//router.post("/logout", userLogout);

module.exports = router;
