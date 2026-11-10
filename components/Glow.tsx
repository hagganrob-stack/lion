/** Soft radial bloom. Decorative only. */
export function Glow({
  color = "cyan",
  className = "",
  size = 520,
  pulse = false,
}: {
  color?: "cyan" | "orange";
  className?: string;
  size?: number;
  pulse?: boolean;
}) {
  const rgb = color === "cyan" ? "34 211 238" : "255 122 26";
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full ${pulse ? "glow-pulse" : ""} ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, rgb(${rgb} / 0.32) 0%, rgb(${rgb} / 0.1) 40%, transparent 70%)`,
      }}
    />
  );
}
