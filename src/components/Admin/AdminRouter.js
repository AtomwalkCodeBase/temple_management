import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import AdminHeader from "./AdminHeader";
import Dashboard from "../../pages/Admin/Dashboard";
import PujaMaster from "../../pages/Admin/PujaMaster";
import TempleMaster from "../../pages/Admin/TempleMaster";
import { isAuthenticated } from "../../services/authServices";

// Placeholder components for missing pages
const HallMaster = () => (
  <div style={{ padding: "2rem" }}>
    <h1>🏛️ Hall Master</h1>
    <p>Hall management functionality coming soon...</p>
  </div>
);

const PujaBookings = () => (
  <div style={{ padding: "2rem" }}>
    <h1>📅 Puja Bookings</h1>
    <p>Puja booking management coming soon...</p>
  </div>
);

const HallBookings = () => (
  <div style={{ padding: "2rem" }}>
    <h1>🏛️ Hall Bookings</h1>
    <p>Hall booking management coming soon...</p>
  </div>
);

const Calendar = () => (
  <div style={{ padding: "2rem" }}>
    <h1>📅 Calendar</h1>
    <p>Calendar functionality coming soon...</p>
  </div>
);

const ManualBooking = () => (
  <div style={{ padding: "2rem" }}>
    <h1>✍️ Manual Booking</h1>
    <p>Manual booking functionality coming soon...</p>
  </div>
);

const Reports = () => (
  <div style={{ padding: "2rem" }}>
    <h1>📊 Reports</h1>
    <p>Reporting functionality coming soon...</p>
  </div>
);

const AdminRouter = () => {
  const navigate = useNavigate();

  // Check authentication on component mount
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <AdminLayout>
      <AdminHeader />
      <Routes>
        <Route path="/" element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="temple-master" element={<TempleMaster />} />
        <Route path="puja-master" element={<PujaMaster />} />
        <Route path="hall-master" element={<HallMaster />} />
        <Route path="puja-bookings" element={<PujaBookings />} />
        <Route path="hall-bookings" element={<HallBookings />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="manual-booking" element={<ManualBooking />} />
        <Route path="reports" element={<Reports />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRouter;
