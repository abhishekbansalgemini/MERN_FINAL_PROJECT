const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/User.js");
require("dotenv").config();

const jwtSecret = process.env.jwtSecret;
const bcryptSalt = bcrypt.genSaltSync(10);



const register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if(user){
      res.status(409).json("user already exist");
    }
    try {
      const newUser = await UserModel.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcryptSalt),
      });
  
      res.json(newUser);
    } catch (err) {
      res.status(422).json(err);
    }
  };

  const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      const passOk = bcrypt.compareSync(password, user.password);
      if (passOk) {
        jwt.sign(
          { email: user.email, id: user._id, isAdmin: user.isAdmin },
          jwtSecret,
          {},
          (err, token) => {
            if (err) {
              throw err;
            }
            res.cookie("token", token).json(user);
          }
        );
      } else {
        res.status(422).json("PAss not ok");
      }
    } else {
      res.status(422).json("Not found");
    }
  }

  const updatePassword = async (req, res) => {
    const {email, newPassword } = req.body;
    const user = await UserModel.findOne({ email: email });
    if(user){
      user.set({
        name: user.name, email, password: bcrypt.hashSync(newPassword, bcryptSalt)
      })
      jwt.sign(
        { email: user.email, id: user._id, isAdmin: user.isAdmin },
        jwtSecret,
        {},
        (err, token) => {
          if (err) {
            throw err;
          }
          res.cookie("token", token).json(user);
        });
      await user.save();
    }
    else{
      res.status(422).json("Not found");
    }
  }

  const profile = (req, res) => {
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, user) => {
        if (err) throw err;
        const { name, email, _id, isAdmin } = await UserModel.findById(user.id);
        res.json({ name, email, _id, isAdmin });
      });
    } else {
      res.json(null);
    }
  }

  const logout = (req, res) => {
    res.cookie("token", "").json(true);
  }

  module.exports = {register, login, profile, logout, updatePassword};