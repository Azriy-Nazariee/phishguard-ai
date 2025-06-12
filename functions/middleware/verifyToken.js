const admin = require("firebase-admin");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.userId = decodedToken.uid; // ✅ Add Firebase UID to request
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(403).json({ error: "Unauthorized: Invalid token" });
  }
};

module.exports = verifyToken;
