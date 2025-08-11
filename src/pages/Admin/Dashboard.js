import React, { useState } from "react";
import AdminLayout from "../../components/Admin/AdminLayout";
import Header from "../../components/Admin/Header";
import StatsCards from "../../components/Admin/StatsCards";
import BookingTable from "../../components/Admin/BookingTable";
import AddPujaModal from "../../components/Admin/AddPujaModal";
import AddHallModal from "../../components/Admin/AddHallModal";

const Dashboard = () => {
  const [showAddPuja, setShowAddPuja] = useState(false);
  const [showAddHall, setShowAddHall] = useState(false);

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

  return (
    <AdminLayout>
      <Header onAddPuja={handleAddPuja} onAddHall={handleAddHall} />
      <StatsCards />
      <BookingTable />
      <AddPujaModal open={showAddPuja} onClose={handleClosePujaModal} onSave={handleSavePuja} />
      <AddHallModal open={showAddHall} onClose={handleCloseHallModal} onSave={handleSaveHall} />
    </AdminLayout>
  );
};

export default Dashboard;