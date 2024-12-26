const Gym = require("../Models/gym");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.cookie_token; // Get token from cookies
    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SecretKey);

    // Find gym by ID
    req.gym = await Gym.findById(decoded.gym_id).select("-password"); // Corrected typo
    if (!req.gym) {
      return res.status(404).json({ error: "Gym not found" });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ error: "Token is not Valid" });
  }
};

module.exports = auth;
