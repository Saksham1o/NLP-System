import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [preferredService, setPreferredService] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
    .glass-card {
      background: rgba(255, 255, 255, 0.12);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1.5px solid rgba(255, 255, 255, 0.18);
      border-radius: 20px;
      width: 100%;
      max-width: 400px;
      padding: 40px;
      text-align: center;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);
    }
    .input-field {
      width: 100%;
      padding: 14px 16px;
      margin-bottom: 20px;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.22);
      background: rgba(255,255,255,0.08);
      color: #fff;
      font-size: 1rem;
      transition: all 0.3s ease;
    }
    .input-field:focus {
      background: rgba(255,255,255,0.18);
      border-color: #a78bfa;
      box-shadow: 0 0 10px rgba(139,92,246,0.3);
      outline: none;
    }
    .input-field::placeholder {
      color: #e5e7eb;
      opacity: 0.8;
    }
    .glow-button {
      width: 100%;
      padding: 14px;
      border: none;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 600;
      color: #fff;
      background: linear-gradient(90deg, #8B5CF6, #EC4899);
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .glow-button:hover {
      transform: scale(1.03);
      box-shadow: 0 4px 20px rgba(139,92,246,0.5);
    }
    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }
    .logo svg {
      height: 32px;
      width: 32px;
      color: #a78bfa;
      margin-right: 10px;
    }
    .title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #fff;
    }
    .subtitle {
      font-size: 0.9rem;
      color: #e5e7eb;
      margin-bottom: 24px;
    }
    .login-text {
      margin-top: 1rem;
      font-size: 0.85rem;
      color: #d1d5db;
    }
    .login-text a {
      color: #a78bfa;
      font-weight: 500;
      text-decoration: none;
    }
    .status {
      margin-top: 0.8rem;
      font-size: 0.85rem;
      color: #e5e7eb;
    }
  `;

  const handleSignUp = (e) => {
    e.preventDefault();
    setStatusMessage("Simulating sign-up...");

    setTimeout(() => {
      console.log("Collected Sign Up Data:", {
        name,
        email,
        preferredService,
      });
      setName("");
      setEmail("");
      setPassword("");
      setPreferredService("");
      setStatusMessage(`Sign up successful for ${email}! (Simulated)`);
      // Clear any old login data to avoid redirect bug
      localStorage.removeItem("user");
    }, 1500);
  };

  const handleLoginClick = () => {
    // Clear any stored user before navigating
    localStorage.removeItem("user");
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "linear-gradient(135deg, #1C1C3A 0%, #301934 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <style>{styles}</style>
      <div className="glass-card">
        <div className="logo">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <h1 className="title">AutoFlow AI</h1>
        </div>
        <p className="subtitle">
          Create your account to start booking appointments easily.
        </p>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            className="input-field"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            className="input-field"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="input-field"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="text"
            className="input-field"
            placeholder="Preferred Service"
            value={preferredService}
            onChange={(e) => setPreferredService(e.target.value)}
            required
          />
          <button type="submit" className="glow-button">
            Sign Up
          </button>
        </form>
        {statusMessage && <p className="status">{statusMessage}</p>}
        <p className="login-text">
          Already have an account?{" "}
          <Link to="/signin" onClick={handleLoginClick}>
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;