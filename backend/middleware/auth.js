const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../config/jwt");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];


    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: "product-discovery-api",
      audience: "seller-app",
    });


    const user = await User.findById(decoded.id);

  
    if (!user || !user.isActive) {
      return res.status(401).json({ message: "Invalid token" });
    }


    req.user = user.toSafeObject();

    next();
  } catch (err) {
   
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

 
    return res.status(401).json({ message: "Unauthorized" });
  }
};
