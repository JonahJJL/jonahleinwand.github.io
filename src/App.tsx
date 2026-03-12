import './App.css';

function App() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <h1>Jonah Leinwand</h1>
      <p>Welcome to my personal website, built with React and Vite!</p>
      <nav style={{ marginTop: 24 }}>
        <a href="#about" style={{ margin: '0 12px' }}>About</a>
        <a href="#projects" style={{ margin: '0 12px' }}>Projects</a>
        <a href="#contact" style={{ margin: '0 12px' }}>Contact</a>
      </nav>
      <section id="about" style={{ marginTop: 48, maxWidth: 600, textAlign: 'center' }}>
        <h2>About Me</h2>
        <p>This is a minimal homepage. You can customize this section with your bio, interests, or anything you'd like to share.</p>
      </section>
      <section id="projects" style={{ marginTop: 48, maxWidth: 600, textAlign: 'center' }}>
        <h2>Projects</h2>
        <p>Showcase your projects here.</p>
      </section>
      <section id="contact" style={{ marginTop: 48, maxWidth: 600, textAlign: 'center' }}>
        <h2>Contact</h2>
        <p>Add your contact information or a contact form here.</p>
      </section>
    </main>
  );
}

export default App;
