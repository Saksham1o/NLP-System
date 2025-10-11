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
    <div className="bg-gray-900 p-3">
      <form
        className="chatbox-input-area flex items-center"
        onSubmit={handleSubmit}
      >
        {/* Plus icon for upload */}
        <button
          type="button"
          className="chatbox-upload-btn mr-2"
          onClick={() => fileInputRef.current.click()}
          aria-label="Upload"
        >
          <svg
            width="28"
            height="28"
            fill="none"
            stroke="#a78bfa"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="14" cy="14" r="12" />
            <line x1="14" y1="9" x2="14" y2="19" />
            <line x1="9" y1="14" x2="19" y2="14" />
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
          className="chatbox-input flex-1 px-3 py-2 rounded-md bg-gray-800 text-white outline-none"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />

        <button
          className="chatbox-submit-btn ml-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md text-white font-bold"
          type="submit"
        >
          &gt;
        </button>
      </form>
    </div>
  );
}

export default InputBox;