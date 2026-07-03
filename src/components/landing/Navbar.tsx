import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo_d2.png";
import { servicesData } from "@/data/services";

const links = [
  { label: "Why Us", to: "/", hash: "why" },
  { label: "Process", to: "/", hash: "process" },
  { label: "Careers", to: "/careers", hash: undefined },
  { label: "Contact", to: "/contact", hash: undefined },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 150);
  };

  useEffect(() => {
    // Prevent browser from restoring previous scroll position on refresh
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // Scroll to top on initial load
    window.scrollTo(0, 0);

    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 transition-all duration-500">
          <div
            className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
              scrolled ? "glass-strong" : "bg-transparent"
            }`}
          >
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="D Sites Infosolutions" className="h-9 w-9 object-contain" />
              <span className="font-display text-lg font-semibold tracking-tight">
                D <span className="text-gradient">Sites</span> Infosolutions
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <DropdownMenu open={servicesOpen} onOpenChange={setServicesOpen}>
                <DropdownMenuTrigger asChild>
                  <Link
                    to="/services"
                    className="relative inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors"
                    onMouseEnter={() => {
                      handleMouseEnter();
                      setHoveredItem("Services");
                    }}
                    onMouseLeave={() => {
                      handleMouseLeave();
                      setHoveredItem(null);
                    }}
                  >
                    {hoveredItem === "Services" && (
                      <motion.div
                        layoutId="nav-hover-pill"
                        className="absolute inset-0 bg-white/[0.05] border border-white/[0.05] rounded-lg -z-10"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    Services
                    <ChevronDown className="h-4 w-4" />
                  </Link>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  sideOffset={8}
                  className="min-w-[220px]"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {servicesData.map((service) => (
                    <DropdownMenuItem asChild key={service.id}>
                      <Link
                        to={`/services/${service.id}` as any}
                        onClick={() => setServicesOpen(false)}
                      >
                        {service.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/services">All Services</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {links.map((l) => (
                <Link
                  key={l.label}
                  to={l.to as any}
                  hash={l.hash}
                  onMouseEnter={() => setHoveredItem(l.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="relative px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {hoveredItem === l.label && (
                    <motion.div
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 bg-white/[0.05] border border-white/[0.05] rounded-lg -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {l.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:block">
              <Link
                to={"/contact" as any}
                className="rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-90 transition"
              >
                Book a Call
              </Link>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="md:hidden text-foreground"
              aria-label="Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm md:hidden"
            />

            {/* Slide-out Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%", transition: { ease: "easeInOut", duration: 0.3 } }}
              transition={{ type: "spring", bounce: 0, duration: 0.5 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[80vw] max-w-sm glass-strong border-l border-white/10 p-6 flex flex-col md:hidden shadow-2xl bg-black/40"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <img src={logo} alt="Logo" className="h-8 w-8 object-contain" />
                  <span className="font-display text-lg font-semibold tracking-tight">Menu</span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full p-2 bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {links.map((l, i) => (
                  <motion.div
                    key={l.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      to={l.to as any}
                      hash={l.hash}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-xl p-4 transition-all"
                    >
                      {l.label}
                      <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-[var(--cyan-glow)]" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 border-t border-white/10 pt-6">
                <p className="mb-3 text-sm uppercase tracking-[0.25em] text-muted-foreground/70">
                  Services
                </p>
                <div className="space-y-2">
                  {servicesData.map((service, i) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: (links.length + i) * 0.05, duration: 0.3 }}
                    >
                      <Link
                        to={`/services/${service.id}` as any}
                        onClick={() => setOpen(false)}
                        className="block rounded-xl px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
                      >
                        {service.name}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{
                      delay: (links.length + servicesData.length) * 0.05,
                      duration: 0.3,
                    }}
                  >
                    <Link
                      to="/services"
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
                    >
                      All Services
                    </Link>
                  </motion.div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  delay: (links.length + servicesData.length + 1) * 0.05,
                  duration: 0.3,
                }}
                className="mt-auto pt-8"
              >
                <Link
                  to={"/contact" as any}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-primary px-5 py-4 text-base font-medium text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-90 transition-all hover:scale-[1.02]"
                >
                  Book a Call
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
