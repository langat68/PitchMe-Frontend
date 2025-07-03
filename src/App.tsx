import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './Home/components/Navbar';
import Footer from './Home/components/Footer';
import HomePage from './Home/HomePage';
import ResumeBuilderPage from './Dashboard/Forms/ResumeBuilderPage';
import { ResumeProvider } from './Dashboard/Forms/ResumeContext';
import HeroSection from './Home/components/Hero';
import Action from './Home/components/action';
import Login from './Home/components/Login';
import Register from './Home/components/Register';
import './index.css';

/**
 * Full site layout: Navbar + Hero + Action + Footer
 */
const SiteLayout = () => (
  <>
    <Navbar />
    <main>
      <Outlet />
    </main>
    <HeroSection />
    <Action />
    <Footer />
  </>
);

/**
 * Blank layout: just renders the page content.
 */
const BlankLayout = () => (
  <main>
    <Outlet />
  </main>
);

function App() {
  return (
    <ResumeProvider>
      <Routes>
        {/* Pages with full site layout */}
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        {/* Auth pages without Navbar/Footer */}
        <Route element={<BlankLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Standalone route (no layout) */}
        <Route path="/build-resume" element={<ResumeBuilderPage />} />
      </Routes>
    </ResumeProvider>
  );
}

export default App;
