import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const { id } = useParams();
  const reportId = id;
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchAnalysis = async () => {
      try {
        const response = await axios.get(`/api/report/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResult(response.data);
      } catch (err) {
        console.error(err);
        setError("We couldn't find any analysis result with the provided ID.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-center p-8">
        <div className="text-xl font-semibold animate-pulse text-gray-700">
          Loading analysis...
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-center p-8">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg hover:shadow-2xl transition-shadow duration-300">
          <h1 className="text-3xl font-bold text-red-600 mb-6">
            Analysis Not Found
          </h1>
          <p className="text-gray-700 mb-8 text-lg">
            {error} (ID: <strong>{id}</strong>)
          </p>
          <button
            onClick={() => navigate("/history")}
            className="bg-[#d3941a] hover:bg-[#e7a92f] text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-300"
          >
            Back to History
          </button>
        </div>
      </div>
    );
  }

  const urls = result.urls || [];

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-[#454a6d] to-[#333652] py-12 px-6 md:px-8">
      {/* Analysis Completed Section */}
      <div className="flex flex-col items-center bg-white p-8 shadow-lg rounded-3xl w-full max-w-4xl mb-8 hover:shadow-2xl transition-shadow duration-300">
        <img
          src="/done.png"
          alt="Analysis Completed Icon"
          className="w-24 md:w-32 h-auto mb-5"
        />
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#333652] tracking-wide">
          Analysis Completed!
        </h2>
      </div>

      {/* Analysis Details */}
      <div className="bg-white p-8 shadow-lg rounded-3xl w-full max-w-4xl mb-8 text-center hover:shadow-2xl transition-shadow duration-300">
        <p className="text-lg md:text-xl font-semibold mb-3">
          Analysis ID: <span className="font-normal">{result.id}</span>
        </p>
        <p className="text-lg md:text-xl font-semibold mb-3">
          Date Analysed: <span className="font-normal">{result.date}</span>
        </p>
        <p className="text-lg md:text-xl font-semibold mb-3">
          Email / Dataset Title:{" "}
          <span className="font-normal">{result.title}</span>
        </p>
        <p className="text-lg md:text-xl font-semibold">
          Sender: <span className="font-normal">{result.sender}</span>
        </p>
      </div>

      {/* Analysis Result */}
      <div
        className={`flex flex-col items-center w-full max-w-4xl p-8 rounded-3xl shadow-lg transition-shadow duration-300 ${
          result.isPhishing
            ? "bg-red-50 hover:shadow-red-400"
            : "bg-green-50 hover:shadow-green-400"
        } hover:shadow-2xl`}
      >
        <h3 className="text-xl md:text-2xl font-bold mb-6 text-center">
          {result.isPhishing
            ? "⚠️ Phishing Email Detected"
            : "✅ Legitimate Email"}
        </h3>

        <img
          src={result.isPhishing ? "/phishing.png" : "/legitimate.png"}
          alt={result.isPhishing ? "Phishing Email" : "Legitimate Email"}
          className="w-24 md:w-32 h-auto mb-6"
        />

        {/* Risk Score Bar */}
        <h3 className="text-xl md:text-2xl font-bold mb-3">Risk Score</h3>
        <div className="bg-gray-300 w-full rounded-full h-8 mb-3 shadow-inner">
          <div
            className={`h-8 rounded-full text-center text-white text-base leading-8 font-semibold ${
              result.isPhishing ? "bg-red-600" : "bg-green-600"
            } transition-all duration-500 ease-in-out`}
            style={{ width: `${result.riskScore}%` }}
          >
            {result.riskScore}%
          </div>
        </div>

        {/* Risk Level */}
        <p className="text-lg font-semibold mb-6">{result.riskLevel}</p>

        {/* Suggestion */}
        <p className="text-md md:text-lg text-center mb-8 px-2 md:px-0 leading-relaxed">
          {result.suggestion}
        </p>

        {/* Suspicious Features (Phishing Only) */}
        {result.isPhishing && (
          <div className="w-full p-6 bg-red-200 rounded-lg text-center">
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-red-700">
              🚨 Suspicious Features Detected
            </h3>

            {urls.length > 0 ? (
              urls.length === 1 ? (
                <p className="text-lg break-words whitespace-normal overflow-x-auto max-w-full">
                  <b>Suspicious Links:</b>{" "}
                  <span
                    className="text-red-700 ml-2 break-words whitespace-normal"
                    style={{ wordBreak: "break-all" }}
                    title={urls[0]}
                  >
                    {urls[0]}
                  </span>
                </p>
              ) : (
                <div className="text-lg text-left inline-block break-words whitespace-normal overflow-x-auto w-full max-w-full">
                  <b>Suspicious Links:</b>
                  <ul className="list-disc list-inside mt-3 max-h-40 overflow-y-auto px-2">
                    {urls.map((url, index) => (
                      <li key={index} className="mb-1">
                        <span
                          className="text-red-700 break-words whitespace-normal"
                          style={{ wordBreak: "break-all" }}
                          title={url}
                        >
                          {url}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            ) : (
              <p className="text-lg text-green-700">
                No suspicious links detected.
              </p>
            )}

            <h4 className="mt-6 mb-2 font-semibold text-red-800">
              Top Suspicious Keywords
            </h4>
            <div className="flex flex-wrap gap-3 justify-center">
              {result.limeExplanation
                .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
                .slice(0, 5)
                .map(([keyword, weight], idx) => (
                  <span
                    key={idx}
                    className={`inline-block px-4 py-1 rounded-full text-sm font-semibold cursor-help select-none ${
                      weight < 0
                        ? "bg-green-300 text-green-900"
                        : "bg-red-300 text-red-900"
                    }`}
                    title={`${keyword}: Weight ${weight.toFixed(4)} — ${
                      weight < 0
                        ? "Decreases phishing likelihood"
                        : "Increases phishing likelihood"
                    }`}
                  >
                    {keyword}
                  </span>
                ))}
            </div>
          </div>
        )}

        {/* Verified Features (Legitimate Only) */}
        {!result.isPhishing && (
          <div className="w-full p-6 bg-green-200 rounded-lg text-center">
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-green-700">
              ✅ Verified Features
            </h3>

            {/* Verified Links as URLs, listed after the title, each on a new line */}
            {urls.length > 0 ? (
              <div className="text-lg text-left inline-block break-words whitespace-normal overflow-x-auto w-full max-w-full">
                <h4 className="mt-6 mb-2 font-bold text-green-900 text-lg md:text-xl decoration-green-700 decoration-2 text-center">
              Verified Links
              </h4>
                <ul className="list-disc list-inside mt-1 max-h-40 overflow-y-auto px-2">
                  {urls.map((url, index) => (
                    <li key={index} className="mb-1">
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 underline break-words whitespace-normal font-semibold hover:text-blue-900 transition-colors duration-200"
                        style={{ wordBreak: "break-all" }}
                        title={url}
                      >
                        {url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-lg text-green-700">
                No verified links detected.
              </p>
            )}

            {/* Top Verified Keywords with styled title and words */}
            <h4 className="mt-6 mb-2 font-bold text-green-900 text-lg md:text-xl decoration-green-700 decoration-2">
              Top Verified Keywords
            </h4>
            <div className="flex flex-wrap gap-3 justify-center">
              {result.limeExplanation
                .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
                .slice(0, 5)
                .map(([keyword, weight], idx) => (
                  <span
                    key={idx}
                    className={`inline-block px-4 py-1 rounded-full text-base font-bold cursor-help select-none border-2 ${
                      weight < 0
                        ? "bg-green-300 text-green-900 border-green-600"
                        : "bg-red-300 text-red-900 border-red-600"
                    } shadow-sm hover:shadow-lg transition-shadow duration-200`}
                    title={`${keyword}: Weight ${weight.toFixed(4)} — ${
                      weight < 0
                        ? "Decreases phishing likelihood"
                        : "Increases phishing likelihood"
                    }`}
                  >
                    {keyword}
                  </span>
                ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-6 mt-8 w-full max-w-md">
          <button
            onClick={() =>
              navigate(`/report/${reportId}`, { state: { result } })
            }
            className="flex items-center justify-center gap-3 px-8 py-3 text-white text-lg font-semibold rounded-lg bg-[#0f61a5] hover:bg-[#d3941a] transition-colors duration-300 w-full md:w-auto shadow-md hover:shadow-lg"
          >
            <img
              src="/report.png"
              alt="Report Icon"
              className="w-6 md:w-7 h-6 md:h-7"
              draggable={false}
            />
            <span>Generate Report</span>
          </button>

          <button
            onClick={() =>
              navigate("/feedback", { state: { dashboardId: result.id } })
            }
            className="flex items-center justify-center gap-3 px-8 py-3 text-white text-lg font-semibold rounded-lg bg-[#0f61a5] hover:bg-[#d3941a] transition-colors duration-300 w-full md:w-auto shadow-md hover:shadow-lg"
          >
            <img
              src="/feedback.png"
              alt="Feedback Icon"
              className="w-6 md:w-7 h-6 md:h-7"
              draggable={false}
            />
            <span>Submit Feedback</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
