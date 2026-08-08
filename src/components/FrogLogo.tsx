import React from "react";

interface FrogLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const FrogLogo: React.FC<FrogLogoProps> = ({
  className = "",
  size = "md",
}) => {
  const sizeClasses = {
    sm: "h-8 text-lg",
    md: "h-10 md:h-12 text-xl md:text-2xl",
    lg: "h-14 md:h-16 text-2xl md:text-3xl",
  };

  return (
    <div className={`flex items-center gap-2.5 select-none group cursor-pointer ${className}`}>
      {/* Cute Transparent Vector Frog SVG */}
      <svg
        viewBox="0 0 100 90"
        className="h-9 md:h-11 w-auto transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Frog Head & Body */}
        <ellipse cx="50" cy="52" rx="36" ry="28" fill="#4ADE80" />
        <ellipse cx="50" cy="52" rx="36" ry="28" fill="url(#frogGradient)" />

        {/* Eyes (Left & Right) */}
        <circle cx="30" cy="24" r="14" fill="#4ADE80" />
        <circle cx="70" cy="24" r="14" fill="#4ADE80" />

        {/* Outer White Eyes */}
        <circle cx="30" cy="24" r="10" fill="white" />
        <circle cx="70" cy="24" r="10" fill="white" />

        {/* Pupils */}
        <circle cx="32" cy="23" r="5" fill="#1E293B" />
        <circle cx="68" cy="23" r="5" fill="#1E293B" />

        {/* Eye Shine Highlights */}
        <circle cx="34" cy="21" r="2" fill="white" />
        <circle cx="70" cy="21" r="2" fill="white" />

        {/* Cute Rosy Cheeks */}
        <ellipse cx="24" cy="54" rx="6" ry="4" fill="#F472B6" opacity="0.8" />
        <ellipse cx="76" cy="54" rx="6" ry="4" fill="#F472B6" opacity="0.8" />

        {/* Happy Smile Mouth */}
        <path
          d="M 38 56 Q 50 67 62 56"
          stroke="#166534"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Fairy Wings / Sparkles */}
        <path
          d="M 12 40 Q -2 30 10 20 Q 20 28 16 42 Z"
          fill="#F472B6"
          opacity="0.6"
          className="animate-pulse"
        />
        <path
          d="M 88 40 Q 102 30 90 20 Q 80 28 84 42 Z"
          fill="#F472B6"
          opacity="0.6"
          className="animate-pulse"
        />

        {/* Tiny Crown / Star */}
        <path
          d="M 50 4 L 53 14 L 63 14 L 55 20 L 58 30 L 50 24 L 42 30 L 45 20 L 37 14 L 47 14 Z"
          fill="#FBBF24"
        />

        {/* Gradients */}
        <defs>
          <linearGradient id="frogGradient" x1="50" y1="24" x2="50" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#86EFAC" stopOpacity="0.4" />
            <stop offset="1" stopColor="#22C55E" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Typography: "rana." */}
      <span className="font-serif font-bold tracking-tight text-foreground text-2xl md:text-3xl transition-colors group-hover:text-primary">
        rana<span className="text-primary font-sans font-bold">.</span>
      </span>
    </div>
  );
};

export default FrogLogo;
