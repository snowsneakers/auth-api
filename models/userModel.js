const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
     {
          username: { type: String, required: true, unique: true },
          password: { type: String, required: true },
     },
     { timestamps: true }
);

userSchema.statics.signup = async function (username, password) {
     if (!username || !password) {
          throw Error("All fields must be filled");
     }

     const exists = await this.findOne({ username });
     if (exists) {
          throw Error("Username already exists");
     }

     if (!validator.isStrongPassword(password)) {
          throw Error("Password is not strong enough");
     }

     const hash = await bcrypt.hash(password, 10);

     const user = this.create({ username, password: hash });
     return user;
};

userSchema.statics.login = async function (username, password) {
     if (!username || !password) {
          throw Error("All fields must be filled");
     }

     const user = await this.findOne({ username });

     if (!user) {
          throw Error("Incorrect username");
     }

     const compare = await bcrypt.compare(password, user.password);

     if (!compare) {
          throw Error("Incorrect password");
     }

     return user;
};

module.exports = mongoose.model("user", userSchema);
