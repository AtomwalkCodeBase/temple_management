import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import { theme } from "./styles/theme";
import { CustomerAuthProvider } from "./contexts/CustomerAuthContext";
import Navbar from "./components/Navbar";
import Temples from "./pages/Temples";
import BookPuja from "./pages/BookPuja";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import TempleDetails from "./pages/TempleDetails";
import Login from "./pages/Login";
import AboutUs from "./pages/AboutUs";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import AdminRouter from "./components/Admin/AdminRouter";
import AllTempleList from "./pages/Admin/AllTempleList";
import TempleServices from "./pages/Admin/TempleServices";
import AdvancePolicies from "./pages/Admin/AdvancePolicies";
import RefundPolicies from "./pages/Admin/RefundPolicies";
import PricingRules from "./pages/Admin/PricingRules";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import HallsManagement from "./pages/Admin/HallsManagement";
// Customer pages
import CustomerRegistration from "./pages/Customer/CustomerRegistration";
import CustomerLogin from "./pages/Customer/CustomerLogin";
import ForgotPin from "./pages/Customer/ForgotPin";
import SetNewPin from "./pages/Customer/SetNewPin";
import CustomerTemples from "./pages/Customer/CustomerTemples";
import CustomerBookSeva from "./pages/Customer/BookSeva";
import CustomerBookings from "./pages/Customer/CustomerBookings";
import CustomerDashboard from "./pages/Customer/CustomerDashboard";
import { useEffect } from "react";
import SellerRegistartion from "./pages/seller/SellerRegistartion";
import { ToastContainer } from "react-toastify";

function AppContent() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);
  const isAdminRoute = [
    "/dashboard",
    "/temple-list",
    "/services",
    "/advance-policies",
    "/refund-policies",
    "/pricing-rules",
    "/templeadmin",
  ].some((route) => location.pathname.startsWith(route));

  const isCustomerRoute = [
    "/customer-temples",
    "/book-seva",
    "/customer-bookings",
    "/customer-dashboard",
    "/halls-management",
    "/seller-Application",
  ].some((route) => location.pathname.startsWith(route));

  const hideNavAndFooter = isAdminRoute || isCustomerRoute;

  return (
    <>
      {!hideNavAndFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/temples" element={<Temples />} />
        <Route path="/templeDetails/:templeId" element={<TempleDetails />} />
        <Route path="/book-puja" element={<BookPuja />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />

        {/* Customer routes */}
        <Route path="/customer-register" element={<CustomerRegistration />} />
        <Route path="/customer-login" element={<CustomerLogin />} />
        <Route path="/seller-register" element={<CustomerRegistration />} />
        <Route path="/seller-login" element={<CustomerLogin />} />
        <Route path="/forgot-pin" element={<ForgotPin />} />
        <Route path="/sellerforgot-pin" element={<ForgotPin />} />
        <Route path="/set-new-pin" element={<SetNewPin />} />
        <Route path="/customer-temples" element={<CustomerTemples />} />
        <Route path="/book-seva/:templeId" element={<CustomerBookSeva />} />
        <Route path="/customer-bookings" element={<CustomerBookings />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/seller-Application" element={<SellerRegistartion />} />

        {/* Admin nested router */}
        <Route path="/templeadmin/*" element={<AdminRouter />} />

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
        <Route
          path="/halls-management"
          element={
            <AdminLayout>
              <HallsManagement />
            </AdminLayout>
          }
        />
      </Routes>
      {!hideNavAndFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CustomerAuthProvider>
        <Router>
          <AppContent />
        </Router>
        <ToastContainer position="top-right" autoClose={3000} />
      </CustomerAuthProvider>
    </ThemeProvider>
  );
}

export default App;
