//import './App.scss'; // or './App.css'
import Navbar from '../src/Home/components/Navbar'; // ✅ adjust if needed
import HeroSection from '../src/Home/components/Hero'; // ✅ double slash cleaned
import Benefits from '../src/Home/components/Benefits';
import Action from '../src/Home/components/action'
import Footer from '../src/Home/components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Benefits/>
      <Action/>
      <Footer/>
    </>
  );
}

export default App;
