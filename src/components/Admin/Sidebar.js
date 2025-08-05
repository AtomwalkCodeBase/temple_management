import React from "react";
import { Link, useLocation } from "react-router-dom";

const sidebarLinks = [
  { label: "Dashboard", to: "/admin" },
  { label: "Puja Master", to: "/admin/puja-master" },
  { label: "Hall Master", to: "/admin/hall-master" },
  { label: "Puja Bookings", to: "/admin/puja-bookings" },
  { label: "Hall Bookings", to: "/admin/hall-bookings" },
  { label: "Calendar", to: "/admin/calendar" },
  { label: "Manual Booking", to: "/admin/manual-booking" },
];

const Sidebar = () => {
  const location = useLocation();
  return (
    <aside style={{ width: "240px", background: "#fff", padding: "2rem 1rem", borderRight: "1px solid #eee", minHeight: "100vh", position: "relative" }}>
      <div style={{ fontWeight: "bold", fontSize: "1.2rem", marginBottom: "2rem" }}>Temple Admin</div>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {sidebarLinks.map((link) => (
            <li key={link.to} style={{ marginBottom: "1.5rem" }}>
              <Link
                to={link.to}
                style={{
                  display: "block",
                  fontWeight: location.pathname === link.to ? "bold" : "normal",
                  background: location.pathname === link.to ? "#f5f3f0" : "transparent",
                  borderRadius: "8px",
                  padding: "0.75rem 1rem",
                  color: "inherit",
                  textDecoration: "none",
                  transition: "background 0.2s"
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div style={{ position: "absolute", bottom: "2rem", left: "1rem" }}>
        <Link to="/admin/reports" style={{ color: "inherit", textDecoration: "none" }}>Reports</Link>
      </div>
    </aside>
  );
};

export default Sidebar;