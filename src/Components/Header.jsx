import React from "react";

function Header() {
  const navItems = ["Home", "Appointments", "Reminders", "To-Do Tasks"];

  return (
    <header
      style={{
        background: "#0f172a",
        padding: "16px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        fontFamily: "Sora, sans-serif",
        position: "fixed",         
        top: 0,                    
        left: 0,                   
        right: 0,                  
        zIndex: 100                
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
