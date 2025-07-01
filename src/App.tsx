import { Routes, Route } from 'react-router-dom';

// General layout components
import Navbar from './Home/components/Navbar'; // ✅ Path is likely correct
import Footer from './Home/components/Footer'; // ✅ Path is likely correct

// Page components
import HomePage from './Home/HomePage'; // ✅ Import the new homepage
import ResumeBuilderPage from './Dashboard/Forms/ResumeBuilderPage' // ✅ Import the resume builder page

function App() {
  return (
    <>
      {/* Navbar will show on every page */}
      <Navbar />

      <main>
        {/* The Routes component defines where page content will be switched */}
        <Routes>
          {/* Route 1: The root path '/' renders the HomePage */}
          <Route path="/" element={<HomePage />} />

          {/* Route 2: The '/build-resume' path renders the ResumeBuilderPage */}
          <Route path="/build-resume" element={<ResumeBuilderPage />} />
        </Routes>
      </main>

      {/* Footer will show on every page */}
      <Footer />
    </>
  );
}

export default App;