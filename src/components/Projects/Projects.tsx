import { useRef, useState } from 'react';
import { useReveal } from '../../hooks/useReveal';
import { PROJECTS, type Cat, type Project } from '../../data/projects';
import './projects.css';

const TABS: [Cat | 'all', string][] = [['all', 'All'], ['fullstack', 'Full Stack'], ['backend', 'Backend'], ['ai', 'AI / ML'], ['frontend', 'Frontend']];
const TONES = ['var(--orange)', 'var(--yellow)', 'var(--coral)', 'var(--teal)'];
const INITIAL = 6;

function Shot({ p, i }: { p: Project; i: number }) {
  const [bad, setBad] = useState(false);
  if (p.img && !bad) return <img src={p.img} alt={`${p.title} screenshot`} loading="lazy" onError={() => setBad(true)} />;
  const ini = p.title.split(/\s+/).filter((w) => /[A-Za-z]/.test(w)).slice(0, 2).map((w) => w[0]).join('');
  return (
    <div className="fallback" style={{ ['--tone' as string]: TONES[i % 4] }} aria-hidden="true">
      <b>{ini}</b><span>{p.tags.slice(0, 3).join(' · ')}</span>
    </div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const [tab, setTab] = useState<Cat | 'all'>('all');
  const [all, setAll] = useState(false);
  const list = PROJECTS.filter((p) => tab === 'all' || p.cat === tab);
  const shown = all ? list : list.slice(0, INITIAL);

  return (
    <section className="proj-sec" id="projects" ref={ref} aria-labelledby="proj-title">
      <p className="about-tag glass reveal"><b>04</b> Projects</p>
      <h2 id="proj-title" className="about-title reveal" style={{ ['--d' as string]: '90ms' }}>SELECTED <span>PROJECTS.</span></h2>
      <p className="proj-intro reveal" style={{ ['--d' as string]: '160ms' }}>A mix of full-stack apps, backend APIs and AI/ML projects. Hover a card to explore, then open the repository.</p>

      <div className="tabs reveal" role="group" aria-label="Filter projects">
        {TABS.map(([k, l]) => <button key={k} type="button" className="nu tab" aria-pressed={tab === k} onClick={() => { setTab(k); setAll(false); }}>{l}</button>)}
      </div>

      <div className="reveal">
        <ul className="proj-grid">
          {shown.map((p, i) => (
            <li key={`${tab}-${p.slug}`} className="proj" style={{ ['--i' as string]: i }}>
              <a className="media" href={p.repo} target="_blank" rel="noreferrer" aria-label={`${p.title}: open repository on GitHub`}>
                <i className="slab s1" /><i className="slab s2" />
                <span className="shot"><Shot p={p} i={i} /><span className="veil"><strong>{p.title}</strong><em>View on GitHub ↗</em></span></span>
              </a>
              <div className="body">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <ul className="chips">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                <p className="links">
                  <a href={p.repo} target="_blank" rel="noreferrer">GitHub ↗</a>
                  {p.live && <a href={p.live} target="_blank" rel="noreferrer">Live demo ↗</a>}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {list.length > INITIAL && (
        <div className="more"><button type="button" className="cta" onClick={() => setAll(!all)}><span>{all ? 'Show fewer' : `Show all ${list.length} projects`}</span><i aria-hidden="true">{all ? '↑' : '↓'}</i></button></div>
      )}
    </section>
  );
}
