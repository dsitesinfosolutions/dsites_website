"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo_d2.png";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if the user has already seen the splash screen in this session
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");

    if (hasSeenSplash) {
      setIsVisible(false);
      return;
    }

    // Lock scrolling while splash screen is active
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("hasSeenSplash", "true");
      document.body.style.overflow = "unset";
    }, 2800); // Display for 2.8 seconds

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
        >
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[var(--electric)]/20 to-[var(--purple-glow)]/20 rounded-full blur-[100px] -z-10 pointer-events-none" />

          {/* Logo Pop Animation */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", type: "spring", bounce: 0.5 }}
            className="mb-8"
          >
            <img
              src={logo}
              alt="D Sites Infosolutions"
              className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-[0_0_15px_rgba(0,255,255,0.3)]"
            />
          </motion.div>

          {/* Welcome Text Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">
              D <span className="text-gradient">Sites</span> Infosolutions
            </h1>
            <p className="text-muted-foreground text-sm md:text-base tracking-[0.3em] uppercase font-medium">
              Smart Digital Solutions
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
