import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import SignUp from "./SignUp";
import Login from "./Login";
import Home from "./Home";
import Dashboard from "./Dashboard";
import History from "./History";
import Report from "./Report";
import Feedback from "./Feedback";

const analysisResults = [
  {
    id: 1,
    date: "February 9, 2025",
    title: "Suspicious Bank Email",
    sender: "support@bánk-secure.com",
    urls: ["http://login.banksecure-check.com"],
    flaggedKeywords: ["Verify your account immediately", "Urgent action required"],
    riskScore: 85,
    riskLevel: "High Risk",
    suggestion: "This email has been identified as highly suspicious. Immediate caution is advised.",
    isPhishing: true
  },
  {
    id: 2,
    date: "February 8, 2025",
    title: "Unusual Login Attempt",
    sender: "noreply@security-notify.com",
    urls: ["http://security-notify-login.com"],
    flaggedKeywords: ["Suspicious login detected", "Reset your password"],
    riskScore: 78,
    riskLevel: "Medium-High Risk",
    suggestion: "Possible phishing attempt. Verify the source before taking action.",
    isPhishing: true
  },
  {
    id: 3,
    date: "February 7, 2025",
    title: "Fake Invoice Notice",
    sender: "billing@unknown-service.com",
    urls: ["http://download-invoice-secure.com"],
    flaggedKeywords: ["Pending invoice", "Payment required immediately"],
    riskScore: 90,
    riskLevel: "Severe Risk",
    suggestion: "Highly dangerous phishing attempt. Do not open any attachments or links.",
    isPhishing: true
  },
  {
    id: 4,
    date: "February 6, 2025",
    title: "Subscription Renewal Scam",
    sender: "renewal@fake-streaming.com",
    urls: ["http://streaming-billing-renewal.com"],
    flaggedKeywords: ["Your subscription is expiring", "Click here to renew"],
    riskScore: 72,
    riskLevel: "Medium Risk",
    suggestion: "Check the official website directly to confirm renewal requests.",
    isPhishing: true
  },
  {
    id: 5,
    date: "February 5, 2025",
    title: "Lottery Winning Scam",
    sender: "claims@lottery-notify.com",
    urls: ["http://claim-your-winnings.com"],
    flaggedKeywords: ["Congratulations! You won!", "Claim your prize"],
    riskScore: 95,
    riskLevel: "Extreme Risk",
    suggestion: "This is a classic scam. Do not provide personal details.",
    isPhishing: true
  },
  {
    id: 6,
    date: "February 4, 2025",
    title: "Job Offer Phishing",
    sender: "recruitment@fake-careers.com",
    urls: ["http://apply-for-job.com"],
    flaggedKeywords: ["Urgent job opportunity", "Apply now with your details"],
    riskScore: 80,
    riskLevel: "High Risk",
    suggestion: "Verify job offers directly with the company before sharing any details.",
    isPhishing: true
  }
];

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          
          {analysisResults.map((result) => (
            <Route
              key={result.id}
              path={`/dashboard/${result.id}`}
              element={<Dashboard result={result} />}
            />
          ))}

          <Route path="/history" element={<History analysisResults={analysisResults} />} />
          <Route path="/report" element={<Report />} /> 
          <Route path="/feedback" element={<Feedback />} />

          {/* Catch-all route */}
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-cabin">
              <div className="text-center bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mb-0">
                <div className="mb-6">
                  <img src="404.png" alt="Lost in cyberspace" className="w-64 h-64 object-cover rounded-lg items-center mx-auto" />
                </div>
                <h1 className="text-4xl font-semibold text-gray-800 mb-4">
                  Oops! This page is lost in cyberspace!
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  Looks like this page went on a little adventure and got lost. Don’t worry, we’ll guide you back home!
                </p>
                <a href="/" className="px-6 py-3 bg-gold-dark text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors">
                  Take me home, please!
                </a>
                <p className="text-sm text-gray-400 mt-4">
                  (Or you could keep exploring, but no pressure!)
                </p>
              </div>
            </div>
          } />
        </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
