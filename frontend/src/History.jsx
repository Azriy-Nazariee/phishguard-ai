import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";

const History = ({ analysisResults }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#333652] text-white p-10 pt-40">
      <Navbar />

      <header className="flex items-center justify-center text-center space-x-6 mb-10">
        {/* Logo */}
        <img src="/history.png" alt="History Icon" className="w-40 h-auto" />

        {/* Description */}
        <h1 className="text-5xl text-white font-bold max-w-2xl text-left">
          Get The Reports of Your Previous Analysis Here!
        </h1>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white text-black rounded-lg shadow-lg text-center">
          <thead>
            <tr className="bg-[#d3941a] text-white">
              <th className="p-4">ID</th>
              <th className="p-4">Date Analysed</th>
              <th className="p-4">Email Title</th>
              <th className="p-4">Sender</th>
              <th className="p-4">Status</th>
              <th className="p-4">Report</th>
            </tr>
          </thead>
          <tbody>
            {analysisResults.length > 0 ? (
              analysisResults.map((result) => (
                <tr key={result.id} className="border-t">
                  <td className="p-4 text-center">{result.id}</td>
                  <td className="p-4 text-center">{result.date}</td>
                  <td className="p-4 text-center">{result.title}</td>
                  <td className="p-4 text-center">{result.sender}</td>
                  <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap flex items-center justify-center ${
                        result.isPhishing
                          ? "bg-red-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {result.isPhishing ? "Phishing Detected" : "Safe"}
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() => navigate(`/dashboard/${result.id}`)}
                      className="px-4 py-2 bg-[#0f61a5] text-white rounded-lg hover:bg-[#d3941a] transition-colors inline-flex items-center space-x-2"
                    >
                      <img
                        src="/report.png"
                        alt="Report Icon"
                        className="w-5 h-5"
                      />
                      <span>View Report</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No analysis history available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
