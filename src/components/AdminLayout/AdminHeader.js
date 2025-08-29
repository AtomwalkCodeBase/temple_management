"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiBell,
  FiUser,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
  FiChevronDown,
  FiBarChart,
} from "react-icons/fi";

import {
  logout,
  getStoredUsername,
  getStoredFirstName,
} from "../../services/authServices";

const HeaderContainer = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-bottom: 1px solid #e2e8f0;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.95);

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  font-size: 1.5rem;
  cursor: pointer;
  color: #475569;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    background: #f8fafc;
    color: #1e293b;
    border-color: #cbd5e1;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const PageInfo = styled.div`
  .breadcrumb {
    font-size: 0.8rem;
    color: #64748b;
    margin-bottom: 0.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    span {
      &:not(:last-child)::after {
        content: "/";
        margin-left: 0.5rem;
        color: #cbd5e1;
      }
    }
  }

  .page-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
    letter-spacing: -0.025em;

    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NotificationButton = styled(motion.button)`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  font-size: 1.25rem;
  cursor: pointer;
  color: #475569;
  position: relative;
  padding: 0.75rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    background: #f8fafc;
    color: #1e293b;
    border-color: #cbd5e1;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .badge {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: #ffffff;
    font-size: 0.7rem;
    padding: 0.125rem 0.375rem;
    border-radius: 9999px;
    min-width: 1rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    box-shadow: 0 2px 4px rgba(239, 68, 68, 0.3);
  }
`;

const QuickActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const QuickActionButton = styled(motion.button)`
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #ffffff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const UserMenu = styled.div`
  position: relative;
`;

const UserButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const UserAvatar = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 700;
  font-size: 0.9rem;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
  border: 1px solid #dbeafe;
`;

const UserInfo = styled.div`
  text-align: left;

  .name {
    font-weight: 600;
    color: #0f172a;
    font-size: 0.9rem;
    margin: 0;
  }

  .role {
    font-size: 0.75rem;
    color: #64748b;
    margin: 0;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const ChevronIcon = styled(motion.div)`
  color: #64748b;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  min-width: 220px;
  z-index: 1000;
  overflow: hidden;
  backdrop-filter: blur(20px);
`;

const DropdownHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;

  .user-name {
    font-weight: 600;
    color: #0f172a;
    margin: 0 0 0.25rem 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
  }

  .user-email {
    font-size: 0.8rem;
    color: #64748b;
    margin: 0;
  }
`;

const DropdownItem = styled(motion.button)`
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  color: #374151;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 1px solid #f1f5f9;

  &:hover {
    background: #f8fafc;
    color: #1e293b;
  }

  &.danger {
    color: #ef4444;

    &:hover {
      background: #fef2f2;
      color: #dc2626;
    }
  }

  .icon {
    font-size: 1rem;
    opacity: 0.8;
  }
`;

const TemplePatternDivider = styled.div`
  height: 1px;
  background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
  margin: 0.25rem 0;
`;

