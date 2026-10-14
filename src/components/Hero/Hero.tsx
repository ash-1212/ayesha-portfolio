import { useEffect, useRef, useState } from 'react';
import HeroArt from './HeroArt';
import FlowBackground from './FlowBackground';
import TechStrip from './TechStrip';
import './hero.css';

const LINES = ['FULL STACK', 'WEB DEVELOPER', 'MERN & AI/ML.'];
const NAV = [['Home', '#home'], ['About', '#about'], ['Services', '#services'], ['Projects', '#projects'], ['Contact', '#contact']];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    addEventListener('keydown', k);
    return () => removeEventListener('keydown', k);
  }, [open]);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
    let raf = 0;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
        el.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
      });
    };
    const scroll = () => el.style.setProperty('--sp', Math.min(1, scrollY / innerHeight).toFixed(3));
    if (fine) el.addEventListener('pointermove', move);
    addEventListener('scroll', scroll, { passive: true });
    return () => { el.removeEventListener('pointermove', move); removeEventListener('scroll', scroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className="hero" id="home" ref={ref} aria-labelledby="hero-title">
      <FlowBackground />
      <div className="hero-scrim" aria-hidden="true" />
      <header className="hero-nav rv" style={{ ['--t' as string]: '1.35s' }}>
        <a className="brand" href="#home">AN<span>.</span></a>
        <button type="button" className="burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen((o) => !o)}><span /><span /><span /></button>
        <nav id="primary-nav" aria-label="Primary" className={open ? 'open' : undefined}><ul>{NAV.map(([l, h]) => <li key={l}><a href={h} onClick={() => setOpen(false)} className={l === 'Home' ? 'active' : undefined} aria-current={l === 'Home' ? 'page' : undefined}>{l}</a></li>)}</ul></nav>
      </header>

      <p className="role glass rv" style={{ ['--t' as string]: '1.25s' }}><span className="dot" aria-hidden="true" />Available for full-time roles</p>

      <h1 id="hero-title" className="title" aria-label={LINES.join(' ')}>
        {LINES.map((l, i) => (
          <span className="mask" key={l} aria-hidden="true"><span className="line" style={{ ['--i' as string]: i }}>{l}</span></span>
        ))}
      </h1>

      <div className="intro rv" style={{ ['--t' as string]: '1.45s' }}>
        <p>Computer Science graduate building fast, accessible web apps with React, Node.js and MongoDB, plus WordPress and applied AI/ML. Open to full-time opportunities.</p>
        <a className="cta" href="#projects"><span>View My Work</span><i aria-hidden="true">→</i></a>
        <a className="cta ghost nu" href="#contact"><span>Contact Me</span></a>
        <p className="social"><a href="https://github.com/ash-1212" target="_blank" rel="noreferrer" className="nu">GitHub ↗</a><a href="https://www.linkedin.com/in/ayesha-nazish-452048274" target="_blank" rel="noreferrer" className="nu">LinkedIn ↗</a></p>
      </div>

      <HeroArt />

      <TechStrip />

      <a className="scroll glass rv" href="#about" style={{ ['--t' as string]: '1.6s' }} aria-label="Scroll down"><span>Scroll</span><i /></a>
    </section>
  );
}
