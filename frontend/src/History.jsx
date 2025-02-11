import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";

const History = ({ analysisResults }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#333652] text-white px-6 md:px-10 pt-24 pb-16">
      <Navbar />

      {/* Header Section */}
      <header className="flex flex-col md:flex-row items-center justify-center text-center md:text-left space-y-4 md:space-y-0 md:space-x-6 mb-6">
        {/* Logo */}
        <img src="/history.png" alt="History Icon" className="w-28 md:w-36 h-auto" />

        {/* Description */}
        <h1 className="text-3xl md:text-5xl font-bold max-w-2xl">
          Get The Reports of Your Previous Analysis Here!
        </h1>
      </header>

      {/* Display either table or card layout based on screen size */}
      <div className="hidden md:block">
        {/* Table View for Larger Screens */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white text-black rounded-lg shadow-lg">
            <thead>
              <tr className="bg-[#d3941a] text-white text-sm md:text-lg">
                <th className="p-4">ID</th>
                <th className="p-4">Date Analysed</th>
                <th className="p-4">Email Title</th>
                <th className="p-4 hidden md:table-cell">Sender</th>
                <th className="p-4">Status</th>
                <th className="p-4">Report</th>
              </tr>
            </thead>
            <tbody>
              {analysisResults.length > 0 ? (
                analysisResults.map((result) => (
                  <tr key={result.id} className="border-t text-sm md:text-base">
                    <td className="p-4 text-center">{result.id}</td>
                    <td className="p-4 text-center">{result.date}</td>
                    <td className="p-4 text-center">{result.title}</td>
                    <td className="p-4 text-center hidden md:table-cell">{result.sender}</td>
                    <td className="p-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap flex items-center justify-center ${
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
                        className="px-3 md:px-4 py-2 bg-[#0f61a5] text-white rounded-lg hover:bg-[#d3941a] transition-colors inline-flex items-center space-x-2"
                      >
                        <img src="/report.png" alt="Report Icon" className="w-4 md:w-5 h-4 md:h-5" />
                        <span>View</span>
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

      {/* Card View for Smaller Screens */}
      <div className="md:hidden mt-6 space-y-4">
        {analysisResults.length > 0 ? (
          analysisResults.map((result) => (
            <div
              key={result.id}
              className="bg-white text-black p-4 rounded-lg shadow-md flex flex-col space-y-2"
            >
              <h3 className="font-bold text-lg">📧 {result.title}</h3>
              <p><b>Date:</b> {result.date}</p>
              <p><b>Sender:</b> {result.sender}</p>
              <p>
                <b>Status:</b>{" "}
                <span
                  className={`px-2 py-1 rounded-md text-xs font-semibold ${
                    result.isPhishing ? "bg-red-500 text-white" : "bg-green-500 text-white"
                  }`}
                >
                  {result.isPhishing ? "Phishing Detected" : "Safe"}
                </span>
              </p>
              <button
                onClick={() => navigate(`/dashboard/${result.id}`)}
                className="w-full px-4 py-2 bg-[#0f61a5] text-white rounded-lg hover:bg-[#d3941a] transition-colors flex items-center justify-center space-x-2"
              >
                <img src="/report.png" alt="Report Icon" className="w-4 h-4" />
                <span>View Report</span>
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No analysis history available.</p>
        )}
      </div>
    </div>
  );
};

export default History;
