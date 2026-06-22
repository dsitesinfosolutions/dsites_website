import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Exact coordinates of the pointer (laser dot)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring coordinates for the trailing HUD reticle (slight fluid delay)
  const hudX = useSpring(cursorX, { damping: 25, stiffness: 300 });
  const hudY = useSpring(cursorY, { damping: 25, stiffness: 300 });

  // DOM ref to update live coordinates text efficiently at 120Hz without React re-renders
  const coordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Only enable custom cursor on fine pointers (desktops with mouse)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Update coordinates text directly in the DOM
      if (coordRef.current) {
        coordRef.current.textContent = `${e.clientX}, ${e.clientY}`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer") ||
        target.getAttribute("role") === "button";

      setIsHovered(!!isClickable);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Hide normal cursor
    document.body.classList.add("custom-cursor-active");

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Rotating HUD Reticle Ring & Crosshair (follows with tight spring delay) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9998] flex items-center justify-center"
        style={{
          x: hudX,
          y: hudY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {/* Reticle Ring */}
        <motion.div
          className="absolute inset-0 border border-dashed rounded-full"
          style={{
            borderColor: isHovered ? "var(--purple-glow)" : "var(--cyan-glow)",
          }}
          animate={{
            rotate: 360,
            scale: isClicked ? 0.75 : isHovered ? 1.4 : 1,
          }}
          transition={{
            rotate: { repeat: Infinity, duration: isHovered ? 1.5 : 6, ease: "linear" },
            scale: { type: "spring", stiffness: 350, damping: 22 },
            borderColor: { duration: 0.2 },
          }}
        />

        {/* Crosshair Ticks */}
        <span
          className={`absolute bottom-2.5 left-1/2 w-[1px] h-1.5 -translate-x-1/2 transition-colors duration-200 ${
            isHovered ? "bg-[var(--purple-glow)]/80" : "bg-[var(--cyan-glow)]/60"
          }`}
        />
        <span
          className={`absolute top-2.5 left-1/2 w-[1px] h-1.5 -translate-x-1/2 transition-colors duration-200 ${
            isHovered ? "bg-[var(--purple-glow)]/80" : "bg-[var(--cyan-glow)]/60"
          }`}
        />
        <span
          className={`absolute right-2.5 top-1/2 h-[1px] w-1.5 -translate-y-1/2 transition-colors duration-200 ${
            isHovered ? "bg-[var(--purple-glow)]/80" : "bg-[var(--cyan-glow)]/60"
          }`}
        />
        <span
          className={`absolute left-2.5 top-1/2 h-[1px] w-1.5 -translate-y-1/2 transition-colors duration-200 ${
            isHovered ? "bg-[var(--purple-glow)]/80" : "bg-[var(--cyan-glow)]/60"
          }`}
        />
      </motion.div>

      {/* Central Laser Dot & Coordinates readout (locks exactly onto the physical pointer coordinates) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {/* Core Dot */}
        <motion.div
          className="w-1.5 h-1.5 bg-[var(--cyan-glow)] rounded-full shadow-[0_0_8px_var(--cyan-glow)]"
          animate={{
            scale: isClicked ? 0.6 : isHovered ? 1.3 : 1,
            backgroundColor: isHovered ? "oklch(0.65 0.25 295)" : "oklch(0.85 0.15 210)", // Purple on hover, Cyan otherwise
          }}
          transition={{ type: "spring", stiffness: 450, damping: 20 }}
        />

        {/* Live coordinate digital tag */}
        <span
          ref={coordRef}
          className="absolute left-4 top-2 font-mono text-[9px] text-[var(--cyan-glow)]/70 bg-black/50 backdrop-blur-md px-1 py-0.5 rounded border border-white/5 whitespace-nowrap tracking-wider font-semibold"
        >
          0, 0
        </span>
      </motion.div>
    </>
  );
}
