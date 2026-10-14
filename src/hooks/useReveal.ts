import { useEffect, type RefObject } from 'react';
/** Adds .in to every .reveal inside the ref once it scrolls into view. */
export function useReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal');
    if (!els) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.15 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ref]);
}
