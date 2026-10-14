import { useEffect, useRef } from 'react';

/** ── Tweak here ───────────────────────────────────────────── */
export const FLOW = { speed: 1, intensity: 1 }; // speed: 0.3 calm → 2 fast · intensity: 0.4 subtle → 1.2 bold
const PALETTE = { bg: '#F9FAF4', orange: '#F9A66C', yellow: '#FFC94B', coral: '#F17A7E' };
const RENDER_SCALE = 0.5; // lower = lighter on GPU (the image is soft, so 0.5 is invisible)
/** ─────────────────────────────────────────────────────────── */

const rgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);

const VERT = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uRes; uniform float uTime, uIntensity;
uniform vec3 cBg, cOrange, cYellow, cCoral;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*noise(p);p=p*2.02+7.3;a*=.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/uRes;
  vec2 p=(uv-.5)*vec2(uRes.x/uRes.y,1.);
  float c=cos(.8),s=sin(.8);
  vec2 r=vec2(c*p.x-s*p.y, s*p.x+c*p.y);          // tilt the whole field diagonally
  vec2 np=vec2(r.x*.9, r.y*4.2);                   // stretch: slow along streak, fast across it
  float t=uTime;
  vec2 q=vec2(fbm(np+vec2(t*.07,0.)), fbm(np+vec2(5.2,1.3)-vec2(t*.05,0.)));
  float v=fbm(np+1.9*q+vec2(t*.09,0.));
  float silk=noise(vec2(r.x*1.5, r.y*38.+q.x*7.));  // fine fibres
  v=clamp(v+(silk-.5)*.16,0.,1.);
  vec3 col=cBg;
  col=mix(col,cYellow,smoothstep(.38,.52,v));
  col=mix(col,cOrange,smoothstep(.50,.62,v));
  col=mix(col,cCoral ,smoothstep(.60,.72,v));
  float m=uIntensity*(.22+.78*smoothstep(.2,.8,uv.x)); // calmer on the text side
  col=mix(cBg,col,clamp(m,0.,.92));
  gl_FragColor=vec4(col,1.);
}`;

export default function FlowBackground({ speed = FLOW.speed, intensity = FLOW.intensity }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const gl = cv?.getContext('webgl', { antialias: false, powerPreference: 'low-power' });
    if (!cv || !gl) { cv?.classList.add('off'); return; }

    const sh = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { console.warn(gl.getProgramInfoLog(prog)); cv.classList.add('off'); return; }
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = (n: string) => gl.getUniformLocation(prog, n);
    gl.uniform3fv(U('cBg'), rgb(PALETTE.bg)); gl.uniform3fv(U('cOrange'), rgb(PALETTE.orange));
    gl.uniform3fv(U('cYellow'), rgb(PALETTE.yellow)); gl.uniform3fv(U('cCoral'), rgb(PALETTE.coral));
    gl.uniform1f(U('uIntensity'), intensity);

    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let t = 14, last = performance.now(), raf = 0, visible = true;
    const draw = () => { gl.uniform1f(U('uTime'), t); gl.drawArrays(gl.TRIANGLES, 0, 3); };
    const resize = () => {
      const w = Math.max(2, Math.round(cv.clientWidth * RENDER_SCALE)), h = Math.max(2, Math.round(cv.clientHeight * RENDER_SCALE));
      cv.width = w; cv.height = h; gl.viewport(0, 0, w, h); gl.uniform2f(U('uRes'), w, h); draw();
    };
    const loop = (now: number) => {
      raf = 0;
      t += Math.min(0.05, (now - last) / 1000) * speed; last = now;
      draw();
      if (visible && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const start = () => { if (still || raf) return; last = performance.now(); raf = requestAnimationFrame(loop); };

    const ro = new ResizeObserver(resize); ro.observe(cv);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); });
    io.observe(cv);
    document.addEventListener('visibilitychange', start);
    resize(); start();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); document.removeEventListener('visibilitychange', start); };
  }, [speed, intensity]);

  return <canvas ref={ref} className="flow-bg" aria-hidden="true" />;
}
