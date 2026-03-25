import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profileImg from '../assets/Newpicture.jpg';

// ── Palette ───────────────────────────────────────────────────────────────────
const B = {
  fill:    '#f8f5ee',   // cancellous bone (white)
  cortex:  '#dfc090',   // cortical surface
  stroke:  '#7a4a10',   // main outline
  dark:    '#4e3008',   // dense cortical / shadow
  hi:      '#fefcf8',   // specular highlight
  facet:   '#f5e44a',   // articular cartilage (yellow)
  facetSt: '#c8a010',   // facet outline (golden)
  discOut: '#3a78b0',   // annulus fibrosus outer
  discMid: '#5a9fd4',   // annulus fill
  discIn:  '#c8e8f8',   // nucleus pulposus
  nerve:   '#e09020',   // spinal nerve root (orange)
};

// ── Layout ────────────────────────────────────────────────────────────────────
const BX    = 162;
const VW    = 460;
const SVG_H = 460;
const CYS   = [85, 192, 298, 404];    // body-center Y for L2–L5
const DYS   = [140, 246, 352];        // disc midpoints
// Lordosis: each lower vertebra is shifted anteriorly (left = smaller X)
const CXS   = [8, -8, -8, 8];         // bx offset per vertebra level (lordosis bow)

// ── Vertebral body ────────────────────────────────────────────────────────────
function Body({ bx, by, label }: { bx: number; by: number; label: string }) {
  const bd = `
    M ${bx - 62},${by - 24}
    Q ${bx - 68},${by     } ${bx - 62},${by + 24}
    Q ${bx - 38},${by + 32} ${bx     },${by + 30}
    Q ${bx + 38},${by + 32} ${bx + 62},${by + 24}
    L ${bx + 62},${by - 24}
    Q ${bx + 38},${by - 32} ${bx     },${by - 30}
    Q ${bx - 38},${by - 32} ${bx - 62},${by - 24}
    Z
  `;
  return (
    <>
      <path d={bd} fill={B.fill} stroke={B.stroke} strokeWidth={2} />
      {[-12, 0, 12].map(d => (
        <path key={d}
          d={`M ${bx - 50},${by + d} Q ${bx},${by + d - 2} ${bx + 50},${by + d}`}
          fill="none" stroke={B.cortex} strokeWidth={0.8} opacity={0.45} />
      ))}
      {/* Superior cortical endplate */}
      <path d={`M ${bx - 60},${by - 25} Q ${bx},${by - 36} ${bx + 60},${by - 25}`}
        fill="none" stroke={B.cortex} strokeWidth={7} strokeLinecap="round" opacity={0.7} />
      {/* Inferior cortical endplate */}
      <path d={`M ${bx - 60},${by + 25} Q ${bx},${by + 36} ${bx + 60},${by + 25}`}
        fill="none" stroke={B.cortex} strokeWidth={7} strokeLinecap="round" opacity={0.7} />
      {/* Anterior cortex highlight */}
      <path d={`M ${bx - 59},${by - 20} Q ${bx - 67},${by} ${bx - 59},${by + 20}`}
        fill="none" stroke={B.hi} strokeWidth={3.5} strokeLinecap="round" opacity={0.8} />
      {/* Posterior cortex shadow */}
      <path d={`M ${bx + 59},${by - 20} L ${bx + 59},${by + 20}`}
        fill="none" stroke={B.dark} strokeWidth={1.5} opacity={0.35} />
      {label && (
        <text x={bx} y={by + 7}
          textAnchor="middle" fontSize={15} fontWeight={700}
          fill={B.dark} fontFamily="Poppins, sans-serif"
          style={{ userSelect: 'none' }}>
          {label}
        </text>
      )}
    </>
  );
}