const AdminHeader = ({ onToggleMobileMenu, currentPage }) => {
  const getCurrentPage = () => {
    const path = window.location.pathname;
    if (path.includes("/halls-management")) return "Sacred Halls Management";
    if (path.includes("/temple-list")) return "Temple List";
    if (path.includes("/services")) return "Temple Services";
    if (path.includes("/advance-policies")) return "Advance Policies";
    if (path.includes("/refund-policies")) return "Refund Policies";
    if (path.includes("/pricing-rules")) return "Pricing Rules";
    return currentPage || "Dashboard";
  };

  const getPageDescription = () => {
    const path = window.location.pathname;
    if (path.includes("/halls-management")) return "Manage hall bookings, availability, and configurations with enterprise-grade tools";
    return "";
  };
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const username = getStoredUsername();
  const firstName = getStoredFirstName();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getUserInitials = () => {
    if (firstName) {
      return firstName.charAt(0).toUpperCase();
    }
    if (username) {
      return username.charAt(0).toUpperCase();
    }
    return "A";
  };

  const getBreadcrumb = () => {
    const path = window.location.pathname;
    if (path === "/dashboard") return ["Dashboard"];
    if (path.includes("/temple-list"))
      return ["Temple Management", "Temple List"];
    if (path.includes("/services"))
      return ["Service Management", "Temple Services"];
    if (path.includes("/halls-management"))
      return ["Hall Management", "Sacred Halls"];
    if (path.includes("/advance-policies"))
      return ["Policy Management", "Advance Policies"];
    if (path.includes("/refund-policies"))
      return ["Policy Management", "Refund Policies"];
    if (path.includes("/pricing-rules"))
      return ["Policy Management", "Pricing Rules"];
    return ["Dashboard"];
  };

  return (
    <HeaderContainer>
      <HeaderLeft>
        <MobileMenuButton onClick={onToggleMobileMenu}>
          <FiMenu />
        </MobileMenuButton>

        <PageInfo>
          <div className="breadcrumb">
            {getBreadcrumb().map((crumb, index) => (
              <span key={index}>{crumb}</span>
            ))}
          </div>
          <h1 className="page-title">{getCurrentPage()}</h1>
          {getPageDescription() && (
            <p style={{ margin: "8px 0 0", color: "#64748b", fontSize: "14px", fontStyle: "italic" }}>
              {getPageDescription()}
            </p>
          )}
        </PageInfo>
      </HeaderLeft>

      <HeaderRight>
        <QuickActions>
          {window.location.pathname.includes("/halls-management") ? (
            <QuickActionButton
              whileHover={{ 
                scale: 1.03,
                y: -2,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                // This will be handled by the parent component
                if (window.addNewHallHandler) {
                  window.addNewHallHandler();
                }
              }}
              style={{
                background: "linear-gradient(135deg, #0056d6 0%, #0077ff 100%)",
                border: "1px solid #0056d6",
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: "600",
                boxShadow: "0 4px 12px rgba(0, 86, 214, 0.3)",
                minWidth: "160px",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden"
              }}
            >
              <div style={{ 
                width: "20px", 
                height: "20px", 
                background: "rgba(255, 255, 255, 0.2)", 
                borderRadius: "50%", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                marginRight: "8px",
                backdropFilter: "blur(4px)"
              }}>
                <span style={{ color: "white", fontSize: "16px", fontWeight: "bold" }}>+</span>
              </div>
              Add New Hall
            </QuickActionButton>
          ) : (
            <QuickActionButton
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/services")}
            >
              <FiSettings size={14} />
              Quick Add
            </QuickActionButton>
          )}
        </QuickActions>

        <NotificationButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <FiBell />
          <span className="badge">3</span>
        </NotificationButton>

        <UserMenu>
          <UserButton
            onClick={() => setShowUserMenu(!showUserMenu)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <UserAvatar>{getUserInitials()}</UserAvatar>
            <UserInfo>
              <div className="name">{firstName || username || "Admin"}</div>
              <div className="role">Temple Administrator</div>
            </UserInfo>
            <ChevronIcon
              animate={{ rotate: showUserMenu ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiChevronDown />
            </ChevronIcon>
          </UserButton>

          <AnimatePresence>
            {showUserMenu && (
              <DropdownMenu
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <DropdownHeader>
                  <div className="user-name">
                    {firstName || username || "Admin User"}
                  </div>
                  <div className="user-email">temple.admin@example.com</div>
                </DropdownHeader>

                <DropdownItem
                  whileHover={{ x: 4 }}
                  onClick={() => setShowUserMenu(false)}
                >
                  <FiUser className="icon" />
                  Profile Settings
                </DropdownItem>

                <TemplePatternDivider />

                <DropdownItem
                  whileHover={{ x: 4 }}
                  onClick={() => setShowUserMenu(false)}
                >
                  <FiSettings className="icon" />
                  Account Settings
                </DropdownItem>

                <TemplePatternDivider />

                <DropdownItem
                  whileHover={{ x: 4 }}
                  onClick={() => setShowUserMenu(false)}
                >
                  <FiBarChart className="icon" />
                  Analytics & Reports
                </DropdownItem>

                <TemplePatternDivider />

                <DropdownItem
                  whileHover={{ x: 4 }}
                  onClick={() => setShowUserMenu(false)}
                >
                  <FiHelpCircle className="icon" />
                  Help & Support
                </DropdownItem>

                <TemplePatternDivider />

                <DropdownItem
                  className="danger"
                  whileHover={{ x: 4 }}
                  onClick={handleLogout}
                >
                  <FiLogOut className="icon" />
                  Sign Out
                </DropdownItem>
              </DropdownMenu>
            )}
          </AnimatePresence>
        </UserMenu>
      </HeaderRight>
    </HeaderContainer>
  );
};

export default AdminHeader;
