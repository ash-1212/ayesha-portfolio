import { useEffect, useRef } from 'react';
import './about.css';

/** Put your PDF in /public with this name (or change the path). */
const RESUME_URL = '/Ayesha-Nazish-Resume.pdf';

const FOCUS = [
  { t: 'Frontend', d: 'Responsive, accessible interfaces built with React and TypeScript.', c: 'orange' },
  { t: 'Backend', d: 'REST APIs and data layers with Node.js, Express and MongoDB.', c: 'yellow' },
  { t: 'WordPress', d: 'Custom, fast WordPress sites that clients can manage themselves.', c: 'coral' },
  { t: 'AI / ML', d: 'Applied machine learning that makes products genuinely more useful.', c: 'teal' },
];
const FACTS = [['Role', 'Full Stack · MERN Developer'], ['Education', 'BS Computer Science, CUSIT · Gold Medalist (CGPA 3.97)'], ['Also', 'WordPress · Applied AI/ML'], ['Status', 'Open to full-time roles']];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal');
    if (!els) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.15 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  const d = (i: number) => ({ ['--d' as string]: `${i * 90}ms` });

  return (
    <section className="about" id="about" ref={ref} aria-labelledby="about-title">
      <p className="about-tag glass reveal"><b>02</b> About me</p>
      <h2 id="about-title" className="about-title reveal" style={d(1)}>HI, I'M<br />AYESHA <span>NAZISH.</span></h2>

      <div className="about-grid">
        <i className="blob b-y" aria-hidden="true" /><i className="blob b-c" aria-hidden="true" />
        <div className="bio glass reveal" style={d(2)}>
          <p className="lead">I'm a Full Stack Web Developer who turns ideas into fast, accessible products.</p>
          <p>I work across the MERN stack, build WordPress sites, and apply AI/ML where it makes software genuinely more useful. As a Computer Science graduate and gold medalist, I care about clean code, clear interfaces and shipping work that holds up.</p>
          <div className="bio-actions">
            <a className="cta" href="#contact"><span>Let's Talk</span><i aria-hidden="true">→</i></a>
            <a className="nu pill" href="https://github.com/ash-1212" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a className="nu pill" href="https://www.linkedin.com/in/ayesha-nazish-452048274" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a className="nu pill resume" href={RESUME_URL} download="Ayesha-Nazish-Resume.pdf">Download Resume ↓</a>
            <a className="nu pill" href={RESUME_URL} target="_blank" rel="noreferrer">View Resume ↗</a>
          </div>
        </div>
        <dl className="facts reveal" style={d(3)}>
          {FACTS.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
        </dl>
      </div>

      <ul className="focus">
        {FOCUS.map((f, i) => (
          <li key={f.t} className="card nu reveal" style={d(i + 2)}>
            <span className={`key k-${f.c}`}>0{i + 1}</span>
            <h3>{f.t}</h3><p>{f.d}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
