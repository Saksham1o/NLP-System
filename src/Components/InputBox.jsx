import React, { useState, useRef } from "react";

function InputBox({ onSend }) {
  const [input, setInput] = useState("");
  const fileInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`Uploaded file: ${file.name}`);
    }
  };

  return (
    <form className="chatbox-input-area" onSubmit={handleSubmit}>
      {/* Plus icon for upload */}
      <button
        type="button"
        className="chatbox-upload-btn"
        onClick={() => fileInputRef.current.click()}
        aria-label="Upload"
      >
        <svg
          width="32"
          height="32"
          fill="none"
          stroke="#a78bfa"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="16" cy="16" r="14" />
          <line x1="16" y1="10" x2="16" y2="22" />
          <line x1="10" y1="16" x2="22" y2="16" />
        </svg>
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept="image/*,application/pdf"
      />
      <input
        className="chatbox-input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button className="chatbox-submit-btn" type="submit">
        &gt;
      </button>
    </form>
  );
}

export default InputBox;
