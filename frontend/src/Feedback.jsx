import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";

function Feedback() {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Extract dashboard ID from navigation state
    const [dashboardId, setDashboardId] = useState("");
    const [showPopup, setShowPopup] = useState(false); // Popup visibility state

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

        // Show popup confirmation
        setShowPopup(true);

        // Simulate submission & redirection
        setTimeout(() => {
            navigate(`/dashboard/${dashboardId}`);
        }, 3000); // Redirect after 3 seconds
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#333652]">
            <Navbar />
            <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-lg">
                <h1 className="text-2xl font-bold text-center text-[#333652] mb-4">Submit Feedback</h1>
                <p className="text-center text-gray-600 mb-6">Your feedback helps us improve PhishGuard AI.</p>

                {/* Display Dashboard ID */}
                <div className="mb-4 p-3 bg-gray-100 text-gray-700 rounded-md text-center">
                    <b>Analysis ID:</b> {dashboardId || "Loading..."}
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Feedback Type */}
                    <label className="block mb-4">
                        <span className="text-lg font-semibold">Feedback Type:</span>
                        <select
                            name="type"
                            value={feedback.type}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg mt-1"
                        >
                            <option value="Positive">Positive</option>
                            <option value="Neutral">Neutral</option>
                            <option value="Negative">Negative</option>
                        </select>
                    </label>

                    {/* Comments */}
                    <label className="block mb-4">
                        <span className="text-lg font-semibold">Additional Comments:</span>
                        <textarea
                            name="comments"
                            value={feedback.comments}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg mt-1 resize-none"
                            rows="4"
                            placeholder="Write your feedback here..."
                        ></textarea>
                    </label>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white text-lg font-semibold rounded-lg bg-[#0f61a5] hover:bg-[#d3941a] transition-colors"
                        disabled={!dashboardId} // Disable button if no ID
                    >
                        Submit Feedback
                    </button>
                </form>
            </div>

            {/* Popup Modal */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-2xl font-bold text-[#333652]">Thank You!</h2>
                        <p className="text-gray-600 mt-2">Your feedback has been submitted successfully.</p>
                        <p className="text-gray-500 mt-2">Redirecting you to the dashboard...</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Feedback;
