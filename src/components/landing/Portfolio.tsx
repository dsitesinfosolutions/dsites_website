import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

const MotionLink = motion.create(Link);

const projects = [
  {
    tag: "E-commerce",
    title: "Lumen Marketplace",
    desc: "A multi-vendor platform handling 50k+ daily orders.",
    grad: "from-[oklch(0.5_0.22_255)] to-[oklch(0.55_0.25_295)]",
  },
  {
    tag: "Healthcare",
    title: "Clincare Suite",
    desc: "HIPAA-ready management system for 120+ clinics.",
    grad: "from-[oklch(0.55_0.2_200)] to-[oklch(0.5_0.22_260)]",
  },
  {
    tag: "Real Estate",
    title: "Habitat 360",
    desc: "AI property search with 3D virtual walkthroughs.",
    grad: "from-[oklch(0.6_0.22_310)] to-[oklch(0.5_0.2_250)]",
  },
  {
    tag: "AI / SaaS",
    title: "Pulse AI Dashboard",
    desc: "Realtime analytics with predictive forecasting.",
    grad: "from-[oklch(0.55_0.25_280)] to-[oklch(0.6_0.2_220)]",
  },
  {
    tag: "ERP",
    title: "Forge Operations",
    desc: "Modular ERP serving 8 manufacturing plants.",
    grad: "from-[oklch(0.5_0.2_240)] to-[oklch(0.55_0.22_300)]",
  },
  {
    tag: "Marketing",
    title: "Aurora Campaigns",
    desc: "Performance marketing engine — 6.8x ROAS.",
    grad: "from-[oklch(0.6_0.24_290)] to-[oklch(0.55_0.22_210)]",
  },
];

export default function Portfolio() {
  return (
    <section id="work" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm md:text-base font-bold text-[var(--cyan-glow)] tracking-widest uppercase px-4 py-2 rounded-full border border-[var(--cyan-glow)]/30 bg-[var(--cyan-glow)]/5">
            Selected Work
          </span>
          <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold">
            Work that <span className="text-gradient">moves metrics</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            A glimpse into the products, platforms, and campaigns we've shipped for global teams.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <MotionLink
              key={p.title}
              to="/contact"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -8 }}
              className="group glass rounded-3xl overflow-hidden gradient-border"
            >
              <div className={`relative h-56 bg-gradient-to-br ${p.grad} overflow-hidden`}>
                <div className="absolute inset-0 grid-bg opacity-40" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="glass-strong rounded-xl px-4 py-3 text-sm font-mono">
                    {p.title.split(" ")[0].toLowerCase()}.io
                  </div>
                </div>
                <div className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-xs">
                  {p.tag}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-[var(--cyan-glow)] group-hover:rotate-12 transition" />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              </div>
            </MotionLink>
          ))}
        </div>
      </div>
    </section>
  );
}
