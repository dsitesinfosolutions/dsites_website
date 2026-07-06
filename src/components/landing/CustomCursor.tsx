import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface GlitchBlock {
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Aura morph styles
  const [auraSize, setAuraSize] = useState({
    width: 48,
    height: 48,
    borderRadius: "50%",
    borderWidth: "1px",
    background: "rgba(0, 243, 255, 0.03)"
  });

  // Coordinates of the mouse pointer
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Targets for the snapping halo
  const hudTargetX = useMotionValue(-100);
  const hudTargetY = useMotionValue(-100);

  // Spring values for the trailing halo
  const hudX = useSpring(hudTargetX, { damping: 24, stiffness: 220 });
  const hudY = useSpring(hudTargetY, { damping: 24, stiffness: 220 });

  // Chromatic split motion values for pointer glitching
  const redGlitchX = useMotionValue(0);
  const redGlitchY = useMotionValue(0);
  const cyanGlitchX = useMotionValue(0);
  const cyanGlitchY = useMotionValue(0);

  const coordRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoveredElRef = useRef<HTMLElement | null>(null);

  // Canvas particle state for blocky glitch elements
  const glitchBlocksRef = useRef<Array<GlitchBlock>>([]);

  // 1. Detect fine pointer on mount (to handle SSR safely)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (mediaQuery.matches) {
      setIsVisible(true);
    }
  }, []);

  // 2. Initialize cursor, canvas, and event listeners once the component renders visible
  useEffect(() => {
    if (!isVisible) return;

    // Canvas setup
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Glitch colors: neon cyan, neon red, hot pink, pure white
    const glitchColors = [
      "rgba(0, 243, 255, 0.8)", // Cyan
      "rgba(255, 0, 85, 0.8)",  // Neon Red/Magenta
      "rgba(255, 255, 255, 0.9)", // White
      "rgba(189, 0, 255, 0.7)"  // Purple
    ];

    const animateGlitchBlocks = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const blocks = glitchBlocksRef.current;

      for (let i = blocks.length - 1; i >= 0; i--) {
        const b = blocks[i];
        
        // Horizontal drift/sliding animation
        b.x += b.vx;
        b.y += b.vy;
        
        // Dissolve decay
        b.life -= 1;
        b.alpha = b.life / b.maxLife;

        if (b.life <= 0 || b.alpha <= 0) {
          blocks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = b.alpha;
        ctx.fillStyle = b.color;
        
        // Draw the digital slice block
        ctx.fillRect(b.x - b.width / 2, b.y - b.height / 2, b.width, b.height);
        
        // Add a secondary glitched shadow box occasionally
        if (Math.random() > 0.85) {
          ctx.fillStyle = b.color === glitchColors[0] ? glitchColors[1] : glitchColors[0];
          ctx.fillRect(
            b.x - b.width / 2 + (Math.random() - 0.5) * 8, 
            b.y - b.height / 2 + (Math.random() - 0.5) * 4, 
            b.width * 0.6, 
            b.height
          );
        }
        
        ctx.restore();
      }

      animationId = requestAnimationFrame(animateGlitchBlocks);
    };

    animationId = requestAnimationFrame(animateGlitchBlocks);

    // High frequency cursor glitch loop
    const glitchInterval = setInterval(() => {
      // 25% chance of triggering a random glitch jitter
      if (Math.random() > 0.75) {
        let count = 0;
        const jitter = setInterval(() => {
          const rx = (Math.random() - 0.5) * 6;
          const ry = (Math.random() - 0.5) * 4;
          // Offset cyan opposite to red
          const cx = -rx * 1.2;
          const cy = -ry * 1.2;

          redGlitchX.set(rx);
          redGlitchY.set(ry);
          cyanGlitchX.set(cx);
          cyanGlitchY.set(cy);

          count++;
          if (count > 5) {
            clearInterval(jitter);
            redGlitchX.set(0);
            redGlitchY.set(0);
            cyanGlitchX.set(0);
            cyanGlitchY.set(0);
          }
        }, 30);
      }
    }, 1200);

    // Mouse positions tracking
    let lastX = 0;
    let lastY = 0;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Snap coordinates for the halo
      if (hoveredElRef.current) {
        const rect = hoveredElRef.current.getBoundingClientRect();
        hudTargetX.set(rect.left + rect.width / 2);
        hudTargetY.set(rect.top + rect.height / 2);
      } else {
        hudTargetX.set(e.clientX);
        hudTargetY.set(e.clientY);
      }

      // Spawn blocks on movement
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 3) {
        // Spawn horizontal digital slices
        const spawnCount = Math.min(Math.floor(dist / 5), 3);
        for (let i = 0; i < spawnCount; i++) {
          const maxLife = Math.random() * 12 + 10;
          glitchBlocksRef.current.push({
            x: e.clientX + (Math.random() - 0.5) * 10,
            y: e.clientY + (Math.random() - 0.5) * 10,
            // Drift slightly outwards
            vx: -dx * 0.15 + (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.0,
            // Wide and short horizontal blocks
            width: Math.random() * 16 + 6,
            height: Math.random() * 4 + 1.5,
            color: glitchColors[Math.floor(Math.random() * glitchColors.length)],
            alpha: 0.9,
            life: maxLife,
            maxLife: maxLife
          });
        }
      }

      lastX = e.clientX;
      lastY = e.clientY;

      if (coordRef.current) {
        coordRef.current.textContent = `${e.clientX}, ${e.clientY}`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const clickable = target.closest("a, button, .cursor-pointer, [role='button']") as HTMLElement;
      if (clickable) {
        setIsHovered(true);
        hoveredElRef.current = clickable;

        const rect = clickable.getBoundingClientRect();
        const styles = window.getComputedStyle(clickable);
        const radius = styles.borderRadius && styles.borderRadius !== "0px" ? styles.borderRadius : "6px";

        setAuraSize({
          width: rect.width + 12,
          height: rect.height + 12,
          borderRadius: radius,
          borderWidth: "1.5px",
          background: "rgba(0, 243, 255, 0.04)"
        });

        // Snap immediately on enter
        hudTargetX.set(rect.left + rect.width / 2);
        hudTargetY.set(rect.top + rect.height / 2);
      } else {
        setIsHovered(false);
        hoveredElRef.current = null;
        setAuraSize({
          width: 48,
          height: 48,
          borderRadius: "50%",
          borderWidth: "1px",
          background: "rgba(0, 243, 255, 0.03)"
        });
      }
    };

    const triggerClickGlitch = () => {
      setIsClicked(true);
      
      // Intense burst of random blocks
      const cX = cursorX.get();
      const cY = cursorY.get();
      for (let i = 0; i < 15; i++) {
        const maxLife = Math.random() * 20 + 15;
        glitchBlocksRef.current.push({
          x: cX + (Math.random() - 0.5) * 40,
          y: cY + (Math.random() - 0.5) * 40,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 3,
          width: Math.random() * 26 + 10,
          height: Math.random() * 6 + 2,
          color: glitchColors[Math.floor(Math.random() * glitchColors.length)],
          alpha: 1.0,
          life: maxLife,
          maxLife: maxLife
        });
      }

      // Strong visual pointer split
      redGlitchX.set(-8);
      redGlitchY.set(4);
      cyanGlitchX.set(8);
      cyanGlitchY.set(-4);
    };

    const releaseClickGlitch = () => {
      setIsClicked(false);
      redGlitchX.set(0);
      redGlitchY.set(0);
      cyanGlitchX.set(0);
      cyanGlitchY.set(0);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", triggerClickGlitch);
    window.addEventListener("mouseup", releaseClickGlitch);

    document.body.classList.add("custom-cursor-active");

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", triggerClickGlitch);
      window.removeEventListener("mouseup", releaseClickGlitch);
      window.removeEventListener("resize", resizeCanvas);
      clearInterval(glitchInterval);
      cancelAnimationFrame(animationId);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [isVisible, cursorX, cursorY, hudTargetX, hudTargetY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Glitch block canvas layer */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9997]"
      />

      {/* Trailing Snapping Aura: Cyan Split Layer */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] border mix-blend-screen"
        style={{
          x: hudX,
          y: hudY,
          // Offset slightly left on normal, splits wide on hover
          translateX: isHovered ? "-52%" : "-51%",
          translateY: "-50%",
          width: auraSize.width,
          height: auraSize.height,
          borderRadius: auraSize.borderRadius,
          borderWidth: auraSize.borderWidth,
          borderColor: "rgba(0, 243, 255, 0.45)",
          boxShadow: "0 0 8px rgba(0, 243, 255, 0.1)"
        }}
        animate={{
          scale: isClicked ? 0.92 : 1,
        }}
        transition={{
          width: { type: "spring", stiffness: 220, damping: 24 },
          height: { type: "spring", stiffness: 220, damping: 24 },
          scale: { type: "spring", stiffness: 350, damping: 15 }
        }}
      />

      {/* Trailing Snapping Aura: Red/Magenta Split Layer */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] border mix-blend-screen"
        style={{
          x: hudX,
          y: hudY,
          // Offset slightly right on normal, splits wide on hover
          translateX: isHovered ? "-48%" : "-49%",
          translateY: "-50%",
          width: auraSize.width,
          height: auraSize.height,
          borderRadius: auraSize.borderRadius,
          borderWidth: auraSize.borderWidth,
          borderColor: "rgba(255, 0, 85, 0.45)",
          boxShadow: "0 0 8px rgba(255, 0, 85, 0.1)"
        }}
        animate={{
          scale: isClicked ? 0.92 : 1,
        }}
        transition={{
          width: { type: "spring", stiffness: 220, damping: 24 },
          height: { type: "spring", stiffness: 220, damping: 24 },
          scale: { type: "spring", stiffness: 350, damping: 15 }
        }}
      />

      {/* RGB Glitch Pointer (Overlapping channels using screen blend) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-6 h-6 flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-4px",
          translateY: "-4px"
        }}
      >
        <div className="relative w-5 h-5 mix-blend-screen select-none pointer-events-none">
          {/* Red/Magenta Channel Layer */}
          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="absolute inset-0 text-red-500 mix-blend-screen"
            style={{
              x: redGlitchX,
              y: redGlitchY
            }}
            animate={isHovered ? { x: [-1.5, 1.5, -1] } : {}}
            transition={{ repeat: Infinity, duration: 0.15 }}
          >
            <path d="M2 1 L2 18 L6.5 13.5 L15 13.5 L2 1 Z" fill="currentColor" />
          </motion.svg>

          {/* Cyan Channel Layer */}
          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="absolute inset-0 text-cyan-400 mix-blend-screen"
            style={{
              x: cyanGlitchX,
              y: cyanGlitchY
            }}
            animate={isHovered ? { x: [1.5, -1.5, 1] } : {}}
            transition={{ repeat: Infinity, duration: 0.15 }}
          >
            <path d="M2 1 L2 18 L6.5 13.5 L15 13.5 L2 1 Z" fill="currentColor" />
          </motion.svg>

          {/* White Main Base Layer (Middle) */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="absolute inset-0 text-white opacity-85"
          >
            <path d="M2 1 L2 18 L6.5 13.5 L15 13.5 L2 1 Z" fill="currentColor" />
          </svg>
        </div>

        {/* Technical live coordinate tag */}
        <span
          ref={coordRef}
          className="absolute left-6 top-3 font-mono text-[8px] text-[var(--cyan-glow)]/40 bg-black/40 backdrop-blur-sm px-1 py-0.5 rounded border border-white/5 whitespace-nowrap tracking-wider font-semibold"
        >
          0, 0
        </span>
      </motion.div>
    </>
  );
}
