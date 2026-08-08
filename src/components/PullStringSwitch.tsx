import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Sun, Moon, Zap } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export const PullStringSwitch: React.FC = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const controls = useAnimation();
  const [isPulling, setIsPulling] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  // Play synthesized mechanical light switch click sound via Web Audio API
  const playSwitchSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      // Click sound tone
      osc.type = "triangle";
      osc.frequency.setValueAtTime(isDark ? 600 : 350, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.04);
      
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {
      // Audio context disabled or suppressed by browser policy
    }
  };

  const handlePull = async () => {
    if (isPulling) return;
    setIsPulling(true);
    playSwitchSound();

    // Trigger visual screen flash effect on theme switch
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 250);

    // Spring pull animation: stretch down then snap back up smoothly
    await controls.start({
      y: [0, 24, -4, 0],
      transition: {
        duration: 0.4,
        times: [0, 0.4, 0.75, 1],
        ease: "easeOut",
      },
    });

    toggleTheme();
    setIsPulling(false);
  };

  return (
    <>
      {/* Light switch flash transition overlay */}
      {showFlash && (
        <div className="fixed inset-0 pointer-events-none z-[100] transition-opacity duration-200 bg-amber-100/20 dark:bg-zinc-950/40 backdrop-brightness-110 dark:backdrop-brightness-90" />
      )}

      {/* Pull String Lamp Component */}
      <div 
        className="relative flex flex-col items-center select-none group cursor-pointer"
        title={isDark ? "Işığı Aç (Light Mode)" : "Işığı Kapat (Dark Mode)"}
        onClick={handlePull}
      >
        {/* Lamp Base / Mount in Navbar */}
        <div className="w-6 h-2 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 dark:from-zinc-600 dark:via-zinc-500 dark:to-zinc-600 rounded-t-md shadow-sm border border-amber-500/30 dark:border-zinc-500/30" />

        {/* Animated Cord & Pull Ring */}
        <motion.div
          animate={controls}
          className="flex flex-col items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Hanging Cord Beads Line */}
          <div className="w-0.5 h-6 md:h-7 bg-gradient-to-b from-amber-400/80 via-amber-500/90 to-amber-600 dark:from-zinc-500 dark:via-zinc-400 dark:to-zinc-500 flex flex-col justify-between items-center py-0.5">
            <div className="w-1 h-1 rounded-full bg-amber-400 dark:bg-zinc-400" />
            <div className="w-1 h-1 rounded-full bg-amber-500 dark:bg-zinc-400" />
            <div className="w-1 h-1 rounded-full bg-amber-600 dark:bg-zinc-400" />
          </div>

          {/* Pull Bead Handle / Bulb Icon */}
          <div className={`p-1.5 rounded-full border shadow-md transition-all duration-300 flex items-center justify-center ${
            isDark
              ? "bg-zinc-800 text-zinc-300 border-zinc-600 hover:border-zinc-400 hover:text-amber-300 shadow-zinc-900/50"
              : "bg-amber-100 text-amber-600 border-amber-300 hover:border-amber-500 hover:bg-amber-200 shadow-amber-500/20"
          }`}>
            {isDark ? (
              <Moon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-12" />
            ) : (
              <Sun className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-45" />
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default PullStringSwitch;
