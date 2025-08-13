import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Admin/Header";
import TempleList from "../../components/Admin/TempleList";
import AddPujaModal from "../../components/Admin/AddPujaModal";
import AddHallModal from "../../components/Admin/AddHallModal";
import AddTempleModal from "../../components/AddTempleModal";
import { isAuthenticated } from "../../services/authServices";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showAddPuja, setShowAddPuja] = useState(false);
  const [showAddHall, setShowAddHall] = useState(false);
  const [showAddTemple, setShowAddTemple] = useState(false);

  // Check authentication on component mount
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  // Puja modal handlers
  const handleAddPuja = () => setShowAddPuja(true);
  const handleClosePujaModal = () => setShowAddPuja(false);
  const handleSavePuja = (data) => {
    console.log("Saved Puja:", data);
    setShowAddPuja(false);
    // TODO: update table in real time
  };

  // Hall modal handlers
  const handleAddHall = () => setShowAddHall(true);
  const handleCloseHallModal = () => setShowAddHall(false);
  const handleSaveHall = (data) => {
    console.log("Saved Hall:", data);
    setShowAddHall(false);
    // TODO: update table in real time
  };

  // Temple modal handlers
  const handleAddTemple = () => setShowAddTemple(true);
  const handleCloseTempleModal = () => setShowAddTemple(false);
  const handleSaveTemple = () => {
    console.log("Temple saved successfully");
    setShowAddTemple(false);
    // Refresh temple list after adding new temple
    if (window.refreshTempleList) {
      window.refreshTempleList();
    }
  };

  return (
    <>
      <Header onAddPuja={handleAddPuja} onAddHall={handleAddHall} onAddTemple={handleAddTemple} />
      <TempleList />
      <AddPujaModal open={showAddPuja} onClose={handleClosePujaModal} onSave={handleSavePuja} />
      <AddHallModal open={showAddHall} onClose={handleCloseHallModal} onSave={handleSaveHall} />
      {showAddTemple && (
        <AddTempleModal 
          temple={null} 
          onClose={handleCloseTempleModal} 
          onSuccess={handleSaveTemple} 
        />
      )}
    </>
  );
};

export default Dashboard;