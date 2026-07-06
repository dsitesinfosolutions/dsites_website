import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { Target, Eye } from "lucide-react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, to, count]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

const stats = [
  { value: 20, suffix: "+", label: "Projects Delivered" },
  { value: 10, suffix: "+", label: "Happy Clients" },
  { value: 20, suffix: "+", label: "Tech Specialists" },
];

export default function Stats() {
  return (
    <section id="about" className="relative py-32 min-h-screen flex items-center overflow-hidden">
      {/* Ambient background for depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-gradient-to-r from-[var(--electric)]/10 to-[var(--purple-glow)]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 w-full">
        <div className="text-center max-w-5xl mx-auto">
          <span className="text-sm md:text-base font-bold text-[var(--cyan-glow)] tracking-widest uppercase px-4 py-2 rounded-full border border-[var(--cyan-glow)]/30 bg-[var(--cyan-glow)]/5">
            About Us
          </span>
          <h2 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            We are <span className="text-gradient">D-Sites Infosolutions</span>
          </h2>
          <div className="mt-8 text-muted-foreground text-lg md:text-xl space-y-6 max-w-4xl mx-auto text-justify leading-relaxed">
            <p>
              At <span className="text-foreground font-medium">D-Sites Infosolutions</span>, we are a collective of passionate developers, designers, and strategists committed to engineering exceptional digital experiences. Built upon a foundation of innovation, integrity, and operational excellence, we empower businesses globally through custom-tailored, cutting-edge technology. We believe in forging long-lasting partnerships, working closely with our clients to turn ambitious concepts into seamless, market-leading solutions.
            </p>
            <p>
              Leveraging extensive industry experience, our multidisciplinary team possesses the deep technical expertise required to solve complex modern challenges. By continuously pioneering technological trends and refining our processes, we consistently deliver high-performance, future-proof digital solutions that catalyze growth and fuel success.
            </p>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass rounded-3xl p-10 md:p-12 gradient-border text-left flex flex-col justify-center min-h-[320px] group hover:bg-white/[0.04] transition-colors duration-500"
          >
            <div className="h-14 w-14 rounded-2xl bg-[var(--electric)]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <Target className="h-7 w-7 text-[var(--electric)]" />
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-4">Our Mission</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              To turn ambitious ideas into practical, scalable realities that create lasting value,
              solve meaningful challenges, and empower individuals, businesses, and communities to
              grow, innovate, and succeed in an ever-evolving world.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass rounded-3xl p-10 md:p-12 gradient-border text-left flex flex-col justify-center min-h-[320px] group hover:bg-white/[0.04] transition-colors duration-500"
          >
            <div className="h-14 w-14 rounded-2xl bg-[var(--purple-glow)]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <Eye className="h-7 w-7 text-[var(--purple-glow)]" />
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-4">Our Vision</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              To be recognized as a forward-thinking and fearless company that dares to lead, builds
              with speed and precision, and consistently delivers transformative solutions that
              others only imagine, shaping the future of our industry and inspiring progress on a
              global scale.
            </p>
          </motion.div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-3xl p-8 text-center gradient-border relative overflow-hidden group"
            >
              {/* Ambient hover glow inside stat cards */}
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
              <div className="text-5xl md:text-6xl font-bold text-gradient">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-3 text-base font-medium text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
