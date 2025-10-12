import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [preferredService, setPreferredService] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !preferredService) {
      setStatusMessage("Please fill out all fields.");
      return;
    }

    try {
      setStatusMessage("Creating your account...");

      // Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update profile with display name
      await updateProfile(user, { displayName: name });

      // Store in localStorage
      localStorage.setItem("user", JSON.stringify({ uid: user.uid, email: user.email, name }));

      setStatusMessage(`Sign up successful for ${email}!`);
      navigate("/signin");
    } catch (error) {
      setStatusMessage(error.message);
    }
  };

  const handleLoginClick = () => {
    localStorage.removeItem("user");
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-gray-900 via-purple-900/20 to-indigo-900/20"
      style={{
        background: "linear-gradient(135deg, #1C1C3A 0%, #301934 100%)",
      }}
    >
      {/* Glass Card - Responsive width and padding */}
      <div className="w-full max-w-md p-6 sm:p-8 md:p-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl text-center text-white font-sans">
        {/* Logo */}
        <div className="flex items-center justify-center mb-4 sm:mb-6">
          <svg 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 mr-2 flex-shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">AutoFlow AI</h1>
        </div>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-gray-300 mb-6 sm:mb-8">
          Create your account to start booking appointments easily.
        </p>

        {/* Form - Stacked inputs on mobile */}
        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            type="text"
            className="w-full p-4 rounded-xl border border-white/20 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-base font-medium transition-all duration-200"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            aria-label="Full Name"
          />
          <input
            type="email"
            className="w-full p-4 rounded-xl border border-white/20 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-base font-medium transition-all duration-200"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email Address"
            autoComplete="email"
          />
          <input
            type="password"
            className="w-full p-4 rounded-xl border border-white/20 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-base font-medium transition-all duration-200"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Password"
            autoComplete="new-password"
          />
          <input
            type="text"
            className="w-full p-4 rounded-xl border border-white/20 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-base font-medium transition-all duration-200"
            placeholder="Preferred Service (e.g., Doctor Appointment)"
            value={preferredService}
            onChange={(e) => setPreferredService(e.target.value)}
            required
            aria-label="Preferred Service"
          />
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-xl font-semibold text-white text-base transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg"
            style={{
              background: "linear-gradient(90deg, #8B5CF6, #EC4899)",
              boxShadow: "0 4px 20px rgba(139, 92, 246, 0.5)",
            }}
            aria-label="Sign Up"
          >
            Sign Up
          </button>
        </form>

        {/* Status Message */}
        {statusMessage && (
          <p className="mt-4 text-sm text-gray-300">{statusMessage}</p>
        )}

        {/* Login Link - Responsive text */}
        <p className="mt-6 text-xs sm:text-sm text-gray-400">
          Already have an account?{" "}
          <Link 
            to="/signin" 
            onClick={handleLoginClick}
            className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200 underline"
          >
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;