// ── Articular processes ───────────────────────────────────────────────────────
function ArticularProcesses({ bx, by }: { bx: number; by: number }) {
  const ax = bx + 80;
  const sapPath = `
    M ${ax - 12},${by - 22}
    L ${ax - 12},${by - 46}
    Q ${ax - 10},${by - 54} ${ax},${by - 54}
    Q ${ax + 12},${by - 54} ${ax + 14},${by - 46}
    L ${ax + 14},${by - 26}
    Q ${ax + 12},${by - 20} ${ax + 6},${by - 20}
    L ${ax - 6},${by - 20}
    Q ${ax - 10},${by - 20} ${ax - 12},${by - 22}
    Z
  `;
  const iapPath = `
    M ${ax - 12},${by + 22}
    L ${ax - 12},${by + 46}
    Q ${ax - 10},${by + 54} ${ax},${by + 54}
    Q ${ax + 12},${by + 54} ${ax + 14},${by + 46}
    L ${ax + 14},${by + 26}
    Q ${ax + 12},${by + 20} ${ax + 6},${by + 20}
    L ${ax - 6},${by + 20}
    Q ${ax - 10},${by + 20} ${ax - 12},${by + 22}
    Z
  `;
  return (
    <>
      <path d={sapPath} fill={B.facet} stroke={B.facetSt} strokeWidth={1.7} />
      <path d={`M ${ax - 9},${by - 44} L ${ax - 9},${by - 26}`}
        fill="none" stroke="white" strokeWidth={2.5} opacity={0.4} />
      <ellipse cx={ax + 16} cy={by - 36} rx={5} ry={4}
        fill={B.cortex} stroke={B.stroke} strokeWidth={1.2} />
      <path d={iapPath} fill={B.facet} stroke={B.facetSt} strokeWidth={1.7} />
      <path d={`M ${ax + 11},${by + 26} L ${ax + 11},${by + 44}`}
        fill="none" stroke="white" strokeWidth={2.5} opacity={0.4} />
    </>
  );
}

// ── Intervertebral disc with crosshatch ───────────────────────────────────────
function Disc({ by, bx, index }: { by: number; bx: number; index: number }) {
  const clipId = `disc-clip-${index}`;
  const discPath = `M ${bx - 60},${by - 17} Q ${bx},${by - 21} ${bx + 60},${by - 17}
    L ${bx + 60},${by + 17} Q ${bx},${by + 21} ${bx - 60},${by + 17} Z`;
  return (
    <g>
      <defs>
        <clipPath id={clipId}>
          <path d={discPath} />
        </clipPath>
      </defs>
      {/* Annulus fibrosus base */}
      <path d={discPath} fill={B.discMid} stroke={B.discOut} strokeWidth={2} />
      {/* Crosshatch lines clipped to disc */}
      {Array.from({ length: 26 }, (_, i) => (
        <line key={`a${i}`}
          x1={bx - 72 + i * 6} y1={by - 23}
          x2={bx - 72 + i * 6 - 22} y2={by + 23}
          stroke={B.discOut} strokeWidth={0.9} opacity={0.32}
          clipPath={`url(#${clipId})`} />
      ))}
      {Array.from({ length: 26 }, (_, i) => (
        <line key={`b${i}`}
          x1={bx - 72 + i * 6} y1={by - 23}
          x2={bx - 72 + i * 6 + 22} y2={by + 23}
          stroke={B.discOut} strokeWidth={0.9} opacity={0.32}
          clipPath={`url(#${clipId})`} />
      ))}
      {/* Nucleus pulposus (bright white center) */}
      <path d={`M ${bx - 40},${by - 10} Q ${bx},${by - 13} ${bx + 40},${by - 10}
        L ${bx + 40},${by + 10} Q ${bx},${by + 13} ${bx - 40},${by + 10} Z`}
        fill="white" opacity={0.72} />
    </g>
  );
}

