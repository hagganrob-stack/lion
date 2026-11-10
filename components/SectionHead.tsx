export function SectionHead({
  eyebrow,
  title,
  intro,
  center = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  center?: boolean;
}) {
  return (
    <div className={`reveal mb-10 max-w-3xl md:mb-14 ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className={`eyebrow ${center ? "justify-center" : ""}`}>{eyebrow}</p>}
      <h2 className="display h-xl mt-4">{title}</h2>
      {intro && <p className="mt-5 text-lg text-ink/75">{intro}</p>}
    </div>
  );
}
