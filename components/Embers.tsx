/** Faint ember particles behind the hero. CSS only. */
const E = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 37 + 8) % 100}%`,
  dur: `${9 + ((i * 5) % 9)}s`,
  delay: `${-((i * 3) % 11)}s`,
  size: i % 3 === 0 ? 4 : 2.5,
  c: i % 4 === 0 ? "var(--cyan)" : "var(--orange)",
}));
export function Embers() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {E.map((e, i) => (
        <span key={i} className="ember" style={{ left: e.left, animationDuration: e.dur, animationDelay: e.delay, width: e.size, height: e.size, background: e.c, boxShadow: `0 0 8px 2px ${e.c}` }} />
      ))}
    </div>
  );
}
