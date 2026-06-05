import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, PlayCircle, Star, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import heroImage from "@/assets/hero_image.png";

import React, { useState, useEffect } from "react";

// Define images and their associated details for the carousel
const carouselSlides = [
  {
    src: heroImage,
    alt: "Web Development Graphic",
    title: "Web Development",
    subtitle: "Fast & Scalable",
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    alt: "Digital Marketing Analytics",
    title: "Digital Marketing",
    subtitle: "Data-Driven Growth",
  },
  {
    src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
    alt: "UI/UX Design Mockups",
    title: "UI/UX Design",
    subtitle: "Pixel Perfect",
  },
  {
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    alt: "Custom Software Engineering",
    title: "Custom Software",
    subtitle: "Enterprise Grade",
  },
  {
    src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
    alt: "Mobile Application Development",
    title: "Mobile Apps",
    subtitle: "iOS & Android",
  },
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    alt: "E-Commerce Solutions",
    title: "E-Commerce",
    subtitle: "Secure & Fast",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);

  return (
    <section
      id="top"
      className="relative min-h-screen pt-32 pb-24 overflow-hidden bg-hero-gradient"
    >
      {/* grid */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      {/* floating orbs */}
      <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-[var(--electric)] opacity-30 blur-[120px] animate-pulse-glow" />
      <div className="absolute top-40 -right-20 h-96 w-96 rounded-full bg-[var(--purple-glow)] opacity-30 blur-[140px] animate-pulse-glow" />

      <div className="relative mx-auto max-w-7xl px-5">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
            >
              Transforming Businesses Through{" "}
              <span className="text-gradient">Smart Digital Solutions</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl"
            >
              We build powerful websites, scalable software, and data-driven digital strategies that
              help businesses grow faster in the digital era.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-4 font-medium text-primary-foreground shadow-[var(--shadow-glow)] hover:scale-[1.03] transition-transform"
              >
                Start Your Project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full glass px-7 py-4 font-medium text-foreground hover:bg-white/10 transition"
              >
                <PlayCircle className="h-5 w-5" />
                Book Free Consultation
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-[var(--cyan-glow)] text-[var(--cyan-glow)]"
                  />
                ))}
                <span className="ml-2">4.9/5 client satisfaction</span>
              </div>
              <div className="h-4 w-px bg-border" />
            </motion.div>
          </div>

          {/* hero visual */}
          <div className="lg:col-span-5 relative h-[480px] hidden lg:block">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute inset-0"
            >
              {/* Glow behind the image */}
              <div className="absolute inset-10 bg-gradient-to-tr from-[var(--electric)]/30 to-[var(--purple-glow)]/30 rounded-full blur-[80px]" />

              {/* Main Graphic Container */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[540px] animate-float">
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-[var(--shadow-glow)] bg-black/40 group">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentSlide}
                      src={carouselSlides[currentSlide].src}
                      alt={carouselSlides[currentSlide].alt}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 0.9, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 w-full h-full object-cover hover:opacity-100 transition-opacity duration-500"
                    />
                  </AnimatePresence>

                  {/* Carousel Controls */}
                  <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={prevSlide}
                      className="h-9 w-9 rounded-full bg-black/50 backdrop-blur-md border border-white/10 grid place-items-center hover:bg-black/70 transition shadow-lg"
                    >
                      <ChevronLeft className="h-5 w-5 text-white" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="h-9 w-9 rounded-full bg-black/50 backdrop-blur-md border border-white/10 grid place-items-center hover:bg-black/70 transition shadow-lg"
                    >
                      <ChevronRight className="h-5 w-5 text-white" />
                    </button>
                  </div>

                  {/* Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    {carouselSlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-1.5 rounded-full transition-all ${idx === currentSlide ? "w-5 bg-[var(--cyan-glow)]" : "w-1.5 bg-white/40 hover:bg-white/70"}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Floating badge for extra detail */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="absolute -bottom-6 -left-6 glass-strong rounded-xl p-3 gradient-border flex items-center gap-3 animate-float"
                    style={{ animationDelay: "1s" }}
                  >
                    <div className="h-10 w-10 rounded-lg bg-gradient-primary grid place-items-center">
                      <Sparkles className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-sm font-bold">{carouselSlides[currentSlide].title}</div>
                      <div className="text-xs text-[var(--cyan-glow)]">
                        {carouselSlides[currentSlide].subtitle}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
