import { useState } from 'react';

const sections = [
  {
    key: 'education',
    label: 'Education',
    content: (
      <div>
        <h3>Education</h3>
        <ul style={{ textAlign: 'left', margin: '0 auto', maxWidth: 500 }}>
          <li><strong>Doctor of Philosophy (PhD), Mechanical Engineering, Honours, 2024-Present</strong><br />University of Waterloo, Waterloo, ON</li>
          <li style={{ marginTop: 16 }}><strong>Bachelor of Applied Sciences (BASc), Biomedical Engineering, Honours, Co-op Program, Dean’s Honours List, 2019-2024</strong><br />University of Waterloo, Waterloo, ON</li>
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
          <li>2024-25 President’s Graduate Scholarship, University of Waterloo</li>
          <li>2024 Canada Graduate Scholarship – Masters, NSERC</li>
          <li>2024 Ontario Graduate Scholarship/QEII-GST, Ontario Government, Declined</li>
          <li>2024 Dean of Engineering Master’s Excellence Award, University of Waterloo</li>
          <li>2024 Iron Ring Graduate Scholarship, University of Waterloo</li>
          <li>2024 Graduate Dean’s Entrance Award, University of Waterloo</li>
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
        <p>Research highlights and publications coming soon.</p>
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
          <li><strong>May-Aug 2023:</strong> Visiting Research, Imperial College, Biomechanics Group</li>
          <li style={{ marginTop: 16 }}><strong>May-Aug 2022:</strong> Undergraduate Research Assistant, UWaterloo, Orthopaedic Mechatronics Group</li>
        </ul>
      </div>
    )
  }
];

export default function About() {
  const [active, setActive] = useState('education');
  return (
    <main style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center',
      height: 500,
      background: 'rgba(255,255,255,0.92)',
      boxShadow: '0 8px 32px 0 #b0c4de33',
      borderRadius: 24,
      margin: '32px auto 0 auto',
      padding: 0,
      maxWidth: 1000,
      position: 'relative',
      overflow: 'visible'
    }}>
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
      <div style={{ flex: 1, padding: '48px 32px 48px 64px', minWidth: 0 }}>
        <div className="fade-in">
          {sections.find((s) => s.key === active)?.content}
        </div>
      </div>
    </main>
  );
}