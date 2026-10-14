import { useRef, useState, type FormEvent } from 'react';
import { useReveal } from '../../hooks/useReveal';
import './contact.css';

/** ── How messages reach you (checked in this order) ─────────────
 *  1. VITE_WEB3FORMS_KEY in .env → messages land directly in your inbox (recommended, free).
 *  2. FORM_ENDPOINT → any Formspree / Getform URL.
 *  3. CONTACT_EMAIL → fallback that opens the visitor's email app. */
const W3F_KEY = (import.meta.env.VITE_WEB3FORMS_KEY as string | undefined) ?? '';
const FORM_ENDPOINT = '';
const CONTACT_EMAIL = '';
const RESUME_URL = '/Ayesha-Nazish-Resume.pdf';

type Status = { kind: 'idle' | 'ok' | 'err'; msg: string };

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const [st, setSt] = useState<Status>({ kind: 'idle', msg: '' });
  const [busy, setBusy] = useState(false);
  const d = (i: number) => ({ ['--d' as string]: `${i * 90}ms` });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const data = Object.fromEntries(new FormData(f)) as Record<string, string>;
    if (W3F_KEY) {
      setBusy(true);
      try {
        const r = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ access_key: W3F_KEY, subject: `New portfolio message from ${data.name}`, from_name: 'Portfolio contact form', ...data }) });
        const j = await r.json();
        if (!j.success) throw new Error();
        setSt({ kind: 'ok', msg: 'Thanks! Your message was sent. I will get back to you soon.' }); f.reset();
      } catch { setSt({ kind: 'err', msg: 'Something went wrong. Please try again or use the links beside the form.' }); }
      setBusy(false);
    } else if (FORM_ENDPOINT) {
      setBusy(true);
      try {
        const r = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
        if (!r.ok) throw new Error();
        setSt({ kind: 'ok', msg: 'Thanks! Your message was sent. I will get back to you soon.' }); f.reset();
      } catch { setSt({ kind: 'err', msg: 'Something went wrong. Please try again or use the links beside the form.' }); }
      setBusy(false);
    } else if (CONTACT_EMAIL) {
      const body = `${data.message}\n\n— ${data.name} (${data.email})`;
      location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Portfolio message from ${data.name}`)}&body=${encodeURIComponent(body)}`;
      setSt({ kind: 'ok', msg: 'Opening your email app with the message ready to send.' });
    } else {
      setSt({ kind: 'err', msg: 'The form is not connected yet. Please use GitHub or LinkedIn for now.' });
    }
  }

  return (
    <section className="contact" id="contact" ref={ref} aria-labelledby="contact-title">
      <i className="cb cb-y" aria-hidden="true" /><i className="cb cb-c" aria-hidden="true" />
      <p className="about-tag glass-d reveal"><b>05</b> Contact</p>
      <h2 id="contact-title" className="contact-title reveal" style={d(1)}>LET'S BUILD SOMETHING <span>TOGETHER.</span></h2>

      <div className="contact-grid">
        <div className="contact-info reveal" style={d(2)}>
          <p>I'm open to full-time roles and interesting projects. Send a message and I'll reply as soon as I can.</p>
          <p className="avail glass-d"><span className="dot" aria-hidden="true" />Available for full-time roles</p>
          <ul className="reach">
            <li><a className="glass-d" href="https://github.com/ash-1212" target="_blank" rel="noreferrer"><span>GitHub</span><i aria-hidden="true">↗</i></a></li>
            <li><a className="glass-d" href="https://www.linkedin.com/in/ayesha-nazish-452048274" target="_blank" rel="noreferrer"><span>LinkedIn</span><i aria-hidden="true">↗</i></a></li>
            {CONTACT_EMAIL && <li><a className="glass-d" href={`mailto:${CONTACT_EMAIL}`}><span>{CONTACT_EMAIL}</span><i aria-hidden="true">↗</i></a></li>}
            <li><a className="glass-d" href={RESUME_URL} download="Ayesha-Nazish-Resume.pdf"><span>Download Resume</span><i aria-hidden="true">↓</i></a></li>
          </ul>
        </div>

        <form className="cform glass-d reveal" style={d(3)} onSubmit={onSubmit} noValidate={false}>
          <label>Name<input name="name" type="text" autoComplete="name" required placeholder="Your name" /></label>
          <label>Email<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label>
          <label>Message<textarea name="message" rows={5} required placeholder="Tell me about the role or project" /></label>
          <input type="checkbox" name="botcheck" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <button className="send" type="submit" disabled={busy}><span>{busy ? 'Sending…' : 'Send Message'}</span><i aria-hidden="true">→</i></button>
          <p className={`status ${st.kind}`} role="status" aria-live="polite">{st.msg}</p>
        </form>
      </div>

      <footer className="foot">
        <p>© {new Date().getFullYear()} Ayesha Nazish · Built with React &amp; TypeScript</p>
        <a href="#home">Back to top ↑</a>
      </footer>
    </section>
  );
}
