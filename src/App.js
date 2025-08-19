import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import { theme } from "./styles/theme";
import Navbar from "./components/Navbar";
import Temples from "./pages/Temples";
import BookPuja from "./pages/BookPuja";
import BookSeva from "./pages/BookSeva";
import LiveDarshan from "./pages/LiveDarshan";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import TempleDetails from "./pages/TempleDetails";
import Login from "./pages/Login";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import AllTempleList from "./pages/Admin/AllTempleList";
import TempleServices from "./pages/Admin/TempleServices";
import AdvancePolicies from "./pages/Admin/AdvancePolicies";
import RefundPolicies from "./pages/Admin/RefundPolicies";
import PricingRules from "./pages/Admin/PricingRules";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRouter from "./components/Admin/AdminRouter";

function AppContent() {
  const location = useLocation();
  const isAdminRoute = [
    "/dashboard",
    "/temple-list",
    "/services",
    "/advance-policies",
    "/refund-policies",
    "/pricing-rules",
    "/templeadmin",
  ].some((route) => location.pathname.startsWith(route));

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/temples" element={<Temples />} />
        <Route path="/templeDetails/:templeId" element={<TempleDetails />} />
        <Route path="/book-puja" element={<BookPuja />} />
        <Route path="/book-seva" element={<BookSeva />} />
        <Route path="/live-darshan" element={<LiveDarshan />} />
        <Route path="/templeadmin/*" element={<AdminRouter />} />
        <Route path="/login" element={<Login />} />

        {/* Admin routes with AdminLayout wrapper */}
        <Route
          path="/dashboard"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/temple-list"
          element={
            <AdminLayout>
              <AllTempleList />
            </AdminLayout>
          }
        />
        <Route
          path="/services"
          element={
            <AdminLayout>
              <TempleServices />
            </AdminLayout>
          }
        />
        <Route
          path="/advance-policies"
          element={
            <AdminLayout>
              <AdvancePolicies />
            </AdminLayout>
          }
        />
        <Route
          path="/refund-policies"
          element={
            <AdminLayout>
              <RefundPolicies />
            </AdminLayout>
          }
        />
        <Route
          path="/pricing-rules"
          element={
            <AdminLayout>
              <PricingRules />
            </AdminLayout>
          }
        />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
