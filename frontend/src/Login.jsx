import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Welcome back PhishGuard AI user!");
    navigate("/home"); // Redirect to login page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#333652] py-10">
      <header className="flex items-end justify-center text-left space-x-6 p-6 mb-7">
        {/* Logo */}
        <img src="/logo.png" alt="PhishGuard AI Logo" className="w-50 h-auto" />

        {/* Text Section */}
        <div>
          <h1 className="text-3xl text-white font-bold">PhishGuard AI</h1>
          <p className="mt-2 text-2xl text-white font-poppins">
            Empowering You to <br />
            Outsmart Phishing,
            <br />
            Email by Email.
          </p>
        </div>
      </header>

      <div className="p-6 bg-white shadow-md rounded-3xl max-w-xl w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Welcome!
        </h2>
        <h2 className="text-3xl font-bold text-gray-800 text-center">
        Log In To Your Account
        </h2>
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col items-center"
        >
          <div className="w-full mb-4">
            <label
              className="block text-lg text-gray-700 text-center"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-center bg-[#e7a92f]"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="w-full mb-4">
            <label
              className="block text-lg text-gray-700 text-center"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-center bg-[#e7a92f]"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-1/2 px-6 py-3 bg-[#0f61a5] text-white font-semibold rounded-3xl hover:bg-[#084980] transition-colors mt-4"
          >
            Log In
          </button>

          <p className="mt-4 text-center">
            Do not have an account? {" "}
            <a href="/" className="text-[#0f61a5]">
              <b>Sign Up Here!</b>
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
