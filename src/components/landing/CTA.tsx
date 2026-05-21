import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "@tanstack/react-router";

export default function CTA() {
  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl glass-strong gradient-border p-10 md:p-16 text-center"
        >
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-80 w-[600px] rounded-full bg-gradient-primary opacity-30 blur-[120px]" />
          <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />

          <div className="relative">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Ready to build <span className="text-gradient">something amazing?</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
              Let's turn your ideas into powerful digital solutions. Free 30-minute strategy call —
              no commitment, real recommendations.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to={"/contact" as any}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-4 font-medium text-primary-foreground shadow-[var(--shadow-glow)] hover:scale-[1.03] transition-transform"
              >
                Get Started Today
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to={"/contact" as any}
                className="inline-flex items-center gap-2 rounded-full glass px-7 py-4 font-medium hover:bg-white/10 transition"
              >
                <Calendar className="h-5 w-5" />
                Schedule a Free Consultation
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
