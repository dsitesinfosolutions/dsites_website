"use client";

import { useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import useEmblaCarousel from "embla-carousel-react";

// Automatically import all images from the posters&ads folder
const posterModules = import.meta.glob("@/assets/posters&ads/*.{png,jpg,jpeg,webp,avif}", {
  eager: true,
});
const loadedPosters = Object.values(posterModules).map((mod: any) => mod.default as string);

const ads = [
  {
    id: 1,
    category: "Special Offer",
    title: "Launch Special: 20% Off",
    date: "Valid until end of month",
    desc: "Get a free UI/UX consultation and 20% off your first digital project with us. Don't miss out on this exclusive limited-time offer!",
    image: loadedPosters[0] || "",
    link: "/contact",
  },
  {
    id: 4,
    category: "New Service",
    title: "Digital marketing and Branding services now available",
    date: "Just Launched",
    desc: "Elevate your brand with our new comprehensive digital marketing and branding services. We help your business stand out, drive traffic, and reach more customers than ever before!",
    image: loadedPosters[1] || "",
    link: "/services/digital-marketing",
  },
  {
    id: 5,
    category: "Special Event",
    title: "E-Commerce Store Launch",
    date: "Next Friday",
    desc: "We are thrilled to announce our new robust E-Commerce solutions. Join our launch event to see how you can build a powerful, scalable online store and start selling globally.",
    image: loadedPosters[2] || "",
    link: "/services/e-commerce-solutions",
  },
];

export default function AdsCarousel() {
  // Initialize the carousel with loop enabled
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Setup automated scrolling
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000); // Automatically slide every 4 seconds

    return () => clearInterval(interval);
  }, [emblaApi]);

  // Don't render the section if no ads exist
  if (ads.length === 0) return null;

  return (
    <section className="relative py-16 overflow-hidden z-10">
      <div className="mx-auto max-w-7xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
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

                      <Link
                        to={item.link as any}
                        className="inline-flex w-fit items-center gap-2 text-base font-semibold text-white hover:text-[var(--cyan-glow)] transition-colors mt-auto text-left"
                      >
                        View Details{" "}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
