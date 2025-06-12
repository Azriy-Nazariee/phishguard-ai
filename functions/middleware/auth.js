const { getAuth } = require("firebase-admin/auth");

const authenticateFirebaseUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization header missing or invalid" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = await getAuth().verifyIdToken(idToken);
    req.userId = decodedToken.uid;
    req.email = decodedToken.email;
    next();
  } catch (err) {
    console.error("Firebase ID token verification error:", err);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

module.exports = authenticateFirebaseUser;
