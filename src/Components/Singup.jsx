import React, { useState, useEffect, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setLogLevel } from "firebase/firestore";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyD0moD_84jGNs090Y4N6HnUA3PXV3BQ3NA",
  authDomain: "nlp-d-c9784.firebaseapp.com",
  projectId: "nlp-d-c9784",
  storageBucket: "nlp-d-c9784.appspot.com",
  messagingSenderId: "1076330002056",
  appId: "1:1076330002056:web:afcb019178a9c2ec0e913d",
  measurementId: "G-75SKM2BZ0E",
};

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [preferredService, setPreferredService] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [userId, setUserId] = useState("");

  const authRef = useRef(null);
  const dbRef = useRef(null);

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
    .user-id {
      font-size: 0.85rem;
      margin-top: 16px;
      color: #e5e7eb;
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

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    authRef.current = getAuth(app);
    dbRef.current = getFirestore(app);
    setLogLevel("debug");
    signInAnonymously(authRef.current).catch(() => {});
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(authRef.current, email, password);
      setUserId(userCredential.user.uid);
      setStatusMessage("Sign up successful! Welcome.");
    } catch (error) {
      setStatusMessage("Sign up failed. " + error.message);
    }
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
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
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
        {userId && <p className="user-id">User ID: {userId}</p>}
        <p className="login-text">
          Already have an account? <a href="/signin">Log in here</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;