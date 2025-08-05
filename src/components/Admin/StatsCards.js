import React from "react";

const stats = [
  { label: "Pujas Scheduled Today", value: 12 },
  { label: "Halls in Use Today", value: 3 },
  { label: "Priest Assignments Pending", value: 2 },
  { label: "Special Events This Week", value: 1 },
];

const StatsCards = () => {
  return (
    <div style={{ 
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "1.5rem",
      marginBottom: "2rem"
    }}>
      {stats.map((stat, idx) => (
        <div key={idx} style={{ 
          background: "#fff",
          borderRadius: "12px",
          padding: "1.5rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          borderLeft: "4px solid #f7931e"
        }}>
          <div style={{ 
            fontSize: "0.875rem",
            color: "#64748b",
            marginBottom: "0.5rem",
            fontWeight: "500"
          }}>{stat.label}</div>
          <div style={{ 
            fontSize: "2rem", 
            fontWeight: "700", 
            color: "#1e293b"
          }}>{stat.value}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;