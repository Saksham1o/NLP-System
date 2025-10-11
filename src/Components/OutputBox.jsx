import { useEffect, useRef } from "react";
import DotLoader from "./DotLoader";

function OutputBox({ messages, onOptionSelect }) {
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
          key={msg.id || idx}
          style={{
            textAlign: msg.sender === "user" ? "right" : "left",
            margin: "8px 0",
            marginLeft: msg.sender === "user" ? "0" : "20%",
            marginRight: msg.sender === "user" ? "20%" : "0",
          }}
        >
          <span
            style={{
              display: "inline-block",
              background:
                msg.sender === "user" ? "linear-gradient(135deg, #a78bfa, #ec4899)" : "rgba(255,255,255,0.1)",
              backdropFilter: msg.sender === "user" ? "none" : "blur(4px)",
              color: "#fff",
              padding: "10px 18px",
              borderRadius: "18px",
              maxWidth: "70%",
              wordBreak: "break-word",
            }}
          >
            {/* Loader OR text */}
            {msg.type === "loading" ? (
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <DotLoader />
              </div>
            ) : (
              msg.text
            )}
          </span>

          {/* Options rendered below bubble */}
          {msg.options && (
            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                marginTop: "8px",
              }}
            >
              {msg.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => onOptionSelect(option, idx)}
                  style={{
                    background: "#2563eb",
                    color: "#fff",
                    padding: "6px 12px",
                    border: "none",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}

      <div ref={messageEndRef} />
    </div>
  );
}

export default OutputBox;