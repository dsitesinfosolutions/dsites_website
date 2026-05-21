import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "@tanstack/react-router";

// Automatically import all images from the posters&ads folder
const posterModules = import.meta.glob("@/assets/posters&ads/*.{png,jpg,jpeg,webp,avif}", {
  eager: true,
});
const ALL_POSTERS = Object.values(posterModules).map((mod: any) => mod.default as string);

export default function PromoModal() {
  const [isOpen, setIsOpen] = useState(false);
  // We'll pick a random poster to show each time!
  const [currentPoster, setCurrentPoster] = useState(ALL_POSTERS[0] || "");

  useEffect(() => {
    // If no posters were found in the folder, don't show the modal at all
    if (ALL_POSTERS.length === 0) return;

    // Check if the user has already seen the promo in this session
    const hasSeenPromo = sessionStorage.getItem("hasSeenPromo");

    if (!hasSeenPromo) {
      // Add a slight delay before showing the ad (1.5 seconds)
      const timer = setTimeout(() => {
        // Pick a random poster from the array
        const randomIdx = Math.floor(Math.random() * ALL_POSTERS.length);
        setCurrentPoster(ALL_POSTERS[randomIdx]);

        setIsOpen(true);
        sessionStorage.setItem("hasSeenPromo", "true");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 z-[101] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 p-4"
          >
            <div className="relative overflow-hidden rounded-3xl glass-strong border border-white/20 shadow-2xl">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white/70 backdrop-blur-md hover:bg-black/90 hover:text-white transition-colors"
                aria-label="Close Advertisement"
              >
                <X className="h-5 w-5" />
              </button>

              {/* CLICKABLE PROMO POSTER */}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block w-full h-full overflow-hidden bg-black/20"
              >
                <img
                  src={currentPoster}
                  alt="Special Promotional Offer"
                  className="w-full h-auto max-h-[75vh] object-cover transition-transform duration-700 hover:scale-[1.02]"
                />
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
