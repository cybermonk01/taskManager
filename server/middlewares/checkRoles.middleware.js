const checkRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.userType === role) {
      next();
    } else {
      return res.status(403).json({ message: "Unauthorized" });
    }
  };
};
module.exports = { checkRole };
