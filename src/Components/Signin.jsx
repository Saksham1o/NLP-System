import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Signin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserId(parsedUser.uid || "");
        setStatusMessage(`Welcome back, ${parsedUser.email}`);
      } catch {}
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      localStorage.setItem("user", JSON.stringify({ uid: user.uid, email: user.email }));
      setUserId(user.uid);
      setStatusMessage("Login successful! Welcome back.");

      if (typeof onLogin === "function") onLogin(user);
      navigate("/");
    } catch (error) {
      setStatusMessage(error.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-gray-900 via-purple-900/20 to-indigo-900/20"
      style={{
        background: "linear-gradient(135deg, #1C1C3A 0%, #301934 100%)",
      }}
    >
      <div className="w-full max-w-md p-6 sm:p-8 md:p-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl text-center text-white font-sans">
        <div className="flex items-center justify-center mb-4 sm:mb-6">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 mr-2 flex-shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">AutoFlow AI</h1>
        </div>

        <p className="text-sm sm:text-base text-gray-300 mb-6 sm:mb-8">
          Log in to your account to use the most powerful natural language automation platform.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" className="w-full p-4 rounded-xl border border-white/20 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" className="w-full p-4 rounded-xl border border-white/20 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="w-full py-4 px-6 rounded-xl font-semibold text-white text-base transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400" style={{ background: "linear-gradient(90deg, #8B5CF6, #EC4899)" }}>
            Get Started
          </button>

          <p className="text-xs sm:text-sm text-gray-400 mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-purple-400 hover:text-purple-300 font-medium underline">
              Sign up here
            </Link>
          </p>
        </form>

        {statusMessage && <p className="mt-4 text-sm text-gray-300">{statusMessage}</p>}
        {userId && <p className="mt-2 text-xs text-gray-400">User ID: {userId}</p>}
      </div>
    </div>
  );
};

export default Signin;
