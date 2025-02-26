import './App.css';
import AboutUs from './components/AboutUs';
import Carousel from './components/Carousel';
import Footer2 from './components/Footer2';
import MarqueeDemo from './components/MarqueeDemo';
import NavBar from './components/NavBar';
import OurServices from './components/OurServices';


function App() {
  return (
    <>
    <NavBar></NavBar>
    <Carousel></Carousel>
    <OurServices></OurServices>
    <MarqueeDemo></MarqueeDemo>
    <AboutUs></AboutUs>
    <Footer2></Footer2>
    </>
  );
}

export default App;
