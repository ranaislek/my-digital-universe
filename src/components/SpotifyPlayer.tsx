import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Music, X, Maximize2, Minimize2, Disc3 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SpotifyPlayerProps {
  playlistId?: string;
}

export const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({
  playlistId = "19Shr7Wino0uEccZhXJ6qY",
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // Default false for compact 152px view
  const [isNearBottom, setIsNearBottom] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);

  const embedUrl = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;

  // Detect when scrolled near bottom of page (near footer) to shift widget up
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const clientHeight = window.innerHeight;

      // If within 140px of bottom of page
      if (scrollHeight - (scrollTop + clientHeight) < 140) {
        setIsNearBottom(true);
      } else {
        setIsNearBottom(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
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
      className={`fixed right-5 sm:right-7 z-40 flex flex-col items-end font-sans transition-all duration-300 ${
        isNearBottom ? "bottom-20 sm:bottom-24" : "bottom-6 sm:bottom-8"
      }`}
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
            <Disc3 className="w-4 h-4 text-[#1DB954] animate-spin-slow" />
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
            ? "bg-[#1DB954] text-white border-[#1DB954]/50 shadow-[#1DB954]/25 ring-2 ring-[#1DB954]/30"
            : "bg-card/90 text-foreground border-border/80 hover:border-[#1DB954]/60 hover:bg-[#1DB954]/10 dark:bg-zinc-900/90 dark:border-zinc-800"
        }`}
        title={isOpen ? t("spotify.hideButton", "Gizle") : t("spotify.openButton", "Rana'nın Playlisti 🎧")}
      >
        <div className="relative flex items-center justify-center">
          {isOpen ? (
            <X className="w-4 h-4 text-white transition-transform duration-200" />
          ) : (
            <Music className="w-4 h-4 text-[#1DB954] group-hover:scale-110 transition-transform duration-200" />
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
