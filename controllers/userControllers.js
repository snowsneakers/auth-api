const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const generateToken = (_id) => {
     return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const signupUser = async (req, res) => {
     const { username, password } = req.body;
     try {
          const user = await User.signup(username, password);
          const token = generateToken(user._id);
          res.status(201).json({ username, token });
     } catch (error) {
          res.status(400).json({ error: error.message });
     }
};

const loginUser = async (req, res) => {
     const { username, password } = req.body;
     try {
          const user = await User.login(username, password);
          const token = generateToken(user._id);
          res.status(200).json({ username, token });
     } catch (error) {
          res.status(400).json({ error: error.message });
     }
};

module.exports = {
     loginUser,
     signupUser,
};
