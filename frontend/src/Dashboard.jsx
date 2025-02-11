import React from "react";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";

function Dashboard({ result }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#333652] py-10 px-4 md:px-6 pt-20">
      <Navbar />

      {/* Analysis Summary Section */}
      <div className="flex flex-col md:flex-row w-full max-w-5xl space-y-6 md:space-y-0 md:space-x-6 mb-8">
        {/* Analysis Completed */}
        <div className="flex flex-col items-center bg-white p-6 shadow-md rounded-3xl w-full md:w-1/2">
          <img
            src="/done.png"
            alt="Analysis Completed Icon"
            className="w-20 md:w-30 h-auto mb-4"
          />
          <h2 className="text-xl md:text-2xl font-bold text-[#333652]">
            Analysis Completed!
          </h2>
        </div>

        {/* Analysis Details */}
        <div className="flex flex-col bg-white p-6 shadow-md rounded-3xl w-full md:w-1/2">
          <p className="text-md md:text-lg font-semibold">
            Date Analysed: <span className="font-normal">{result.date}</span>
          </p>
          <p className="text-md md:text-lg font-semibold">
            Email / Dataset Title:{" "}
            <span className="font-normal">{result.title}</span>
          </p>
          <p className="text-md md:text-lg font-semibold">
            Sender: <span className="font-normal">{result.sender}</span>
          </p>
        </div>
      </div>

      {/* Analysis Results Section */}
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white p-6 shadow-md rounded-3xl">
        {/* Right Section - Prediction Status & Risk Score */}
        <div className="w-full md:w-1/2 pr-0 md:pr-6 flex flex-col items-center border-b md:border-r md:border-b-0 border-gray-300 pb-6 md:pb-0">
          <h3 className="text-lg md:text-xl font-bold">Prediction Status</h3>
          <div className="flex flex-col items-center p-4 rounded-lg mb-6">
            <img
              src={result.isPhishing ? "/phishing.png" : "/legitimate.png"}
              alt={result.isPhishing ? "Phishing Detected" : "Legitimate Email"}
              className="w-20 md:w-30 h-auto mb-2"
            />
            <h3
              className={`text-lg md:text-xl font-bold ${
                result.isPhishing ? "text-red-500" : "text-green-500"
              }`}
            >
              {result.isPhishing ? "Phishing Email" : "Legitimate Email"}
            </h3>
          </div>

          {/* Risk Score & Prediction */}
          <div className="flex flex-col items-center w-full">
            <h3 className="text-lg md:text-xl font-bold mb-4">Risk Score</h3>
            <div className="bg-gray-300 w-full rounded-full h-6 mb-4">
              <div
                className="bg-red-600 h-6 rounded-full text-center text-white text-sm leading-6"
                style={{ width: `${result.riskScore}%` }}
              >
                {result.riskScore}% {result.riskLevel}
              </div>
            </div>
            <p className="text-md md:text-lg text-center">{result.suggestion}</p>
          </div>
        </div>

        {/* Left Section - Suspicious Features & Actions */}
        <div className="w-full md:w-1/2 pl-0 md:pl-6 mt-6 md:mt-0">
          <h3 className="text-lg md:text-xl font-bold mb-4">
            Suspicious Features Detected
          </h3>
          {result.urls.map((url, index) => (
            <p key={index} className="text-md md:text-lg">
              <b>URLs:</b> <span className="text-red-500">{url}</span>
            </p>
          ))}
          <p className="text-md md:text-lg mt-3">
            <b>Flagged Keywords:</b> {result.flaggedKeywords.join(", ")}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-6">
            <button
              onClick={() => navigate("/report", { state: { result } })}
              className="flex items-center gap-2 px-6 py-3 text-white text-md md:text-lg font-semibold rounded-lg bg-[#0f61a5] hover:bg-[#d3941a] transition-colors"
            >
              <img src="/report.png" alt="Report Icon" className="w-5 md:w-6 h-5 md:h-6" />
              <span>Generate Report</span>
            </button>

            <button
              onClick={() =>
                navigate("/feedback", { state: { dashboardId: result.id } })
              }
              className="flex items-center gap-2 px-6 py-3 text-white text-md md:text-lg font-semibold rounded-lg bg-[#0f61a5] hover:bg-[#d3941a] transition-colors"
            >
              <img src="/feedback.png" alt="Feedback Icon" className="w-5 md:w-6 h-5 md:h-6" />
              <span>Submit Feedback</span>
            </button>
          </div>
        </div>
      </div>

      {/* Back to Menu Button */}
      <button
        onClick={() => navigate("/home")}
        className="mt-6 px-6 py-3 text-white text-lg font-semibold rounded-lg bg-[#d3941a] hover:bg-[#e7a92f] transition-colors"
      >
        Back to Homepage
      </button>
    </div>
  );
}

export default Dashboard;
