import React, { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  MdDashboard,
  MdOutlineTempleBuddhist,
  MdMeetingRoom,
  MdEventAvailable,
  MdEventSeat,
  MdCalendarMonth,
  MdEditNote,
  MdBarChart,
  MdChevronLeft,
  MdChevronRight,
  MdLogout,
} from "react-icons/md";

export const SIDEBAR_WIDTH = 260;
export const SIDEBAR_COLLAPSED_WIDTH = 80;

const SIDEBAR_MAIN_COLOR = "#800000";
const SIDEBAR_TEXT_COLOR = "#fff";
const SIDEBAR_HOVER_BG = "rgba(128,0,0,0.08)";
const SIDEBAR_ACTIVE_BG = "#fff";
const SIDEBAR_ACTIVE_TEXT = "#800000";
// Removed unused SIDEBAR_ICON_BG

const SidebarContainer = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  background: ${SIDEBAR_MAIN_COLOR};
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  z-index: 100;
  width: ${SIDEBAR_WIDTH}px;
  box-shadow: 8px 0 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  ${(props) =>
    props.$collapsed &&
    css`
      width: ${SIDEBAR_COLLAPSED_WIDTH}px;
    `}
`;

const TopSection = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const LogoContainer = styled.div`
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  ${(props) =>
    props.$collapsed &&
    css`
      justify-content: center;
      padding: 1.5rem 0 1rem 0;
    `}
`;

const LogoText = styled.div`
  font-weight: 700;
  font-size: 1.4rem;
  color: ${SIDEBAR_TEXT_COLOR};
  transition: opacity 0.3s ease;
  ${(props) =>
    props.$collapsed &&
    css`
      opacity: 0;
      width: 0;
    `}
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #fff7f7;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  color: ${SIDEBAR_MAIN_COLOR};
  z-index: 101;
  &:hover {
    background: #ffeaea;
    transform: scale(1.05);
  }
`;

const SearchContainer = styled.div`
  margin-top: 0.75rem;
  padding: 0 1.5rem 0 1.5rem;
  transition: all 0.3s ease;
  flex-shrink: 0;
  ${(props) =>
    props.$collapsed &&
    css`
      opacity: 0;
      height: 0;
      padding: 0;
      margin-top: 0;
      overflow: hidden;
    `}
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: none;
  background: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  color: ${SIDEBAR_MAIN_COLOR};
  &:focus {
    outline: none;
    background: #fff;
    box-shadow: 0 0 0 2px #f3d6d6;
  }
`;

const NavWrapper = styled.div`
  flex: 1 1 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
`;

const Nav = styled.nav`
  flex: 1 1 0;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1rem 0;
  overscroll-behavior: contain;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin: 0.25rem 0.75rem;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: ${({ $isActive }) => ($isActive ? "600" : "500")};
  font-size: 0.95rem;
  color: ${({ $isActive }) =>
    $isActive ? SIDEBAR_ACTIVE_TEXT : SIDEBAR_TEXT_COLOR};
  background: ${({ $isActive }) =>
    $isActive ? SIDEBAR_ACTIVE_BG : "transparent"};
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
  &:hover {
    background: ${({ $isActive }) =>
      $isActive ? SIDEBAR_ACTIVE_BG : SIDEBAR_HOVER_BG};
  }
  ${(props) =>
    props.$collapsed &&
    css`
      justify-content: center;
      padding: 0.75rem 0;
    `}
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${(props) => (props.$collapsed ? "0" : "0.75rem")};
  font-size: 1.2rem;
`;

const Label = styled.span`
  transition: opacity 0.3s ease;
  ${(props) =>
    props.$collapsed &&
    css`
      opacity: 0;
      width: 0;
    `}
`;

const UserContainer = styled.div`
  padding: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
  ${(props) =>
    props.$collapsed &&
    css`
      justify-content: center;
      padding: 1rem 0;
    `}
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  color: #800000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-right: ${(props) => (props.$collapsed ? "0" : "0.75rem")};
  border: 2px solid #800000;
`;

const UserInfo = styled.div`
  transition: opacity 0.3s ease;
  ${(props) =>
    props.$collapsed &&
    css`
      opacity: 0;
      width: 0;
    `}
`;

const UserName = styled.div`
  font-weight: 600;
  color: #fff;
  font-size: 0.95rem;
`;

const UserEmail = styled.div`
  color: #fff;
  opacity: 0.8;
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LogoutIconWrapper = styled(IconWrapper)`
  color: #fff !important;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  border-radius: 50%;
  padding: 4px;
  &:hover {
    background: rgba(255, 255, 255, 0.12);
    color: #800000 !important;
  }
`;

const sidebarLinks = [
  { label: "Dashboard", icon: <MdDashboard />, to: "/templeadmin/dashboard" },
  {
    label: "Temple Master",
    icon: <MdOutlineTempleBuddhist />,
    to: "/templeadmin/temple-master",
  },
  {
    label: "Puja Master",
    icon: <MdEditNote />,
    to: "/templeadmin/puja-master",
  },
  {
    label: "Hall Master",
    icon: <MdMeetingRoom />,
    to: "/templeadmin/hall-master",
  },
  {
    label: "Puja Bookings",
    icon: <MdEventAvailable />,
    to: "/templeadmin/puja-bookings",
  },
  {
    label: "Hall Bookings",
    icon: <MdEventSeat />,
    to: "/templeadmin/hall-bookings",
  },
  { label: "Calendar", icon: <MdCalendarMonth />, to: "/templeadmin/calendar" },
  {
    label: "Manual Booking",
    icon: <MdEditNote />,
    to: "/templeadmin/manual-booking",
  },
  { label: "Reports", icon: <MdBarChart />, to: "/templeadmin/reports" },
];

// Removed unused handleNavWheel

const Sidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    function wheelHandler(e) {
      e.preventDefault();
      e.stopPropagation();
      nav.scrollTop += e.deltaY;
    }
    nav.addEventListener("wheel", wheelHandler, { passive: false });
    return () => nav.removeEventListener("wheel", wheelHandler);
  }, []);

  return (
    <SidebarContainer $collapsed={collapsed}>
      <TopSection>
        <LogoContainer $collapsed={collapsed}>
          <LogoText $collapsed={collapsed}>Temple Admin</LogoText>
          <ToggleButton
            $collapsed={collapsed}
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <MdChevronRight /> : <MdChevronLeft />}
          </ToggleButton>
        </LogoContainer>
        <SearchContainer $collapsed={collapsed}>
          <SearchInput placeholder="Search..." />
        </SearchContainer>
      </TopSection>
      <NavWrapper>
        <Nav ref={navRef} tabIndex={0}>
          <NavList>
            {sidebarLinks.map((link) => (
              <NavItem key={link.to}>
                <NavLink
                  to={link.to}
                  $isActive={location.pathname === link.to}
                  $collapsed={collapsed}
                >
                  <IconWrapper $collapsed={collapsed}>{link.icon}</IconWrapper>
                  {!collapsed && <Label>{link.label}</Label>}
                </NavLink>
              </NavItem>
            ))}
          </NavList>
        </Nav>
      </NavWrapper>
      <UserContainer $collapsed={collapsed}>
        <UserAvatar $collapsed={collapsed}>R</UserAvatar>
        {!collapsed && (
          <UserInfo>
            <UserName>Richard</UserName>
            <UserEmail>9394lay@gmail.com</UserEmail>
          </UserInfo>
        )}
        {!collapsed && (
          <LogoutIconWrapper style={{ marginLeft: "auto" }}>
            <MdLogout />
          </LogoutIconWrapper>
        )}
      </UserContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
