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
  FiBell,
} from "react-icons/fi";
import { MdTempleHindu, MdMiscellaneousServices } from "react-icons/md";
import {
  GiLotus,
  GiTempleGate,
  IncenseBurner,
  TempleGate,
} from "react-icons/gi";
import { getStoredFirstName } from "../../services/authServices";

const SidebarContainer = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  background: linear-gradient(180deg, #2c1a0a 0%, #4a2c14 100%);
  color: #f8e6cc;
  z-index: 1000;
  overflow: hidden;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.3);
  transition: width 0.3s ease;
  width: ${(props) => (props.collapsed ? "80px" : "280px")};
  border-right: 1px solid #8b5a2b;

  @media (max-width: 768px) {
    transform: translateX(${(props) => (props.mobileOpen ? "0" : "-100%")});
    width: 280px;
    transition: transform 0.3s ease;
  }
`;

const TemplePatternOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(
      circle at 20% 30%,
      rgba(139, 90, 43, 0.1) 2px,
      transparent 2px
    ),
    radial-gradient(
      circle at 80% 70%,
      rgba(139, 90, 43, 0.1) 2px,
      transparent 2px
    );
  background-size: 30px 30px;
  pointer-events: none;
  z-index: -1;
`;

const SidebarHeader = styled.div`
  padding: 1.5rem 1.2rem;
  border-bottom: 1px solid rgba(139, 90, 43, 0.4);
  position: relative;
  background: rgba(44, 26, 10, 0.7);

  @media (max-width: 768px) {
    padding: 1.2rem;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  .om-symbol {
    font-size: 2.2rem;
    color: #d9a566;
    filter: drop-shadow(0 0 5px rgba(217, 165, 102, 0.7));
    position: relative;
  }

  .brand-text {
    display: ${(props) => (props.collapsed ? "none" : "block")};

    .title {
      font-size: 1.3rem;
      font-weight: 700;
      margin: 0;
      color: #f8e6cc;
      font-family: "Georgia", serif;
      letter-spacing: 0.5px;
    }

    .subtitle {
      font-size: 0.75rem;
      color: #d9a566;
      margin: 0;
      font-weight: 500;
      letter-spacing: 0.5px;
    }

    .admin-name {
      font-size: 0.75rem;
      color: #d9a566;
      margin-top: 0.25rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }
  }
`;

const CollapseButton = styled.button`
  position: absolute;
  top: 50%;
  right: 6px;
  transform: translateY(-50%);
  width: 26px;
  height: 26px;
  background: rgba(139, 90, 43, 0.3);
  border: 1px solid #8b5a2b;
  border-radius: 50%;
  color: #d9a566;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(139, 90, 43, 0.5);
    border-color: #d9a566;
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
    background: rgba(139, 90, 43, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(217, 165, 102, 0.5);
    border-radius: 2px;
  }
`;

const MenuSection = styled.div`
  margin-bottom: 1.8rem;
  position: relative;
`;

const SectionTitle = styled.div`
  padding: 0 1.5rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #d9a566;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: ${(props) => (props.collapsed ? "none" : "block")};
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 1rem;
    right: 1rem;
    bottom: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(217, 165, 102, 0.5),
      transparent
    );
  }
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.875rem 1.5rem;
  color: ${(props) => (props.active ? "#ffd700" : "#f8e6cc")};
  background: ${(props) =>
    props.active ? "rgba(139, 90, 43, 0.3)" : "transparent"};
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  margin: 0 0.5rem;
  border-radius: 6px;

  &:hover {
    background: rgba(139, 90, 43, 0.2);
    color: #ffd700;
    transform: translateX(4px);
  }

  .icon {
    font-size: 1.3rem;
    min-width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => (props.active ? "#ffd700" : "#d9a566")};
  }

  .label {
    margin-left: 1rem;
    font-weight: 500;
    font-size: 0.9rem;
    display: ${(props) => (props.collapsed ? "none" : "block")};
  }

  .badge {
    margin-left: auto;
    background: #c84b31;
    color: #f8e6cc;
    font-size: 0.7rem;
    padding: 0.125rem 0.375rem;
    border-radius: 9999px;
    min-width: 1rem;
    height: 1rem;
    display: ${(props) => (props.collapsed ? "none" : "flex")};
    align-items: center;
    justify-content: center;
    font-weight: 600;
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 60%;
    width: 3px;
    background: ${(props) => (props.active ? "#ffd700" : "transparent")};
    border-radius: 0 3px 3px 0;
    box-shadow: ${(props) =>
      props.active ? "0 0 8px rgba(255, 215, 0, 0.5)" : "none"};
  }
`;

const Tooltip = styled(motion.div)`
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  background: #4a2c14;
  color: #ffd700;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.8rem;
  font-weight: 500;
  white-space: nowrap;
  margin-left: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1001;
  border: 1px solid #8b5a2b;

  &::before {
    content: "";
    position: absolute;
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    border: 4px solid transparent;
    border-right-color: #4a2c14;
  }
`;

const TempleGateDivider = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.5rem 0;
  color: #8b5a2b;
  font-size: 1.2rem;
  opacity: 0.6;
`;

const BellIconDecor = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  width: 16px;
  height: 16px;
  background: #c84b31;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.6rem;
  font-weight: bold;
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
          label: "My Temple",
          badge: null,
        },
        {
          path: "/services",
          icon: MdMiscellaneousServices,
          label: "Temple Services",
          badge: "",
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
        <TemplePatternOverlay />

        <SidebarHeader collapsed={collapsed}>
          <Logo collapsed={collapsed}>
            <motion.div
              className="om-symbol"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <GiLotus />
            </motion.div>
            <div className="brand-text">
              <div className="title">Temple Admin</div>
              <div className="subtitle">Divine Management Portal</div>
              {firstName && (
                <div className="admin-name">
                  <FiBell size={12} /> Welcome, {firstName}
                </div>
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
                    {item.badge && <BellIconDecor>{item.badge}</BellIconDecor>}
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

              {/* {sectionIndex < menuItems.length - 1 && !collapsed && (
                <TempleGateDivider>
                  <GiTempleGate />
                </TempleGateDivider>
              )} */}
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
