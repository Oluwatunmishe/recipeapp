const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { request } = require("express");
const user = require("../models/user");
const config = require("../config/config");

exports.registerUsers = async (req, res) => {
  const body = req.body;
  const emailExist = await User.findOne({ email: req.body.email });
  const userExist = await User.findOne({ username: req.body.username });

  const hashpassword = bcrypt.hashSync(body.password, 10);
  if (!body.name || !body.password || !body.email || !body.username) {
    res.json("emptyfield fill all the require field");
  } else if (body.password.length < 6) {
    res.json("password must be greater than 6");
  } else if (emailExist) {
    res.json({ message: "email  exist" });
  } else if (userExist) {
    res.json({ message: "Username already Exist" });
  } else {
    const newUser = await User.create({
      name: body.name,
      email: body.email,
      password: hashpassword,
      username: body.username,
    });
    res.status(200).json({ message: "registration sucessfull", user: newUser });
  }
};
exports.displayHome = async (req, res) => {
  res.json("<h1>Home page</h1>");
};

exports.signin = async (req, res) => {
  const body = req.body;
  if (!body.email && !body.password) {
    res.json({ message: "empty field" });
  } else {
    await User.findOne({ email: req.body.email }, (err, User) => {
      if (err) throw err;
      if (!User) {
        res.json({ message: "invalid email" });
      } else if (User) {
        const validPassword = bcrypt.compareSync(
          req.body.password,
          User.password
        );
        if (validPassword) {
          const token = jwt.sign(
            { password: User.password, email: User.email },
            config.secret,
            { expiresIn: "2h" }
          );
          res.json({ message: "login sucessful", User: User, token: token });
        } else {
          res.json({ message: "incorrect Password" });
        }
      }
    });
  }
};
