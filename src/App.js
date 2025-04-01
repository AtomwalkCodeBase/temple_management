import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AboutUs from './components/AboutUs';
// import Carousel from './components/Carousel';
import Footer2 from './components/Footer2';
// import MarqueeDemo from './components/MarqueeDemo';
import NavBar from './components/NavBar';
import FrontPage from './components/FrontPage';
import Services from './components/Services';
import ContactUs from './components/ContactUs';
import BlogListingPage from './components/BlogListingPage';
import CareersPage from './components/CareersPage';
// import OurServices from './components/OurServices';


function App() {
  return (
    <div className="App">
      <Router>
      <NavBar></NavBar>
        <Routes>
        <Route path="" element={<FrontPage/>} />
        <Route path="/aboutus.html" element={<AboutUs/>} />
        <Route path="/services.html" element={<Services/>} />
        <Route path="/contact.html" element={<ContactUs/>} />
        <Route path="/blog.html" element={<BlogListingPage/>} />
        <Route path="/careers.html" element={<CareersPage/>} />
        </Routes>
      </Router>
      <Footer2></Footer2>
    </div>
  );
}

export default App;
