import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true); // Show success popup

    // Redirect after 3 seconds
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#333652] px-4 py-10">
      {/* Header Section */}
      <header className="flex flex-col sm:flex-row items-center sm:items-end justify-center text-center sm:text-left space-y-4 sm:space-y-0 sm:space-x-6 p-6 mb-7 w-full max-w-2xl">
        {/* Logo */}
        <img src="/logo.png" alt="PhishGuard AI Logo" className="w-24 sm:w-32 h-auto" />

        {/* Text Section */}
        <div>
          <h1 className="text-3xl sm:text-4xl text-white font-bold">PhishGuard AI</h1>
          <p className="mt-2 text-xl sm:text-2xl text-white font-poppins">
            Empowering You to <br className="hidden sm:block" />
            Outsmart Phishing, <br className="hidden sm:block" />
            Email by Email.
          </p>
        </div>
      </header>

      {/* Sign-Up Box */}
      <div className="p-6 bg-white shadow-md rounded-3xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Welcome!</h2>
        <h2 className="text-3xl font-bold text-gray-800 text-center">Sign Up With Us</h2>

        <form onSubmit={handleSubmit} className="mt-6">
          {/* Email Input */}
          <div className="w-full mb-4">
            <label className="block text-lg text-gray-700 text-center" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-center bg-[#e7a92f] text-gray-900 placeholder-gray-700 focus:ring-2 focus:ring-[#0f61a5] focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div className="w-full mb-4">
            <label className="block text-lg text-gray-700 text-center" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-center bg-[#e7a92f] text-gray-900 placeholder-gray-700 focus:ring-2 focus:ring-[#0f61a5] focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full sm:w-1/2 px-6 py-3 bg-[#0f61a5] text-white font-semibold rounded-3xl hover:bg-[#084980] transition-colors mt-4 mx-auto block"
          >
            Sign Up
          </button>

          {/* Login Link */}
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-[#0f61a5] font-bold hover:underline">
              Log In Here!
            </a>
          </p>
        </form>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/80 backdrop-blur-md">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-4/5 sm:w-96">
            <h2 className="text-xl sm:text-2xl font-bold text-[#333652]">Registration Successful!</h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Your account has been created.
            </p>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Redirecting to the login page...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUp;
