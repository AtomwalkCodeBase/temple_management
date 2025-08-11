import React from "react";

const Archive = () => {
  return (
    <div style={{ textAlign: "center", padding: "3rem" }}>
      <h2 style={{ 
        fontSize: "1.5rem", 
        fontWeight: "600", 
        marginBottom: "1rem",
        color: "#333"
      }}>
        Archive - Inactive Pujas
      </h2>
      <p style={{ 
        color: "#666", 
        fontSize: "1rem",
        lineHeight: "1.6",
        maxWidth: "600px",
        margin: "0 auto"
      }}>
        View and manage inactive puja records without cluttering the active list.
        <br /><br />
        Features: View archived pujas, restore them to active status, and maintain historical records.
      </p>
    </div>
  );
};

export default Archive; 