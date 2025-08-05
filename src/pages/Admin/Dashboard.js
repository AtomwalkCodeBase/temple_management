import React, { useState } from "react";
import AdminLayout from "../../components/Admin/AdminLayout";
import Header from "../../components/Admin/Header";
import StatsCards from "../../components/Admin/StatsCards";
import BookingTable from "../../components/Admin/BookingTable";
import AddPujaModal from "../../components/Admin/AddPujaModal";

const Dashboard = () => {
  const [showAddPuja, setShowAddPuja] = useState(false);

  // Patch Header to accept a prop for Add New Puja click
  const handleAddPuja = () => setShowAddPuja(true);
  const handleCloseModal = () => setShowAddPuja(false);
  const handleSavePuja = (data) => {
    console.log("Saved Puja:", data);
    setShowAddPuja(false);
    // TODO: update table in real time
  };

  return (
    <AdminLayout>
      <Header onAddPuja={handleAddPuja} />
      <StatsCards />
      <BookingTable />
      <AddPujaModal open={showAddPuja} onClose={handleCloseModal} onSave={handleSavePuja} />
    </AdminLayout>
  );
};

export default Dashboard;