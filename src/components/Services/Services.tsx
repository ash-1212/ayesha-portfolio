import { useRef } from 'react';
import { useReveal } from '../../hooks/useReveal';
import './services.css';

/** Skill levels (%). Edit freely. */
const SKILLS = [['JavaScript', 80], ['React', 85], ['Node.js & Express', 85], ['MongoDB', 85], ['WordPress', 90], ['AI / ML (Python)', 85]] as const;

const S = { fill: 'none', stroke: 'var(--teal)', strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
const CARDS = [
  { t: 'Web Development', d: 'Full-stack MERN applications, from database to deploy.', ac: 'var(--orange)',
    i: <g {...S}><rect x="6" y="8" width="36" height="32" rx="5" /><path d="M6 17h36M20 24l-5 5 5 5M28 24l5 5-5 5" /><circle cx="12" cy="12.5" r="1" fill="var(--coral)" stroke="none" /><circle cx="17" cy="12.5" r="1" fill="var(--yellow)" stroke="none" /></g> },
  { t: 'UI Implementation', d: 'Responsive, accessible interfaces that feel polished on every device.', ac: 'var(--coral)',
    i: <g {...S}><rect x="6" y="8" width="36" height="32" rx="5" /><path d="M19 8v32M19 24h23" /><circle cx="12.5" cy="16" r="2.5" fill="var(--coral)" stroke="none" /></g> },
  { t: 'WordPress', d: 'Custom WordPress sites that are fast and easy to manage.', ac: 'var(--yellow)',
    i: <g {...S}><circle cx="24" cy="24" r="17" /><path d="M14 18l5 14 5-11 5 11 5-14" /></g> },
  { t: 'AI / ML Integration', d: 'Practical machine-learning features built into real products.', ac: 'var(--teal)',
    i: <g {...S}><path d="M12 14l12-6 12 8M12 14l6 20M24 8l-6 26M36 16l-6 18M18 34h12" /><circle cx="12" cy="14" r="3.2" fill="var(--yellow)" /><circle cx="24" cy="8" r="3.2" fill="var(--coral)" /><circle cx="36" cy="16" r="3.2" fill="var(--orange)" /><circle cx="18" cy="34" r="3.2" fill="var(--bg)" /><circle cx="30" cy="34" r="3.2" fill="var(--bg)" /></g> },
];

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const d = (i: number) => ({ ['--d' as string]: `${i * 90}ms` });

  return (
    <section className="svc" id="services" ref={ref} aria-labelledby="svc-title">
      <div className="svc-grid">
        <div className="svc-copy">
          <p className="about-tag glass reveal"><b>03</b> Services</p>
          <h2 id="svc-title" className="svc-title reveal" style={d(1)}>FULL-CYCLE WEB DEVELOPMENT, <span>FROM IDEA TO LAUNCH.</span></h2>
          <p className="svc-text reveal" style={d(2)}>I design, build and ship complete web products: responsive interfaces, APIs and databases, WordPress sites and AI-powered features. Need a specific technology or a focused piece of work? I can help with that too.</p>
          <ul className="bars">
            {SKILLS.map(([n, v], i) => (
              <li key={n} className="reveal" style={d(i + 3)}>
                <div className="bar-row"><span>{n}</span><span>{v}%</span></div>
                <div className="track" role="progressbar" aria-label={`${n} proficiency`} aria-valuenow={v} aria-valuemin={0} aria-valuemax={100}><i style={{ ['--v' as string]: v / 100 }} /></div>
              </li>
            ))}
          </ul>
        </div>

        <ul className="svc-cards">
          {CARDS.map((c, i) => (
            <li key={c.t} className="svc-card nu reveal" style={{ ...d(i + 2), ['--ac' as string]: c.ac }}>
              <span className="svc-ic"><svg viewBox="0 0 48 48" aria-hidden="true">{c.i}</svg></span>
              <h3>{c.t}</h3><p>{c.d}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="svc-cta glass reveal" style={d(4)}>
        <p>Have a project in mind?</p>
        <a className="cta" href="#contact"><span>Let's Talk</span><i aria-hidden="true">→</i></a>
      </div>
    </section>
  );
}
