const { admin, db } = require("../firebase");

const signUpHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // Check if user already exists
    const userRecord = await admin.auth().getUserByEmail(email).catch(() => null);
    if (userRecord) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Create user with Firebase Auth
    const newUser = await admin.auth().createUser({
      email,
      password,
    });

    // Optional: Store extra user info in Firestore
    await db.collection("users").doc(newUser.uid).set({
      email,
      createdAt: new Date(),
    });

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = signUpHandler;
