import React from "react";

const bookings = [
  { time: "9:00 AM", type: "Puja", devotee: "Arjun Patel", assigned: "Priest Sharma", status: "Confirmed" },
  { time: "10:30 AM", type: "Hall", devotee: "Priya Verma", assigned: "Hall 1", status: "Confirmed" },
  { time: "12:00 PM", type: "Puja", devotee: "Rohan Kapoor", assigned: "Priest Joshi", status: "Pending" },
  { time: "2:00 PM", type: "Puja", devotee: "Sneha Reddy", assigned: "Priest Sharma", status: "Confirmed" },
  { time: "4:00 PM", type: "Hall", devotee: "Vikram Singh", assigned: "Hall 2", status: "Confirmed" },
];

const BookingTable = () => {
  return (
    <div style={{ 
      background: "#fff", 
      borderRadius: "12px", 
      padding: "1.5rem",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      overflow: "hidden"
    }}>
      <h2 style={{ 
        fontSize: "1.25rem", 
        fontWeight: "600", 
        marginBottom: "1.5rem",
        color: "#1e293b"
      }}>Today's Bookings</h2>
      
      <div style={{ overflowX: "auto" }}>
        <table style={{ 
          width: "100%", 
          borderCollapse: "separate",
          borderSpacing: "0",
          minWidth: "600px"
        }}>
          <thead>
            <tr style={{ 
              backgroundColor: "#f8fafc",
              color: "#64748b",
              fontSize: "0.875rem",
              fontWeight: "500",
              textAlign: "left"
            }}>
              <th style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #e2e8f0" }}>Time</th>
              <th style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #e2e8f0" }}>Service</th>
              <th style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #e2e8f0" }}>Devotee</th>
              <th style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #e2e8f0" }}>Assignment</th>
              <th style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #e2e8f0" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((row, idx) => (
              <tr key={idx} style={{ 
                borderBottom: "1px solid #f1f5f9",
                transition: "background 0.2s",
                ":hover": {
                  backgroundColor: "#f8fafc"
                }
              }}>
                <td style={{ 
                  padding: "1rem",
                  color: "#334155",
                  fontWeight: "500"
                }}>{row.time}</td>
                <td style={{ padding: "1rem", color: "#475569" }}>{row.type}</td>
                <td style={{ padding: "1rem", color: "#475569" }}>{row.devotee}</td>
                <td style={{ padding: "1rem", color: "#475569" }}>{row.assigned}</td>
                <td style={{ padding: "1rem" }}>
                  <span style={{
                    display: "inline-block",
                    padding: "0.35rem 0.75rem",
                    borderRadius: "9999px",
                    fontWeight: "500",
                    fontSize: "0.8125rem",
                    backgroundColor: row.status === "Confirmed" ? "#f0fdf4" : "#fffbeb",
                    color: row.status === "Confirmed" ? "#15803d" : "#b45309",
                    border: row.status === "Confirmed" ? "1px solid #bbf7d0" : "1px solid #fde68a"
                  }}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingTable;