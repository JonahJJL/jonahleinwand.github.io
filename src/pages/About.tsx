import { useState } from 'react';

const sections = [
  {
    key: 'education',
    label: 'Education',
    content: (
      <div>
        <h3>Education</h3>
        <ul style={{ textAlign: 'left', margin: '0 auto', maxWidth: 560 }}>
          <li><strong>Doctor of Philosophy (PhD), Mechanical Engineering, Honours, 2024–Present</strong><br />University of Waterloo, Waterloo, ON</li>
          <li style={{ marginTop: 16 }}><strong>Bachelor of Applied Sciences (BASc), Biomedical Engineering, Honours, Co-op Program, Dean's Honours List, 2019–2024</strong><br />University of Waterloo, Waterloo, ON</li>
        </ul>
      </div>
    )
  },
  {
    key: 'awards',
    label: 'Awards',
    content: (
      <div>
        <h3>Awards</h3>
        <ul style={{ textAlign: 'left', margin: '0 auto', maxWidth: 600 }}>
          <li>2025 Ontario Graduate Scholarship, Ontario Government</li>
          <li>2025 Lab2Market Validate Funding, NSERC L2M</li>
          <li>2024–25 President's Graduate Scholarship, University of Waterloo</li>
          <li>2024 Canada Graduate Scholarship – Masters, NSERC</li>
          <li>2024 Ontario Graduate Scholarship/QEII-GST, Ontario Government, Declined</li>
          <li>2024 Dean of Engineering Master's Excellence Award, University of Waterloo</li>
          <li>2024 Iron Ring Graduate Scholarship, University of Waterloo</li>
          <li>2024 Graduate Dean's Entrance Award, University of Waterloo</li>
          <li>2024 McCall MacBain Regional Award, McCall MacBain Foundation</li>
          <li>2023 Up Start Funding, Velocity Incubator/Waterloo Commercialization Office</li>
          <li>2023 Globalink Research Award, Mitacs (UWaterloo/Imperial College London)</li>
          <li>2023 Velocity Pitch Competition, Velocity Incubator</li>
          <li>2023 Jain Family Award for Entrepreneurship, Velocity Incubator</li>
          <li>2022 NSERC Undergraduate Student Research Award, NSERC</li>
        </ul>
      </div>
    )
  },
  {
    key: 'research',
    label: 'Research',
    content: (
      <div>
        <h3>Research</h3>
        <p style={{ textAlign: 'left', marginBottom: 24, color: '#3b4a5a', fontSize: '1rem' }}>
          <strong>Journal Articles</strong>
        </p>
        <ul style={{ textAlign: 'left', margin: '0 auto', maxWidth: 640, fontSize: '0.97rem', lineHeight: 1.7 }}>
          <li style={{ marginBottom: 16 }}>
            <strong>J. Leinwand</strong>, R. Lam, S. Patel, M. E. McGregor, S. D. McLachlin, M. Vlasea, "Fatigue performance of additively manufactured porous titanium for orthopaedic applications," <em>Journal of the Mechanical Behavior of Biomedical Materials</em>, vol. 178.{' '}
            <a href="https://doi.org/10.1016/j.jmbbm.2026.107393" target="_blank" rel="noreferrer">https://doi.org/10.1016/j.jmbbm.2026.107393</a>
          </li>
          <li style={{ marginBottom: 16 }}>
            M. E. McGregor, C. Cadieux, C. Thompson, R. Fernandes, <strong>J. Leinwand</strong>, P. Rasoulinejad, S. D. McLachlin, "Comparison of pedicle screw loosening under uniaxial and multiaxial loading," <em>Clinical Biomechanics</em>, vol. 131.{' '}
            <a href="https://doi.org/10.1016/j.clinbiomech.2025.106692" target="_blank" rel="noreferrer">doi:10.1016/j.clinbiomech.2025.106692</a>
          </li>
        </ul>
        <p style={{ textAlign: 'left', marginTop: 24, marginBottom: 12, color: '#3b4a5a', fontSize: '1rem' }}>
          <strong>Conference Papers</strong>
        </p>
        <ul style={{ textAlign: 'left', margin: '0 auto', maxWidth: 640, fontSize: '0.97rem', lineHeight: 1.7 }}>
          <li style={{ marginBottom: 16 }}>
            <strong>J. Leinwand</strong>, M. Vlasea, S. D. McLachlin, "Design and mechanical analysis of primitive support flexures," <em>Proceedings of the Holistic Innovation in Additive Manufacturing (HI-AM) Conference</em>, vol. 1, no. 1, Oct. 2025.{' '}
            <a href="https://doi.org/10.15353/hi-am.v1i1.6831" target="_blank" rel="noreferrer">doi:10.15353/hi-am.v1i1.6831</a>
          </li>
        </ul>
        <p style={{ textAlign: 'left', marginTop: 24, marginBottom: 12, color: '#3b4a5a', fontSize: '1rem' }}>
          <strong>Posters</strong>
        </p>
        <ul style={{ textAlign: 'left', margin: '0 auto', maxWidth: 640, fontSize: '0.97rem', lineHeight: 1.7 }}>
          <li>
            <strong>J. Leinwand</strong>, M. Vlasea, S. D. McLachlin, "Design and mechanical analysis of primitive support flexures," HI-AM (2025), Waterloo, Canada.
          </li>
        </ul>
      </div>
    )
  },
  {
    key: 'work',
    label: 'Work Experience',
    content: (
      <div>
        <h3>Work Experience</h3>
        <ul style={{ textAlign: 'left', margin: '0 auto', maxWidth: 600 }}>
          <li><strong>May–Aug 2023:</strong> Visiting Research, Imperial College, Biomechanics Group</li>
          <li style={{ marginTop: 16 }}><strong>May–Aug 2022:</strong> Undergraduate Research Assistant, UWaterloo, Orthopaedic Mechatronics Group</li>
        </ul>
      </div>
    )
  }
];

export default function About() {
  const [active, setActive] = useState('education');
  return (
    <main className="about-main">
      <div className="sidebar-buttons-container">
        {sections.map((s) => (
          <button
            key={s.key}
            onClick={() => setActive(s.key)}
            className={active === s.key ? 'sidebar-button active' : 'sidebar-button'}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="about-content">
        <div className="fade-in" key={active}>
          {sections.find((s) => s.key === active)?.content}
        </div>
      </div>
    </main>
  );
}
