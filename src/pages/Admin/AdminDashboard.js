import { Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";
import AdminSidebar from "../../components/AdminSidebar";
import AdminHeader from "../../components/AdminHeader";
import AllTempleList from "./AllTempleList";
import { isAuthenticated } from "../../services/authServices";

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 280px;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const AdminDashboard = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <DashboardContainer>
      <AdminSidebar />
      <MainContent>
        <AdminHeader />
        <ContentArea>
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/admin/temples" replace />}
            />
            <Route path="/temples" element={<AllTempleList />} />
          </Routes>
        </ContentArea>
      </MainContent>
    </DashboardContainer>
  );
};

export default AdminDashboard;
