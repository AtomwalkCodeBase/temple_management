import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import { theme } from "./styles/theme";
import Navbar from "./components/Navbar";
import Temples from "./pages/Temples";
import BookPuja from "./pages/BookPuja";
import LiveDarshan from "./pages/LiveDarshan";
// import Shop from "./pages/Shop";
// import Bhajans from "./pages/Bhajans";
// import Blogs from "./pages/Blogs";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import TempleDetails from "./pages/TempleDetails";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/temples" element={<Temples />} />
          <Route path="/templeDetails/:templeId" element={<TempleDetails />} />
          <Route path="/book-puja" element={<BookPuja />} />
          <Route path="/live-darshan" element={<LiveDarshan />} />
          {/* <Route path="/shop" element={<Shop />} /> */}
          {/* <Route path="/bhajans" element={<Bhajans />} /> */}
          {/* <Route path="/blogs" element={<Blogs />} /> */}
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
