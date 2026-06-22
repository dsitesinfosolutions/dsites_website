import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { servicesData } from "@/data/services";

export default function Services({ limit, compact }: { limit?: number; compact?: boolean }) {
  const displayedServices = limit ? servicesData.slice(0, limit) : servicesData;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    currentTarget.style.setProperty("--mouse-x", `${clientX - left}px`);
    currentTarget.style.setProperty("--mouse-y", `${clientY - top}px`);
  };

  return (
    <section id="services" className="relative py-28">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-[var(--purple-glow)] opacity-15 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm md:text-base font-bold text-[var(--cyan-glow)] tracking-widest uppercase px-4 py-2 rounded-full border border-[var(--cyan-glow)]/30 bg-[var(--cyan-glow)]/5">
            Our Services
          </span>
          <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold">
            Everything you need to <span className="text-gradient">scale digitally</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            From idea to launch and beyond — we ship modern, secure, and revenue-driving products.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {displayedServices.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
                onMouseMove={handleMouseMove}
                whileHover={{ y: -8, scale: 1.015 }}
                className="group relative overflow-hidden glass rounded-2xl p-8 gradient-border flex flex-col transition-all duration-300"
              >
                {/* Spotlight Overlay */}
                <div
                  className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: "radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(0, 255, 255, 0.12), transparent 80%)",
                  }}
                />
                <div className="flex items-center gap-4 mb-4 relative z-10">
                  <div className="h-12 w-12 rounded-xl bg-gradient-primary shrink-0 grid place-items-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">{s.name}</h3>
                </div>
                <p className="text-muted-foreground mb-8 leading-relaxed relative z-10">{s.description}</p>

                <div className="space-y-6 mt-auto relative z-10">
                  {!compact && (
                    <>
                      <div>
                        <h4 className="font-semibold text-sm mb-3">What we deliver:</h4>
                        <ul className="space-y-2.5">
                          {s.whatWeDeliver.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2.5 text-sm text-muted-foreground"
                            >
                              <CheckCircle2 className="h-4 w-4 text-[var(--cyan-glow)] shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {s.types && (
                        <div className="pt-2">
                          <h4 className="font-semibold text-sm mb-3">Types of solutions:</h4>
                          <div className="flex flex-wrap gap-2">
                            {s.types.map((type, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-muted-foreground/90"
                              >
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  <Link
                    to={`/services/${s.id}` as any}
                    className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                  >
                    Learn more
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {limit && (
          <div className="mt-16 flex justify-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-8 py-4 font-medium text-primary-foreground shadow-[var(--shadow-glow)] hover:scale-[1.03] transition-transform"
            >
              View All Services
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
