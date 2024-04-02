const User = require("../models/user.model.js").User;
const ApiError = require("../utils/ApiError.js").default;
const asyncHandler = require("../utils/asyncHandler.js").default;
const jwt = require("jsonwebtoken");

exports.verifyJWT = asyncHandler(function (req, res, next) {
  try {
    console.log(req.cookie);
    const token =
      (req.cookie && req.cookie.refreshToken) ||
      (req.header("Authorization") &&
        req.header("Authorization").replace("Bearer ", ""));

    if (!token) {
      throw new ApiError(400, "refresh token nhi present");
    }

    const decodedToken = jwt.verify(token, "MERN");

    User.findById(decodedToken && decodedToken._id)
      .select("-password -refreshToken")
      .exec(function (err, user) {
        if (err) {
          throw new ApiError(401, "Invalid access Token");
        }

        if (!user) {
          throw new ApiError(401, "Invalid access Token");
        }

        req.user = user;
        next();
      });
  } catch (error) {
    throw new ApiError(400, error.message || "auth middleware error");
  }
});
