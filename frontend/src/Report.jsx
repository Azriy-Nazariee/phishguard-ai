import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Navbar from "./components/Navbar";

function Report() {
    const navigate = useNavigate();
    const location = useLocation();
    const reportRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    // Ensure result has default values
    const result = location.state?.result || {
        id: null,  // Ensure there's a placeholder for the ID
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

    // Ensure component is fully loaded before enabling printing
    useEffect(() => {
        setIsReady(true);
    }, []);

    // Function to trigger printing
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
        <div className="min-h-screen flex flex-col bg-[#333652]">
            <Navbar />
            <div className="flex-grow flex items-center justify-center">
                <div ref={reportRef} className="bg-white p-8 shadow-lg rounded-lg w-full max-w-4xl">
                    <h1 className="text-3xl font-bold text-center text-[#333652] mb-6">
                        PhishGuard AI<br></br> 
                    </h1>
                    <hr className="mb-4" />

                    {/* Report Details */}
                    <div className="mb-6">
                        <p className="text-lg"><b>Date Analysed:</b> {result.date}</p>
                        <p className="text-lg"><b>Email Title:</b> {result.title}</p>
                        <p className="text-lg"><b>Sender:</b> {result.sender}</p>
                    </div>

                    {/* Prediction Status */}
                    <h2 className="text-2xl font-semibold mb-2">Analysis Result</h2>
                    <div className="bg-gray-100 p-4 rounded-lg mb-6">
                        <p className="text-lg">
                            <b>Prediction:</b> 
                            <span className={`ml-2 font-bold ${result.isPhishing ? "text-red-500" : "text-green-500"}`}>
                                {result.isPhishing ? "Phishing Email" : "Legitimate Email"}
                            </span>
                        </p>
                        <p className="text-lg"><b>Risk Score:</b> {result.riskScore}% ({result.riskLevel})</p>
                        <p className="text-lg"><b>Recommendation:</b> {result.suggestion}</p>
                    </div>

                    {/* Suspicious Features */}
                    <h2 className="text-2xl font-semibold mb-2">Suspicious Features Detected</h2>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        {result.urls.length > 0 && (
                            <p className="text-lg"><b>URLs:</b> 
                                {result.urls.map((url, index) => (
                                    <span key={index} className="text-red-500 ml-2">{url}</span>
                                ))}
                            </p>
                        )}
                        <p className="text-lg"><b>Flagged Keywords:</b> {result.flaggedKeywords.join(", ")}</p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mb-12">
                <button
                    onClick={() => isReady && handlePrint()}
                    className="px-6 py-3 text-white text-lg font-semibold rounded-lg bg-[#0f61a5] hover:bg-[#d3941a] transition-colors"
                    disabled={!isReady}
                >
                    Download Report (PDF)
                </button>

                <button
                    onClick={() => navigate(`/dashboard/${result.id || ""}`)}
                    className="px-6 py-3 text-white text-lg font-semibold rounded-lg bg-[#0f61a5] hover:bg-[#d3941a] transition-colors"
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
}

export default Report;
