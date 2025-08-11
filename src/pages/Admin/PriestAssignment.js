import React from "react";

const PriestAssignment = () => {
  return (
    <div style={{ textAlign: "center", padding: "3rem" }}>
      <h2 style={{ 
        fontSize: "1.5rem", 
        fontWeight: "600", 
        marginBottom: "1rem",
        color: "#333"
      }}>
        Priest Assignment Rules
      </h2>
      <p style={{ 
        color: "#666", 
        fontSize: "1rem",
        lineHeight: "1.6",
        maxWidth: "600px",
        margin: "0 auto"
      }}>
        Automate allocation of priests for pujas with assignment rules and preferences.
        <br /><br />
        Features: Set default priests, backup priests, max pujas per day, and manual override options.
      </p>
    </div>
  );
};

export default PriestAssignment; 