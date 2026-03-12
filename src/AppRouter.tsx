import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
        <nav style={{
          display: 'flex',
          gap: 40,
          fontFamily: 'Poppins, Segoe UI, Arial, sans-serif',
          fontWeight: 600,
          fontSize: 20,
          letterSpacing: 1,
          padding: '0 32px',
        }}>
          <Link to="/" style={{ color: '#1a2540', textDecoration: 'none', padding: '18px 24px', borderRadius: 16, transition: 'background 0.2s', margin: 0 }}>Home</Link>
          <Link to="/about" style={{ color: '#1a2540', textDecoration: 'none', padding: '18px 24px', borderRadius: 16, transition: 'background 0.2s', margin: 0 }}>About</Link>
          <Link to="/projects" style={{ color: '#1a2540', textDecoration: 'none', padding: '18px 24px', borderRadius: 16, transition: 'background 0.2s', margin: 0 }}>Projects</Link>
          <Link to="/contact" style={{ color: '#1a2540', textDecoration: 'none', padding: '18px 24px', borderRadius: 16, transition: 'background 0.2s', margin: 0 }}>Contact</Link>
        </nav>
      </header>
      <div style={{ paddingTop: 100, minHeight: '100vh', background: 'linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)', fontFamily: 'Poppins, Segoe UI, Arial, sans-serif' }}>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={
            <main style={{
              minHeight: '60vh',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Poppins, Segoe UI, Arial, sans-serif',
              color: '#1a2540',
              marginTop: 32,
              gap: 48
            }}>
              <div style={{ flex: 1, textAlign: 'left', maxWidth: 500 }}>
                <h1 style={{ fontSize: 54, fontWeight: 800, letterSpacing: 2, marginBottom: 12, color: '#1a2540', textShadow: '0 2px 16px #b0c4de55' }}>Jonah Leinwand</h1>
                <p style={{ fontSize: 22, marginBottom: 32, color: '#3b4a5a' }}>Welcome to my biomedical and spine-themed personal website!</p>
                <p style={{ maxWidth: 700, fontSize: 20, color: '#2d3a4b', marginTop: 24 }}>
                  Explore the About, Projects, and Contact pages to learn more about biomedical research and spine innovation.
                </p>
              </div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <img src="/JL_square.jpg" alt="Profile" style={{ width: 320, height: 320, borderRadius: 24, margin: '32px 0', boxShadow: '0 8px 32px 0 #b0c4de55', objectFit: 'cover', background: '#e0eafc' }} />
              </div>
            </main>
          } />
        </Routes>
      </div>
    </Router>
  );
}
