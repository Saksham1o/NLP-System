import React, { useEffect, useRef } from "react";

function OutputBox({ messages }) {
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="chatbox-messages">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          style={{
            textAlign: msg.sender === "user" ? "right" : "left",
            margin: "8px 0",
            marginLeft: "20%",
            marginTop: "10px",
          }}
        >
          <span
            style={{
              display: "inline-block",
              background:
                msg.sender === "user" ? "#7c3aed" : "rgba(255,255,255,0.1)",
              backdropFilter: msg.sender === "user" ? "none" : "blur(4px)", // glass effect
              color: "#fff",
              padding: "10px 18px",
              borderRadius: "18px",
              maxWidth: "50%",
              wordBreak: "break-word",
              marginRight: msg.sender === "user" ? "25%" : "0",
            }}
          >
            {msg.text}
          </span>
        </div>
      ))}
      <div ref={messageEndRef} />
    </div>
  );
}

export default OutputBox;
