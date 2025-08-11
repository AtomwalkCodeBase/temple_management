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
// import Shop from "./pages/Shop";
// import Bhajans from "./pages/Bhajans";
// import Blogs from "./pages/Blogs";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import TempleDetails from "./pages/TempleDetails";
import Dashboard from "./pages/Admin/Dashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Login from "./pages/Login"; // Import Login component
// Placeholder imports for future admin pages
const PujaMasterPage = () => (
  <div style={{ padding: "2rem" }}>Puja Master Page (Coming Soon)</div>
);
const HallMaster = () => (
  <div style={{ padding: "2rem" }}>Hall Master Page (Coming Soon)</div>
);
const PujaBookings = () => (
  <div style={{ padding: "2rem" }}>Puja Bookings Page (Coming Soon)</div>
);
const HallBookings = () => (
  <div style={{ padding: "2rem" }}>Hall Bookings Page (Coming Soon)</div>
);
const Calendar = () => (
  <div style={{ padding: "2rem" }}>Calendar Page (Coming Soon)</div>
);
const ManualBooking = () => (
  <div style={{ padding: "2rem" }}>Manual Booking Page (Coming Soon)</div>
);
const Reports = () => (
  <div style={{ padding: "2rem" }}>Reports Page (Coming Soon)</div>
);

function AppContent() {
  const location = useLocation();
  const isAdminRoute =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/templeadmin");
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
        {/* <Route path="/shop" element={<Shop />} /> */}
        {/* <Route path="/bhajans" element={<Bhajans />} /> */}
        {/* <Route path="/blogs" element={<Blogs />} /> */}
        <Route path="/login" element={<Login />} />
        {/* Admin routes */}
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/templeadmin" element={<Dashboard />} />
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
