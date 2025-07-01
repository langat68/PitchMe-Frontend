import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './Home/components/Navbar';
import Footer from './Home/components/Footer';
import HomePage from './Home/HomePage';
import ResumeBuilderPage from './Dashboard/Forms/ResumeBuilderPage';
import { ResumeProvider } from './Dashboard/Forms/ResumeContext';

/**
 * A layout component for pages that need the standard Navbar and Footer.
 * The <Outlet /> component from react-router-dom will render the 
 * specific child route's element (e.g., HomePage).
 */
const SiteLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <ResumeProvider>
      <Routes>
        {/* Routes that should have the Navbar and Footer */}
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          {/* Add other pages that need the main layout here */}
          {/* Example: <Route path="/about" element={<AboutPage />} /> */}
        </Route>

        {/* Standalone route for the resume builder without the layout */}
        <Route path="/build-resume" element={<ResumeBuilderPage />} />
      </Routes>
    </ResumeProvider>
  );
}

export default App;