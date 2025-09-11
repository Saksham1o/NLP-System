import React from "react";
import { Link } from "react-router-dom";

function Header() {
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Appointments", path: "/" },
    { label: "Reminders", path: "/" },
    { label: "To-Do Tasks", path: "/" },
  ];

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
        background: "rgba(15, 23, 42, 0.8)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        fontFamily: "Sora, sans-serif",
      }}
    >
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
      <nav style={{ display: "flex", gap: "24px" }}>
        {navItems.map((item, idx) => (
          <Link
            key={idx}
            to={item.path}
            className="header-nav-item"
            style={{
              color: "#e5e7eb",
              marginTop: "6px",
              fontSize: "15px",
              cursor: "pointer",
              transition: "color 0.3s",
              position: "relative",
              padding: "2px 0",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#a78bfa")}
            onMouseLeave={(e) => (e.target.style.color = "#e5e7eb")}
          >
            {item.label}
          </Link>
        ))}
        <Link to="/signup">
          <button className="get-started-btn">Signup</button>
        </Link>
      </nav>
    </header>
  );
}

export default Header;