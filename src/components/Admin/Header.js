import React from "react";
import Button from "../Button";

const Header = ({ onAddPuja, onAddHall, onAddTemple }) => {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "2rem" }}>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Button color="orange" onClick={onAddTemple}>
          🏛️ Add Temple
        </Button>
        <Button color="orange" onClick={onAddPuja}>
          🕉️ Add New Puja
        </Button>
        <Button color="orange" onClick={onAddHall}>
          🏛️ Add New Hall
        </Button>
        <Button color="gray">📊 View Reports</Button>
        <Button color="gray">📅 Manual Booking</Button>
      </div>
    </div>
  );
};

export default Header;