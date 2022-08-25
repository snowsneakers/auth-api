const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const generateToken = (username) => {
     // return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
     return jwt.sign({ username }, process.env.SECRET, { expiresIn: "3d" });
};

const signupUser = async (req, res) => {
     const {
          username,
          password,
          orderDate,
          trim,
          exterior,
          wheels,
          interior,
          location,
     } = req.body;
     try {
          const user = await User.signup(
               username,
               password,
               orderDate,
               trim,
               exterior,
               wheels,
               interior,
               location
          );
          // const token = generateToken(user._id);
          const token = generateToken(user.username);
          res.status(201).json({ user, token });
     } catch (error) {
          res.status(400).json({ error: error.message });
     }
};

const loginUser = async (req, res) => {
     const { username, password } = req.body;
     try {
          const user = await User.login(username, password);
          // const token = generateToken(user._id);
          const token = generateToken(user.username);
          res.status(200).json({ user, token });
     } catch (error) {
          res.status(400).json({ error: error.message });
     }
};

const getProfile = async (req, res) => {
     try {
          const user = await User.findOne({ username: req.params.username });
          if (!user) {
               res.status(400);
               throw Error("User not found");
          }
          res.status(200).json(user);
     } catch (error) {
          res.status(400).json({ error: error.message });
     }
};

module.exports = {
     loginUser,
     signupUser,
     getProfile,
};
