import React from "react";

const Header = ({ onAddPuja }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Dashboard</h1>
      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          style={{ background: "#f7931e", color: "#fff", border: "none", borderRadius: "6px", padding: "0.75rem 1.5rem", fontWeight: "bold" }}
          onClick={onAddPuja}
        >
          Add New Puja
        </button>
        <button style={{ background: "#f7931e", color: "#fff", border: "none", borderRadius: "6px", padding: "0.75rem 1.5rem", fontWeight: "bold" }}>Add New Hall</button>
        <button style={{ background: "#f7931e", color: "#fff", border: "none", borderRadius: "6px", padding: "0.75rem 1.5rem", fontWeight: "bold" }}>View Reports</button>
        <button style={{ background: "#f7931e", color: "#fff", border: "none", borderRadius: "6px", padding: "0.75rem 1.5rem", fontWeight: "bold" }}>Manual Booking</button>
      </div>
    </div>
  );
};

export default Header;