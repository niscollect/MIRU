const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../config/jwt");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 1️⃣ Check header presence
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    // 2️⃣ Extract token
    const token = authHeader.split(" ")[1];

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: "product-discovery-api",
      audience: "seller-app",
    });

    // 4️⃣ Fetch user
    const user = await User.findById(decoded.id);

    // 5️⃣ Enforce account state
    if (!user || !user.isActive) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // 6️⃣ Attach safe user object
    req.user = user.toSafeObject();

    next();
  } catch (err) {
    // 7️⃣ Handle expired token cleanly
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    // 8️⃣ Handle all other auth errors
    return res.status(401).json({ message: "Unauthorized" });
  }
};
