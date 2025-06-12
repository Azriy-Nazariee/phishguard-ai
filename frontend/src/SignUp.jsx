import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, googleProvider } from "./firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      localStorage.setItem("token", idToken);

      setTimeout(() => {
        navigate("/home");
      }, 2500);
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Email is already in use. Try logging in.");
      } else {
        setError(err.message);
      }
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      localStorage.setItem("token", idToken);

      setTimeout(() => {
        navigate("/home");
      }, 2500);
    } catch (err) {
      setError("Google sign-up failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#333652] px-4 py-10">
      {/* Header Section */}
      <header className="flex flex-col sm:flex-row items-center sm:items-end justify-center text-center sm:text-left space-y-4 sm:space-y-0 sm:space-x-6 p-6 mb-7 w-full max-w-2xl">
        <img src="/logo.png" alt="PhishGuard AI Logo" className="w-24 sm:w-32 h-auto" />
        <div>
          <h1 className="text-3xl sm:text-4xl text-white font-bold">PhishGuard AI</h1>
          <p className="mt-2 text-xl sm:text-2xl text-white font-poppins">
            Empowering You to <br className="hidden sm:block" />
            Outsmart Phishing, <br className="hidden sm:block" />
            Email by Email.
          </p>
        </div>
      </header>

      {/* Signup Box */}
      <div className="p-6 bg-white shadow-md rounded-3xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Get Started!</h2>
        <h2 className="text-3xl font-bold text-gray-800 text-center">Create a New Account</h2>

        <form onSubmit={handleEmailSignUp} className="mt-6" aria-label="Sign up form">
          {/* Email */}
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
              disabled={isSubmitting}
              aria-label="Email address"
            />
          </div>

          {/* Password */}
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
              disabled={isSubmitting}
              aria-label="Password"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-600 text-center font-semibold mt-2" role="alert">
              {error}
            </p>
          )}

          {/* Signup Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full sm:w-1/2 px-6 py-3 font-semibold rounded-3xl transition-colors mt-4 mx-auto block ${
              isSubmitting
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-[#0f61a5] text-white hover:bg-[#084980]"
            }`}
            aria-label="Sign up with email and password"
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex flex-col items-center mt-4">
          <p className="text-gray-700 font-semibold">or</p>
        </div>

        {/* Google Sign Up Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isSubmitting}
          className="mt-3 flex items-center justify-center gap-2 w-full sm:w-1/2 px-6 py-3 border border-gray-300 rounded-3xl text-gray-700 bg-white hover:bg-gray-100 transition-colors mx-auto"
          aria-label="Sign up with Google"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google logo"
            className="w-5 h-5"
          />
          {isSubmitting ? "Signing up..." : "Sign Up with Google"}
        </button>

        {/* Redirect to login */}
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-[#0f61a5] font-bold hover:underline">
            Log In Here!
          </Link>
        </p>
      </div>

      {/* Success Modal */}
      {isSubmitting && !error && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/80 backdrop-blur-md z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="loader mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800">Account Created!</h2>
            <p className="text-gray-600 mt-2">Redirecting to home...</p>
          </div>
        </div>
      )}

      {/* Spinner Style */}
      <style>{`
        .loader {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-left-color: #d3941a;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default SignUp;
