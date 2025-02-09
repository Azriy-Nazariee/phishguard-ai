import React from "react";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Home() {
    const navigate = useNavigate(); // Initialize navigate function
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#333652] py-10 px-6">
      <Navbar />
      {/* Hero Section */}
      <header className="flex items-center space-x-6 p-6 ">
        {/* Logo */}
        <img src="/welcome.png" alt="home icon" className="w-70 h-auto" />

        {/* Description */}
        <div className="items-center">
          <h1 className="text-5xl text-white font-bold">
            Welcome to PhishGuard AI!
          </h1>
          <p className="mt-2 text-2xl text-white">
            Protect your inbox with ease. Upload your email or dataset,{" "}
            <br></br>and let our AI-powered system detect phishing threats in
            just seconds..
          </p>
        </div>
      </header>

      {/* Step-by-Step Guide */}
      <div className="w-3/4">
        <h2 className="text-5xl font-bold text-white text-center mb-10">
          How It Works?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="flex items-center space-x-4">
            <div className="bg-white p-6 shadow-md rounded-3xl flex items-center">
              <img
                src="/upload.png"
                alt="Upload Icon"
                className="w-50 h-auto"
              />
            </div>
            <p className="text-xl text-white">
              <b>Upload Your File</b>
              <br></br> Drag and drop or browse your emails or datasets.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex items-center space-x-4">
            <div className="bg-white p-6 shadow-md rounded-3xl flex items-center">
              <img
                src="/analyze.png"
                alt="Analyze Icon"
                className="w-50 h-auto"
              />
            </div>
            <p className="text-xl text-white">
              <b>Analyze Instantly</b>
              <br></br> Our advanced AI scans for phishing threats with
              precision.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex items-center space-x-4">
            <div className="bg-white p-6 shadow-md rounded-3xl flex items-center">
              <img
                src="/secure.png"
                alt="Result Icon"
                className="w-50 h-auto"
              />
            </div>
            <p className="text-xl text-white">
              <b>Stay Secure</b>
              <br></br> Get actionable insights to safeguard your information.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-12 text-2xl text-white text-center">
        💡 Pro Tip: Regular checks keep your data safe from evolving threats!
        <br></br>Ready to secure your emails? Upload now!
      </p>

      {/* Upload Button (Redirects to First Analysis Result) */}
      <button
        onClick={() => navigate("/dashboard/1")} // Navigate to first analysis result
        className="mt-8 px-10 py-3 bg-[#d3941a] text-white text-lg font-semibold rounded-lg hover:bg-[#e7a92f] transition-colors flex items-center space-x-3"
      >
        <img src="/upload-button.png" alt="Upload Icon" className="w-6 h-6" />
        <span>Upload Email File / Dataset</span>
      </button>
    </div>
  );
}

export default Home;
