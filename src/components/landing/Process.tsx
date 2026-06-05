import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discovery",
    desc: "We dive deep into your goals, users, and constraints.",
  },
  { icon: PenTool, title: "Planning", desc: "Roadmap, architecture, and pixel-precise design." },
  { icon: Code2, title: "Development", desc: "Agile sprints, weekly demos, continuous delivery." },
  {
    icon: Rocket,
    title: "Launch & Support",
    desc: "Smooth launch, monitoring, and ongoing optimization.",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm md:text-base font-bold text-[var(--cyan-glow)] tracking-widest uppercase px-4 py-2 rounded-full border border-[var(--cyan-glow)]/30 bg-[var(--cyan-glow)]/5">
            Our Process
          </span>
          <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold">
            A <span className="text-gradient">proven</span> path from idea to launch
          </h2>
        </div>

        <div className="mt-16 relative">
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[var(--electric)] to-transparent" />
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative text-center"
                >
                  <div className="relative mx-auto h-24 w-24">
                    <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-30 blur-xl" />
                    <div className="relative h-24 w-24 rounded-full glass-strong grid place-items-center gradient-border">
                      <Icon className="h-8 w-8 text-[var(--cyan-glow)]" />
                    </div>
                    <div className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-gradient-primary grid place-items-center text-xs font-bold text-primary-foreground">
                      {i + 1}
                    </div>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
