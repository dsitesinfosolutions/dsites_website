import { motion } from "framer-motion";
import { Check, Zap, ShieldCheck, MessagesSquare, Rocket, HeartHandshake } from "lucide-react";

const points = [
  {
    icon: HeartHandshake,
    title: "Client-focused approach",
    desc: "We put our clients first, ensuring your vision comes to life.",
  },
  {
    icon: Zap,
    title: "On-time delivery",
    desc: "We stick to deadlines and deliver high-quality work on time.",
  },
  {
    icon: ShieldCheck,
    title: "Affordable pricing",
    desc: "Premium quality digital solutions that fit within your budget.",
  },
  {
    icon: Rocket,
    title: "Latest technologies",
    desc: "We use modern, battle-tested frameworks to build scalable products.",
  },
  {
    icon: MessagesSquare,
    title: "Dedicated support team",
    desc: "Ongoing maintenance and assistance to keep you running smoothly.",
  },
  {
    icon: Check,
    title: "Quality-driven solutions",
    desc: "Rigorous testing and best practices to ensure top-notch performance.",
  },
];

export default function WhyUs() {
  return (
    <section id="why" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm md:text-base font-bold text-[var(--cyan-glow)] tracking-widest uppercase px-4 py-2 rounded-full border border-[var(--cyan-glow)]/30 bg-[var(--cyan-glow)]/5">
            Why Us
          </span>
          <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold">
            Why businesses <span className="text-gradient">choose us</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            We combine innovation, strategy, and engineering to deliver measurable business growth.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {points.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
                className="glass rounded-2xl p-5 gradient-border hover:bg-white/[0.06] transition"
              >
                <Icon className="h-5 w-5 text-[var(--cyan-glow)]" />
                <h3 className="mt-4 font-semibold">{p.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
