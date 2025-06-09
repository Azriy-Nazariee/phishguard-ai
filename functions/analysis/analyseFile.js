import multer from "multer";
import { getDB } from "../db.js";
import axios from "axios";
import { simpleParser } from "mailparser";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const analyseFileHandler = [
  upload.single("file"),
  async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const userId = req.userId;
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized. No user ID found." });
      }

      // Utility: Extract URLs
      function extractUrls(text) {
        const urlRegex = /(https?:\/\/[^\s"<>()]+)|(www\.[^\s"<>()]+)/gi;
        const matches = text.match(urlRegex);
        return matches ? [...new Set(matches)] : [];
      }

      // Default metadata
      let emailText = file.buffer.toString("utf-8");
      let sender = "unknown@example.com";
      let subject = "(No Subject)";
      let receiver = "user@example.com";
      let emailDate = new Date().toISOString();

      // Parse .eml files
      if (file.originalname.endsWith(".eml")) {
        const parsed = await simpleParser(file.buffer);
        sender = parsed.from?.text || sender;
        subject = parsed.subject || subject;
        receiver = parsed.to?.text || receiver;
        emailDate = parsed.date?.toISOString() || emailDate;
        emailText = parsed.text || parsed.html || emailText;
      }

      const extractedUrls = extractUrls(emailText);

      // Send data to ML API with LIME explanation
      const mlResponse = await axios.post("http://localhost:8000/predict", {
        body: emailText,
        subject,
        sender,
        receiver,
        date: emailDate,
        urls: extractedUrls,
      });

      const { random_forest } = mlResponse.data;

      const rfConfidence = random_forest.confidence;
      const prediction = random_forest.prediction;
      const limeExplanation = random_forest.lime_explanation || [];

      // Risk scoring purely from model confidence
      let riskScore = Math.round(rfConfidence * 100);

      let riskLevel = "Low";
      if (riskScore >= 80) riskLevel = "High";
      else if (riskScore >= 50) riskLevel = "Medium";

      const analysisResult = {
        phishingDetected: prediction === "phishing",
        confidence: rfConfidence,
        riskScore,
        riskLevel,
        suggestion: prediction === "phishing"
          ? "Do not click links or respond"
          : "No action needed",
        limeExplanation,  // <-- include LIME explanation here
        urls: extractedUrls,
      };

      const db = getDB();
      const reportsCollection = db.collection("Reports");

      const reportDoc = {
        userId,
        date: new Date(),
        title: subject,
        sender,
        isPhishing: analysisResult.phishingDetected,
        riskScore: analysisResult.riskScore,
        riskLevel: analysisResult.riskLevel,
        suggestion: analysisResult.suggestion,
        urls: analysisResult.urls,
        limeExplanation,  // save LIME explanation in DB too
        modelResults: {
          random_forest,
        },
      };

      const insertResult = await reportsCollection.insertOne(reportDoc);

      return res.status(200).json({
        message: "File analyzed and report saved successfully",
        reportId: insertResult.insertedId,
        analysisResult,
      });

    } catch (error) {
      console.error("Error analyzing file:", error.message || error);
      return res.status(500).json({ error: "Server error during analysis" });
    }
  },
];

export default analyseFileHandler;
