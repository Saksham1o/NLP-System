import React from "react";

function Header() {
  const navItems = ["Home", "Appointments", "Reminders", "To-Do Tasks"];

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 40px",
        background: "rgba(15, 23, 42, 0.8)",  // Semi-transparent
        backdropFilter: "blur(8px)",          // Blur effect
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        fontFamily: "Sora, sans-serif",
    }}
    >
      {/* Logo / Title */}
      <h1
        style={{
          color: "#a78bfa",
          fontSize: "20px",
          fontWeight: "bold",
          letterSpacing: "0.5px",
        }}
      >
        AutoFlow AI
      </h1>

      {/* Navigation */}
      <nav style={{ display: "flex", gap: "24px" }}>
        {navItems.map((item, idx) => (
          <span
            key={idx}
            className="header-nav-item"
            style={{
              color: "#e5e7eb",
              marginTop: "6px",
              fontSize: "15px",
              cursor: "pointer",
              transition: "color 0.3s",
              position: "relative", // Needed for pseudo-element
              padding: "2px 0"
            }}
            onMouseEnter={(e) => (e.target.style.color = "#a78bfa")}
            onMouseLeave={(e) => (e.target.style.color = "#e5e7eb")}
          >
            {item}
          </span>
        ))}
        <button className="get-started-btn">Get Started</button>
      </nav>
    </header>
  );
}

export default Header;
