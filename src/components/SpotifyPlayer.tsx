import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Music, X, Maximize2, Minimize2, Disc3 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SpotifyPlayerProps {
  playlistId?: string;
}

const SpotifyIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

export const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({
  playlistId = "19Shr7Wino0uEccZhXJ6qY",
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // Default false for compact 152px view
  const [bottomOffset, setBottomOffset] = useState(24);
  const playerRef = useRef<HTMLDivElement>(null);

  const embedUrl = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;

  // Dynamically calculate exact footer overlap so the widget sits neatly right above the footer line
  useEffect(() => {
    const updatePosition = () => {
      const footerEl = document.querySelector("footer");
      const viewportHeight = window.innerHeight;
      const baseBottom = window.innerWidth < 640 ? 16 : 20;

      if (footerEl) {
        const footerRect = footerEl.getBoundingClientRect();
        // Distance from bottom of viewport to top border of footer
        const footerOverlap = viewportHeight - footerRect.top;
        if (footerOverlap > 0) {
          // Sit neatly 10px right above the top border of footer
          setBottomOffset(footerOverlap + 10);
          return;
        }
      }
      setBottomOffset(baseBottom);
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition, { passive: true });
    
    // Also re-check after page transitions / DOM changes
    const interval = setInterval(updatePosition, 300);

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
      clearInterval(interval);
    };
  }, []);

  // Close popup when clicking outside the widget
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (playerRef.current && !playerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={playerRef}
      style={{ bottom: `${bottomOffset}px` }}
      className="fixed right-5 sm:right-7 z-40 flex flex-col items-end font-sans transition-[bottom] duration-150 ease-out"
    >
      {/* 
        Persistent Popup Container:
        The iframe is ALWAYS kept mounted in the DOM so hiding the popup 
        NEVER pauses or interrupts the Spotify audio stream.
      */}
      <div
        className={`mb-3 w-[300px] sm:w-[340px] rounded-2xl border border-border/80 bg-card/95 backdrop-blur-2xl shadow-2xl overflow-hidden p-2 dark:bg-zinc-900/95 dark:border-zinc-800/80 transition-all duration-300 transform origin-bottom-right ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto shadow-2xl"
            : "opacity-0 scale-90 translate-y-4 pointer-events-none h-0 p-0 border-0 mb-0"
        }`}
      >
        {/* Popup Header Controls */}
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-border/40 dark:border-zinc-800/60 mb-2">
          <div className="flex items-center gap-2">
            <SpotifyIcon className="w-4 h-4 text-[#1DB954]" />
            <span className="text-xs font-semibold text-foreground/90 tracking-wide">
              {t("spotify.title", "Rana'nın Playlisti")}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              title={isExpanded ? "Küçült" : "Genişlet"}
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-muted/60 transition-colors"
              title="Pencereyi Gizle (Müzik Arka Planda Çalmaya Devam Eder)"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Always-Mounted Spotify iFrame Container */}
        <div className="rounded-xl overflow-hidden shadow-inner bg-black/10 dark:bg-black/50">
          <iframe
            title="Spotify Playlist Player"
            src={embedUrl}
            width="100%"
            height={isExpanded ? "352" : "152"}
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="w-full rounded-xl transition-all duration-300"
          />
        </div>
      </div>

      {/* Floating Bottom-Right Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-xl border backdrop-blur-xl transition-all duration-300 ${
          isOpen
            ? "bg-primary text-primary-foreground border-primary/50 shadow-primary/25 ring-2 ring-primary/30"
            : "bg-card/90 text-foreground border-border/80 hover:border-primary/60 hover:bg-primary/10 dark:bg-zinc-900/90 dark:border-zinc-800"
        }`}
        title={isOpen ? t("spotify.hideButton", "Gizle") : t("spotify.openButton", "Rana'nın Playlisti 🎧")}
      >
        <div className="relative flex items-center justify-center">
          {isOpen ? (
            <X className="w-4 h-4 text-primary-foreground transition-transform duration-200" />
          ) : (
            <SpotifyIcon className="w-4 h-4 text-[#1DB954] group-hover:scale-110 transition-transform duration-200" />
          )}

          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1DB954] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1DB954]" />
            </span>
          )}
        </div>

        <span className="text-xs font-semibold tracking-wide">
          {isOpen ? t("spotify.hideButton", "Gizle") : t("spotify.openButton", "Rana'nın Playlisti 🎧")}
        </span>
      </motion.button>
    </div>
  );
};

export default SpotifyPlayer;
