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
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
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
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
    color: #374151;
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
    color: #6b7280;
    margin-bottom: 0.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    span {
      &:not(:last-child)::after {
        content: "/";
        margin-left: 0.5rem;
        color: #d1d5db;
      }
    }
  }

  .page-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
    margin: 0;

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
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: #6b7280;
  position: relative;
  padding: 0.75rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
    color: #374151;
  }

  .badge {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: white;
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
  background: linear-gradient(135deg, #f59e0b, #f97316);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);

  &:hover {
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
  }
`;

const UserMenu = styled.div`
  position: relative;
`;

const UserButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: none;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  transition: all 0.2s ease;

  &:hover {
    background: #f9fafb;
    border-color: #d1d5db;
  }
`;

const UserAvatar = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  background: linear-gradient(135deg, #f59e0b, #f97316);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
`;

const UserInfo = styled.div`
  text-align: left;

  .name {
    font-weight: 600;
    color: #1f2937;
    font-size: 0.9rem;
    margin: 0;
  }

  .role {
    font-size: 0.75rem;
    color: #6b7280;
    margin: 0;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const ChevronIcon = styled(motion.div)`
  color: #6b7280;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  min-width: 220px;
  z-index: 1000;
  overflow: hidden;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
`;

const DropdownHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #f3f4f6;
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);

  .user-name {
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 0.25rem 0;
  }

  .user-email {
    font-size: 0.8rem;
    color: #6b7280;
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

  &:hover {
    background: #f9fafb;
  }

  &.danger {
    color: #ef4444;

    &:hover {
      background: #fef2f2;
    }
  }

  .icon {
    font-size: 1rem;
    opacity: 0.7;
  }
`;

const AdminHeader = ({ onToggleMobileMenu, currentPage = "Dashboard" }) => {
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
          <h1 className="page-title">{currentPage}</h1>
        </PageInfo>
      </HeaderLeft>

      <HeaderRight>
        <QuickActions>
          <QuickActionButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/services")}
          >
            <FiSettings size={14} />
            Quick Add
          </QuickActionButton>
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

                <DropdownItem
                  whileHover={{ x: 4 }}
                  onClick={() => setShowUserMenu(false)}
                >
                  <FiSettings className="icon" />
                  Account Settings
                </DropdownItem>

                <DropdownItem
                  whileHover={{ x: 4 }}
                  onClick={() => setShowUserMenu(false)}
                >
                  <FiBarChart className="icon" />
                  Analytics & Reports
                </DropdownItem>

                <DropdownItem
                  whileHover={{ x: 4 }}
                  onClick={() => setShowUserMenu(false)}
                >
                  <FiHelpCircle className="icon" />
                  Help & Support
                </DropdownItem>

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
