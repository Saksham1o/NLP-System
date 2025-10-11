import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

function Header() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [forceOpen, setForceOpen] = useState(false);
  const menuRef = useRef();

  // Close on click outside if permanently open
  useEffect(() => {
    if (!forceOpen) return;
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setForceOpen(false);
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [forceOpen]);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "My Task", path: "/Mytasks" },
    { label: "Settings", path: "/settings" },
    { label: "Emergency", path: "/emergency" },
  ];

  const handleLogout = () => {
    // Add your logout logic here (clear auth, redirect, etc.)
    localStorage.removeItem("user");
    navigate("/signin");
  };

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
      <div className="logo" style={{ display: "flex", alignItems: "center" }}>
        <svg
          fill="none"
          stroke="white"
          viewBox="0 0 24 24"
          width="32"
          height="32"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        <h1
          style={{
            color: "#a78bfa",
            fontSize: "24px",
            fontWeight: "bold",
            letterSpacing: "0.5px",
            marginLeft: "8px",
            display: "inline-block",
          }}
        >
          AutoFlow AI
        </h1>
      </div>

      <nav
        style={{
          display: "flex",
          gap: "24px",
          alignItems: "center",
          position: "relative",
        }}
      >
        {navItems.map((item, idx) => (
          <Link
            key={idx}
            to={item.path}
            className="header-nav-item"
            style={{
              color: "#e5e7eb",
              marginTop: "6px",
              fontSize: "18px",
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

        {/* Profile Icon */}
        <div
          style={{ position: "relative", cursor: "pointer" }}
          onMouseEnter={() => !forceOpen && setDropdownOpen(true)}
          onMouseLeave={() => !forceOpen && setDropdownOpen(false)}
          onClick={() => {
            setForceOpen((prev) => !prev);
            setDropdownOpen((prev) => !prev);
          }}
        >
          <span
            style={{
              cursor: "pointer",
              transition: "color 0.3s",
              color: hovered || dropdownOpen ? "rgb(167, 139, 250)" : "#e5e7eb",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <FontAwesomeIcon
              icon={faUser}
              style={{ fontSize: "1.5rem", marginTop: "6px" }}
            />
          </span>

          {(dropdownOpen || forceOpen) && (
            <div
              ref={menuRef}
              style={{
                position: "absolute",
                right: 0,
                top: "40px",
                background: "rgba(30, 30, 60, 0.95)",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                padding: "8px 0",
                minWidth: "150px",
                zIndex: 2000,
              }}
            >
              <Link
                to="/settings"
                style={{
                  display: "block",
                  padding: "10px 16px",
                  color: "#e5e7eb",
                  textDecoration: "none",
                  transition: "background 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.background = "rgba(167, 139, 250, 0.2)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.background = "transparent")
                }
              >
                Profile
              </Link>
              <div
                onClick={handleLogout}
                style={{
                  display: "block",
                  padding: "10px 16px",
                  color: "#e5e7eb",
                  cursor: "pointer",
                  transition: "background 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.background = "rgba(255, 0, 0, 0.2)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.background = "transparent")
                }
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;