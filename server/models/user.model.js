const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: { type: String },
  userType: { type: String, enum: ["Admin", "Manager", "Developer"] },
  email: { type: String },
  password: { type: String },
});

userSchema.pre("save", function (next) {
  let user = this;
  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.hash(user.password, 12, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function (password, next) {
  bcrypt.compare(password, this.password, function (err, match) {
    if (err) {
      return next(err, false);
    }
    return next(null, match);
  });
};

const User = mongoose.model("User", userSchema);
module.exports = User;
