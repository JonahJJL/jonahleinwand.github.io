export default function Contact() {
  return (
    <main style={{ padding: 32, fontFamily: 'Poppins, Segoe UI, Arial, sans-serif' }}>
      <h2>Contact</h2>
      <p>For inquiries, collaborations, or more information about biomedical and spine topics, please reach out via email or the contact form.</p>
      <div style={{ marginTop: 32 }}>
        <a
          href="https://www.linkedin.com/in/jonahleinwand/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            background: 'linear-gradient(90deg, #0077b5 0%, #00c6fb 100%)',
            color: 'white',
            fontWeight: 700,
            fontSize: 18,
            padding: '14px 32px',
            borderRadius: 12,
            textDecoration: 'none',
            boxShadow: '0 2px 12px 0 #b0c4de33',
            transition: 'background 0.2s, color 0.2s',
          }}
        >
          Connect on LinkedIn
        </a>
      </div>
    </main>
  );
}