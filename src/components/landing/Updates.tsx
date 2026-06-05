"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Tag, Bell, ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import useEmblaCarousel from "embla-carousel-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";

// Automatically import all images from the posters&ads folder
const posterModules = import.meta.glob("@/assets/posters&ads/*.{png,jpg,jpeg,webp,avif}", {
  eager: true,
});
const loadedPosters = Object.values(posterModules).map((mod: any) => mod.default as string);

const posterImage = loadedPosters[0] || "";
const newPoster1 = loadedPosters[1] || "";
const newPoster2 = loadedPosters[2] || "";

const updatesData = [
  {
    id: 1,
    type: "ad",
    category: "Special Offer",
    title: "Launch Special: 20% Off",
    date: "Valid until end of month",
    desc: "Get a free UI/UX consultation and 20% off your first digital project with us. Don't miss out on this exclusive limited-time offer!",
    image: posterImage,
    icon: Tag,
    link: "/contact",
  },
  {
    id: 2,
    type: "event",
    category: "Intern Alert",
    title: "Frontend Developer Internship",
    date: "Applications Open Now",
    desc: "We are looking for passionate frontend interns with experience in React, Tailwind CSS, and TypeScript. Join our growing team and build amazing products.",
    icon: Bell,
    link: "/contact",
  },
  {
    id: 3,
    type: "event",
    category: "Company News",
    title: "Expanding our Cloud Services",
    date: "Recently Added",
    desc: "D Sites Infosolutions now offers scalable AWS and Azure cloud deployment packages specifically tailored for growing enterprise clients.",
    icon: Calendar,
    link: "/services/cloud-solutions",
  },
  {
    id: 4,
    type: "ad",
    category: "New Service",
    title: "Digital marketing and Branding services now available",
    date: "Just Launched",
    desc: "Elevate your brand with our new comprehensive digital marketing and branding services. We help your business stand out, drive traffic, and reach more customers than ever before!",
    image: newPoster1,
    icon: Tag,
    link: "/services/digital-marketing",
  },
  {
    id: 5,
    type: "ad",
    category: "Special Event",
    title: "E-Commerce Store Launch",
    date: "Next Friday",
    desc: "We are thrilled to announce our new robust E-Commerce solutions. Join our launch event to see how you can build a powerful, scalable online store and start selling globally.",
    image: newPoster2,
    icon: Calendar,
    link: "/services/e-commerce-solutions",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function UpdatesPage() {
  const [selectedUpdate, setSelectedUpdate] = useState<(typeof updatesData)[0] | null>(null);

  // Setup the carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const ads = updatesData.filter((item) => item.type === "ad");
  const events = updatesData.filter((item) => item.type === "event");

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-background via-background to-background/95 text-foreground overflow-x-hidden">
      <ScrollProgress />
      <Navbar />

      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute top-1/4 -right-1/4 h-96 w-[800px] rounded-full bg-[var(--electric)] opacity-20 blur-[120px]"
          animate={{ y: [0, 50, 0], x: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-1/4 -left-1/4 h-96 w-[800px] rounded-full bg-[var(--purple-glow)] opacity-20 blur-[120px]"
          animate={{ y: [0, -50, 0], x: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="relative z-10 pt-32 pb-20 px-5 max-w-7xl mx-auto min-h-screen">
        {/* Header */}
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span
            className="text-sm md:text-base font-bold text-[var(--cyan-glow)] tracking-widest uppercase px-4 py-2 rounded-full border border-[var(--cyan-glow)]/30 bg-[var(--cyan-glow)]/5"
            variants={itemVariants}
          >
            Notice Board
          </motion.span>
          <motion.h1
            className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold"
            variants={itemVariants}
          >
            Latest <span className="text-gradient">Updates & Offers</span>
          </motion.h1>
          <motion.p className="mt-6 text-lg text-muted-foreground" variants={itemVariants}>
            Stay up to date with our ongoing promotions, internship opportunities, and the newest
            additions to our services.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* ADS & PROMOTIONS CAROUSEL */}
          {ads.length > 0 && (
            <motion.div variants={itemVariants} className="mb-20">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold">Promotions & Ads</h2>
                <div className="flex gap-2">
                  <button
                    onClick={scrollPrev}
                    className="p-2 rounded-full glass hover:bg-white/10 transition"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={scrollNext}
                    className="p-2 rounded-full glass hover:bg-white/10 transition"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex -ml-4 md:-ml-6">
                  {ads.map((item) => (
                    <div key={item.id} className="flex-[0_0_100%] min-w-0 pl-4 md:pl-6">
                      <div className="group glass-strong rounded-3xl overflow-hidden border border-white/10 hover:border-[var(--cyan-glow)]/50 transition-all duration-300 flex flex-col md:flex-row h-full">
                        {/* Image Area - Square Aspect Ratio */}
                        <div className="relative w-full md:w-1/2 aspect-square overflow-hidden bg-black/20 shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md bg-black/50 text-white">
                            {item.category}
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-8 md:p-12 flex flex-col justify-center flex-1">
                          <div className="text-sm text-[var(--cyan-glow)] font-medium mb-3">
                            {item.date}
                          </div>
                          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 flex-1">
                            {item.desc}
                          </p>
                          <button
                            onClick={() => setSelectedUpdate(item)}
                            className="inline-flex w-fit items-center gap-2 text-base font-semibold text-white hover:text-[var(--cyan-glow)] transition-colors mt-auto text-left"
                          >
                            View Details{" "}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* EVENTS & NEWS GRID */}
          {events.length > 0 && (
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">Events & News</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((item) => (
                  <div
                    key={item.id}
                    className="group glass-strong rounded-3xl overflow-hidden border border-white/10 hover:border-[var(--cyan-glow)]/50 transition-all duration-300 flex flex-col"
                  >
                    {item.image ? (
                      <div className="relative h-56 overflow-hidden bg-black/20">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md bg-black/50 text-white">
                          {item.category}
                        </div>
                      </div>
                    ) : (
                      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-cyan-900/30 to-purple-900/30 grid place-items-center">
                        <item.icon className="h-16 w-16 text-cyan-400/50 group-hover:scale-110 group-hover:text-cyan-400 transition-all duration-500" />
                        <div className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md bg-black/50 text-white">
                          {item.category}
                        </div>
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="text-xs text-[var(--cyan-glow)] font-medium mb-2">
                        {item.date}
                      </div>
                      <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                        {item.desc}
                      </p>
                      <button
                        onClick={() => setSelectedUpdate(item)}
                        className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-white hover:text-[var(--cyan-glow)] transition-colors mt-auto text-left"
                      >
                        View Details{" "}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedUpdate && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedUpdate(null)}
              className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 z-[101] w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 p-4 md:p-6"
            >
              <div className="relative overflow-hidden rounded-3xl glass-strong border border-white/20 shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-y-auto">
                <button
                  onClick={() => setSelectedUpdate(null)}
                  className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white/70 backdrop-blur-md hover:bg-black/90 hover:text-white transition-colors"
                  aria-label="Close Modal"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Image/Icon Side */}
                <div className="w-full md:w-2/5 relative h-56 md:h-auto bg-black/20 shrink-0">
                  {selectedUpdate.image ? (
                    <img
                      src={selectedUpdate.image}
                      alt={selectedUpdate.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full min-h-[200px] bg-gradient-to-br from-cyan-900/30 to-purple-900/30 grid place-items-center">
                      <selectedUpdate.icon className="h-24 w-24 text-cyan-400/50" />
                    </div>
                  )}
                </div>

                {/* Content Side */}
                <div className="p-8 md:p-10 w-full md:w-3/5 flex flex-col justify-center bg-background/50">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="glass rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md bg-white/5 text-[var(--cyan-glow)] border border-white/10">
                      {selectedUpdate.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{selectedUpdate.date}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4">{selectedUpdate.title}</h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-8">
                    {selectedUpdate.desc}
                  </p>

                  <Link
                    to={selectedUpdate.link as any}
                    onClick={() => setSelectedUpdate(null)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-90 transition-all hover:scale-[1.02] w-fit"
                  >
                    Take Action <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
