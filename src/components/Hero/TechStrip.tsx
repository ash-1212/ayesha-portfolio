const TEAL = 'var(--teal)', BG = 'var(--bg)';
const T = [
  { n: 'HTML5', i: <><path d="M9 6h30l-2.7 31L24 42l-12.3-5z" fill="var(--orange)" /><text x="24" y="29" textAnchor="middle" fill={BG} fontWeight="700" fontSize="17">5</text></> },
  { n: 'CSS3', i: <><path d="M9 6h30l-2.7 31L24 42l-12.3-5z" fill="var(--coral)" /><text x="24" y="29" textAnchor="middle" fill={BG} fontWeight="700" fontSize="17">3</text></> },
  { n: 'JavaScript', i: <><rect x="7" y="7" width="34" height="34" rx="4" fill="var(--yellow)" /><text x="35" y="37" textAnchor="end" fill={TEAL} fontWeight="700" fontSize="16">JS</text></> },
  { n: 'React', i: <g fill="none" stroke={TEAL} strokeWidth="2"><ellipse cx="24" cy="24" rx="18" ry="7" /><ellipse cx="24" cy="24" rx="18" ry="7" transform="rotate(60 24 24)" /><ellipse cx="24" cy="24" rx="18" ry="7" transform="rotate(120 24 24)" /><circle cx="24" cy="24" r="3" fill="var(--coral)" stroke="none" /></g> },
  { n: 'Node.js', i: <><polygon points="24,5 41,14.5 41,33.5 24,43 7,33.5 7,14.5" fill={TEAL} /><text x="24" y="30" textAnchor="middle" fill={BG} fontWeight="700" fontSize="17">N</text></> },
  { n: 'MongoDB', i: <><path d="M24 4c5 7 9 12 9 20 0 7-4 13-9 17-5-4-9-10-9-17 0-8 4-13 9-20z" fill="var(--yellow)" /><path d="M24 10v31" stroke={TEAL} strokeWidth="2" /></> },
  { n: 'WordPress', i: <><circle cx="24" cy="24" r="17" fill="none" stroke={TEAL} strokeWidth="3" /><text x="24" y="31" textAnchor="middle" fill={TEAL} fontWeight="700" fontSize="20">W</text></> },
  { n: 'Python', i: <><rect x="7" y="7" width="34" height="34" rx="12" fill="var(--orange)" /><text x="24" y="31" textAnchor="middle" fill={TEAL} fontWeight="700" fontSize="18">Py</text></> },
];

export default function TechStrip() {
  return (
    <div className="tech rv" style={{ ['--t' as string]: '1.7s' }}>
      <p className="tech-label">High knowledge in tools &amp; technologies</p>
      <ul aria-label="Technologies">
        {T.map((t) => (
          <li key={t.n} className="chip nu" title={t.n}>
            <svg viewBox="0 0 48 48" role="img" aria-label={t.n}>{t.i}</svg>
          </li>
        ))}
      </ul>
    </div>
  );
}
