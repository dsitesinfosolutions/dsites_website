const techs = [
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Flutter",
  "AWS",
  "Docker",
  "Kubernetes",
  "MongoDB",
  "PostgreSQL",
  "TypeScript",
  "GraphQL",
  "OpenAI",
  "Stripe",
  "Tailwind",
  "Vercel",
];

export default function TechStack() {
  const loop = [...techs, ...techs];
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 text-center mb-16">
        <span className="text-sm md:text-base font-bold text-[var(--cyan-glow)] tracking-widest uppercase px-4 py-2 rounded-full border border-[var(--cyan-glow)]/30 bg-[var(--cyan-glow)]/5">
          Tech Stack
        </span>
        <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold">
          Powered by <span className="text-gradient">modern technologies</span>
        </h2>
      </div>

      <div className="mt-12 relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-background to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-background to-transparent" />

        <div className="flex animate-marquee gap-4 w-max">
          {loop.map((t, i) => (
            <div
              key={i}
              className="glass rounded-xl px-6 py-4 min-w-[160px] text-center gradient-border hover:bg-white/[0.08] transition"
            >
              <span className="font-display font-medium text-foreground/90">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
