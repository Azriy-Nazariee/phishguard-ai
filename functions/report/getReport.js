const { db } = require("../firebase"); // Firestore from firebase.js

const getReportHandler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).send("Method Not Allowed");
  }

  const reportId = req.params.id;

  if (!reportId) {
    return res.status(400).json({ error: "Report ID is required" });
  }

  try {
    const docRef = db.collection("Reports").doc(reportId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Report not found" });
    }

    const data = doc.data();

    return res.status(200).json({
      id: doc.id,
      date: data.date,
      title: data.title,
      sender: data.sender,
      isPhishing: data.isPhishing,
      riskScore: data.riskScore,
      riskLevel: data.riskLevel,
      suggestion: data.suggestion,
      urls: data.urls,
      limeExplanation: data.limeExplanation || [],
    });

  } catch (error) {
    console.error("Error fetching report:", error.message || error);
    return res.status(500).json({ error: "Server error while fetching report" });
  }
};

module.exports = getReportHandler;
