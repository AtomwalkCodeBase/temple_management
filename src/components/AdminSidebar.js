"use client";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { getStoredFirstName } from "../services/authServices";

const SidebarContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 280px;
  height: 100vh;
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  color: white;
  z-index: 1000;
  overflow-y: auto;

  @media (max-width: 768px) {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
`;

const Logo = styled.div`
  padding: 2rem;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  .om-symbol {
    font-size: 2.5rem;
    color: #f59e0b;
    margin-bottom: 0.5rem;
  }

  .title {
    font-size: 1.3rem;
    font-weight: bold;
    color: white;
  }

  .subtitle {
    font-size: 0.9rem;
    color: #94a3b8;
    margin-top: 0.25rem;
  }

  .admin-name {
    font-size: 0.8rem;
    color: #f59e0b;
    margin-top: 0.5rem;
    font-weight: 500;
  }
`;

const MenuSection = styled.div`
  padding: 1.5rem 0;
`;

const MenuTitle = styled.div`
  padding: 0 2rem 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  color: ${(props) => (props.active ? "#F59E0B" : "#E2E8F0")};
  background: ${(props) =>
    props.active ? "rgba(245, 158, 11, 0.1)" : "transparent"};
  text-decoration: none;
  transition: all 0.3s ease;
  border-right: ${(props) =>
    props.active ? "3px solid #F59E0B" : "3px solid transparent"};

  &:hover {
    background: rgba(245, 158, 11, 0.1);
    color: #f59e0b;
  }

  .icon {
    font-size: 1.2rem;
    margin-right: 1rem;
    width: 20px;
    text-align: center;
  }

  .label {
    font-weight: 500;
  }
`;

const AdminSidebar = () => {
  const location = useLocation();
  const firstName = getStoredFirstName();

  const menuItems = [
    {
      path: "/admin/temples",
      icon: "🏛️",
      label: "Temple Management",
      section: "Temple Management",
    },
    {
      path: "/admin/services",
      icon: "⚙️",
      label: "Temple Services",
      section: "Service Management",
    },
    {
      path: "/admin/advance-policies",
      icon: "💰",
      label: "Advance Policies",
      section: "Policy Management",
    },
    {
      path: "/admin/refund-policies",
      icon: "🔄",
      label: "Refund Policies",
      section: "Policy Management",
    },
    {
      path: "/admin/pricing-rules",
      icon: "💲",
      label: "Pricing Rules",
      section: "Policy Management",
    },
  ];

  const sections = [...new Set(menuItems.map((item) => item.section))];

  return (
    <SidebarContainer>
      <Logo>
        <motion.div
          className="om-symbol"
          animate={{
            filter: [
              "drop-shadow(0 0 10px rgba(245, 158, 11, 0.5))",
              "drop-shadow(0 0 20px rgba(245, 158, 11, 0.8))",
              "drop-shadow(0 0 10px rgba(245, 158, 11, 0.5))",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          🕉️
        </motion.div>
        <div className="title">Temple Admin</div>
        <div className="subtitle">Management Portal</div>
        {firstName && <div className="admin-name">Welcome, {firstName}</div>}
      </Logo>

      {sections.map((section) => (
        <MenuSection key={section}>
          <MenuTitle>{section}</MenuTitle>
          {menuItems
            .filter((item) => item.section === section)
            .map((item) => (
              <MenuItem
                key={item.path}
                to={item.path}
                active={location.pathname === item.path}
              >
                <span className="icon">{item.icon}</span>
                <span className="label">{item.label}</span>
              </MenuItem>
            ))}
        </MenuSection>
      ))}
    </SidebarContainer>
  );
};

export default AdminSidebar;
