import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import Emergency from "./Pages/Emergency";
import OpenAI from "openai";
import MyTask from "./Pages/Mytasks";
import Setting from "./Pages/Setting";
import Home from "./Pages/Home";

function App() {
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [bookingStep, setBookingStep] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [tempAppointment, setTempAppointment] = useState({});

  // auth
  const getStoredUser = () => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed && parsed.email ? parsed : null;
    } catch {
      return null;
    }
  };

  const [user, setUser] = useState(() => getStoredUser());
  const isAuthenticated = !!user;

  const handleLogin = (userObj) => {
    localStorage.setItem("user", JSON.stringify(userObj));
    setUser(userObj);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // --- Chat logic unchanged ---
  const addAppointmentFromChat = (newAppointment) => {
    setAppointments((prev) => [...prev, { ...newAppointment, id: Date.now() }]);
  };

  const checkIntent = (text) => {
    const bookingPattern =
      /\b(book|schedule)\s+(an?\s+)?(appointment|meeting)\s+(to|with)?\s*doctor\b/i;
    if (bookingPattern.test(text)) return "BOOK_APPOINTMENT";
    return "GENERAL_QUERY";
  };

  const handleBookingFlow = (text) => {
    if (bookingStep === null) {
      setMessages((prev) => [
        ...prev,
        { sender: "system", text: "✅ Finding nearby clinics..." },
      ]);
      setTimeout(() => {
        const clinicOptions = [
          "🏥 City Hospital",
          "🏥 Green Valley Clinic",
          "🏥 Sunrise Health Center",
        ];
        setMessages((prev) => [
          ...prev,
          {
            sender: "system",
            text: "Please select a clinic:",
            options: clinicOptions,
          },
        ]);
        setBookingStep("SELECT_CLINIC");
        setTempAppointment({ title: "Doctor's Appointment" });
      }, 1000);
    } else if (bookingStep === "SELECT_CLINIC") {
      setTempAppointment((prev) => ({ ...prev, location: text }));
      setMessages((prev) => [
        ...prev,
        { sender: "system", text: "✅ Checking available slots..." },
      ]);
      setTimeout(() => {
        const slots = [
          "📅 Sep 12, 10:00 AM",
          "📅 Sep 12, 2:30 PM",
          "📅 Sep 13, 11:00 AM",
        ];
        setMessages((prev) => [
          ...prev,
          { sender: "system", text: "Available slots:", options: slots },
        ]);
        setBookingStep("SELECT_SLOT");
      }, 1000);
    } else if (bookingStep === "SELECT_SLOT") {
      const [date, time] = text.replace("📅", "").trim().split(", ");
      setMessages((prev) => [
        ...prev,
        { sender: "system", text: "✅ Adding to calendar..." },
      ]);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: "system", text: "🎉 Appointment confirmed!" },
          {
            sender: "system",
            text: "📧 Confirmation email sent with details.",
          },
        ]);
        addAppointmentFromChat({ ...tempAppointment, date, time });
        setBookingStep(null);
        setTempAppointment({});
      }, 1000);
    }
  };

  const handleOptionSelect = (option) => {
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: option },
    ]);
    handleBookingFlow(option);
  };

  const handleDeleteAppointment = (id) => {
    setAppointments((prev) => prev.filter((appt) => appt.id !== id));
  };

  const handleUserInput = async (text) => {
    setMessages((prev) => [...prev, { sender: "user", text }]);
    const intent = checkIntent(text);
    if (bookingStep !== null || intent === "BOOK_APPOINTMENT") {
      handleBookingFlow(text);
      return;
    }
    const loadingId = `loading-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: loadingId, sender: "system", type: "loading" },
    ]);
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: text }],
      });
      const aiReply =
        response.choices?.[0]?.message?.content ||
        "⚠️ Sorry, couldn’t generate a reply.";
      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingId ? { sender: "system", text: aiReply } : m
        )
      );
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingId
            ? {
                sender: "system",
                text: "❌ AI service unavailable.",
              }
            : m
        )
      );
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            activeChat={activeChat}
            messages={messages}
            setMessages={setMessages}
            handleUserInput={handleUserInput}
            handleOptionSelect={handleOptionSelect}
            chats={chats}
            setChats={setChats}
            setActiveChat={setActiveChat}
            handleLogout={handleLogout}
            isAuthenticated={isAuthenticated}
            user={user}
          />
        }
      />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/signin"
        element={<Signin onLogin={handleLogin} user={user} />}
      />
      <Route
        path="/mytasks"
        element={
          isAuthenticated ? (
            <MyTask
              appointments={appointments}
              handleDeleteAppointment={handleDeleteAppointment}
            />
          ) : (
            <Navigate to="/signin" replace />
          )
        }
      />
      <Route
        path="/settings"
        element={
          isAuthenticated ? (
            <Setting handleLogout={handleLogout} />
          ) : (
            <Navigate to="/signin" replace />
          )
        }
      />
      <Route
        path="/emergency"
        element={
          isAuthenticated ? <Emergency /> : <Navigate to="/signin" replace />
        }
      />
    </Routes>
  );
}

export default App;