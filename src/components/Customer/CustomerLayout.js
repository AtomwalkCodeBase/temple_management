"use client";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiCalendar,
  FiUser,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiBell,
  FiSearch,
  FiChevronDown,
} from "react-icons/fi";
import { MdTempleHindu } from "react-icons/md";
import { useCustomerAuth } from "../../contexts/CustomerAuthContext";

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
`;

const Sidebar = styled(motion.div)`
  width: ${(props) => (props.collapsed ? "80px" : "280px")};
  background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
  color: white;
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 1000;
  overflow: hidden;
  transition: width 0.3s ease;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);

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

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.875rem 1.5rem;
  color: ${(props) => (props.active ? "#f59e0b" : "#e2e8f0")};
  background: ${(props) =>
    props.active ? "rgba(245, 158, 11, 0.1)" : "transparent"};
  cursor: pointer;
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

const MainContent = styled.div`
  flex: 1;
  margin-left: ${(props) => (props.sidebarCollapsed ? "80px" : "280px")};
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const TopNavbar = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e2e8f0;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
  }
`;

const NavLeft = styled.div`
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

const SearchContainer = styled.div`
  position: relative;
  max-width: 400px;
  flex: 1;

  .search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    font-size: 1rem;
  }

  input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.75rem;
    font-size: 0.9rem;
    background: white;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: #f59e0b;
      box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
    }

    &::placeholder {
      color: #9ca3af;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavRight = styled.div`
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
  border-radius: 0.75rem;
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

const PageContent = styled.div`
  padding: 2rem;
  min-height: calc(100vh - 80px);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const MobileOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const CustomerLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { customerData, logout } = useCustomerAuth();

  const menuItems = [
    {
      section: "Main",
      items: [
        {
          path: "/customer-dashboard",
          icon: FiHome,
          label: "Dashboard",
          badge: null,
        },
        {
          path: "/customer-temples",
          icon: MdTempleHindu,
          label: "Temples",
          badge: null,
        },
        {
          path: "/customer-bookings",
          icon: FiCalendar,
          label: "My Bookings",
          badge: "3",
        },
      ],
    },
    {
      section: "Account",
      items: [
        {
          path: "/customer-profile",
          icon: FiUser,
          label: "Profile",
          badge: null,
        },
        {
          path: "/customer-settings",
          icon: FiSettings,
          label: "Settings",
          badge: null,
        },
      ],
    },
  ];

  const handleMenuClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/customer-login");
  };

  const getUserInitials = () => {
    if (customerData?.custRefCode) {
      return customerData.custRefCode.charAt(0).toUpperCase();
    }
    return "C";
  };

  return (
    <LayoutContainer>
      <Sidebar
        collapsed={sidebarCollapsed}
        mobileOpen={mobileMenuOpen}
        initial={false}
        animate={{ width: sidebarCollapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <SidebarHeader collapsed={sidebarCollapsed}>
          <Logo collapsed={sidebarCollapsed}>
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
              <div className="title">Temple Connect</div>
              <div className="subtitle">Devotee Portal</div>
            </div>
          </Logo>

          <CollapseButton
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? "→" : "←"}
          </CollapseButton>
        </SidebarHeader>

        <SidebarContent>
          {menuItems.map((section, sectionIndex) => (
            <MenuSection key={sectionIndex}>
              <SectionTitle collapsed={sidebarCollapsed}>
                {section.section}
              </SectionTitle>
              {section.items.map((item, itemIndex) => (
                <MenuItem
                  key={itemIndex}
                  active={location.pathname === item.path}
                  collapsed={sidebarCollapsed}
                  onClick={() => handleMenuClick(item.path)}
                >
                  <span className="icon">
                    <item.icon />
                  </span>
                  <span className="label">{item.label}</span>
                  {item.badge && <span className="badge">{item.badge}</span>}
                </MenuItem>
              ))}
            </MenuSection>
          ))}

          <MenuSection>
            <MenuItem collapsed={sidebarCollapsed} onClick={handleLogout}>
              <span className="icon">
                <FiLogOut />
              </span>
              <span className="label">Logout</span>
            </MenuItem>
          </MenuSection>
        </SidebarContent>
      </Sidebar>

      <MainContent sidebarCollapsed={sidebarCollapsed}>
        <TopNavbar>
          <NavLeft>
            <MobileMenuButton
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </MobileMenuButton>

            <SearchContainer>
              <FiSearch className="search-icon" />
              <input type="text" placeholder="Search temples, services..." />
            </SearchContainer>
          </NavLeft>

          <NavRight>
            <NotificationButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiBell />
              <span className="badge">2</span>
            </NotificationButton>

            <UserMenu>
              <UserButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <UserAvatar>{getUserInitials()}</UserAvatar>
                <UserInfo>
                  <div className="name">Devotee</div>
                  <div className="role">{customerData?.custRefCode}</div>
                </UserInfo>
                <FiChevronDown />
              </UserButton>
            </UserMenu>
          </NavRight>
        </TopNavbar>

        <PageContent>{children}</PageContent>
      </MainContent>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </LayoutContainer>
  );
};

export default CustomerLayout;