// ── Full lumbar vertebra ──────────────────────────────────────────────────────
function Vertebra({
  bx, by, hovered, onEnter, onLeave, onClick, navLabel,
}: {
  bx: number;
  by: number;
  hovered: boolean;
  onEnter(): void;
  onLeave(): void;
  onClick(): void;
  navLabel: string;
}) {
  const lift = hovered ? -22 : 0;
  return (
    <g>
      {/* Animated visual group — pointerEvents:none prevents vibration */}
      <g style={{
        transform:     `translateY(${lift}px)`,
        transition:    'transform 0.26s cubic-bezier(.2,.9,.3,1)',
        filter:        hovered
          ? 'drop-shadow(0 16px 30px rgba(10,30,70,0.32))'
          : 'drop-shadow(0 3px 8px rgba(10,30,70,0.12))',
        pointerEvents: 'none',
      }}>

        {/* ── TRANSVERSE PROCESS ── */}
        <path d={`
          M ${bx + 68},${by - 16}
          Q ${bx + 82},${by - 18} ${bx + 136},${by - 46}
          Q ${bx + 143},${by - 52} ${bx + 137},${by - 58}
          Q ${bx + 130},${by - 60} ${bx + 124},${by - 54}
          Q ${bx + 74 },${by - 28} ${bx + 66 },${by - 24}
          Z`}
          fill={B.cortex} stroke={B.stroke} strokeWidth={1.6} />
        <path d={`M ${bx + 69},${by - 17} Q ${bx + 100},${by - 24} ${bx + 134},${by - 48}`}
          fill="none" stroke={B.hi} strokeWidth={1.5} opacity={0.6} />

        {/* ── PEDICLE – rounded tubular shape ── */}
        <path d={`
          M ${bx + 62},${by - 17}
          C ${bx + 72},${by - 23} ${bx + 85},${by - 23} ${bx + 91},${by - 12}
          L ${bx + 91},${by + 12}
          C ${bx + 85},${by + 23} ${bx + 72},${by + 23} ${bx + 62},${by + 17} Z`}
          fill={B.cortex} stroke={B.stroke} strokeWidth={1.7} />
        {/* Pedicle superior cortex highlight */}
        <path d={`M ${bx + 64},${by - 15} C ${bx + 75},${by - 21} ${bx + 86},${by - 20} ${bx + 90},${by - 10}`}
          fill="none" stroke={B.hi} strokeWidth={2} opacity={0.5} />

        {/* ── VERTEBRAL BODY ── */}
        <Body bx={bx} by={by} label={navLabel} />

        {/* ── ARTICULAR PROCESSES (SAP + IAP) ── */}
        <ArticularProcesses bx={bx} by={by} />

        {/* ── LAMINA ── */}
        <path d={`
          M ${bx + 91},${by - 20}
          L ${bx + 148},${by - 15}
          L ${bx + 148},${by + 15}
          L ${bx +  91},${by + 20} Z`}
          fill={B.fill} stroke={B.stroke} strokeWidth={1.7} />
        <path d={`M ${bx + 93},${by - 18} L ${bx + 146},${by - 13}`}
          fill="none" stroke={B.hi} strokeWidth={2} opacity={0.6} />

        {/* ── SPINOUS PROCESS ── */}
        <path d={`
          M ${bx + 148},${by - 14}
          L ${bx + 204},${by - 14}
          Q ${bx + 220},${by - 12} ${bx + 225},${by}
          Q ${bx + 220},${by + 12} ${bx + 204},${by + 14}
          L ${bx + 148},${by + 14} Z`}
          fill={B.fill} stroke={B.stroke} strokeWidth={1.7} />
        <path d={`M ${bx + 150},${by - 13} L ${bx + 204},${by - 13}`}
          fill="none" stroke={B.hi} strokeWidth={2.2} opacity={0.65} />
        <path d={`M ${bx + 150},${by + 12} L ${bx + 204},${by + 12}`}
          fill="none" stroke={B.dark} strokeWidth={1.2} opacity={0.3} />

        {/* Hover glow */}
        {hovered && (
          <path d={`
            M ${bx - 62},${by - 24}
            Q ${bx - 68},${by     } ${bx - 62},${by + 24}
            Q ${bx - 38},${by + 32} ${bx     },${by + 30}
            Q ${bx + 38},${by + 32} ${bx + 62},${by + 24}
            L ${bx + 62},${by - 24}
            Q ${bx + 38},${by - 32} ${bx     },${by - 30}
            Q ${bx - 38},${by - 32} ${bx - 62},${by - 24} Z`}
            fill="rgba(255,238,160,0.22)"
            stroke="rgba(200,145,15,0.55)"
            strokeWidth={2.5} />
        )}
      </g>

      {/* Static hitbox – never moves, eliminates hover vibration */}
      <rect
        x={bx - 72} y={by - 58}
        width={310} height={116}
        fill="transparent"
        style={{ cursor: 'pointer' }}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={onClick}
      />
    </g>
  );
}

// ── Navigation data ───────────────────────────────────────────────────────────
const NAV = [
  { key: 'home',     label: 'Home',     route: null,        desc: '' },
  { key: 'about',    label: 'About',    route: '/about',    desc: 'Education, awards, research, and work experience.' },
  { key: 'projects', label: 'Projects', route: '/projects', desc: 'Biomedical projects and fantasy sports highlights.' },
  { key: 'contact',  label: 'Contact',  route: '/contact',  desc: 'Get in touch — LinkedIn and contact info.' },
];

const BIO = 'Currently researching orthopaedic biomechanics, design, testing, and evaluation of spinal implants through PhD at University of Waterloo.';

