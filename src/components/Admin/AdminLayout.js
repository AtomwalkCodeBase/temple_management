import React, { useState } from "react";
import Sidebar, { SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from "./Sidebar";

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH;
  return (
    <>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main
        style={{
          marginLeft: sidebarWidth,
          minHeight: "100vh",
          padding: "2rem",
          background: "#f9f7f4",
          boxSizing: "border-box",
          transition: "margin-left 0.3s ease"
        }}
      >
        {children}
      </main>
    </>
  );
};

export default AdminLayout;