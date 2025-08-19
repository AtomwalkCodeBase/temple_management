"use client";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiDollarSign,
  FiRefreshCw,
  FiTrendingUp,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { MdTempleHindu, MdMiscellaneousServices } from "react-icons/md";
import { getStoredFirstName } from "../../services/authServices";

const SidebarContainer = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  background: linear-gradient(180deg, #1e293b 0%, #334155 100%);
  color: white;
  z-index: 1000;
  overflow: hidden;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease;
  width: ${(props) => (props.collapsed ? "80px" : "280px")};

  @media (max-width: 768px) {
    transform: translateX(${(props) => (props.mobileOpen ? "0" : "-100%")});
    width: 280px;
    transition: transform 0.3s ease;
  }
`;

const SidebarHeader = styled.div`
  padding: 2rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  .om-symbol {
    font-size: 2.5rem;
    background: linear-gradient(135deg, #f59e0b, #f97316);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 0 10px rgba(245, 158, 11, 0.5));
  }

  .brand-text {
    display: ${(props) => (props.collapsed ? "none" : "block")};

    .title {
      font-size: 1.4rem;
      font-weight: 800;
      margin: 0;
      background: linear-gradient(135deg, #ffffff, #e2e8f0);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .subtitle {
      font-size: 0.8rem;
      color: #94a3b8;
      margin: 0;
      font-weight: 500;
    }

    .admin-name {
      font-size: 0.75rem;
      color: #f59e0b;
      margin-top: 0.25rem;
      font-weight: 600;
    }
  }
`;

const CollapseButton = styled.button`
  position: absolute;
  top: 50%;
  right: -12px;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  background: #1e293b;
  border: 2px solid #334155;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  transition: all 0.2s ease;

  &:hover {
    background: #334155;
    border-color: #475569;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const SidebarContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
  }
`;

const MenuSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.div`
  padding: 0 1.5rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: ${(props) => (props.collapsed ? "none" : "block")};
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.875rem 1.5rem;
  color: ${(props) => (props.active ? "#f59e0b" : "#e2e8f0")};
  background: ${(props) =>
    props.active ? "rgba(245, 158, 11, 0.1)" : "transparent"};
  text-decoration: none;
  transition: all 0.3s ease;
  border-right: ${(props) =>
    props.active ? "3px solid #f59e0b" : "3px solid transparent"};
  position: relative;

  &:hover {
    background: rgba(245, 158, 11, 0.1);
    color: #f59e0b;
    transform: translateX(4px);
  }

  .icon {
    font-size: 1.25rem;
    min-width: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .label {
    margin-left: 1rem;
    font-weight: 500;
    font-size: 0.9rem;
    display: ${(props) => (props.collapsed ? "none" : "block")};
  }

  .badge {
    margin-left: auto;
    background: #ef4444;
    color: white;
    font-size: 0.7rem;
    padding: 0.125rem 0.375rem;
    border-radius: 9999px;
    min-width: 1rem;
    height: 1rem;
    display: ${(props) => (props.collapsed ? "none" : "flex")};
    align-items: center;
    justify-content: center;
  }
`;

const Tooltip = styled(motion.div)`
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  background: #1f2937;
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.8rem;
  font-weight: 500;
  white-space: nowrap;
  margin-left: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1001;

  &::before {
    content: "";
    position: absolute;
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    border: 4px solid transparent;
    border-right-color: #1f2937;
  }
`;

const AdminSidebar = ({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}) => {
  const location = useLocation();
  const firstName = getStoredFirstName();
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    {
      section: "Dashboard",
      items: [
        {
          path: "/dashboard",
          icon: FiHome,
          label: "Dashboard",
          badge: null,
        },
      ],
    },
    {
      section: "Temple Management",
      items: [
        {
          path: "/temple-list",
          icon: MdTempleHindu,
          label: "Temple List",
          badge: null,
        },
        {
          path: "/services",
          icon: MdMiscellaneousServices,
          label: "Temple Services",
          badge: "12",
        },
      ],
    },
    {
      section: "Policy Management",
      items: [
        {
          path: "/advance-policies",
          icon: FiDollarSign,
          label: "Advance Policies",
          badge: null,
        },
        {
          path: "/refund-policies",
          icon: FiRefreshCw,
          label: "Refund Policies",
          badge: null,
        },
        {
          path: "/pricing-rules",
          icon: FiTrendingUp,
          label: "Pricing Rules",
          badge: null,
        },
      ],
    },
  ];

  return (
    <>
      <SidebarContainer
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        initial={false}
        animate={{ width: collapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <SidebarHeader collapsed={collapsed}>
          <Logo collapsed={collapsed}>
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
            <div className="brand-text">
              <div className="title">Temple Admin</div>
              <div className="subtitle">Management Portal</div>
              {firstName && (
                <div className="admin-name">Welcome, {firstName}</div>
              )}
            </div>
          </Logo>

          <CollapseButton onClick={onToggleCollapse}>
            {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
          </CollapseButton>
        </SidebarHeader>

        <SidebarContent>
          {menuItems.map((section, sectionIndex) => (
            <MenuSection key={sectionIndex}>
              <SectionTitle collapsed={collapsed}>
                {section.section}
              </SectionTitle>
              {section.items.map((item, itemIndex) => (
                <MenuItem
                  key={itemIndex}
                  to={item.path}
                  active={location.pathname === item.path}
                  collapsed={collapsed}
                  onMouseEnter={() =>
                    setHoveredItem(
                      collapsed ? `${sectionIndex}-${itemIndex}` : null
                    )
                  }
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={onCloseMobile}
                >
                  <span className="icon">
                    <item.icon />
                  </span>
                  <span className="label">{item.label}</span>
                  {item.badge && <span className="badge">{item.badge}</span>}

                  <AnimatePresence>
                    {collapsed &&
                      hoveredItem === `${sectionIndex}-${itemIndex}` && (
                        <Tooltip
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.label}
                        </Tooltip>
                      )}
                  </AnimatePresence>
                </MenuItem>
              ))}
            </MenuSection>
          ))}
        </SidebarContent>
      </SidebarContainer>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCloseMobile}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.5)",
              zIndex: 999,
              display: "none",
            }}
            className="mobile-overlay"
          />
        )}
      </AnimatePresence>

      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-overlay {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
};

export default AdminSidebar;
