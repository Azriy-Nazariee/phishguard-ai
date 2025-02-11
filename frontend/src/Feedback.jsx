import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";

function Feedback() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [dashboardId, setDashboardId] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        if (location.state?.dashboardId) {
            setDashboardId(location.state.dashboardId);
        } else {
            console.warn("No dashboard ID found in navigation state.");
        }
    }, [location.state]);

    const [feedback, setFeedback] = useState({
        type: "Positive",
        comments: "",
    });

    const handleChange = (e) => {
        setFeedback({ ...feedback, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Feedback submitted:", { dashboardId, ...feedback });

        setShowPopup(true);

        setTimeout(() => {
            navigate(`/dashboard/${dashboardId}`);
        }, 3000);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#333652] px-4">
            <Navbar />
            <div className="bg-white p-6 sm:p-8 shadow-lg rounded-lg w-full max-w-lg">
                <h1 className="text-xl sm:text-2xl font-bold text-center text-[#333652] mb-4">Submit Feedback</h1>
                <p className="text-center text-gray-600 mb-6">Your feedback helps us improve PhishGuard AI.</p>

                {/* Display Dashboard ID */}
                <div className="mb-4 p-3 bg-gray-100 text-gray-700 rounded-md text-center text-sm sm:text-base">
                    <b>Analysis ID:</b> {dashboardId || "Loading..."}
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Feedback Type */}
                    <label className="block mb-4">
                        <span className="text-sm sm:text-lg font-semibold">Feedback Type:</span>
                        <select
                            name="type"
                            value={feedback.type}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg mt-1 text-sm sm:text-base"
                        >
                            <option value="Positive">Positive</option>
                            <option value="Neutral">Neutral</option>
                            <option value="Negative">Negative</option>
                        </select>
                    </label>

                    {/* Comments */}
                    <label className="block mb-4">
                        <span className="text-sm sm:text-lg font-semibold">Additional Comments:</span>
                        <textarea
                            name="comments"
                            value={feedback.comments}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg mt-1 resize-none text-sm sm:text-base"
                            rows="4"
                            placeholder="Write your feedback here..."
                        ></textarea>
                    </label>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white text-sm sm:text-lg font-semibold rounded-lg bg-[#0f61a5] hover:bg-[#d3941a] transition-colors"
                        disabled={!dashboardId}
                    >
                        Submit Feedback
                    </button>
                </form>
            </div>

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900/80 backdrop-blur-md">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center w-4/5 sm:w-96">
                        <h2 className="text-xl sm:text-2xl font-bold text-[#333652]">Thank You!</h2>
                        <p className="text-gray-600 mt-2 text-sm sm:text-base">
                            Your feedback has been submitted successfully.
                        </p>
                        <p className="text-gray-500 mt-2 text-sm sm:text-base">
                            Redirecting you to the dashboard...
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Feedback;
