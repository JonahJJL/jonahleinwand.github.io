import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import profileImg from './assets/Newpicture.jpg';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import './App.css';

export default function AppRouter() {
  return (
    <Router>
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        background: 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1.5px solid #b0c4de',
        padding: '0',
        boxShadow: '0 4px 24px 0 rgba(44,62,80,0.07)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 70
      }}>
        <nav className="top-nav">
          <NavLink to="/" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink>
          <NavLink to="/projects" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Projects</NavLink>
          <NavLink to="/contact" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Contact</NavLink>
        </nav>
      </header>
      <div style={{ paddingTop: 100, minHeight: '100vh', background: 'linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)', fontFamily: 'Poppins, Segoe UI, Arial, sans-serif' }}>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={
            <section className="home-hero">
              <div className="hero-inner">
                <div className="hero-left">
                  <h1 className="hero-title">Jonah Leinwand</h1>
                  <p className="hero-sub">Currently researching orthopaedic biomechanics, design, testing, and evaluation of spinal implants through PhD at University of Waterloo</p>
                </div>
                <div className="hero-right">
                  <img src={profileImg} alt="Profile" className="hero-photo" />
                </div>
              </div>
            </section>
          } />
        </Routes>
      </div>
    </Router>
  );
}
