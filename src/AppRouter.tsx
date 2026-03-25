import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Home from './pages/Home';
import './App.css';

// useLocation must live inside <Router>, so we extract inner content
function AppContent() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <>
      {!isHome && (
        <header className="site-header">
          <nav className="top-nav">
            <NavLink to="/"         end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
            <NavLink to="/about"        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink>
            <NavLink to="/projects"     className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Projects</NavLink>
            <NavLink to="/contact"      className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Contact</NavLink>
          </nav>
        </header>
      )}

      <div style={{
        paddingTop: isHome ? 0 : 100,
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)',
        fontFamily: 'Poppins, Segoe UI, Arial, sans-serif',
      }}>
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/about"    element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact"  element={<Contact />} />
        </Routes>
      </div>
    </>
  );
}

export default function AppRouter() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
