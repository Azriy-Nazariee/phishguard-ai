import React from "react";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#333652] py-10 px-4 md:px-6">
      <Navbar />

      {/* Hero Section */}
      <header className="flex flex-col items-center text-center space-y-6 p-6">
        {/* Logo */}
        <img src="/welcome.png" alt="Home Icon" className="w-40 md:w-64 h-auto max-w-full" />

        {/* Description (Now Below the Logo) */}
        <div className="flex flex-col items-center">
          <h1 className="text-3xl md:text-5xl text-white font-bold">
            Welcome to PhishGuard AI!
          </h1>
          <p className="mt-2 text-lg md:text-2xl text-white leading-relaxed max-w-3xl">
            Protect your inbox with ease. Upload your email or dataset,  
            and let our AI-powered system detect phishing threats in just seconds.
          </p>
        </div>
      </header>

      <hr className="border-t-4 border-[#d3941a] my-6 w-1/2" />

      {/* Step-by-Step Guide */}
      <div className="w-full max-w-5xl px-4 md:px-6 mt-8">
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-10">
          How It Works?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-white p-6 shadow-md rounded-3xl">
              <img src="/upload.png" alt="Upload Icon" className="w-24 md:w-32 h-auto max-w-full" />
            </div>
            <p className="mt-4 text-lg md:text-xl text-white">
              <b>Upload Your File</b>
              <br /> Drag and drop or browse your emails or datasets.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-white p-6 shadow-md rounded-3xl">
              <img src="/analyze.png" alt="Analyze Icon" className="w-24 md:w-32 h-auto max-w-full" />
            </div>
            <p className="mt-4 text-lg md:text-xl text-white">
              <b>Analyze Instantly</b>
              <br /> Our advanced AI scans for phishing threats with precision.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-white p-6 shadow-md rounded-3xl">
              <img src="/secure.png" alt="Result Icon" className="w-24 md:w-32 h-auto max-w-full" />
            </div>
            <p className="mt-4 text-lg md:text-xl text-white">
              <b>Stay Secure</b>
              <br /> Get actionable insights to safeguard your information.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-12 text-lg md:text-2xl text-white text-center px-4">
        💡 Pro Tip: Regular checks keep your data safe from evolving threats!
        <br /> Ready to secure your emails? Upload now!
      </p>

      {/* Upload Button (Redirects to First Analysis Result) */}
      <button
        onClick={() => navigate("/dashboard/1")}
        className="mt-8 px-8 md:px-10 py-3 bg-[#d3941a] text-white text-lg font-semibold rounded-lg hover:bg-[#e7a92f] transition-colors flex items-center space-x-3"
      >
        <img src="/upload-button.png" alt="Upload Icon" className="w-5 md:w-6 h-auto" />
        <span>Upload Email File / Dataset</span>
      </button>
    </div>
  );
}

export default Home;
