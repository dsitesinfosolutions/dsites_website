import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const items = [
  {
    quote:
      "I appreciate a company that doesn't overpromise and underdeliver. We had a minor hiccup during our initial onboarding, but their support team was transparent, fast, and incredibly helpful. Today, D-Sites Infosolutions is a staple in our daily workflow at SSD Education. It's rare to find a partner that actually listens to user feedback and continuously improves.",
    name: "Kanish Ragupathi",
    role: "CEO & Founder, SSD Education",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-5">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-medium text-[var(--cyan-glow)] tracking-widest uppercase">
            Testimonials
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">
            Trusted by leaders <span className="text-gradient">across industries</span>
          </h2>
        </div>

        <div className="mt-14 max-w-4xl mx-auto grid grid-cols-1 gap-5">
          {items.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-7 gradient-border relative"
            >
              <Quote className="h-8 w-8 text-[var(--electric)] opacity-40" />
              <p className="mt-4 text-foreground/90 leading-relaxed">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-1">
                {[...Array(5)].map((_, k) => (
                  <Star
                    key={k}
                    className="h-4 w-4 fill-[var(--cyan-glow)] text-[var(--cyan-glow)]"
                  />
                ))}
              </div>
              <div className="mt-5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-primary grid place-items-center text-sm font-semibold">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
