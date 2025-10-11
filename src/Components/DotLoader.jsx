const DotLoader = () => (
  <span style={{ display: "inline-block", minWidth: 24 }}>
    <span className="chat-dot" />
    <span className="chat-dot" style={{ animationDelay: "0.2s" }} />
    <span className="chat-dot" style={{ animationDelay: "0.4s" }} />
    <style>
      {`
        .chat-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          margin: 0 1.5px;
          background: #a78bfa;
          border-radius: 50%;
          animation: chat-dot-flash 1s infinite linear;
        }
        @keyframes chat-dot-flash {
          0%, 80%, 100% { opacity: 0.3;}
          40% { opacity: 1;}
        }
      `}
    </style>
  </span>
);
export default DotLoader;