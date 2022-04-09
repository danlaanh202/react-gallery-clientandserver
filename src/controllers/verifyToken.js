const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1]; //Header example "Bearer headerabcxyz" so choose [1]
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        return res.status(403).json("TOKEN IS INVALID"); //if token is invalid so return status 403 with message TOKEN IS INVALID
      }
      req.user = user; //If token is valid so let req.user = current user
    });
  } else {
    return res.status(401).json("NOT AUTHENTICATED");
  }
};
const verifyAndAuthorize = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next(); // if req.user.id = req.params.id so next or req.user is Admin so next
    } else {
      return res.status(403).json("You are not allowed to do that"); // if user.id != params.id or user is not admin so they dont have permission to do anything
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not admin :D ");
    }
  });
};

module.exports = { verifyAdmin, verifyAndAuthorize, verifyToken };
