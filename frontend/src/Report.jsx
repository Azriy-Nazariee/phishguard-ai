import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

function Report() {
    const navigate = useNavigate();
    const location = useLocation();
    const reportRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    const result = location.state?.result || {
        id: null,
        date: "N/A",
        title: "N/A",
        sender: "N/A",
        isPhishing: false,
        riskScore: 0,
        riskLevel: "N/A",
        suggestion: "No data available",
        urls: [],
        flaggedKeywords: [],
    };

    useEffect(() => {
        setIsReady(true);
    }, []);

    const handlePrint = useReactToPrint({
        content: () => (reportRef.current ? reportRef.current : null),
        documentTitle: "PhishGuard_Report",
        onBeforeGetContent: () => {
            if (!reportRef.current) {
                alert("Error: Report content is not loaded yet!");
                return Promise.reject();
            }
            return Promise.resolve();
        },
    });

    return (
        <div className="min-h-screen flex flex-col items-center bg-[#333652] px-4 md:px-6 py-10">
            <div ref={reportRef} className="bg-white p-6 sm:p-8 shadow-lg rounded-lg w-full max-w-4xl">
                <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#333652] mb-4 sm:mb-6">
                    PhishGuard AI <br></br>
                    Email Analysis Report
                </h1>

                {/* Report Details */}
                <div className="mb-4 sm:mb-6 text-sm sm:text-lg">
                    <p><b>Date Analysed:</b> {result.date}</p>
                    <p><b>Email Title:</b> {result.title}</p>
                    <p><b>Sender:</b> {result.sender}</p>
                </div>

                {/* Prediction Status */}
                <h2 className="text-lg sm:text-2xl font-semibold mb-2">Analysis Result</h2>
                <div className="bg-gray-100 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
                    <p className="text-sm sm:text-lg">
                        <b>Prediction:</b>
                        <span className={`ml-2 font-bold ${result.isPhishing ? "text-red-500" : "text-green-500"}`}>
                            {result.isPhishing ? "Phishing Email" : "Legitimate Email"}
                        </span>
                    </p>
                    <p className="text-sm sm:text-lg"><b>Risk Score:</b> {result.riskScore}% ({result.riskLevel})</p>
                    <p className="text-sm sm:text-lg"><b>Recommendation:</b> {result.suggestion}</p>
                </div>

                {/* Suspicious or Verified Features Section */}
                {result.isPhishing ? (
                    // If phishing email, show suspicious features
                    <div>
                        <h2 className="text-lg sm:text-2xl font-semibold mb-2 text-red-600">
                            🚨 Suspicious Features Detected
                        </h2>
                        <div className="bg-red-100 p-3 sm:p-4 rounded-lg">
                            {result.urls.length > 0 && (
                                <p className="text-sm sm:text-lg">
                                    <b>Suspicious URLs:</b>
                                    {result.urls.map((url, index) => (
                                        <span key={index} className="text-red-500 ml-2">{url}</span>
                                    ))}
                                </p>
                            )}
                            <p className="text-sm sm:text-lg">
                                <b>Flagged Keywords:</b> {result.flaggedKeywords.join(", ")}
                            </p>
                        </div>
                    </div>
                ) : (
                    // If legitimate email, show verified features
                    <div>
                        <h2 className="text-lg sm:text-2xl font-semibold mb-2 text-green-600">
                            ✅ Verified Features
                        </h2>
                        <div className="bg-green-100 p-3 sm:p-4 rounded-lg">
                            {result.urls.length > 0 && (
                                <p className="text-sm sm:text-lg">
                                    <b>Verified URLs:</b>
                                    {result.urls.map((url, index) => (
                                        <span key={index} className="text-blue-500 ml-2">{url}</span>
                                    ))}
                                </p>
                            )}
                            <p className="text-sm sm:text-lg">
                                <b>Flagged Keywords:</b> {result.flaggedKeywords.length > 0 ? result.flaggedKeywords.join(", ") : "None"}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Action Buttons - Now Closer to the Report */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-4 mb-8">
                <button
                    onClick={() => isReady && handlePrint()}
                    className="px-4 sm:px-6 py-3 text-white text-sm sm:text-lg font-semibold rounded-lg bg-[#0f61a5] hover:bg-[#d3941a] transition-colors
                               min-w-[140px] max-w-[200px]"
                    disabled={!isReady}
                >
                    Download PDF
                </button>

                <button
                    onClick={() => navigate(`/dashboard/${result.id || ""}`)}
                    className="px-4 sm:px-6 py-3 text-white text-sm sm:text-lg font-semibold rounded-lg bg-[#0f61a5] hover:bg-[#d3941a] transition-colors
                               min-w-[140px] max-w-[200px]"
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
}

export default Report;
