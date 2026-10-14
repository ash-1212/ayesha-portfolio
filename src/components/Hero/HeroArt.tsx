const bars: [number, number, string][] = [
  [0, 120, 'o'], [14, 80, 'w'], [14, 150, 'y'], [28, 60, 'c'], [28, 110, 'w'],
  [0, 90, 'y'], [14, 140, 'w'], [42, 70, 'o'], [42, 120, 'w'], [28, 50, 'c'],
];
const nodes: [number, number][] = [[24, 40], [80, 20], [136, 52], [50, 96], [110, 104], [76, 142]];
const edges = [[0, 1], [1, 2], [0, 3], [1, 3], [1, 4], [2, 4], [3, 5], [4, 5]];

/** Layered, parallax-ready artwork. Outer .layer = pointer/scroll parallax, inner .piece = entrance + float. */
export default function HeroArt() {
  const L = (d: number, s: number) => ({ '--d': d, '--s': s }) as React.CSSProperties;
  return (
    <div className="art" aria-hidden="true">
      <div className="layer l-arch" style={L(8, 30)}><div className="piece p1" /></div>
      <div className="layer l-panel" style={L(14, 60)}>
        <div className="piece p2">
          <svg viewBox="0 0 300 380">
            <circle cx="30" cy="34" r="6" className="f-coral" /><circle cx="52" cy="34" r="6" className="f-yellow" /><circle cx="74" cy="34" r="6" className="f-orange" />
            <text x="212" y="40" className="code-tag">{'</>'}</text>
            {bars.map(([ind, w, c], i) => (
              <rect key={i} x={30 + ind * 2} y={84 + i * 26} width={w * 1.5} height="11" rx="5.5" className={`b-${c}`} style={{ animationDelay: `${1.1 + i * 0.07}s` }} />
            ))}
            <rect x="30" y="360" width="10" height="4" className="f-yellow cursor" />
          </svg>
        </div>
      </div>
      <div className="layer l-sun" style={L(26, 110)}><div className="piece p3 float-a" /></div>
      <div className="layer l-graph" style={L(38, 150)}>
        <div className="piece p4 glass float-b">
          <svg viewBox="0 0 160 160">
            {edges.map(([a, b], i) => <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} className="edge" />)}
            {nodes.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i === 1 ? 9 : 6} className={i === 1 ? 'f-coral' : 'node'} />)}
          </svg>
        </div>
      </div>
      <div className="layer l-stack" style={L(30, 90)}><div className="piece p6 glass dark"><small>Tech stack</small><p>React · Node.js · MongoDB · WordPress · AI/ML</p></div></div>
      <div className="layer l-ring" style={L(20, 80)}><div className="piece p5 glass"><span>AI/ML</span></div></div>
    </div>
  );
}
