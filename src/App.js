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
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRouter from "./components/Admin/AdminRouter";
import Login from "./pages/Login"; // Import Login component

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
        <Route path="/templeadmin/*" element={<AdminRouter />} />
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
