// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// export const protect = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       req.user = await User.findById(decoded.id).select("-password");
//       next();
//     } catch (error) {
//       return res.status(401).json({ message: "Not authorized, invalid token" });
//     }
//   }

//   if (!token) return res.status(401).json({ message: "No token, authorization denied" });
// };



import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  // ✅ 1. Check if Authorization header starts with "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // ✅ 2. Verify token using your secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretKey");

      // ✅ 3. Fetch the user (excluding password)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(404).json({ message: "User not found" });
      }

      next(); // proceed to next middleware or route
    } catch (error) {
      console.error("❌ Auth error:", error.message);
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
  } else {
    // ✅ 4. Handle missing token
    return res.status(401).json({ message: "No token, authorization denied" });
  }
};
