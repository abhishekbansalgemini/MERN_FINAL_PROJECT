const express = require("express");
const router = express.Router();
const { register, login, profile, logout, updatePassword } = require("../Controllers/User");

router.post("/register", register);
router.post("/login", login);
router.put("/login", updatePassword);   
router.get("/profile", profile);
router.post("/logout", logout);


module.exports = router;
