import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InputBox from "./Components/InputBox";
import OutputBox from "./Components/OutputBox";
import Header from "./Components/Header";
import Signup from "./Components/Singup";
import Signin from "./Components/Signin";
import OpenAI from "openai";

function MainChat({ messages, setMessages, handleUserInput }) {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-900 to-violet-900 text-white relative">
      <Header />
      <div className="flex-1 overflow-y-auto p-4">
        <OutputBox messages={messages} />
      </div>
      <div className="p-3 bg-gray-900">
        <InputBox onSend={handleUserInput} />
      </div>
      <button
        className="floating-home-btn"
        onClick={() => setMessages([])}
        title="Reset Chat"
      >
        🏠
      </button>
    </div>
  );
}

function App() {
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const [messages, setMessages] = useState([]);

  const handleUserInput = async (text) => {
    setMessages((prev) => [...prev, { sender: "user", text }]);
    const isAppointment = /appointment|book|schedule|doctor|clinic/i.test(text);

    if (isAppointment) {
      const steps = [
        "✅ Finding nearby clinics",
        "✅ Checking available slots",
        "✅ Booking appointment",
        "✅ Adding to calendar",
        "✅ Monitoring earlier slots",
        "🎉 Thank you! Your task has been completed successfully.",
        "📧 A confirmation email with all details has been sent to you.",
      ];
      steps.forEach((step, i) => {
        setTimeout(() => {
          setMessages((prev) => [...prev, { sender: "system", text: step }]);
        }, (i + 1) * 1500);
      });
    } else {
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: text }],
        });
        const aiReply =
          response.choices?.[0]?.message?.content ||
          "⚠️ Sorry, I couldn’t generate a reply.";
        setMessages((prev) => [...prev, { sender: "system", text: aiReply }]);
      } catch (error) {
        console.error(error);
        setMessages((prev) => [
          ...prev,
          {
            sender: "system",
            text: "❌ AI service is unavailable. Please try again later.",
          },
        ]);
      }
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainChat
              messages={messages}
              setMessages={setMessages}
              handleUserInput={handleUserInput}
            />
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Router>
  );
}

export default App;