// ── Home page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [hov, setHov] = useState<number | null>(null);
  const navigate = useNavigate();

  const hovNav = hov !== null && hov > 0 ? NAV[hov] : null;

  // Per-vertebra bx positions (lordosis offset)
  const BXS = CXS.map(dx => BX + dx);
  // Disc bx: average of adjacent vertebra positions
  const DBX = [0, 1, 2].map(i => (BXS[i] + BXS[i + 1]) / 2);

  return (
    <div className="home-container">

      {/* ── Left: spine SVG ── */}
      <div className="home-spine-panel">
        <svg
          viewBox={`0 0 ${VW} ${SVG_H}`}
          preserveAspectRatio="xMidYMid meet"
          className="home-spine-svg"
        >
          {/* Anterior longitudinal ligament — follows lordotic curve */}
          <path
            d={`M ${BXS[0] - 64},${CYS[0] - 30}
                C ${BXS[0] - 64},${CYS[1]}
                  ${BXS[2] - 64},${CYS[2]}
                  ${BXS[3] - 64},${CYS[3] + 30}`}
            fill="none" stroke={B.dark} strokeWidth={3} opacity={0.2} strokeLinecap="round" />

          {/* Posterior longitudinal ligament — follows lordotic curve */}
          <path
            d={`M ${BXS[0] + 64},${CYS[0] - 30}
                C ${BXS[0] + 64},${CYS[1]}
                  ${BXS[2] + 64},${CYS[2]}
                  ${BXS[3] + 64},${CYS[3] + 30}`}
            fill="none" stroke={B.dark} strokeWidth={3} opacity={0.2} strokeLinecap="round" />

          {/* Ligamentum flavum (connects laminae) */}
          {[0, 1, 2].map(i => (
            <path key={i}
              d={`M ${BXS[i] + 91},${CYS[i] + 20} Q ${(BXS[i] + BXS[i + 1]) / 2 + 90},${DYS[i]} ${BXS[i + 1] + 91},${CYS[i + 1] - 20}`}
              fill="none" stroke="#c8b840" strokeWidth={3} opacity={0.4} strokeLinecap="round" />
          ))}

          {/* Spinal nerve roots (orange, exit through intervertebral foramina) */}
          {[0, 1, 2].map(i => {
            const nx = DBX[i] + 88;
            const ny = DYS[i];
            return (
              <g key={i} style={{ pointerEvents: 'none' }}>
                <path d={`M ${nx},${ny - 10} C ${nx + 14},${ny - 2} ${nx + 16},${ny + 14} ${nx + 8},${ny + 26}`}
                  fill="none" stroke={B.nerve} strokeWidth={6} strokeLinecap="round" opacity={0.9} />
                <path d={`M ${nx + 1},${ny - 8} C ${nx + 14},${ny - 1} ${nx + 15},${ny + 13} ${nx + 8},${ny + 24}`}
                  fill="none" stroke="#f8c060" strokeWidth={2.5} strokeLinecap="round" opacity={0.5} />
              </g>
            );
          })}

          {/* Discs (behind vertebrae) */}
          {DYS.map((dy, i) => <Disc key={dy} by={dy} bx={DBX[i]} index={i} />)}

          {/* Vertebrae */}
          {NAV.map((n, i) => (
            <Vertebra
              key={n.key}
              bx={BXS[i]}
              by={CYS[i]}
              hovered={hov === i}
              onEnter={() => setHov(i)}
              onLeave={() => setHov(null)}
              onClick={() => n.route && navigate(n.route)}
              navLabel={n.label}
            />
          ))}
        </svg>
      </div>

      {/* ── Right: profile panel ── */}
      <div className="home-profile-panel">

        {/* Title + image: never animates or moves */}
        <div className="home-profile-static">
          <h1 className="home-title">Jonah Leinwand</h1>
          <img
            src={profileImg}
            alt="Jonah Leinwand"
            className="home-profile-img"
          />
        </div>

        {/* Description: only this part fades/changes on hover */}
        <div className="home-profile-desc">
          <div className="fade-in" key={hov ?? 'bio'}>
            {hovNav ? (
              <div
                onClick={() => hovNav.route && navigate(hovNav.route!)}
                style={{ cursor: 'pointer' }}
              >
                <h3 style={{ margin: '0 0 10px', fontSize: 22, color: '#1a2540' }}>
                  {hovNav.label}
                </h3>
                <p style={{ margin: '0 0 12px', fontSize: 15, color: '#5a6a7a', lineHeight: 1.6 }}>
                  {hovNav.desc}
                </p>
                <p style={{ margin: 0, fontSize: 13, color: '#2d68ae', fontWeight: 700 }}>
                  Click to visit →
                </p>
              </div>
            ) : (
              <p style={{ margin: 0, fontSize: 15, color: '#3b4a5a', lineHeight: 1.7 }}>
                {BIO}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
